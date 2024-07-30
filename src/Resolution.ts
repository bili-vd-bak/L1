export interface Resolution {
  id: string;
  size: number;
  otherNames: string[];
  displayName: string;
}

function resolution(
  id: string,
  size: number,
  otherNames: string,
  displayName: string = id
): Resolution {
  return { id, size, otherNames: [otherNames], displayName };
}

const R240P = resolution("240P", 240, "x240");
const R360P = resolution("360P", 360, "x360");
const R480P = resolution("480P", 480, "x480");
const R560P = resolution("560P", 560, "x560");
const R720P = resolution("720P", 720, "x720");
const R1080P = resolution("1080P", 1080, "x1080");
const R1440P = resolution("1440P", 1440, "x1440", "2K");
const R2160P = resolution("2160P", 2160, "x2160", "4K");

const entries = [R240P, R360P, R480P, R560P, R720P, R1080P, R1440P, R2160P];

export function tryParse(text: string) {
  for (const entry of entries) {
    if (
      text.match(new RegExp(entry.id, "gi")) ||
      entry.otherNames.some((n) => text.match(new RegExp(n, "gi")))
    ) {
      return entry;
    }
  }
  return null;
}

// console.log(
//   tryParse(
//     "【喵萌奶茶屋】★07月新番★[败犬女主角也太多了！ / 败犬女主太多了！ / 负けヒロインが多すぎる！ / Make Heroine ga Oosugiru!][02][1080p][简日双语][招募翻译时轴] [437.54 MB]"
//   )
// );
