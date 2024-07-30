export interface FrameRate {
  value: number;
}

function frameRate(value: number): FrameRate {
  return { value };
}

function contains(text: string, match: string) {
  const reg = new RegExp(match, "gi");
  return text.match(reg);
}

const F60 = frameRate(60);

export function tryParse(text: string) {
  // TODO: 2022/8/4 optimize
  if (contains(text, "@60")) {
    return F60;
  }
  if (contains(text, "1080P60")) {
    return F60;
  }
  if (contains(text, "2160P60")) {
    return F60;
  }
  if (contains(text, "60FPS")) {
    return F60;
  }
  if (contains(text, "60 FPS")) {
    return F60;
  }
  return null;
}

// console.log(
//   tryParse(
//     "【喵萌奶茶屋】★07月新番★[败犬女主角也太多了！ / 败犬女主太多了！ / 负けヒロインが多すぎる！ / Make Heroine ga Oosugiru!][02][1080p][简日双语][招募翻译时轴] [437.54 MB]"
//   )
// );
