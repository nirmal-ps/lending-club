import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Card } from 'antd'
import { fetchDataGet } from '../support-functions/fetch'

export default class BarChartWrapper extends PureComponent {
    state = {
        loading: false,
        details: []
     }
     componentDidMount() {
         this.setState({ loading: true } , () => {
             fetchDataGet(`/api/loan/topInterestPayers`)
             .then(details => {
               this.setState({ loading: false, details: details })
             })
         })
     }

  render() {
    const barData = this.state.details.map( e => {
        return {
            name: `${e.emp_title} - ${e.member_id}`,
            InterestAmount: (e.loan_amnt * e.int_rate)/100
        }
    })  
    return (
     <Card title="Top Interest Payers">
      <BarChart
        width={800}
        height={400}
        data={barData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="InterestAmount" fill="#82ca9d" />
      </BarChart>
     </Card> 
    );
  }
}
