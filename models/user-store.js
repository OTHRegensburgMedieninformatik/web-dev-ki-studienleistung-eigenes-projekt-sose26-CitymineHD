const dataStore = require("./data-store.js"); 
const dataStoreClient = dataStore.getDataStore(); 
const logger = require("../utils/logger.js"); 
const { log } = require("winston");
 
const userStore = { 
    async addUser(user) { 
        const query_account = 'INSERT INTO project.account (username, password) VALUES($1, $2) RETURNING id';
        const query_role = 'INSERT INTO project.role (id, role) VALUES($1, $2)';
        const query_member_data = 'INSERT INTO project.member_data VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)';
        const query_apply_status = 'INSERT INTO project.apply_status (user_id, status) VALUES($1, $2)';
        const values_account = [user.firstname + "." + user.lastname, user.postcode];
        try { 
            let acc = await dataStoreClient.query(query_account, values_account);

            const values_role = [acc.rows[0].id, 'member'];
            await dataStoreClient.query(query_role, values_role);
            
            const values_member_data = [acc.rows[0].id, user.lastname, user.firstname, user.birthday, user.address, user.postcode, user.city, user.phone, user.handy, user.mail, user.bank_firstname, user.lastname, user.bank_address, user.iban, user.bic, user.institut, user.department, user.privacy, user.newsletter];
            await dataStoreClient.query(query_member_data, values_member_data);

            const values_apply_status = [acc.rows[0].id, 0];
            await dataStoreClient.query(query_apply_status, values_apply_status);
        } catch (e) { 
            logger.error("Error adding user", e); 
        } 
    },

    async authenticateUser(username, password) { 
        const query = 'SELECT * FROM project.account join project.role on project.account.id = project.role.id WHERE username=$1 AND password=$2'; 
        const values = [username, password];
        try { 
            let dbRes = await dataStoreClient.query(query, values); 
            if (dbRes.rows[0] !== undefined) { 
                return {id: dbRes.rows[0].id, username: username, role: dbRes.rows[0].role}; 
            } else { 
                return undefined; 
            } 
        } catch (e) { 
            console.log("Error authenticating user", e); 
        }
    },

    async getUserById(id) { 
        logger.info(`Getting user ${id}`); 
        const query = 'SELECT * FROM project.member_data WHERE id=$1';
        const values = [id]; 
        try { 
            let dbRes = await dataStoreClient.query(query, values); 
            logger.info(`Getting user ${dbRes.rows[0].username}`); 
            if (dbRes.rows[0] !== undefined) { 
                return {id: dbRes.rows[0].id, lastName: dbRes.rows[0].lastname, firstName: dbRes.rows[0].firstname, birthday: dbRes.rows[0].birthday, address: dbRes.rows[0].address, postcode: dbRes.rows[0].postcode, city: dbRes.rows[0].city, phone: dbRes.rows[0].phone, handy: dbRes.rows[0].handy, mail: dbRes.rows[0].mail, bankFirstName: dbRes.rows[0].bank_firstname, bankLastName: dbRes.rows[0].bank_lastname, bankAddress: dbRes.rows[0].bank_address, iban: dbRes.rows[0].iban, bic: dbRes.rows[0].bic, institut: dbRes.rows[0].institut, department: dbRes.rows[0].department, privacy: dbRes.rows[0].privacy, newsletter: dbRes.rows[0].newsletter}; 
            } else { 
                return undefined; 
            } 
        } catch (e) { 
            console.log("Error getting user", e); 
        } 
    },

    async getUserApplyStatus(id) {
        logger.info(`Getting user-apply-status ${id}`);
        const query = 'SELECT * FROM project.apply_status WHERE user_id=$1'; 
        const values = [id]; 
        try { 
            let dbRes = await dataStoreClient.query(query, values); 
            if (dbRes.rows[0] !== undefined) { 
                return {id: dbRes.rows[0].id, status: dbRes.rows[0].status}; 
            } else { 
                return undefined; 
            } 
        } catch (e) { 
            console.log("Error getting apply-status", e); 
        }
    },

    async getAllUserApplys() {
        logger.info('Getting all user-new-applys');
        const query = 'SELECT * FROM project.apply_status join project.member_data on user_id = id where status=0';

        try {
            let dbRes = await dataStoreClient.query(query); 
            if (dbRes.rows[0] !== undefined) { 
                return dbRes.rows;
            } else { 
                return undefined; 
            }
        } catch (e) { 
            console.log("Error getting apply-status", e); 
        }
    },

    async getAllUsers() {
        logger.info('Getting all Users');
        const query = 'SELECT * FROM project.apply_status join project.member_data on user_id = id where status=1';

        try {
            let dbRes = await dataStoreClient.query(query); 
            if (dbRes.rows[0] !== undefined) { 
                return dbRes.rows;
            } else { 
                return undefined; 
            }
        } catch (e) { 
            console.log("Error getting apply-status", e); 
        }
    },
    
    async updateUserStatus(userId, newStatus) {
        logger.info('Updating User ${userId}');
        const query = 'update project.apply_status set status=$1 where user_id=$2';
        const values = [newStatus, userId];

        try {
            await dataStoreClient.query(query, values)
        } catch (e) { 
            console.log("Error getting apply-status", e); 
        }
    },

    async updateUserProfile(userID, updatedData) {
        logger.info('Updating User ${userId}')
        const query = 'update project.member_data set lastname=$1, firstname=$2, birthday=$3, address=$4, postcode=$5, city=$6, phone=$7, handy=$8, mail=$9 where id=$10';
        const values = [updatedData.lastName, updatedData.firstName, updatedData.birthday, updatedData.address, updatedData.postcode, updatedData.city, updatedData.phone, updatedData.handy, updatedData.mail, userID];

        try {
            await dataStoreClient.query(query, values)
        } catch (e) {
            console.log("Error getting apply-status", e); 
        }
    }
}; 
 
module.exports = userStore; 