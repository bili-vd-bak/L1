import { EpisodeSort } from "./EpisodeSort.ts";
export declare class EpisodeRange {
    type: "Empty" | "Single" | "Range" | "Combined" | "Season";
    ep: {
        value?: string;
        start?: string;
        end?: string;
        first?: EpisodeRange;
        second?: EpisodeRange;
        rawNumber?: number;
    };
    /**
     * 是否知道具体集数
     */
    get isKnown(): boolean;
    constructor(type: "Empty" | "Single" | "Range" | "Combined" | "Season", ep: {
        value?: string;
        start?: string;
        end?: string;
        first?: EpisodeRange;
        second?: EpisodeRange;
        rawNumber?: number;
    });
    getIns(): Empty | Single | Range | Combined | Season;
    /**
     * 已知的集数列表. 若未知 (例如 [unknownSeason]), 则返回空序列.
     */
    get knownSorts(): EpisodeSort[];
    toString(): string;
}
declare class Empty {
    knownSorts: EpisodeSort[];
    toString(): string;
}
declare class Single {
    value: EpisodeSort;
    constructor(value: EpisodeSort);
    get knownSorts(): EpisodeSort[];
    toString(): string;
}
declare class Range {
    start: EpisodeSort;
    end: EpisodeSort;
    constructor(start: EpisodeSort, end: EpisodeSort);
    get knownSorts(): EpisodeSort[];
    toString(): string;
}
declare class Combined {
    first: EpisodeRange;
    second: EpisodeRange;
    constructor(first: EpisodeRange, second: EpisodeRange);
    get knownSorts(): EpisodeSort[];
    toString(): string;
}
/**
 * 季度全集, 但是不知道具体包含哪些集数
 */
export declare class Season {
    /**
     * 第几季
     */
    rawNumber: number;
    isKnown: boolean;
    constructor(
    /**
     * 第几季
     */
    rawNumber: number);
    get numberOrZero(): number;
    get numberOrNull(): number | null;
    get knownSorts(): EpisodeSort[];
    toString(): string;
}
export {};
