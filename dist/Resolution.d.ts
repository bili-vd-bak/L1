export interface Resolution {
    id: string;
    size: number;
    otherNames: string[];
    displayName: string;
}
export declare function tryParse(text: string): Resolution | null;
