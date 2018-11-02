const fs = require("fs");
const siteOptions = require("./.scripts/_options.js").siteOptions;

function exists(path) {
  if (fs.existsSync(path)) return true;
  return false;
}

module.exports = function(eleventyConfig) {
  let urlPrefix = siteOptions.urlPrefix;

  // Usage: {% uppercase myVar %} where myVar has a value of "alice"
  // Usage: {% uppercase "alice" %}
  eleventyConfig.addLiquidTag("uppercase", function(liquidEngine) {
    return {
      parse: function(tagToken, remainingTokens) {
        this.str = tagToken.args; // myVar or "alice"
      },
      render: function(scope, hash) {
        // Resolve variables
        var str = liquidEngine.evalValue(this.str, scope); // "alice"
        // Do the uppercasing
        return Promise.resolve(str.toUpperCase()); // "ALICE"
      }
    };
  });

  /* Universal filters (Adds to Liquid, Nunjucks, and Handlebars) */
  // Usage: <script src="{{ '/dist/vendor.js' | url | cacheBuster}}"></script>
  eleventyConfig.addFilter("cacheBuster", function(value) {
    const date = new Date();
    const seconds = date.getSeconds() + 5; // add an additional 5 seconds to allow 11ty to process all files
    const minutes = seconds <= 50 ? date.getMinutes() : date.getMinutes() + 1;
    const dateTimeStamp = `${date.getMonth()}${date.getDate()}${date.getFullYear()}${date.getHours()}${minutes}`;
    return value + `?Rev=${dateTimeStamp}`;
  });

  // only content in the `posts/` directory
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/posts\//) !== null;
    });
  });

  eleventyConfig.addLayoutAlias("default", "layouts/default");

  // Must verify the directory exists to avoid errors
  let distDir = "11ty/dist";
  let imagesDir = "11ty/images";
  if (exists(distDir)) eleventyConfig.addPassthroughCopy(distDir);
  if (exists(imagesDir)) eleventyConfig.addPassthroughCopy(imagesDir);

  return {
    templateFormats: ["md", "njk", "html"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: urlPrefix,

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    // htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "11ty",
      includes: "_includes",
      data: "_data",
      output: "11ty/_site"
    }
  };
};
