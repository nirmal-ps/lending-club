import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { fetchDataGet } from '../support-functions/fetch'
import { withRouter } from 'react-router-dom'
import './layout.css'

const { Header, Content, Footer, Sider } = Layout;



export default withRouter(class LayoutWrapper extends React.Component {
  state = {
    collapsed: false,
    keVal: '1'
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  handleMenuClick = (key) => {
    if (key.key === 'logout') {
      fetchDataGet('/api/user/logout/')
      .then(() => {
        this.props.updateUser({
            loggedIn: false,
            username: null
          })
      })
    }
    this.setState({ keVal: key.key}, () => this.props.history.push(keyToPath(key.key)) )
 }
  
  render() {
    
    return (
      <Layout style={{ minHeight: '100vh' }} id="lending-app">
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark"  mode="inline"  onClick={this.handleMenuClick}>
            <Menu.Item key="1">
            <Icon type="dollar" />
              <span>Loan Details</span>
            </Menu.Item>
            <Menu.Item key="2">
            <Icon type="caret-up" />
              <span>Top 10</span>
            </Menu.Item>
            <Menu.Item key="3">
            <Icon type="bar-chart" />
              <span>Top Payers</span>
            </Menu.Item>
            <Menu.Item key="logout">
            <Icon type="logout" />
              <span>Log out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, marginTop: '16px' }}>
              {this.props.render()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    );
  }
})

function keyToPath(key) {
  switch(key) {
      case "1": return ''
      case "2": return '/topTen'
      case "logout": return '/login'
      case "3": return '/charts'
      default: return ''
  }
}