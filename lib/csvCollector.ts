import { CsvData } from "./types.ts";

export const collectCsvData = async (links: string[]): Promise<CsvData[]> => {
  const allData = await Promise.all(
    links.map((link) => {
      try {
        return new URL(link);
      } catch (error) {
        console.error("not an URL ", link, error);
      }
      return null;
    }).filter((url) => !!url).map((url) => getCsvData(url!)),
  );
  return allData.flatMap((csvData) => csvData);
};

const getCsvData = async (link: URL): Promise<CsvData[]> => {
  try {
    const response = await fetch(link);
    const data = await response.text();
    const lines = data.split("\n");
    return lines.slice(1).map((line) => {
      const cells = line.split(",").map((c) => c.trim());
      return {
        speaker: cells[0],
        topic: cells[1],
        date: new Date(cells[2]),
        words: Number(cells[3]),
      };
    });
  } catch (error) {
    console.error("can't get csv data ", link, error);
  }
  return [];
};
