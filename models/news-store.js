const dataStore = require("./data-store.js"); 
const dataStoreClient = dataStore.getDataStore(); 
const logger = require("../utils/logger.js"); 

const newsStore = { 
  async getAllNewsArticle() { 
    const query = 'SELECT * FROM project.news'; 
    try { 
      let result = await dataStoreClient.query(query); 
      return result.rows; 
    } catch (e) { 
      logger.error("Error fetching all news articles", e); 
    }
  },
  async deleteNewsArticle(id) {
    const query = 'delete from project.news where id=$1';
    try {
      await dataStoreClient.query(query, [id]);
    } catch(e) {
      logger.error("Error deleting news article", e);
    }
  },
  async addNewsArticle(id, title, description, title_img, content) {
    const query = 'insert into project.news(author, title, description, src_img, content) values($1, $2, $3, $4, $5)';
    try {
      await dataStoreClient.query(query, [id, title, description, title_img, content]);
    } catch(e) {
      logger.error("Error while adding new News Article", e);
    }
  }
}

module.exports = newsStore;