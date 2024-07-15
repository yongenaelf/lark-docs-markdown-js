import { Item } from "../index";

function Bold(text: string) {
  return `**${text}**`;
}

function Underline(text: string) {
  return `<u>${text}</u>`;
}

function Italic(text: string) {
  return `*${text}*`;
}

function Code(text: string) {
  return `\`${text}\``;
}

type Elements = NonNullable<Item["heading1"]>["elements"];

export function Elements(elements: Elements) {
  let all: string[] = [];

  for (const el of elements) {
    if (el.text_run) {
      let content = el.text_run.content;

      const { text_element_style } = el.text_run;

      if (text_element_style) {
        const { bold, underline, italic, inline_code } = text_element_style;

        if (bold) {
          content = Bold(content);
        }

        if (underline) {
          content = Underline(content);
        }

        if (italic) {
          content = Italic(content);
        }

        if (inline_code) {
          content = Code(content);
        }
      }

      all.push(content);
    }
  }

  return all.join(" ");
}
