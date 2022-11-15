const app = require("./app");
const envConfig = require("./config");
const FirebaseContainer =require('./models/containers/firebase.container')
const MongoContainer= require('./models/containers/mongo.container')



const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  if(!["memory", "firebase"].includes(envConfig.DATASOURCE) || ''){
    MongoContainer.connect().then(()=>{
      console.log("Connected to " + envConfig.DATASOURCE);
    })
  }
    console.log(`Server is up and running on port: `, PORT);
});
