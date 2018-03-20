import React, { Component } from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Button } from 'material-ui';
import { Route, Switch, Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title'

import Token from './Token';
import CarList from './CarList';
import NewCar from './NewCar';
//import editOrViewCar from './editOrViewCar';

const appName = "Desafio Meetime"

class App extends Component {
  render() {
    return (
      <DocumentTitle title={appName}>
      <Grid fluid>
        <Row>
          <Token/>
        </Row>
        <Row>
          <Col lg={4}>
            <Row end="xs">
                <Col lgOffset={0}>
                  <Button variant="raised" color="primary" component={ Link } to="/novo">Novo</Button>
                </Col>
            </Row>
            <Row>
              <CarList/>
            </Row>
          </Col>
          <Col lg={8}>
            <Switch>
              <Route path="/novo" component={ NewCar }/>
              {/*<Route path="/info/:id" component={ editOrViewCar }/>*/}
            </Switch>
          </Col>
        </Row>
      </Grid>
      </DocumentTitle>
    );
  }
}

export default App;
