# deel-backend-task

1. How to run:

npm install

node index.js

2. Register route:

POST http://localhost:8080/api/registerRoute


Body (sample) :

{
"method":"GET",
"routePath":"/api/testRoute",
"middlewares":["ms1","ms2","ms3"]
}

middlewares ms1, ms2, ms3 (samples) are included in routes folder

3. Run registered route (in 2)

GET http://localhost:8080/api/testRoute