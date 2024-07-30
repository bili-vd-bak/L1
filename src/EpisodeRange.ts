import { EpisodeSort } from "./EpisodeSort.ts";

export class EpisodeRange {
  /**
   * 是否知道具体集数
   */
  get isKnown(): boolean {
    if (this.type === "Season") return (this.getIns() as Season).isKnown;
    else return true;
  }

  constructor(
    public type: "Empty" | "Single" | "Range" | "Combined" | "Season",
    public ep: {
      value?: string;
      start?: string;
      end?: string;
      first?: EpisodeRange;
      second?: EpisodeRange;
      rawNumber?: number;
    }
  ) {
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

  getIns(): Empty | Single | Range | Combined | Season {
    if (this.type === "Single") {
      return new Single(new EpisodeSort(this.ep.value!));
    } else if (this.type === "Range") {
      return new Range(
        new EpisodeSort(this.ep.start!),
        new EpisodeSort(this.ep.end!)
      );
    } else if (this.type === "Combined") {
      return new Combined(this.ep.first!, this.ep.second!);
    } else if (this.type === "Season") {
      return new Season(this.ep.rawNumber!);
    } else return new Empty();
  }

  /**
   * 已知的集数列表. 若未知 (例如 [unknownSeason]), 则返回空序列.
   */
  get knownSorts(): EpisodeSort[] {
    return this.getIns().knownSorts;
    // if (this.type === "Single") return (this.getIns() as Single).knownSorts;
    // else if (this.type === "Range") return (this.getIns() as Range).knownSorts;
    // else if (this.type === "Combined")
    //   return (this.getIns() as Combined).knownSorts;
    // else if (this.type === "Season")
    //   return (this.getIns() as Season).knownSorts;
    // else return (this.getIns() as Empty).knownSorts;
  }

  toString(): string {
    return this.getIns().toString();
  }
}

class Empty {
  knownSorts: EpisodeSort[] = [];
  toString(): string {
    return "EpisodeRange(empty)";
  }
}

class Single {
  constructor(public value: EpisodeSort) {}
  get knownSorts(): EpisodeSort[] {
    return [this.value];
  }
  toString(): string {
    return `${this.value.toString()}..${this.value.toString()}`;
  }
}

class Range {
  constructor(public start: EpisodeSort, public end: EpisodeSort) {}
  get knownSorts(): EpisodeSort[] {
    if (!(this.start.isNormal && this.end.isNormal)) {
      return [this.start, this.end];
    }
    let curr = this.start.number;
    if (this.start.isPartial) {
      curr! += 0.5;
    }
    const res: EpisodeSort[] = [];
    while (curr! < this.end.number!) {
      res.push(new EpisodeSort(curr!.toString()));
      curr! += 1;
    }
    res.push(new EpisodeSort(this.end.number!.toString()));
    return res;
  }
  toString(): string {
    return `${this.start.toString()}..${this.end.toString()}`;
  }
}

class Combined {
  constructor(public first: EpisodeRange, public second: EpisodeRange) {}
  get knownSorts(): EpisodeSort[] {
    return [...this.first.knownSorts, ...this.second.knownSorts];
  }
  toString(): string {
    if (this.second.type === "Single")
      return `${this.first}+${(this.second.getIns() as Single).value}`;
    else if (this.first.type === "Single")
      return `${(this.first.getIns() as Single).value}+${this.second}`;
    else return `${this.first}+${this.second}`;
  }
}

/**
 * 季度全集, 但是不知道具体包含哪些集数
 */
export class Season {
  isKnown = false;
  constructor(
    /**
     * 第几季
     */
    public rawNumber: number
  ) {}
  get numberOrZero(): number {
    return this.rawNumber === -1 ? 0 : this.rawNumber;
  }
  get numberOrNull(): number | null {
    return this.rawNumber === -1 ? null : this.rawNumber;
  }
  get knownSorts(): EpisodeSort[] {
    return new Empty().knownSorts;
  }
  toString(): string {
    return this.rawNumber !== -1 ? `S${this.rawNumber}` : "S?";
  }
}

// console.log(new EpisodeRange("Single", { value: "1" }).isKnown);
// console.log(new EpisodeRange("Season", { rawNumber: 2 }).isKnown);
