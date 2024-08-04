import { bench, describe } from "vitest";
import main from "../src/index.ts";
import test_list from "./index.data.ts";

describe("index benchmark", () => {
  bench("index", () => {
    test_list.forEach((t) => {
      const r = main(t);
      console.log(`Testing ${t}`);
      console.log(r);
      console.log(r.episodeRange.toString());
      console.log(r.episodeRange.knownSorts);
      console.log("=============");
    });
  });
});
