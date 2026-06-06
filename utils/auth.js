const logger = require('./logger');

const auth = { 
    /* 
     * Some routes require an authenticated user. 
     * Use this function as protection. 
     */ 
    protectedUser(request, response, next) { 
        if (request.session.user) { 
            next(); 
        } else {
            logger.info("Unauthorized access attempt to protected route, redirecting to home page");
            response.redirect('/'); 
        }
    },
    
    protectedAdmin(request, response, next) {
        if (request.session.user && request.session.role === 'admin') { 
            next(); 
        } else {
            logger.info("Unauthorized access attempt to admin route, redirecting to home page");
            response.redirect('/'); 
        }
    }
} 
 
module.exports = auth;