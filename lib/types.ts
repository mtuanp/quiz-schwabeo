export type CsvData = {
  speaker: string;
  topic: string;
  date: Date;
  words: number;
};

export type PoliticalCriteriaCount = {
  speechesCount: number;
  securityTopicCount: number;
  wordCount: number;
};

export type PoliticalCriteriaResult = {
  mostSpeeches: string | null;
  mostSecurity: string | null;
  leastWordy: string | null;
};
