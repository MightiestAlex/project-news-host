\c nc_news_test

DROP TABLE IF EXISTS comment_counter;
CREATE TABLE comment_counter;

--(author, title, article_id, topic, created_at, votes, article_img_url)

--SELECT author, COUNT(author) AS comment_count
--FROM articles
--GROUP BY author 
--HAVING COUNT(author) > 1

SELECT author, COUNT(author) AS comment_count
FROM articles
GROUP BY author 
HAVING COUNT(author) > 1

FULL OUTER JOIN articles

;




--ORDER BY created_at DESC;



