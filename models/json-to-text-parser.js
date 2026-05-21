const { level } = require("winston");

const parser = {
    parse(article) {
        article = JSON.parse(article);
        const blocks = article.article_body || article.blocks;

        console.log(blocks);

        let content = "";
        let level = 0;
        let text = "";
        blocks.forEach(element => {
            console.log(element);
            switch (element.type) {
                case "paragraph":
                    text = element.text || element.data.text;
                    content += "<p>" + text + "</p>\n";
                    break;
                case "heading":
                    level = element.level || element.data.level;
                    text = element.text || element.data.text;
                    content += "<h" + level + ">" + text + "</h" + level + ">\n";
                    break;
                case "header":
                    level = element.level || element.data.level;
                    text = element.text || element.data.text;
                    content += "<h" + level + ">" + text + "</h" + level + ">\n";
                    break;
                case "image":
                    content += "<img src=" + element.url + " alt=" + element.caption + ">\n";
                    break;
                case "list":
                    if (element.style == "unsorted") {
                        content += "<ul>\n";
                    } else if (element.style == "sorted") {
                        content += "<ol>\n";
                    }
                    element.items.forEach(item => {
                        content += "<li>" + item + "</li>\n";
                    });
                    if (element.style == "unsorted") {
                        content += "</ul>\n";
                    } else if (element.style == "sorted") {
                        content += "</ol>\n";
                    }
            }
        });
        console.log(content);
        return content;
    }
}

module.exports = parser;