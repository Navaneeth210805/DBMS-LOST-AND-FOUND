This is a Lost And Found Platform which was made as a part of the DBMS course program. The platform aims at providing a UI friendly interface for students of IIITDM to effortlessly post lost and found items and communicate with each other to give/retrieve the items.
To get started with this on your local system :

1. Download MongoDB community edition as Service from : https://www.mongodb.com/try/download/community
2. Download MongoDB Shell from : https://www.mongodb.com/try/download/shell
3. Download MongoDB Compass(GUI) from : https://www.mongodb.com/try/download/compass


Requirements/Commands to be downloaded/executed in client directory:
1. npm i
2. npm run dev (To start the development server)

Requirements/Commands to be downloaded/executed in server directory:
1. pip install flask
2. pip install flask_cors
3. pip install pymongo
4. python server.py (To run the flask server)
5. Go to MongoDB Atlas and generate a new MongoDB Collection. Copy the URI and use it in server.py (MongoClient(URI))and to connect to MongoDB Compass.


