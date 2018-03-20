import React, { Component } from 'react';
import { Col } from "react-flexbox-grid";
import { TextField, Divider, Paper } from 'material-ui';
import '../styles/Token.css';

class Token extends Component {
  render() {
    return (
      <Col lg={12}>
        <Paper>
          <div id="token">
            <TextField fullWidth
              name="token"
              id="token"
              placeholder="Token do Pipedrive"
            />
          </div>
        </Paper>
        <Divider/>
      </Col>
    );
  }
}

export default Token;
