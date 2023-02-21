What you will need to use this repo:

1) connection.js : To interface Node with both PostgreSQL databases

2) env.test,
   env.development
    : To set a process environment variable for the databases
    
   CLI example: 
   echo'PGDATABASE=database_test'>env.test
   
   echo 'PGDATABASE=database_news'>env.development

