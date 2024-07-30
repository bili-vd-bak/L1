const tokens = {
  CHC: ["粤", "粵", "Cantonese", "CHC", "Yue"],
  CHS: [
    "简中",
    "GB",
    "GBK",
    "简体中文",
    "中文",
    "中字",
    "簡",
    "简",
    "CHS",
    "Zh-Hans",
    "Zh_Hans",
    "zh_cn",
    "SC",
    "zh",
  ],
  CHT: ["繁中", "BIG5", "BIG 5", "繁", "Chinese", "CHT", "TC"],
  JPN: ["日", "Japanese", "JP"],
  ENG: ["英", "English"],
};

function contains(text: string, match: string) {
  const reg = new RegExp(match, "gi");
  return text.match(reg);
}

interface Ret_Templete {
  id: string;
  displayName: string;
  isChinese: boolean;
}

export class SubtitleLanguage {
  id: string;
  isChinese: boolean;
  displayName: string;
  constructor(m: Ret_Templete) {
    this.id = m.id;
    this.isChinese = m.isChinese;
    this.displayName = m.displayName;
  }
  toString(): string {
    return this.displayName;
  }
}

export const ret_templete = {
  CHC: new SubtitleLanguage({
    id: "CHC",
    isChinese: true,
    displayName: "粤语",
  }),
  CHS: new SubtitleLanguage({
    id: "CHS",
    isChinese: true,
    displayName: "简中",
  }),
  CHT: new SubtitleLanguage({
    id: "CHT",
    isChinese: true,
    displayName: "繁中",
  }),
  JPN: new SubtitleLanguage({
    id: "JPN",
    isChinese: false,
    displayName: "日语",
  }),
  ENG: new SubtitleLanguage({
    id: "ENG",
    isChinese: false,
    displayName: "英语",
  }),
  ERR: new SubtitleLanguage({
    id: "ERR",
    isChinese: false,
    displayName: "未知",
  }),
};

export function match(title: string) {
  const ret: SubtitleLanguage[] = [];
  for (const [id, token_list] of Object.entries(tokens)) {
    for (const token of token_list) {
      if (!ret.includes(ret_templete.CHC) && id === "CHC") {
        if (contains(title, token)) ret.push(ret_templete.CHC);
      }

      if (!ret.includes(ret_templete.CHS) && id === "CHS") {
        if (contains(title, "繁體中文")) break;
        else if (contains(title, token)) ret.push(ret_templete.CHS);
      }

      if (!ret.includes(ret_templete.CHT) && id === "CHT") {
        if (contains(title, token)) ret.push(ret_templete.CHT);
      }

      if (!ret.includes(ret_templete.JPN) && id === "JPN") {
        if (contains(title, token)) ret.push(ret_templete.JPN);
      }

      if (!ret.includes(ret_templete.ENG) && id === "ENG") {
        if (contains(title, token)) ret.push(ret_templete.ENG);
      }
    }
  }
  // return ret.length === 0 ? [ret_templete.ERR] : ret;
  return ret;
}

// console.log(
//   match(
//     "【喵萌奶茶屋】★07月新番★[败犬女主角也太多了！ / 败犬女主太多了！ / 负けヒロインが多すぎる！ / Make Heroine ga Oosugiru!][02][1080p][简日双语][招募翻译时轴] [437.54 MB]"
//   )[0].toString()
// );
