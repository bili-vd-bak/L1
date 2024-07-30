import * as SubtitleLanguage from "./SubtitleLanguage.ts";
import * as Resolution from "./Resolution.ts";
import * as FrameRate from "./FrameRate.ts";
import * as MediaOrigin from "./MediaOrigin.ts";
import * as EpisodeRange from "./EpisodeRange.ts";
export interface Builder {
    tags: string[];
    subtitleLanguages: SubtitleLanguage.SubtitleLanguage[];
    resolution: Resolution.Resolution;
    frameRate: FrameRate.FrameRate;
    mediaOrigin: MediaOrigin.MediaOrigin;
    episodeRange: EpisodeRange.EpisodeRange;
}
/**
 * L1(LabelFirstTitleParser)
 * @param title The name of anime etc.
 * @returns
 */
declare function main(title: string): Builder;
export default main;
