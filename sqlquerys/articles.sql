\c nc_news_test


SELECT article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url
FROM   (SELECT COUNT(*) AS comment_count, article_id
        FROM (SELECT articles.title, articles.article_id, comments.comment_id 
                FROM   comments RIGHT JOIN articles
                    USING (article_id)) AS foo
        GROUP BY foo.article_id) AS goo
JOIN articles 
USING (article_id);        



