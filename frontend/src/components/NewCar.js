import React, { Component } from 'react';
import { Paper, FormControl, InputLabel, Select, MenuItem, TextField, Button } from 'material-ui';
import '../styles/Token.css';
import { Row, Col } from "react-flexbox-grid";

class NewCar extends Component {

  constructor(props, car){
    super(props)
    this.state = { colorsAvaliable:["preto", "branco","verde"], carOwner:"", carModel:"", carAge:0, carColor:"preto", pipedrive:{clients:[]} };
  }

  componentDidMount(){
   fetch("http://localhost:4000/api/clients").then(response => response.json()).then(json=>this.setstate({pipedrive:json}) ) 
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Paper>
        <form>
          <h1>Novo Carro:</h1>
            <FormControl fullWidth>
              <InputLabel htmlFor="carOwner">Responsável</InputLabel>

              <Select fullWidth
                value={this.state.carOwner}
                onChange={this.handleChange}
                inputProps={{
                  name: 'carOwner',
                  id: 'carOwner',
                }}
              >
                <MenuItem value="">
                    <em>{this.state.pipedrive.clients.length}</em>
                  </MenuItem>
                {
                  this.state.pipedrive.clients.map(client => <MenuItem value={client.id}> 1 </MenuItem>)
                }
              </Select>
              {/*
              <TextField  id="model" label="Modelo" value={this.state.carModel} onChange={this.handleChange}/>

              <Select fullWidth
                value={this.state.carColor}
                onChange={this.handleChange}
                inputProps={{
                  name: 'carColor',
                  id: 'carColor',
                }}
              >
              {
                //this.state.colorsAvaliable.map( function(color, index){ return (<MenuItem value={index}> {color} </MenuItem>) } )
              }
              </Select>
              <TextField
                id="carAge"
                label="Idade"
                value={this.state.carAge}
                onChange={this.handleChange}/>
              */}
          </FormControl>
            <Row end="xs">
                <Col lg={0}>
                  <Button variant="raised" color="primary" >cancelar</Button>
                </Col>
                <Col lgOffset={0}>
                  <Button variant="raised" color="primary" >salvar</Button>
                </Col>
            </Row>
        </form>
      </Paper> 
    );
  }
}

export default NewCar;
