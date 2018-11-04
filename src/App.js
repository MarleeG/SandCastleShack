import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

import './App.css';
import Header from './components/header/header';
import GuestCount from './components/guestCount/guestCount';
import GuestMembers from './components/guestMembers/guestMembers';
import MenuSelection from './components/menuSelection/menuSelection';
import Total from './components/total/total';

class App extends Component {
  constructor(props) {
    super(props);

    this.partyTotalAccounted = this.partyTotalAccounted.bind(this);
    this.attendingMembers = this.attendingMembers.bind(this);
    this.getTotal = this.getTotal.bind(this);

    this.state = {
      totalGuests: '',
      guestMembersAppear: false,
      menuSelectionAppear: false,
      attendingMembers: undefined,
      totalAppear: false,
      total: 0
    }

  }

  attendingMembers(data){
    this.setState({
      attendingMembers: data,
      menuSelectionAppear: true
    });
  }

  partyTotalAccounted(totalGuests) {
    this.setState({
      totalGuests,
      guestMembersAppear: true
    })
  }

  getTotal(total_amount){
    this.setState({
      total: total_amount,
      totalAppear: true
    });
  }


  render() {
    return (
      <div style={STYLES.containerBody}>
        <Header />

        <Grid className='text-center content mt-0'>
          <Row className="show-grid">
            <Col sm={6} md={3}>
              < GuestCount totalGuests={this.partyTotalAccounted} />
              <br />
            </Col>
            <Col sm={6} md={3}>
              < GuestMembers attendingMembers={this.attendingMembers}totalAccountedGuests={this.state.totalGuests} appear={this.state.guestMembersAppear} />
              <br />
            </Col>
            <Col sm={6} md={3}>
              < MenuSelection getTotal={total => this.getTotal(total)} attendingMembers={this.state.attendingMembers} appear={this.state.menuSelectionAppear}/>
              <br />
            </Col>
            <Col sm={6} md={3}>
              <Total appear={this.state.totalAppear} total={this.state.total}/>
              <br />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const STYLES = {
  containerBody: {
    height: '500px'
  }
}

export default App;
