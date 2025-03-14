import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory('src');
  eleventyConfig.addPassthroughCopy('src/**/*.css');

  // biome-ignore lint/complexity/useArrowFunction: <explanation>
  eleventyConfig.addCollection("allTags", function(collectionAPI) {
    const uniqueTags = new Set();

    for(const content of collectionAPI.getAll()) {
      const contentTags = content.data.tags;
      if(!contentTags)  {
        continue;
      }

      const tags = typeof contentTags === 'string' ? [contentTags] : contentTags;

      for(const tag of tags) {
        if(tag === 'all') {
          continue;
        }

        uniqueTags.add(tag);
      }
    }
    return Array.from(uniqueTags);
  });

  // Plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "feed.xml",
    collection: {
      name: 'post',
      limit: 0,
    },
    metadata: {
      language: "en",
      title: "Echo Forty",
      description: "Small personal blog posts",
      base: "https://rrees.github.io/static-micro-blog-streams/",
    },
  });
};


