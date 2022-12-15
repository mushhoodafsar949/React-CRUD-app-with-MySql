import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";

class Twilio extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="container" style={{marginTop: "50px"}}>
<h1>Twilio</h1>
      </div>
    )
  }
}
export default Twilio;