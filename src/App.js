import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Card = (props) => {
  return (
    <div style={{margin: '1em'}}>
      <img width='75' src={props.image} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.hexValue}</div>
      </div>
    </div>
  )
}

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card {...card}/>)}
    </div>
  )
}

class Form extends React.Component {
  
  state = {
    userName : ''
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://www.thecolorapi.com/id?rgb=${this.state.userName}`)
      .then (resp => {
        this.props.onSubmitProp(resp.data);
        this.setState( { userName : ''})
      }) 
   }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          value={this.state.userName}
          onChange={(event) => this.setState({userName: event.target.value})}
          type="text" 
          placeholder="Enter Username" 
          required/>
        <button type="submit">Add Card</button>
      </form>
    )
  }
}

class App extends React.Component {
  
  state = {
        cards : []
  }
  
  addNewCard = (respData) => {
    let dataObj = {
      name : respData.name.value,
      image : respData.image.bare,
      hexValue : respData.hex.value
    }
    this.setState(prevState => ({
      cards: prevState.cards.concat(dataObj) 
    }))
  }
  
  render() {
    return (
      <div>
        <Form onSubmitProp={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    )
  }
}

export default App;
