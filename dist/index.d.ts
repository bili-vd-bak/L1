import * as SubtitleLanguage from "./SubtitleLanguage";
import * as Resolution from "./Resolution";
import * as FrameRate from "./FrameRate";
import * as MediaOrigin from "./MediaOrigin";
import * as EpisodeRange from "./EpisodeRange";
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
