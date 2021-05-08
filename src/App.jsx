import React from 'react'
import logo from './logo.svg'
import './App.css'
import { FormHeader, FormContainer } from './components';
import { FormProvider } from './context';
import { Layout, Row, Col } from 'antd';
import 'antd/dist/antd.css';

function App() {
  const { Header, Content } = Layout;

  return (
    <div className="App">
      <Layout>
        <Header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </Header>
        <Content style={{ padding: '50px 0' }}>
          <FormProvider>
            <Row>
              <Col span={24}>
                <FormHeader />
              </Col>
              <Col span={24}>
                <FormContainer />
              </Col>
            </Row>
          </FormProvider>
        </Content>
      </Layout>
    </div>
  )
}

export default App
