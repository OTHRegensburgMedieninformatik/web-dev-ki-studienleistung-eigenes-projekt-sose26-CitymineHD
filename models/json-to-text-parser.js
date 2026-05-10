const parser = {
    parse(article) {
        article = JSON.parse(article);
        const blocks = article.article_body || article;

        let content = "";
        blocks.forEach(element => {
            switch (element.type) {
                case "paragraph":
                    content += "<p>" + element.text + "</p>\n";
                    break;
                case "heading":
                    content += "<h" + element.level + ">" + element.text + "</h" + element.level + ">\n";
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