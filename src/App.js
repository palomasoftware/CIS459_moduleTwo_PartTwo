import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';
import { VOTING_ABI, VOTING_ADDRESS } from './config'
//import votingArtifact from "../../build/contracts/Voting.json";
import fs from "fs"; 
//1.) start ganache (include new DNS)
//2.) update truffle-config wtih dns
//2.) deploy contract
//3.) copy over new Voting
//4.) update DNS in DAPP
//5.) npm start

class App extends Component {
        state = { votes: '' }
        componentWillMount(){
                this.loadBlockchainData()
        }
 
	async loadBlockchainData(){

            const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-35-80-32-53.us-west-2.compute.amazonaws.com:8545"))

	    this.setState( { web3 } )
            var account;
		
            const accounts  = await web3.eth.getAccounts()
	    console.log(accounts)


		web3.eth.getAccounts().then((f) => {
                        account = f[0];
            })
	    console.log("account")
	    console.log(account)


	//just copy the json file to the src directory

                const networkId = await web3.eth.net.getId();
		console.log("networkId9");
		console.log(networkId);
     // const deployedNetwork = votingArtifact.networks[networkId];


                this.setState( { account : account }) 
                console.log(account);
		const fs = require('fs');

		let jsonData = require('./Voting.json');

                var networkKey =  Object.keys(jsonData['networks'])[Object.keys(jsonData.networks).length-1] 
		console.log(networkKey)	
		console.log(jsonData['networks'][networkKey]["address"] )
		
		console.log("get ID based solution")
		console.log(networkId)
		// error ? copy over the updated Voting.json from bulid/contract
		console.log(jsonData['networks'][networkId]["address"] )

		//const contract = new web3.eth.Contract(VOTING_ABI);
                const contract = new web3.eth.Contract(jsonData.abi); 
		contract.options.address = jsonData['networks'][networkId]["address"]
		this.setState( { contract }) 

                const candidates = {"Johnny": "candidate-1", "Amber": "candidate-2", "noneOfAbove": "candidate-3"}

                await contract.methods.totalVotesFor(web3.utils.asciiToHex('Johnny')).call(console.log)

                let number = await contract.methods.totalVotesFor(web3.utils.asciiToHex('Johnny')).call(console.log)
		this.setState( { johnnyVote : parseInt(number) } )

                number = await contract.methods.totalVotesFor(web3.utils.asciiToHex('Amber')).call(console.log)
                this.setState( { amberVote : parseInt(number) } )


                number = await contract.methods.totalVotesFor(web3.utils.asciiToHex('noneOfAbove')).call(console.log)
                this.setState( { noneOfAboveVote : parseInt(number) } )



        }

  constructor(props){
	  	super(props)
	  	this.state = {
			account: '',
			johnnyVote: 0,
			amberVote: 0,
	   	        noneOfAboveVote: 0,	
			loading: true
			//data: todoList   // new portion

		}

	console.log("constructor")

  this.vote = this.vote.bind(this)
  this.vote2 = this.vote2.bind(this)
  this.vote3 = this.vote3.bind(this)


  }
 vote =()=> { 
	
	var identity = 'Johnny'

	 this.state.contract.methods.voteForCandidate(this.state.web3.utils.asciiToHex(identity)).send({gas: 140000, from: this.state.account });
        console.log("voteFor (Johnny) Candidate")
	var count = this.state.contract.methods.totalVotesFor(this.state.web3.utils.asciiToHex('Johnny')).call();	
	console.log('just before the count')
	console.log(count.toString)
 	var num = count.toString
	console.log(num)
	this.setState( (prevState) => ({  johnnyVote: prevState.johnnyVote + 1})); 
var b;
 var count2 = this.state.contract.methods.totalVotesFor(this.state.web3.utils.asciiToHex('Johnny')).call().then(function (f) { b = f});
console.log(count2)

     const output2 =    this.state.contract.methods.totalVotesFor(this.state.web3.utils.asciiToHex('Johnny')).call()
                console.log(output2)


 }

 vote2 =()=> {

         var identity = 'Amber'

         this.state.contract.methods.voteForCandidate(this.state.web3.utils.asciiToHex(identity)).send({gas: 140000, from: this.state.account });
        console.log("voteFor amber Candidate")
        var count = this.state.contract.methods.totalVotesFor(this.state.web3.utils.asciiToHex('Amber')).call();     
        console.log('just before the count')
        console.log(count.toString)
        var num = count.toString
        console.log(num)
        this.setState( (prevState) => ({  amberVote: prevState.amberVote + 1}));

 }




	 vote3 =()=> {

        var identity = 'noneOfAbove'
        this.state.contract.methods.voteForCandidate(this.state.web3.utils.asciiToHex(identity)).send({gas: 140000, from: this.state.account });
        console.log("voteForCandidate")
        var count = this.state.contract.methods.totalVotesFor(this.state.web3.utils.asciiToHex('noneOfAbove')).call();
        console.log('just before the count')
        console.log(count.toString)
        var num = count.toString
        console.log(num)
        this.setState( (prevState) => ({  noneOfAboveVote: prevState.noneOfAboveVote + 1}));
        }



render(){

        return (
            <>
                <div>
                    <button onClick={this.vote}> Johnny Count </button>
                    <button onClick={this.vote2}> Amber Count</button>
                    <button onClick={this.vote3}> noneOfAbove Count</button>

		</div>
                <h5>Johnny count: {this.state.johnnyVote}</h5>
                <h5>Amber count: {this.state.amberVote}</h5>
                <h5>noneOfAbove count: {this.state.noneOfAboveVote}</h5>

		</>
        );
    }



}

export default App;
