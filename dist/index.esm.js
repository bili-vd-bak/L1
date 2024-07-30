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
function contains$3(text, match) {
    const reg = new RegExp(match, "gi");
    return text.match(reg);
}
class SubtitleLanguage {
    constructor(m) {
        this.id = m.id;
        this.isChinese = m.isChinese;
        this.displayName = m.displayName;
    }
    toString() {
        return this.displayName;
    }
}
const ret_templete = {
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
function match(title) {
    const ret = [];
    for (const [id, token_list] of Object.entries(tokens)) {
        for (const token of token_list) {
            if (!ret.includes(ret_templete.CHC) && id === "CHC") {
                if (contains$3(title, token))
                    ret.push(ret_templete.CHC);
            }
            if (!ret.includes(ret_templete.CHS) && id === "CHS") {
                if (contains$3(title, "繁體中文"))
                    break;
                else if (contains$3(title, token))
                    ret.push(ret_templete.CHS);
            }
            if (!ret.includes(ret_templete.CHT) && id === "CHT") {
                if (contains$3(title, token))
                    ret.push(ret_templete.CHT);
            }
            if (!ret.includes(ret_templete.JPN) && id === "JPN") {
                if (contains$3(title, token))
                    ret.push(ret_templete.JPN);
            }
            if (!ret.includes(ret_templete.ENG) && id === "ENG") {
                if (contains$3(title, token))
                    ret.push(ret_templete.ENG);
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

function resolution(id, size, otherNames, displayName = id) {
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
function tryParse$2(text) {
    for (const entry of entries) {
        if (text.match(new RegExp(entry.id, "gi")) ||
            entry.otherNames.some((n) => text.match(new RegExp(n, "gi")))) {
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

function frameRate(value) {
    return { value };
}
function contains$2(text, match) {
    const reg = new RegExp(match, "gi");
    return text.match(reg);
}
const F60 = frameRate(60);
function tryParse$1(text) {
    // TODO: 2022/8/4 optimize
    if (contains$2(text, "@60")) {
        return F60;
    }
    if (contains$2(text, "1080P60")) {
        return F60;
    }
    if (contains$2(text, "2160P60")) {
        return F60;
    }
    if (contains$2(text, "60FPS")) {
        return F60;
    }
    if (contains$2(text, "60 FPS")) {
        return F60;
    }
    return null;
}
// console.log(
//   tryParse(
//     "【喵萌奶茶屋】★07月新番★[败犬女主角也太多了！ / 败犬女主太多了！ / 负けヒロインが多すぎる！ / Make Heroine ga Oosugiru!][02][1080p][简日双语][招募翻译时轴] [437.54 MB]"
//   )
// );

function mediaOrigin(id, otherNames) {
    if (otherNames)
        return { id, otherNames: [otherNames] };
    else
        return { id, otherNames: [] };
}
function contains$1(text, match) {
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
function tryParse(text) {
    for (const value of values) {
        if (contains$1(text, value.id) ||
            value.otherNames?.some((it) => {
                contains$1(text, it);
            })) {
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

class Normal {
    constructor(number) {
        this.number = number;
    }
    get raw() {
        if (this.number.toFixed(1) === "0.5") {
            return this.number.toFixed(1);
        }
        return this.number.toString();
    }
    get isPartial() {
        return this.number % 1 === 0.5;
    }
    toString() {
        if (Number.isInteger(this.number)) {
            if (this.number < 10) {
                return `0${this.number.toFixed(0)}`;
            }
            return this.number.toFixed(0);
        }
        return this.number.toString();
    }
}
class Special {
    constructor(raw) {
        this.raw = raw;
    }
    get number() {
        return null;
    }
    toString() {
        return this.raw;
    }
}
/**
 * 剧集序号, 例如 "01", "24.5", "OVA".
 *
 * - [Normal] 代表普通正片剧集, 例如 "01", "24.5". 注意, 只有整数和 ".5" 的浮点数会被解析为 Normal 类型.
 * - [Special] 代表任何其他剧集, 统称为特殊剧集, 例如 "OVA", "SP".
 *
 *
 * 在使用 [EpisodeSort] 时, 建议根据用途定义不同的变量名:
 * - `val episodeSort: EpisodeSort`: 在系列中的集数, 例如第二季的第一集为 26
 * - `val episodeEp: EpisodeSort`: 在当前季度中的集数, 例如第二季的第一集为 01
 *
 * @see EpisodeRange
 */
class EpisodeSort {
    constructor(
    /**
     * "1", "1.5", "SP". 对于小于 10 的序号, 前面没有 "0".
     *
     * @see toString
     */
    raw) {
        this.raw = raw;
    }
    get Ins() {
        if (Number(this.raw) || Number(this.raw) === 0) {
            return new Normal(Number(this.raw));
        }
        else {
            return new Special(this.raw);
        }
    }
    get isNormal() {
        if (Number(this.raw) || Number(this.raw) === 0) {
            return true;
        }
        else {
            return false;
        }
    }
    get isPartial() {
        if (this.isNormal)
            return this.Ins.isPartial;
        else
            return false;
    }
    /**
     * 若是普通剧集, 则返回序号, 例如 ``, 否则返回 null.
     */
    get number() {
        return this.Ins.number;
    }
    /**
     * 返回该剧集的人类易读名称.
     *
     * 为普通剧集补零了的字符串.
     * 例如 1 -> "01", 1.5 -> "1.5", SP -> "SP".
     */
    toString() {
        return this.Ins.toString();
    }
}
// ["0", "0.5", "1", "2", "5.5", "16.5", "17", "22", "SP", "剧场版"].forEach(
//   (input) => {
//     const i = new EpisodeSort(input);
//     console.log(i, i.isNormal, i.isPartial, i.number, i.raw, i.toString());
//   }
// );

class EpisodeRange {
    /**
     * 是否知道具体集数
     */
    get isKnown() {
        if (this.type === "Season")
            return this.getIns().isKnown;
        else
            return true;
    }
    constructor(type, ep) {
        this.type = type;
        this.ep = ep;
        // if (this.type === "Single") {
        //   this.Ins = new Single(new EpisodeSort(this.ep.value));
        // } else if (this.type === "Range") {
        //   this.Ins = new Range(
        //     new EpisodeSort(this.ep.start),
        //     new EpisodeSort(this.ep.end)
        //   );
        // } else if (this.type === "Combined") {
        //   this.Ins = new Combined(this.ep.first, this.ep.second);
        // } else this.Ins = new Empty();
    }
    getIns() {
        if (this.type === "Single") {
            return new Single(new EpisodeSort(this.ep.value));
        }
        else if (this.type === "Range") {
            return new Range(new EpisodeSort(this.ep.start), new EpisodeSort(this.ep.end));
        }
        else if (this.type === "Combined") {
            return new Combined(this.ep.first, this.ep.second);
        }
        else if (this.type === "Season") {
            return new Season(this.ep.rawNumber);
        }
        else
            return new Empty();
    }
    /**
     * 已知的集数列表. 若未知 (例如 [unknownSeason]), 则返回空序列.
     */
    get knownSorts() {
        return this.getIns().knownSorts;
        // if (this.type === "Single") return (this.getIns() as Single).knownSorts;
        // else if (this.type === "Range") return (this.getIns() as Range).knownSorts;
        // else if (this.type === "Combined")
        //   return (this.getIns() as Combined).knownSorts;
        // else if (this.type === "Season")
        //   return (this.getIns() as Season).knownSorts;
        // else return (this.getIns() as Empty).knownSorts;
    }
    toString() {
        return this.getIns().toString();
    }
}
class Empty {
    constructor() {
        this.knownSorts = [];
    }
    toString() {
        return "EpisodeRange(empty)";
    }
}
class Single {
    constructor(value) {
        this.value = value;
    }
    get knownSorts() {
        return [this.value];
    }
    toString() {
        return `${this.value.toString()}..${this.value.toString()}`;
    }
}
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    get knownSorts() {
        if (!(this.start.isNormal && this.end.isNormal)) {
            return [this.start, this.end];
        }
        let curr = this.start.number;
        if (this.start.isPartial) {
            curr += 0.5;
        }
        const res = [];
        while (curr < this.end.number) {
            res.push(new EpisodeSort(curr.toString()));
            curr += 1;
        }
        res.push(new EpisodeSort(this.end.number.toString()));
        return res;
    }
    toString() {
        return `${this.start.toString()}..${this.end.toString()}`;
    }
}
class Combined {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    get knownSorts() {
        return [...this.first.knownSorts, ...this.second.knownSorts];
    }
    toString() {
        if (this.second.type === "Single")
            return `${this.first}+${this.second.getIns().value}`;
        else if (this.first.type === "Single")
            return `${this.first.getIns().value}+${this.second}`;
        else
            return `${this.first}+${this.second}`;
    }
}
/**
 * 季度全集, 但是不知道具体包含哪些集数
 */
class Season {
    constructor(
    /**
     * 第几季
     */
    rawNumber) {
        this.rawNumber = rawNumber;
        this.isKnown = false;
    }
    get numberOrZero() {
        return this.rawNumber === -1 ? 0 : this.rawNumber;
    }
    get numberOrNull() {
        return this.rawNumber === -1 ? null : this.rawNumber;
    }
    get knownSorts() {
        return new Empty().knownSorts;
    }
    toString() {
        return this.rawNumber !== -1 ? `S${this.rawNumber}` : "S?";
    }
}
// console.log(new EpisodeRange("Single", { value: "1" }).isKnown);
// console.log(new EpisodeRange("Season", { rawNumber: 2 }).isKnown);

const newAnime = new RegExp("(?:★?|★(.*)?)([0-9]|[一二三四五六七八九十]{0,4}) ?[月年] ?(?:新番|日剧)★?");
// 性能没问题, 测了一般就 100 steps
// @Suppress("RegExpRedundantEscape") // required on android
const brackets = /\[(?<v1>.+?)\]|\((?<v2>.+?)\){(?<v3>.+?)\}|【(?<v4>.+?)】|（(?<v5>.+?)）|「(?<v6>.+?)」|『(?<v7>.+?)』/g;
const episodeRemove = [
    /第/,
    /_?(?:完|END)|\(完\)/i,
    /[话集話]/,
    /_?v[0-9]/i,
    /版/,
];
// TODO 近期需与上游同步
const collectionPattern = /(?<start>(?:SP)?\d{1,4})\s?(?:-{1,2}|~|～)\s?(?<end>\d{1,4})(?:TV|BDrip|BD)?(?:全(集)?)?(?<extra>\+.+)?/i;
const seasonPattern = /(S\d)(?:(\+S\d)|(\+S\w)|(\+\w+))*/i;
const builder = {
    tags: [],
    subtitleLanguages: [],
    resolution: {},
    frameRate: {},
    mediaOrigin: {},
    episodeRange: new EpisodeRange("Empty", {}),
};
function restoreBuilder() {
    builder.tags = [];
    builder.subtitleLanguages = [];
    // builder.resolution = {};
    // builder.frameRate = {};
    // builder.mediaOrigin = {};
    builder.episodeRange = new EpisodeRange("Empty", {});
}
function contains(text, match) {
    const reg = new RegExp(match, "gi");
    return text.match(reg);
}
function getPrefix(str) {
    if (!str)
        return null;
    if (Number(str[0]) || Number(str[0]) === 0)
        return null;
    const index = str.search(/\d/);
    if (index === -1)
        return null;
    return str.substring(0, index);
}
function removePrefix(str, prefix) {
    if (str.startsWith(prefix)) {
        return str.substring(prefix.length);
    }
    return str;
}
const parseSubtitleLanguages = function (word) {
    let any = false;
    if (word.split(" ").some((part) => part.toLowerCase() === "Baha") &&
        builder.subtitleLanguages.length === 0) {
        builder.subtitleLanguages.push(ret_templete.CHT);
    }
    const m = match(word);
    if (m.length > 0) {
        builder.subtitleLanguages.push(...m);
        any = true;
    }
    return any;
};
const parseResolution = function (word) {
    if (tryParse$2(word)) {
        builder.resolution = tryParse$2(word);
        return true;
    }
    return false;
};
const parseFrameRate = function (word) {
    if (tryParse$1(word)) {
        builder.frameRate = tryParse$1(word);
        return true;
    }
    return false;
};
const parseMediaOrigin = function (word) {
    if (tryParse(word)) {
        builder.mediaOrigin = tryParse(word);
        return true;
    }
    return false;
};
const parseEpisode = function (word) {
    if (contains(word, "x264") || contains(word, "x265")) {
        return false;
    }
    const str = episodeRemove.reduce((acc, regex) => acc.replace(regex, ""), word);
    if (Number(str)) {
        builder.episodeRange = new EpisodeRange("Single", {
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
                builder.episodeRange = new EpisodeRange("Range", {
                    start,
                    end: prefix + end,
                });
                return true;
            }
        }
        if (end.startsWith("0") && !start.startsWith("0")) {
            // "Hibike! Euphonium 3 - 02"
            builder.episodeRange = new EpisodeRange("Single", {
                value: end,
            });
            return true;
        }
        const extra = result_col.groups?.["extra"];
        // console.log(str, result_col.groups);
        if (extra) {
            // console.log(extra);
            builder.episodeRange = new EpisodeRange("Combined", {
                first: new EpisodeRange("Range", { start, end }),
                second: new EpisodeRange("Single", {
                    value: removePrefix(extra.replaceAll("结篇", "完结篇"), "+"),
                }),
            });
        }
        else {
            builder.episodeRange = new EpisodeRange("Range", {
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
        result_ss[0] = undefined;
        // delete result_ss[0];
        for (const [k, v] of Object.entries(result_ss)) {
            // console.log(k, v);
            if (v) {
                const vt = removePrefix(v, "+");
                if (vt && typeof k === "number") {
                    // result_ss[k] = vt;
                    if ((vt.startsWith("S") || vt.startsWith("s")) &&
                        !(vt.startsWith("SP") || vt.startsWith("sp"))) {
                        // tmp_map[k] = vt;
                        builder.episodeRange = new EpisodeRange("Season", {
                            rawNumber: Number(vt.substring(1)),
                        });
                    }
                    else
                        builder.episodeRange = new EpisodeRange("Single", {
                            value: vt,
                        });
                }
            }
        }
        return true;
    }
    if (contains(str, "SP") || // 包括 "Special"
        contains(str, "OVA") ||
        str.includes("小剧场") ||
        str.includes("特别篇") ||
        str.includes("番外篇") ||
        contains(str, "OAD") ||
        str.includes("特典")) {
        builder.episodeRange = new EpisodeRange("Single", {
            value: word,
        });
        return true;
    }
    return false;
};
function parseWord(word) {
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
function splitWords(text) {
    const result = [];
    let index = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let match;
    while ((match = brackets.exec(text)) !== null) {
        if (index < match.index) {
            result.push(text.substring(index, match.index));
        }
        index = match.index + match[0].length;
        const groups = match.groups;
        const tag = groups["v1"] ||
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
        .flatMap((res) => res
        .split("/")
        .join("$")
        .split("\\")
        .join("$")
        .split("|")
        .join("$")
        .split(" ")
        .join("$")
        .split("$"))
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
function deepClone(target) {
    const map = new WeakMap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isObject(target) {
        return ((typeof target === "object" && target) || typeof target === "function");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function clone(data) {
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
                }
                else {
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
                }
                else {
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
            }
            else {
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
function main(title) {
    // console.log(title);
    const tags = [], words = [];
    for (const s of splitWords(title)) {
        // console.log(s);
        if (!!s.trim() === false)
            continue;
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
                builder.episodeRange = new EpisodeRange("Season", {
                    rawNumber: -1,
                });
            }
        });
    }
    const ret = deepClone(builder);
    restoreBuilder();
    return ret;
}

export { main as default };

if(typeof window !== 'undefined') {
  window._L1_VERSION_ = '1.0.3'
}
