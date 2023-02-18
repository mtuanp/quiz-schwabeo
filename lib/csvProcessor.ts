import {
  CsvData,
  PoliticalCriteriaCount,
  PoliticalCriteriaResult,
} from "./types.ts";

const SECURITY_TOPIC = "Internal Security";

export const findPoliticalSpeeches = (
  csvData: CsvData[],
): PoliticalCriteriaResult => {
  const dataMap = [...csvData.reduce((map, { speaker, date, topic, words }) => {
    const prevData = map.get(speaker);
    if (prevData) {
      map.set(speaker, {
        speechesCount: prevData.speechesCount + hasSpeeches2013(date),
        securityTopicCount: prevData.securityTopicCount +
          containsSecurity(topic),
        wordCount: prevData.wordCount + words,
      });
    } else {
      map.set(speaker, {
        speechesCount: hasSpeeches2013(date),
        wordCount: words,
        securityTopicCount: containsSecurity(topic),
      });
    }
    return new Map(map);
  }, new Map<string, PoliticalCriteriaCount>())];

  const leastWordy = dataMap
    .filter(([, { wordCount }]) => !!wordCount)
    .sort(([, { wordCount: prevWordCount }], [, { wordCount: actWordCount }]) =>
      prevWordCount - actWordCount
    )[0]?.[0] || null;

  const mostSecurity = dataMap
    .filter(([, { securityTopicCount }]) => !!securityTopicCount)
    .sort((
      [, { securityTopicCount: prevSecurityTopicCount }],
      [, { securityTopicCount: actSecurityTopicCount }],
    ) => prevSecurityTopicCount - actSecurityTopicCount)[0]?.[0] || null;

  const mostSpeeches = dataMap
    .filter(([, { speechesCount }]) => !!speechesCount)
    .sort((
      [, { speechesCount: prevSpeechesCount }],
      [, { speechesCount: actSpeechesCount }],
    ) => prevSpeechesCount - actSpeechesCount)[0]?.[0] || null;

  return {
    leastWordy,
    mostSecurity,
    mostSpeeches,
  };
};

const hasSpeeches2013 = (date: Date) => date.getFullYear() === 2013 ? 1 : 0;
const containsSecurity = (topic: string) => topic === SECURITY_TOPIC ? 1 : 0;
