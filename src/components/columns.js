import React from 'react';
import { Popover } from 'antd';
import { Link } from 'react-router-dom'


export function getColumns() {
    const columns  =  [
        {
          title: 'Member Id',
          dataIndex: 'member_id',
          key: 'member_id',
          fixed: 'left',
          render: (text) => {
          const link = `/memberDetails/${text}`
          return(<Link to={link}>{text}</Link>)
        }
        },
        {
            title: 'Title',
            dataIndex: 'emp_title',
            key: 'emp_title',
            fixed: 'left',
        },
        {
          title: 'Loan Amount',
          dataIndex: 'loan_amnt',
          key: 'loan_amnt',

        },
        {
          title: 'funded_amnt_inv',
          dataIndex: 'funded_amnt_inv',
          key: 'funded_amnt_inv',
        },
        {
            title: 'term',
            dataIndex: 'term',
            key: 'term',
          },
          {
            title: 'int_rate',
            dataIndex: 'int_rate',
            key: 'int_rate',
          },
          {
            title: 'installment',
            dataIndex: 'installment',
            key: 'installment',
          },
          {
            title: 'grade',
            dataIndex: 'grade',
            key: 'grade',
          },
          {
            title: 'emp_length',
            dataIndex: 'emp_length',
            key: 'emp_length',
          },
          {
            title: 'home_ownership',
            dataIndex: 'home_ownership',
            key: 'home_ownership',
          },
          {
            title: 'annual_inc',
            dataIndex: 'annual_inc',
            key: 'annual_inc',
          },
          {
            title: 'verification_status',
            dataIndex: 'verification_status',
            key: 'verification_status',
          },
          {
            title: 'issue_d',
            dataIndex: 'issue_d',
            key: 'issue_d',
          },
          {
            title: 'loan_status',
            dataIndex: 'loan_status',
            key: 'loan_status',
          },
          


          {
            title: 'desc',
            dataIndex: 'desc',
            key: 'desc',
            width: 200,
            render(text) {
                if ( !text ) {
                    return text;
                }
                const header = text.split(' ').slice(0,5).join(' ');
                const content = (
                    <div>
                      {text}
                    </div>
                  );
                return(<Popover content={content}  trigger="hover">
                <a>{header}</a>
              </Popover>)  
            } 
          },
          {
            title: 'purpose',
            dataIndex: 'purpose',
            key: 'purpose',
          },
          {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'addr_state',
            dataIndex: 'addr_state',
            key: 'addr_state',
          },
          {
            title: 'last_pymnt_d',
            dataIndex: 'last_pymnt_d',
            key: 'last_pymnt_d',
          },
          {
            title: 'last_pymnt_amnt',
            dataIndex: 'last_pymnt_amnt',
            key: 'last_pymnt_amnt',
          },
        ]
        return columns.map( e => {
            return { ...e , title: e.title.replace(/(\w)(\w*)/g, function (_, i, r) {
                return i.toUpperCase() + (r != null ? r : "");
              }
            )}
        })
}



