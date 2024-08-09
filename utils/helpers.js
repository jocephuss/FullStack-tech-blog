module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  format_plural: (word, amount) => {
    // Pluralize words
    return amount !== 1 ? `${word}s` : word;
  },

  //   format_url: (url) => {
  //     // Shorten URL to display just the domain
  //     return url
  //       .replace("http://", "")
  //       .replace("https://", "")
  //       .replace("www.", "")
  //       .split("/")[0];
  //   },
};
