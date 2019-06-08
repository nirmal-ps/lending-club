import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
// components
import LoginForm from './components/sign-up'
import { fetchDataGet } from './support-functions/fetch'
import LayOutWrapper from './components/layout'
import LoanTable from './components/loan-table'
import MemberDetails from './components/member-details'
import Topten from './components/top-ten'
import ChartWrapper from './components/bar-chart'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
    fetchDataGet('/api/test/').then(response => {
      console.log(response)
    })
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    fetchDataGet('/api/user/').then(response => {
      console.log('Get user response: ')
      console.log(response)
      if (response.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    const redirUrl = this.state.loggedIn ? '/' : '/login';
    return (
      <div >
   
       <Redirect
          exact={true}
          from="/"
          to={{ pathname: redirUrl }}
        />
        <Route
          exact path="/"
          render={() =>
            <LayOutWrapper
              updateUser={this.updateUser}
              render={() => <LoanTable/>}
            />}
        />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}

            />}
        />
        <Route
          path="/memberDetails/:id"
          render={() =>
            <LayOutWrapper
              updateUser={this.updateUser}
              render={() => <MemberDetails/>}
            />}
        />
        <Route
          path="/topTen"
          render={() =>
            <LayOutWrapper
            updateUser={this.updateUser}
            render={() => <Topten/>}
          />}
        />
        <Route
          path="/charts"
          render={() =>
            <LayOutWrapper
            updateUser={this.updateUser}
            render={() => <ChartWrapper/>}
          />}
        />
      </div>
    );
  }
}

export default App;