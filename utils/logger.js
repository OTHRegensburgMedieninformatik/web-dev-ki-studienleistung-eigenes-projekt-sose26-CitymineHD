const winston = require("winston");

const logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
          winston.format.label({ label: "PSC" }),
          // winston.format.timestamp(),
          winston.format.prettyPrint()
      ),
      transports: [
        new winston.transports.Console(),
      ],
    }
);

module.exports = logger;