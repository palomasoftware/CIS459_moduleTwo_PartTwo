import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';
import { VOTING_ABI, VOTING_ADDRESS } from './config'

class App extends Component {
        state = { votes: '' }
        componentWillMount(){
                this.loadBlockchainData()
        }

        async loadBlockchainData(){
                const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-44-242-136-205.us-west-2.compute.amazonaws.com:8545"))
                var account;
                web3.eth.getAccounts().then((f) => {
                        account = f[0];
                })
                // MOD THIS TO READ DIRCTLY FROM BUILD DIRECTORY
//      let jsonData = require('../../build/contract/Voting.json')
		let jsonData = require('./Voting.json');
                console.log(jsonData.abi)
                console.log(jsonData.networks)

                const contract = new web3.eth.Contract(VOTING_ABI);
                contract.options.address = "0x8A0d3E8490550D3743BeAb5219BAfE75aeCaCbC3";
         contract.options.address = "0x8A0d3E8490550D3743BeAb5219BAfE75aeCaCbC3";


                const candidates = {"Johnny": "candidate-1", "Amber": "candidate-2"}

                //console.log("one") 
                await contract.methods.totalVotesFor(web3.utils.asciiToHex('Johnny')).call(console.log)
		//console.log("two")
                await contract.methods.voteForCandidate(web3.utils.asciiToHex('Johnny')).send({gas: 140000, from: '0xBE1BAF491970DD73e6099C70EE964AB8a3A40A62' });

		//console.log("three")


                await contract.methods.totalVotesFor(web3.utils.asciiToHex('Johnny')).call(console.log)


        }

render(){

        return (
        
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
        );
    }





}
export default App;
