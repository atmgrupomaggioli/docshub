import type { APIContext } from "astro";
import { getEntry } from "astro:content";

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import fs from "fs/promises";
import path from "path";

import DocumentOGTemplate from "@/og-image/documentOg";

export const prerender = false;

export async function GET(context: APIContext) {
  const { document } = context.params;
  // URL
  const url = new URL(context.request.url);

  if (!document) {
    return new Response("⚠️ [slug]/og.png.ts - No slug provided.", {
      status: 400,
    });
  }

  const documentData = await getEntry("docs", document);

  if (!documentData) {
    return new Response("⚠️ [slug]/og.png.ts - No document found.", {
      status: 404,
    });
  }

  const svg = await satori(
    DocumentOGTemplate({
      document: documentData,
      imgSrc: url.origin,
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "InterDisplay-Regular",
          style: "normal",
          data: await fs.readFile(
            path.join(process.cwd(), "src/og-image/InterDisplay-Regular.ttf"),
          ),
        },
        {
          name: "InterDisplay-SemiBold",
          style: "normal",
          data: await fs.readFile(
            path.join(process.cwd(), "src/og-image/InterDisplay-SemiBold.ttf"),
          ),
        },
        {
          name: "InterDisplay-ExtraBold",
          style: "normal",
          data: await fs.readFile(
            path.join(process.cwd(), "src/og-image/Inter-ExtraBold.ttf"),
          ),
        },
      ],
    },
  );

  const resvgInstance = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const image = await resvgInstance.render();

  return new Response(image.asPng());
}
