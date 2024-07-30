declare class Normal {
    number: number;
    constructor(number: number);
    get raw(): string;
    get isPartial(): boolean;
    toString(): string;
}
declare class Special {
    raw: string;
    constructor(raw: string);
    get number(): number | null;
    toString(): string;
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
export declare class EpisodeSort {
    /**
     * "1", "1.5", "SP". 对于小于 10 的序号, 前面没有 "0".
     *
     * @see toString
     */
    raw: string;
    constructor(
    /**
     * "1", "1.5", "SP". 对于小于 10 的序号, 前面没有 "0".
     *
     * @see toString
     */
    raw: string);
    get Ins(): Normal | Special;
    get isNormal(): boolean;
    get isPartial(): boolean;
    /**
     * 若是普通剧集, 则返回序号, 例如 ``, 否则返回 null.
     */
    get number(): number | null;
    /**
     * 返回该剧集的人类易读名称.
     *
     * 为普通剧集补零了的字符串.
     * 例如 1 -> "01", 1.5 -> "1.5", SP -> "SP".
     */
    toString(): string;
}
export {};
