import React from 'react';
import { Card, Col, Row, List } from 'antd';
import { fetchDataGet } from '../support-functions/fetch'

export default class Topten extends React.Component {
    
    state = {
        topTenVerified: [],
        topTenNonVerified: [],
        loading: false
    }
    componentDidMount() {
        this.setState({ loading: true } , () => {
            fetchDataGet(`/api/loan/topTen`)
            .then(details => {
              this.setState({ loading: false, topTenVerified: details.topTenVerified, topTenNonVerified: details.topTenUnVerified })
            })
        })
    }
    render() {
        const { topTenVerified, topTenNonVerified, loading} = this.state
        return(

            <Card title="Top 10 Customers" loading={loading}>
                <Row gutter={16}>
                <Col span={12} bordered>
                    <Card title="Top 10 Verified Customers" bordered={false}>
                        <List
                            size='default'
                            bordered
                            dataSource={topTenVerified}
                            renderItem={item => <List.Item>
                                <List.Item.Meta
                                title={<a >{item.emp_title}</a>}
                                 description={item.member_id} />
                               <div>Loan Amount:&nbsp;{item.loan_amnt}</div>
                            </List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={12} bordered>
                    <Card title="Top 10 Non Verified Ustomers" bordered={false}>
                        <List
                                size='default'
                                bordered
                                dataSource={topTenNonVerified}
                                renderItem={item => <List.Item>
                                    <List.Item.Meta
                                    title={<a>{item.emp_title}</a>}
                                     description={item.member_id} />
                                   <div>Loan Amount:&nbsp;{item.loan_amnt}</div>
                                </List.Item>}
                            />
                    </Card>
                </Col>
                </Row>
            </Card>
        )
    }
}