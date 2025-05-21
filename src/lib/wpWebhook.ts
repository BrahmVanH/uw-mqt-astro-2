import TurndownService from "turndown";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function wpWebhook(wpContent: any) {
  const pages = wpContent?.pages?.nodes;

  let newPageQueue = [];

  const allCollectionEntryNames = import.meta.glob(
    [
      "@/content/**/static/*.md",
      "@/content/static/*.md",
      "@/content/**/**/static/*.md",
      "!@/content/config.ts",
    ],
    {
      eager: true,
    },
  );
  
  

  const page = pages[0];
  const slug = page?.slug;
  const title = page?.title;
  const content = page?.content;

  const turndownService = new TurndownService();

  const markdown = turndownService.turndown(content);
  const frontmatter = `---
                      title: ${title}
                      slug: ${slug}
                      description: 
                      ---
                      `;

  const fileContent = `${frontmatter}\n\n${markdown}`;

  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);

  const outputPath = path.join(
    currentDirPath,
    "../content/about/static/",
    `${slug}.md`,
  );
  // fs.writeFileSync(outputPath, fileContent);
}
