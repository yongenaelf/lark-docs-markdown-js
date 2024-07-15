import fs from "node:fs";
import lark from "@larksuiteoapi/node-sdk";
import { Heading, TableBlock, TextBlock } from "./components";

const APP_ID = process.env.APP_ID,
  APP_SECRET = process.env.APP_SECRET,
  DOC_ID = process.env.DOC_ID;

if (!APP_ID) throw new Error("Missing APP_ID env var.");

if (!APP_SECRET) throw new Error("Missing APP_SECRET env var.");

if (!DOC_ID) throw new Error("Missing DOC_ID env var");

const client = new lark.Client({
  appId: APP_ID,
  appSecret: APP_SECRET,
  disableTokenCache: false,
});

export type Items = NonNullable<
  NonNullable<
    Awaited<ReturnType<typeof client.docx.documentBlock.list>>["data"]
  >["items"]
>;

export type Item = Items[number];

(async () => {
  const allItems: Items = [];

  for await (const item of await client.docx.documentBlock.listWithIterator({
    path: {
      document_id: DOC_ID,
    },
    params: {
      page_size: 500,
      document_revision_id: -1,
    },
  })) {
    if (item && item.items) {
      allItems.push(...item.items);
    }
  }

  let md = "";

  const pageId = allItems.find((i) => i.block_type === 1)?.block_id!;
  const pageChildren = allItems.filter((i) => i.parent_id === pageId);

  for (const item of pageChildren) {
    switch (item.block_type) {
      case 2:
        md += TextBlock(item);
        break;

      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        md += Heading(item, item.block_type);
        break;

      case 31:
        md += TableBlock(item, allItems);
        break;

      default:
        break;
    }

    md += "\n\n";
  }

  console.log(md);

  try {
    const dirPath = `./out`;
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    fs.writeFileSync("./out/test.md", md);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
})();
