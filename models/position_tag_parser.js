const logger = require("../utils/logger.js"); 
const positionTags = require("../public/src/profile/position_tags.json");

const positionTagParser = {
    positionTagParser(position) {
        logger.info("Parsing position tags for position");

        //if (position) {
        for (const p in position) {
            const positionTag = positionTags[position[p].position_group];
            console.log(positionTag);
            position[p].position_group_display = positionTag ? positionTag : "Unbekannt";
        }
        //}

        return position;
    }
}

module.exports = positionTagParser;