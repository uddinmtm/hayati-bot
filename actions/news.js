require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_TOKEN);
let newsCache = [];

const getHeadlines = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await newsapi.v2.everything({
        sources: 'the-verge,the-next-web,tech-crunch',
        language: 'en',
      });
      resolve(response.articles.map(item => item.url));
    } catch (e) {
      resolve(['lagi error nih kak']);
    }
  })
}

const getNews = async () => {
  return new Promise(async (resolve, reject) => {
    if (newsCache.length === 0) {
      newsCache = await getHeadlines();
    }

    const result = newsCache[0];
    newsCache.shift();
    resolve(result);
  })
}

module.exports = {
  getHeadlines,
  getNews,
}
