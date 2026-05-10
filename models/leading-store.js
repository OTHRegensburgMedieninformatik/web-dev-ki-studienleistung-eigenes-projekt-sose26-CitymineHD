const dataStore = require("./data-store.js"); 
const dataStoreClient = dataStore.getDataStore(); 
const logger = require("../utils/logger.js"); 

const leadingStore = { 
  async getAllLeadings() { 
    const query = 'SELECT * FROM project.member_data join project.personal on using(id) where position_group = \'Vorstandschaft\''; 
    try { 
      let result = await dataStoreClient.query(query); 
      return result.rows; 
    } catch (e) { 
      logger.error("Error fetching all playlists", e); 
    }
  },
  async getLeadingByPosition(position) {
    const query = 'SELECT * FROM project.display_personal join project.personal on project.personal.id = project.display_personal.personal_id where position = $1'; 
    try { 
      let result = await dataStoreClient.query(query, [position]); 
      return result.rows; 
    } catch (e) { 
      logger.error("Error fetching leading by position", e); 
    }
  }
}

module.exports = leadingStore;