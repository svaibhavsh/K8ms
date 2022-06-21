
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8081


var MongoClient = require('mongodb').MongoClient

//mongodb connection string to hyperprotect db in IBM cloud
// var url = 'mongodb://admin:Techzoneusecase1$@dbaas229.hyperp-dbaas.cloud.ibm.com:30518/admin?&ssl=true&tlsCAFile=./cert.pem'

var url = 'mongodb://admin:Techzoneusecase1$@dbaas229.hyperp-dbaas.cloud.ibm.com:30032/admin?&ssl=true&tlsCAFile=./cert.pem'

// dbaas229.hyperp-dbaas.cloud.ibm.com:30570,dbaas230.hyperp-dbaas.cloud.ibm.com:30441,dbaas231.hyperp-dbaas.cloud.ibm.com:30679

app.use(cors());
// dbaas229.hyperp-dbaas.cloud.ibm.com:30518,dbaas230.hyperp-dbaas.cloud.ibm.com:30966,dbaas231.hyperp-dbaas.cloud.ibm.com:30043
//**If your db needs certificate, please add the file root directory****/
//cert.pem file is used for connection to hyperprotect mogodb




app.get('/', (req, res)=> {
    console.log('Welcome to DB API Default route');
    res.send ("Welcome to DB API MicroService Default route - use /k8api endpoint to read sample blog entries from the DB");
})

//api to get response from database 
app.get('/k8api', (req, res) => {
    console.log('DB K8API ROUTE:', url);
    MongoClient.connect(url,
        function (err, db) {
            if (err) throw err;
            console.log("MongoClient connect returned", err)
            var dbo = db.db("k8db");
            dbo.collection("k8dbcollection").findOne({}, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
                db.close();
            })

        });
})

app.get('*', (req, res)=> {
    console.log('Welcome to DB API Default route - No Match');
    res.send ("Welcome to DB API MicroService Default route - No Match - use /k8api endpoint to read sample blog entries from the DB");
})

app.listen(port, () => {
    console.log(`DB service app listening at http://localhost:${port}`)
})
