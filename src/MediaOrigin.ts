export interface MediaOrigin {
  id: string;
  otherNames?: string[];
}

function mediaOrigin(id: string, otherNames?: string): MediaOrigin {
  if (otherNames) return { id, otherNames: [otherNames] };
  else return { id, otherNames: [] };
}

function contains(text: string, match: string) {
  const reg = new RegExp(match, "gi");
  return text.match(reg);
}

const values = [
  mediaOrigin("BDRip"),
  mediaOrigin("Blu-Ray", "BluRay"),
  mediaOrigin("WebRip"),
  mediaOrigin("Baha"),
  mediaOrigin("TVRip"),
];

export function tryParse(text: string) {
  for (const value of values) {
    if (
      contains(text, value.id) ||
      value.otherNames?.some((it) => {
        contains(text, it);
      })
    ) {
      return value;
    }
  }
  return null;
}

// console.log(
//   tryParse(
//     "[LoliHouse] 关于我转生变成史莱姆这档事 第三季 / Tensei Shitara Slime Datta Ken 3rd Season - 16(64) [WebRip 1080p HEVC-10bit AAC][简繁内封字幕] [389.4 MB]"
//   )
// );
