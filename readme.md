###demo eindresultaat
* https://vp-books.herokuapp.com/
* login with vera/vera, marie/password, admin/admin
* ... or signup to register as a new user 
  
###you need: 
  * server: java 1.17 (on PATH) 
  * frontend: node (v16.17.0) and npm (8.15.1) (on PATH)
  * import this repo in intellij (as maven project)
  * repo contains server (in .) and client (in ./src/main/frontend)    

###server
* start server 
  * in intellij --> BookserverApplication start 
  * or in cmd on dir bookserver:   
      ```
      ./mvnw package
      java  -jar target\bookserver-0.0.1-SNAPSHOT.jar be.thomasmore.bookserver.BookserverApplication
      ```
* try out: 
  * api GET request in browser: **GET http://localhost:8080/api/books**
  * api doc: http://localhost:8080/swagger-ui/index.html 
  * h2-in-mem-db: http://localhost:8080/h2-console/
      * jdbc url: jdbc:h2:mem:books
      * username: sa, no pw
  * postman: 
      * import collection Books.postman_collection.json
      * or... import swagger-doc in postman: http://localhost:8080/v2/api-docs
      * post/put/delete:
        * csrf-protection
        * copy value van XSRF-TOKEN Cookie in de Header X-XSRF-TOKEN
        * this is now done automatically in this collection - you only have to create an environment first (eg dev)
  * client is served by server 
      * on index.html:  http://localhost:8080/
      * but you must do (at least) a "maven compile" first to make this work
      
###client
* start client 
  * in intellij
  * or in cmd on dir bookserver/src/main/frontend: 
      ```
          npm run start 
      ```
* try out: http://localhost:3000
* (or with ip)   
* login with vera/vera, marie/password, admin/admin
* ... or signup to register as a new user 
  