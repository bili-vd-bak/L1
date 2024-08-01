import * as SubtitleLanguage from "./SubtitleLanguage.ts";
import * as Resolution from "./Resolution.ts";
import * as FrameRate from "./FrameRate.ts";
import * as MediaOrigin from "./MediaOrigin.ts";
import * as EpisodeRange from "./EpisodeRange.ts";

const newAnime = new RegExp(
  "(?:★?|★(.*)?)([0-9]|[一二三四五六七八九十]{0,4}) ?[月年] ?(?:新番|日剧)★?"
);
// 性能没问题, 测了一般就 100 steps
// @Suppress("RegExpRedundantEscape") // required on android
const brackets =
  /\[(?<v1>.+?)\]|\((?<v2>.+?)\)|\{(?<v3>.+?)\}|【(?<v4>.+?)】|（(?<v5>.+?)）|「(?<v6>.+?)」|『(?<v7>.+?)』/g;

const episodeRemove = [
  /第/,
  /_?(?:完|END)|\(完\)/i,
  /[话集話]/,
  /_?v[0-9]/i,
  /版/,
];

// TODO 近期需与上游同步
const collectionPattern =
  /(?<start>(?:SP)?\d{1,4})\s?(?:-{1,2}|~|～)\s?(?<end>\d{1,4})(?:TV|BDrip|BD)?(?:全(集)?)?(?<extra>\+.+)?/i;

const seasonPattern = /(S\d)(?:(\+S\d)|(\+S\w)|(\+\w+))*/i;

export interface Builder {
  tags: string[];
  subtitleLanguages: SubtitleLanguage.SubtitleLanguage[];
  resolution: Resolution.Resolution;
  frameRate: FrameRate.FrameRate;
  mediaOrigin: MediaOrigin.MediaOrigin;
  episodeRange: EpisodeRange.EpisodeRange;
}

const builder: Builder = {
  tags: [] as string[],
  subtitleLanguages: [] as SubtitleLanguage.SubtitleLanguage[],
  resolution: {} as Resolution.Resolution,
  frameRate: {} as FrameRate.FrameRate,
  mediaOrigin: {} as MediaOrigin.MediaOrigin,
  episodeRange: new EpisodeRange.EpisodeRange("Empty", {}),
};

function restoreBuilder() {
  builder.tags = [];
  builder.subtitleLanguages = [];
  // builder.resolution = {};
  // builder.frameRate = {};
  // builder.mediaOrigin = {};
  builder.episodeRange = new EpisodeRange.EpisodeRange("Empty", {});
}

function contains(text: string, match: string) {
  const reg = new RegExp(match, "gi");
  return text.match(reg);
}

function getPrefix(str: string): string | null {
  if (!str) return null;
  if (Number(str[0]) || Number(str[0]) === 0) return null;
  const index = str.search(/\d/);
  if (index === -1) return null;
  return str.substring(0, index);
}

function removePrefix(str: string, prefix: string) {
  if (str.startsWith(prefix)) {
    return str.substring(prefix.length);
  }
  return str;
}

const parseSubtitleLanguages = function (word: string): boolean {
  let any = false;
  if (
    word.split(" ").some((part) => part.toLowerCase() === "Baha") &&
    builder.subtitleLanguages.length === 0
  ) {
    builder.subtitleLanguages.push(SubtitleLanguage.ret_templete.CHT);
  }

  const m = SubtitleLanguage.match(word);
  if (m.length > 0) {
    builder.subtitleLanguages.push(...m);
    any = true;
  }
  return any;
};

const parseResolution = function (word: string): boolean {
  if (Resolution.tryParse(word)) {
    builder.resolution = Resolution.tryParse(word)!;
    return true;
  }
  return false;
};

const parseFrameRate = function (word: string): boolean {
  if (FrameRate.tryParse(word)) {
    builder.frameRate = FrameRate.tryParse(word)!;
    return true;
  }
  return false;
};

const parseMediaOrigin = function (word: string): boolean {
  if (MediaOrigin.tryParse(word)) {
    builder.mediaOrigin = MediaOrigin.tryParse(word)!;
    return true;
  }
  return false;
};

const parseEpisode = function (word: string): boolean {
  if (contains(word, "x264") || contains(word, "x265")) {
    return false;
  }

  const str = episodeRemove.reduce(
    (acc, regex) => acc.replace(regex, ""),
    word
  );
  if (Number(str) || Number(str) === 0) {
    builder.episodeRange = new EpisodeRange.EpisodeRange("Single", {
      value: str,
    });
    return true;
  }
  const result_col = collectionPattern.exec(str);
  if (result_col) {
    const start = result_col.groups?.["start"] || "";
    const end = result_col.groups?.["end"] || "";
    const prefix = getPrefix(start);

    if (prefix) {
      if (!end.startsWith(prefix)) {
        // "SP1-5"
        builder.episodeRange = new EpisodeRange.EpisodeRange("Range", {
          start,
          end: prefix + end,
        });
        return true;
      }
    }

    if (end.startsWith("0") && !start.startsWith("0")) {
      // "Hibike! Euphonium 3 - 02"
      builder.episodeRange = new EpisodeRange.EpisodeRange("Single", {
        value: end,
      });
      return true;
    }

    const extra = result_col.groups?.["extra"];
    // console.log(str, result_col.groups);
    if (extra) {
      // console.log(extra);
      builder.episodeRange = new EpisodeRange.EpisodeRange("Combined", {
        first: new EpisodeRange.EpisodeRange("Range", { start, end }),
        second: new EpisodeRange.EpisodeRange("Single", {
          value: removePrefix(extra.replaceAll("结篇", "完结篇"), "+"),
        }),
      });
    } else {
      builder.episodeRange = new EpisodeRange.EpisodeRange("Range", {
        start,
        end,
      });
    }
    // console.log(builder.episodeRange)
    return true;
  }
  const result_ss = seasonPattern.exec(str);
  if (result_ss) {
    // let tmp_map = {};
    // console.log(result_ss);
    result_ss[0] = undefined!;
    // delete result_ss[0];
    for (const [k, v] of Object.entries(result_ss)) {
      // console.log(k, v);
      if (v) {
        const vt = removePrefix(v, "+");
        if (vt && typeof k === "number") {
          // result_ss[k] = vt;
          if (
            (vt.startsWith("S") || vt.startsWith("s")) &&
            !(vt.startsWith("SP") || vt.startsWith("sp"))
          ) {
            // tmp_map[k] = vt;
            builder.episodeRange = new EpisodeRange.EpisodeRange("Season", {
              rawNumber: Number(vt.substring(1)),
            });
          } else
            builder.episodeRange = new EpisodeRange.EpisodeRange("Single", {
              value: vt,
            });
        }
      }
    }
    return true;
  }
  if (
    contains(str, "SP") || // 包括 "Special"
    contains(str, "OVA") ||
    str.includes("小剧场") ||
    str.includes("特别篇") ||
    str.includes("番外篇") ||
    contains(str, "OAD") ||
    str.includes("特典")
  ) {
    builder.episodeRange = new EpisodeRange.EpisodeRange("Single", {
      value: word,
    });
    return true;
  }
  return false;
};

function parseWord(word: string): boolean {
  let anyMatched = false;
  // const r_parseSubtitleLanguages = parseSubtitleLanguages(word);
  // const r_parseResolution = parseResolution(word);
  // const r_parseFrameRate = parseFrameRate(word);
  // const r_parseEpisode = parseEpisode(word);
  // const r_parseMediaOrigin = parseMediaOrigin(word);

  // anyMatched =
  //   anyMatched ||
  //   r_parseSubtitleLanguages ||
  //   r_parseResolution ||
  //   r_parseFrameRate ||
  //   r_parseEpisode ||
  //   r_parseMediaOrigin;

  anyMatched =
    anyMatched ||
    parseSubtitleLanguages(word) ||
    parseResolution(word) ||
    parseFrameRate(word) ||
    parseEpisode(word) ||
    parseMediaOrigin(word);

  return anyMatched;
}

// const DEFAULT_SPLIT_WORDS_DELIMITER = ["/", "\\", "|", " "];
// function splitWords(text: string, delimiters = DEFAULT_SPLIT_WORDS_DELIMITER) {
function splitWords(text: string) {
  const result = [];
  let index = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let match: any;
  while ((match = brackets.exec(text)) !== null) {
    if (index < match.index) {
      result.push(text.substring(index, match.index));
    }
    index = match.index + match[0].length;

    const groups = match.groups;
    const tag =
      groups["v1"] ||
      groups["v2"] ||
      groups["v3"] ||
      groups["v4"] ||
      groups["v5"] ||
      groups["v6"] ||
      groups["v7"];
    // can be "WebRip 1080p HEVC-10bit AAC" or "简繁内封字幕"
    // console.log(tag);
    result.push(tag);
  }
  if (index < text.length) {
    result.push(text.substring(index));
  }
  const ret = result
    .flatMap((res) =>
      res
        .split("/")
        .join("$")
        .split("\\")
        .join("$")
        .split("|")
        .join("$")
        .split(" ")
        .join("$")
        .split("$")
    )
    .filter((s) => s.trim() !== "");
  // console.log(ret);
  return ret;
  // const result: string[] = [];
  // let match: any;
  // while ((match = brackets.exec(text)) !== null) {
  //   // console.log(match);
  //   const groups = match.groups;
  //   const tag: string =
  //     groups["v1"] ||
  //     groups["v2"] ||
  //     groups["v3"] ||
  //     groups["v4"] ||
  //     groups["v5"] ||
  //     groups["v6"] ||
  //     groups["v7"];
  //   // can be "WebRip 1080p HEVC-10bit AAC" or "简繁内封字幕"
  //   // console.log(tag);
  //   if (tag)
  //     result.push(
  //       ...tag
  //         .split("/")
  //         .join("$")
  //         .split("\\")
  //         .join("$")
  //         .split("|")
  //         .join("$")
  //         .split(" ")
  //         .join("$")
  //         .split("$")
  //     );
  // }
  // // console.log(result.filter((s) => s.trim() !== ""))
  // return result.filter((s) => s.trim() !== "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepClone(target: any) {
  const map = new WeakMap();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isObject(target: any) {
    return (
      (typeof target === "object" && target) || typeof target === "function"
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function clone(data: any) {
    if (!isObject(data)) {
      return data;
    }
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    if (typeof data === "function") {
      return new Function("return " + data.toString())();
    }
    const exist = map.get(data);
    if (exist) {
      return exist;
    }
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }
    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);
    keys.forEach((key) => {
      const val = data[key];
      if (isObject(val)) {
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }

  return clone(target);
}

/**
 * L1(LabelFirstTitleParser)
 * @param title The name of anime etc.
 * @returns
 */
function main(title: string): Builder {
  // console.log(title);
  const tags: string[] = [],
    words: string[] = [];
  for (const s of splitWords(title)) {
    // console.log(s);
    if (!!s.trim() === false) continue;
    else if (s.match(newAnime)) {
      tags.push(s);
      continue;
    }
    const word = s.replaceAll("招募", "").replaceAll("招新", "").trim();
    words.push(word);
  }
  builder.tags = tags;

  // 第一遍, 解析剧集, 分辨率, 字幕等
  for (const word of words) {
    parseWord(word);
  }
  // parseWord(words.join("$"));

  // 第二遍, 如果没有解析到剧集, 找是不是有 "BDRip", 判定为季度全集
  if (builder.episodeRange.type === "Empty") {
    words.forEach((word) => {
      if (contains(word, "BD") || contains(word, "Blu-Ray")) {
        builder.episodeRange = new EpisodeRange.EpisodeRange("Season", {
          rawNumber: -1,
        });
      }
    });
  }

  const ret: Builder = deepClone(builder);
  restoreBuilder();
  return ret;
}

export default main;
