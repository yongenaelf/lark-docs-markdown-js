import { getMarkdownTable } from "markdown-table-ts";
import { Item, Items } from "../index";

export function TableBlock(item: Item, items: Items) {
  const [headerRow, ...rows] = rowSplitter(
    item.children as string[],
    item.table?.property.column_size!
  );

  const table = getMarkdownTable({
    table: {
      head: headerRow.map((i) => getCellContent(i, items)),
      body: rows.map((i) => i.map((j) => getCellContent(j, items))),
    },
  });

  return table;
}

function rowSplitter(cells: string[], size: number) {
  const a = [...cells];
  const arrays: string[][] = [];

  while (a.length > 0) arrays.push(a.splice(0, size));

  return arrays;
}

function getCellContent(id: string, items: Items) {
  const cellId = items.find((i) => i.block_id === id)?.children?.[0];

  const cellContent =
    items
      .find((i) => i.block_id === cellId)
      ?.text?.elements.map((i) => i.text_run?.content)
      .join(" ") || "";

  return cellContent;
}
