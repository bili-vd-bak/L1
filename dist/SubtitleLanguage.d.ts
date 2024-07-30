interface Ret_Templete {
    id: string;
    displayName: string;
    isChinese: boolean;
}
export declare class SubtitleLanguage {
    id: string;
    isChinese: boolean;
    displayName: string;
    constructor(m: Ret_Templete);
    toString(): string;
}
export declare const ret_templete: {
    CHC: SubtitleLanguage;
    CHS: SubtitleLanguage;
    CHT: SubtitleLanguage;
    JPN: SubtitleLanguage;
    ENG: SubtitleLanguage;
    ERR: SubtitleLanguage;
};
export declare function match(title: string): SubtitleLanguage[];
export {};
