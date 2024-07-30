export interface MediaOrigin {
    id: string;
    otherNames?: string[];
}
export declare function tryParse(text: string): MediaOrigin | null;
