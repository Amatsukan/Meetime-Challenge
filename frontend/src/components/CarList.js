import React, { Component } from 'react';
import { Col } from "react-flexbox-grid";
import { ListItemText, List, ListItem, Paper } from 'material-ui';

const fetch = require('node-fetch')

class CarList extends Component {

constructor() {
    super();
    this.state = {
      cars:[]
    }
  }

  componentDidMount(){
    fetch("http://localhost:4000/api/cars")
    .then(response => response.json() ).then(json=> {this.setstate({cars:json})} )
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
		<Col lg={12}>
	        <Paper>
            <List>
              {
                this.state.cars.map( 
                  car =>  
                    <ListItem button>
                      <ListItemText primary={car.model}/>
                    </ListItem>
                )
              }
            </List>
            <h4>{"Quantidade de carros cadastrados : "+this.state.cars.length}</h4>
	        </Paper>
	      </Col>      
    );
  }
};

export default CarList;
