import React, { Component } from 'react';
import { Paper, FormControl, InputLabel, Select, MenuItem, TextField } from 'material-ui';
import '../styles/Token.css';

class editOrViewCar extends Component {

  constructor(car){
  	this.state = { 
  		colorsAvaliable:["preto", "branco","verde"], 
  		carOwner:car.personId, 
  		Id:car.carId, 
  		carModel:car.model, 
  		carAge:car.age, 
  		carColor:car.color, 
  		pipedriveClients:[] 
  	};
  }

  componentDidMount(){
    fetch("http://localhost:4000/api/car?id=")
    .then(response => response.json() )
    .then(json => {
          this.setState({ pipedriveClients : json.clients })
        })
      })
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
                    <em>{this.state.pipedriveClients.length}</em>
                  </MenuItem>
                {
                  this.state.pipedriveClients.map(client => <MenuItem value={client.id}> 1 </MenuItem>)
                }
              </Select>



              <TextField
                id="model"
                label="Modelo"
                value={this.state.carModel}
                onChange={this.handleChange}/>
              <Select fullWidth
                value={this.state.carColor}
                onChange={this.handleChange}
                inputProps={{
                  name: 'carColor',
                  id: 'carColor'
                }} />
              {
                //this.state.colorsAvaliable.map(function(color, index){<MenuItem value={index}> {color} </MenuItem>})
              }
              </Select>




              <TextField
                id="carAge"
                label="Idade"
                value={this.state.carAge}
                onChange={this.handleChange}
              />
          </FormControl>
        </form>
      </Paper> 
    );
  }
}

export default NewCar;
