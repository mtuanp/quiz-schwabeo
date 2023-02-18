import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import { findPoliticalSpeeches } from "../lib/csvProcessor.ts";

const CSV_DATA = [{
  "speaker": "Alexander Abel",
  "topic": "Education Policy",
  "date": new Date("2012-10-30T00:00:00.000Z"),
  "words": 5310,
}, {
  "speaker": "Bernhard Belling",
  "topic": "Coal Subsidies",
  "date": new Date("2012-11-05T00:00:00.000Z"),
  "words": 1210,
}, {
  "speaker": "Caesare Collins",
  "topic": "Coal Subsidies",
  "date": new Date("2012-11-06T00:00:00.000Z"),
  "words": 1119,
}, {
  "speaker": "Alexander Abel",
  "topic": "Internal Security",
  "date": new Date("2012-12-11T00:00:00.000Z"),
  "words": 911,
}];

Deno.test("testing process the csv data should work correctly", () => {
  const politicalData = findPoliticalSpeeches(CSV_DATA);
  assertEquals(politicalData, {
    "mostSpeeches": null,
    "mostSecurity": "Alexander Abel",
    "leastWordy": "Caesare Collins",
  });
});
