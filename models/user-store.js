const dataStore = require("./data-store.js"); 
const dataStoreClient = dataStore.getDataStore(); 
const logger = require("../utils/logger.js"); 
const crypto = require("../models/crypto.js");
const cryptoLib = require("crypto");
 
const userStore = { 
    async addUser(user) { 
        const iv = cryptoLib.randomBytes(16);

        const query_account = 'INSERT INTO project.account (username, password, salt) VALUES($1, $2, $3) RETURNING id';
        const query_role = 'INSERT INTO project.role (id, role) VALUES($1, $2)';
        const query_member_data = 'INSERT INTO project.member_data VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)';
        const query_apply_status = 'INSERT INTO project.apply_status (user_id, status) VALUES($1, $2)';

        const {hash, salt} = crypto.hashPassword(user.postcode);

        const values_account = [user.firstname + "." + user.lastname, hash, salt];

        try { 
            let acc = await dataStoreClient.query(query_account, values_account);

            const values_role = [acc.rows[0].id, 'member'];
            await dataStoreClient.query(query_role, values_role);
            
            const values_member_data = [
                acc.rows[0].id, 
                user.lastname, 
                user.firstname, 
                crypto.encrypt(user.birthday, iv, process.env.CRYPTO_KEY),
                crypto.encrypt(user.address, iv, process.env.CRYPTO_KEY),
                crypto.encrypt(user.postcode, iv, process.env.CRYPTO_KEY),
                crypto.encrypt(user.city, iv, process.env.CRYPTO_KEY),
                user.phone, 
                user.handy, 
                user.mail, 
                crypto.encrypt(user.bank_firstname, iv, process.env.CRYPTO_KEY),
                crypto.encrypt(user.bank_lastname, iv, process.env.CRYPTO_KEY),
                crypto.encrypt(user.bank_address, iv, process.env.CRYPTO_KEY),
                crypto.encrypt(user.iban, iv, process.env.CRYPTO_KEY),
                crypto.encrypt(user.bic, iv, process.env.CRYPTO_KEY),
                crypto.encrypt(user.institut, iv, process.env.CRYPTO_KEY),
                user.department, 
                user.privacy, 
                user.newsletter,
                iv.toString('hex')];
            await dataStoreClient.query(query_member_data, values_member_data);

            const values_apply_status = [acc.rows[0].id, 0];
            await dataStoreClient.query(query_apply_status, values_apply_status);

            return user;
        } catch (e) { 
            logger.error("Error adding user", e);
            
            return undefined;
        } 
    },

    async authenticateUser(username, password) { 
        const query = 'SELECT * FROM project.account join project.role on project.account.id = project.role.id WHERE username=$1'; 
        const values = [username];
        try { 
            let dbRes = await dataStoreClient.query(query, values);
            console.log(dbRes.rows[0]);
            if (dbRes.rows[0] !== undefined) { 
                if (crypto.verifyPassword(password, dbRes.rows[0].password, dbRes.rows[0].salt)) {
                    return {id: dbRes.rows[0].id, username: dbRes.rows[0].username, role: dbRes.rows[0].role};
                }
                return undefined;
            } else { 
                return undefined; 
            } 
        } catch (e) { 
            console.log("Error authenticating user", e); 
        }
    },

    async getUserById(id) { 
        logger.info(`Getting user ${id}`); 
        const query = 'SELECT * FROM project.member_data join project.apply_status on project.member_data.id = project.apply_status.user_id WHERE project.member_data.id=$1';
        const values = [id]; 
        try { 
            let dbRes = await dataStoreClient.query(query, values); 
            logger.info(`Getting user ${dbRes.rows[0].username}`); 
            if (dbRes.rows[0] !== undefined) { 
                return {id: dbRes.rows[0].id, lastName: dbRes.rows[0].lastname, firstName: dbRes.rows[0].firstname, birthday: crypto.decrypt(dbRes.rows[0].birthday, dbRes.rows[0].iv, process.env.CRYPTO_KEY), address: crypto.decrypt(dbRes.rows[0].address, dbRes.rows[0].iv, process.env.CRYPTO_KEY), postcode: crypto.decrypt(dbRes.rows[0].postcode, dbRes.rows[0].iv, process.env.CRYPTO_KEY), city: crypto.decrypt(dbRes.rows[0].city, dbRes.rows[0].iv, process.env.CRYPTO_KEY), phone: dbRes.rows[0].phone, handy: dbRes.rows[0].handy, mail: dbRes.rows[0].mail, bankFirstName: crypto.decrypt(dbRes.rows[0].bank_firstname, dbRes.rows[0].iv, process.env.CRYPTO_KEY), bankLastName: crypto.decrypt(dbRes.rows[0].bank_lastname, dbRes.rows[0].iv, process.env.CRYPTO_KEY), bankAddress: crypto.decrypt(dbRes.rows[0].bank_address, dbRes.rows[0].iv, process.env.CRYPTO_KEY), iban: crypto.decrypt(dbRes.rows[0].iban, dbRes.rows[0].iv, process.env.CRYPTO_KEY), bic: crypto.decrypt(dbRes.rows[0].bic, dbRes.rows[0].iv, process.env.CRYPTO_KEY), institut: crypto.decrypt(dbRes.rows[0].institut, dbRes.rows[0].iv, process.env.CRYPTO_KEY), department: dbRes.rows[0].department, privacy: dbRes.rows[0].privacy, newsletter: dbRes.rows[0].newsletter, applyStatus: dbRes.rows[0].status}; 
            } else { 
                return undefined; 
            } 
        } catch (e) { 
            console.log("Error getting user", e); 
        } 
    },

    async getUserApplyStatus(id) {
        logger.info(`Getting user-apply-status ${id}`);
        const query = 'SELECT status FROM project.apply_status WHERE user_id=$1'; 
        const values = [id];
        try {
            let dbRes = await dataStoreClient.query(query, values); 
            if (dbRes.rows[0] !== undefined) { 
                return {status: dbRes.rows[0].status}; 
            } else { 
                return undefined; 
            } 
        } catch (e) { 
            console.log("Error getting apply-status", e); 
        }
    },

    async getAllUserApplys() {
        logger.info('Getting all user-new-applys');
        const query = 'SELECT user_id, project.member_data.firstname, project.member_data.lastname FROM project.apply_status join project.member_data on user_id = id where status=0';

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
        const query = 'SELECT user_id, project.member_data.firstname, project.member_data.lastname FROM project.apply_status join project.member_data on user_id = id where status=1';

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
            console.log("Error updating user status", e); 
        }
    },

    async updateUserProfile(userID, updatedData) {
        logger.info('Updating User ${userId}')

        const query_iv = 'SELECT iv FROM project.member_data WHERE id=$1';
        const values_iv = [userID];
        
        try {

            const dbRes = await dataStoreClient.query(query_iv, values_iv);

            const query_update = 'update project.member_data set lastname=$1, firstname=$2, birthday=$3, address=$4, postcode=$5, city=$6, phone=$7, handy=$8, mail=$9 where id=$10';
            const values_update = [updatedData.lastName, updatedData.firstName, crypto.encrypt(updatedData.birthday, Buffer.from(dbRes.rows[0].iv, 'hex'), process.env.CRYPTO_KEY), crypto.encrypt(updatedData.address, Buffer.from(dbRes.rows[0].iv, 'hex'), process.env.CRYPTO_KEY), crypto.encrypt(updatedData.postcode, Buffer.from(dbRes.rows[0].iv, 'hex'), process.env.CRYPTO_KEY), crypto.encrypt(updatedData.city, Buffer.from(dbRes.rows[0].iv, 'hex'), process.env.CRYPTO_KEY), updatedData.phone, updatedData.handy, updatedData.mail, userID];
           
            await dataStoreClient.query(query_update, values_update);
        } catch (e) {
            console.log("Error updating user profile", e); 
        }
    },

    async getTeams() {
        logger.info("Getting all Teams including staff");
        const queryG = 'SELECT * FROM project.personal join project.member_data on project.personal.id = project.member_data.id where position_group=\'G_Jugend\'';
        const queryF = 'SELECT * FROM project.personal join project.member_data on project.personal.id = project.member_data.id where position_group=\'F_Jugend\'';
        const queryE = 'SELECT * FROM project.personal join project.member_data on project.personal.id = project.member_data.id where position_group=\'E_Jugend\'';

        try {
            const G_Jugend = await dataStoreClient.query(queryG);
            const F_Jugend = await dataStoreClient.query(queryF);
            const E_Jugend = await dataStoreClient.query(queryE);

            let teams = {
                G_Jugend: G_Jugend.rows,
                F_Jugend: F_Jugend.rows,
                E_Jugend: E_Jugend.rows
            };

            console.log(teams);

            return teams;
        } catch (e) { 
            console.log("Error getting all Teams including staff", e); 
        }
    },

    async getUserPosition(userId) {
        logger.info('Getting User Position ${userId}');
        const query = 'SELECT position, replace(position_group, \'_\', \'-\') as position_group FROM project.personal where id=$1';
        const values = [userId];
        
        try {
            const dbRes = await dataStoreClient.query(query, values);
            if (dbRes.rows[0] !== undefined) { 
                return dbRes.rows;
            } else { 
                return undefined; 
            }
        } catch (e) {
            console.log("Error getting user position", e);
        }
    }
}; 
 
module.exports = userStore; 