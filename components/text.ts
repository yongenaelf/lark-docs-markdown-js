import { Item } from "../index";
import { Elements } from "./element";

export function TextBlock(item: Item) {
  let content = Elements(item.text?.elements!);

  return content;
}
