import { Item } from "../index";
import { Elements } from "./element";

export function Heading(item: Item, block_type: number) {
  switch (block_type) {
    case 3:
      return `# ${Elements(item.heading1?.elements!)}`;
    case 4:
      return `## ${Elements(item.heading2?.elements!)}`;
    case 5:
      return `### ${Elements(item.heading3?.elements!)}`;
    case 6:
      return `#### ${Elements(item.heading4?.elements!)}`;
    case 7:
      return `##### ${Elements(item.heading5?.elements!)}`;
    case 8:
      return `###### ${Elements(item.heading6?.elements!)}`;
    case 9:
      return `###### ${Elements(item.heading7?.elements!)}`;
    case 10:
      return `###### ${Elements(item.heading8?.elements!)}`;
    case 11:
      return `###### ${Elements(item.heading9?.elements!)}`;
    default:
      return "";
  }
}
