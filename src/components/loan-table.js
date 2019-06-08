import React from 'react';
import { Table, Input } from 'antd';
import { getColumns } from './columns'
import { fetchDataGet} from '../support-functions/fetch'
const Search = Input.Search;

export default class Loantable extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            tableData: [],
            pagination : { total: 0, position: 'both'},
            memberSearchText: '',
        }
    }
    componentDidMount() {
        this.fetchData(0, 10, '')
    }
    fetchData = (page , count, memberText = '') => {
      const { pagination } = this.state  
      this.setState({ loading: true, tableData: []} , () => {
          fetchDataGet(`/api/loan?page=${page}&count=${count}`, { params: {
            memberIdText: memberText
          }})
          .then((data) => {
             
             this.setState({ tableData: data.data, 
                loading: false, 
                pagination: { ...pagination, total: parseInt(data.count)  } })
          })
      })
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        } , () => {
            this.fetchData(pager.current - 1, 10, this.state.memberSearchText);
        });
        
      };
    
    handleSearch = (value) => {
      const {pagination} = this.state  
      this.setState({
        pagination: { ...pagination , current: 1},
        memberSearchText: value
       }, () => {
           this.fetchData(0,10,this.state.memberSearchText)
       })
    }

    render() {
        const { loading, tableData, pagination } = this.state
        
       const title = () =>(
           <span>
               <h2>Loan Details</h2>
               <Search
                style={{ width: '350px'}}
                size="small"
                placeholder="Input Member Id"
                enterButton="Search"
                size="large"
                onSearch={this.handleSearch}
                />
           </span>    
       )
        
        return(
            <Table 
                columns={getColumns()} 
                dataSource={tableData}
                title={title}
                bordered
                loading={loading}
                size="small"
                scroll={{ x: 2500 }}
                onChange = { this.handleTableChange}
                pagination = {pagination}
            />
        )
        
        
        
    }
}