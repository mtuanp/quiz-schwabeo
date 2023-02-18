import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.177.0/testing/asserts.ts";
import * as path from "https://deno.land/std@0.177.0/path/mod.ts";

import { collectCsvData } from "../lib/csvCollector.ts";

export const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));

Deno.test("testing collect csv, single file should work as expected", async () => {
  const csvData = await collectCsvData([`file://${mainModuleDir}/test.csv`]);
  assert(csvData.length === 4, "should have correct size");
  assertEquals(csvData[1], {
    speaker: "Bernhard Belling",
    topic: "Coal Subsidies",
    date: new Date("2012-11-05T00:00:00.000Z"),
    words: 1210,
  });
});

Deno.test("testing collect csv, multiple file should work as expected", async () => {
  const filePath = `file://${mainModuleDir}/test.csv`;
  const csvData = await collectCsvData([filePath, filePath]);
  assert(csvData.length === 8, "should have correct size");
});
