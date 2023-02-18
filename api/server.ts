import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

import { collectCsvData } from "../lib/csvCollector.ts";
import { findPoliticalSpeeches } from "../lib/csvProcessor.ts";

const CSV_ROUTE = new URLPattern({
  pathname: "/evaluation",
  search: "url=:urls",
});

const handler = async ({ method, url }: Request): Promise<Response> => {
  const match = CSV_ROUTE.exec(url);
  if (method === "GET" && match) {
    const { searchParams } = new URL(url);
    const urls = searchParams.getAll("url").filter((link) =>
      link.startsWith("http") || link.startsWith("https")
    );
    if (urls.length) {
      const csvData = await collectCsvData(urls);
      return Response.json(findPoliticalSpeeches(csvData));
    }
    return Response.json({
      mostSpeeches: null,
      mostSecurity: null,
      leastWordy: null,
    });
  }
  return new Response("Not supported", {
    status: 404,
  });
};

serve(handler);
