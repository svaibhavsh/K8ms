const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 8082;

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

//using cors to avoid cross origin request error in browser
app.use(cors())

//connecting to watson on IBM cloud
const assistant = new AssistantV2({
    version: '2021-11-27',
    authenticator: new IamAuthenticator({
        apikey: 'DI8TS9Oj8WJjBMWunr19QEB-fX-Gxy8Oa3HG1DYTe2UX',
    }),
    serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com',
});


app.get('/', (req, res)=> {
    console.log('Welcome to Watson API Default route');
    res.send ("Welcome to Watson API MicroService Default route - use /watson endpoint to get sample hello response from the connected Watson Skill");
})

// api to get the response from watson for hello input
app.get('/watson', (req, res) => {
    assistant.messageStateless({
        assistantId: '98dd026c-e51d-4de7-ad82-c8e30d74bc55',
        input: {
            'message_type': 'text',
            'text': 'Hello',
        }
    })
        .then(result => {
            res.json(result.result);
        })
        .catch(err => {
            console.log(err);
        });
})

app.get('*', (req, res)=> {
    console.log('Welcome to Watson API - No Match');
    res.send ("Watson API MicroService No route matched - use /watson endpoint to get sample hello response from the connected Watson Skill");
})

app.listen(port, () => {
    console.log(`Watson service listening at http://localhost:${port}`)
})
