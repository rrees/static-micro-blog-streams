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

  eleventyConfig.addCollection("topics", function(collectionAPI) {
    return collectionAPI.getAll().filter((item) => item.data.topic === true).sort(function(a, b) {
      return a.data.title.localeCompare(b.data.title);
    });
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

  // Filters
  eleventyConfig.addFilter('sortByLastModifiedDate', function(posts) {
    if (posts instanceof Array) {
      return posts.toSorted((a, b) => b.date - a.date).toReversed();
    }

    return posts;
  });

};
