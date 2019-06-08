import React from 'react';
import {withRouter} from 'react-router-dom';
import { Spin, Descriptions, Card } from 'antd'
import { fetchDataGet } from '../support-functions/fetch'
import { get, startCase, omit } from 'lodash-es'

export default  withRouter(props => <MemberDetails {...props}/>)

class MemberDetails extends React.Component {
    state = {
       loading: false,
       details: {}
    }
    componentDidMount() {
        const memId = get(this.props, 'match.params.id', '')
        this.setState({ loading: true } , () => {
            fetchDataGet(`/api/loan/details?memId=${memId}`)
            .then(details => {
              this.setState({ loading: false, details: details })
            })
        })
    }
    render() {
        const { details } = this.state;
        if (this.state.loading) {
            return(<Spin/>)
        }
        return(
        <React.Fragment>    
            <Descriptions bordered title="Memeber Details" border >
            {Object.keys(omit(details, ['desc', 'id'])).map( e => <Descriptions.Item label={startCase(e)}>{get(details, e, '')}</Descriptions.Item>)}
            </Descriptions> 
            <Card title={startCase('description')}>
             {get(details, 'desc', '')}
            </Card>
           
        </React.Fragment>   
        )
    }
}