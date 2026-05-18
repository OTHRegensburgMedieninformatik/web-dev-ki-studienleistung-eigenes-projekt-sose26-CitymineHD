const dataStore = require("./data-store.js"); 
const dataStoreClient = dataStore.getDataStore(); 
const logger = require("../utils/logger.js"); 

const contactStore = { 
    async getContactsByPositionGroup(positionGroup) {
        const query = 'SELECT * FROM project.member_data join project.personal on project.member_data.id = project.personal.id where position_group = $1'; 
        try { 
        let result = await dataStoreClient.query(query, [positionGroup]); 
        return result.rows; 
        } catch (e) { 
        logger.error("Error fetching leading by position", e); 
        }
    }
}

module.exports = contactStore;