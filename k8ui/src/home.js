import React from "react"

import axios from "axios"

import WatsonUI from "./watsonui"
import DbUI from "./dbui"

var NODE_IP = "169.51.203.79" // Kubernetes workker node external IP
var DB_NODE_PORT= "30081"; // DB Microserice container port
var WA_NODE_PORT= "30082"; // WA Microservice container port

class Home extends React.Component {

    state = {
        value: 'Hello 1',
        blog_id: 0,
        blog_body: '',
        blog_title: '',
        selectedOption: 'watson',
        watsonResponse: '',
        initialState: true
    }

    //handle change for textbox
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    //handle change for radio buttons
    handleOptionChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });
        this.setState({ blog_body: '', blog_title: '' })
        this.setState({ watsonResponse: '' })
    }
    //Calls DB microservice and assigns the response
    callDBService() {
        // var dburl = 'https://k8api-appreciative-reedbuck-bi.mybluemix.net/k8api';
        
        var dburl = "http://"+ NODE_IP + ":" + DB_NODE_PORT + "/k8api";
        // var dburl= "http://169.51.203.79:30081/k8api";
        // var dburl= "http://localhost:8081/k8api";
        console.log ("UI DB URL", dburl);
        axios.get(dburl).then((response) => {

            this.setState({
                blog_title: response.data.blog_title, blog_body: response.data.blog_body
            })
            console.log(response);
        })
    }
    //Calls watson microservice and assigns the response
    callWatsonService() {
        // var watsonurl = 'https://k8api-appreciative-reedbuck-bi.mybluemix.net/watson';
        // var watsonurl= "http://localhost:8082/watson";
        // var watsonurl= "http://169.51.203.79:30082/watson";
        var watsonurl = "http://"+ NODE_IP + ":" + WA_NODE_PORT + "/watson";
        console.log ("UI WA URL", watsonurl);
        axios.get(watsonurl).then((response) => {
            this.setState({
                watsonResponse: response
            })

        })
    }

    //Submit method called. Checks which option is selected
    //Calls the approriate function based on option selected
    handleSubmit = (event) => {

        if (this.state.selectedOption === 'watson') {
            this.callWatsonService();
        }
        else {
            this.callDBService()
        }
        this.setState({ initialState: false })
        event.preventDefault();
    }


    render() {

        // Conditionally rendering the UI components based on user selection
        let renderUI;
        if (this.state.selectedOption === 'watson' && this.state.initialState === false) {
            renderUI = <WatsonUI watsonResponse={this.state.watsonResponse} UsrRequest={this.state.value} />

        } else if (this.state.selectedOption === 'db') {
            renderUI = <DbUI blog_body={this.state.blog_body} blog_title={this.state.blog_title} />
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div>
                        <input type="radio" value="watson"
                            onChange={this.handleOptionChange}
                            checked={this.state.selectedOption === 'watson'} /> Invoke Watson Service
                        <input type="radio" value="db"
                            onChange={this.handleOptionChange}
                            checked={this.state.selectedOption === 'db'} /> Invoke DB Service
                    </div>
                    <div>

                        {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}

                        <input type="submit" value="Submit" />

                        {renderUI}
                    </div>

                </div>

            </form>

        )
    }
}

export default Home

