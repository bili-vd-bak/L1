class Normal {
  constructor(public number: number) {}

  get raw(): string {
    if (this.number.toFixed(1) === "0.5") {
      return this.number.toFixed(1);
    }
    return this.number.toString();
  }

  get isPartial(): boolean {
    return this.number % 1 === 0.5;
  }

  toString(): string {
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
  constructor(public raw: string) {}

  get number(): number | null {
    return null;
  }

  toString(): string {
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
export class EpisodeSort {
  constructor(
    /**
     * "1", "1.5", "SP". 对于小于 10 的序号, 前面没有 "0".
     *
     * @see toString
     */
    public raw: string
  ) {}

  get Ins(): Normal | Special {
    if (Number(this.raw) || Number(this.raw) === 0) {
      return new Normal(Number(this.raw));
    } else {
      return new Special(this.raw);
    }
  }

  get isNormal(): boolean {
    if (Number(this.raw) || Number(this.raw) === 0) {
      return true;
    } else {
      return false;
    }
  }

  get isPartial(): boolean {
    if (this.isNormal) return (this.Ins as Normal).isPartial;
    else return false;
  }

  /**
   * 若是普通剧集, 则返回序号, 例如 ``, 否则返回 null.
   */
  get number(): number | null {
    return this.Ins.number;
  }

  /**
   * 返回该剧集的人类易读名称.
   *
   * 为普通剧集补零了的字符串.
   * 例如 1 -> "01", 1.5 -> "1.5", SP -> "SP".
   */
  toString(): string {
    return this.Ins.toString();
  }
}

// ["0", "0.5", "1", "2", "5.5", "16.5", "17", "22", "SP", "剧场版"].forEach(
//   (input) => {
//     const i = new EpisodeSort(input);
//     console.log(i, i.isNormal, i.isPartial, i.number, i.raw, i.toString());
//   }
// );
