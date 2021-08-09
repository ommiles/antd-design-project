import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import '../App.css';

export const Header = () => {
  const { Header } = Layout;
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className='logo' />
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['3']}>
        <Menu.Item key='1'>
          <HomeOutlined style={{ paddingRight: 10 }} />
          Home
        </Menu.Item>
        <Menu.Item key='2'>
          <UserOutlined style={{ paddingRight: 10 }} />
          Account
        </Menu.Item>
        <Menu.Item key='3'>Projects</Menu.Item>
        <Menu.Item key='4'>Signout</Menu.Item>
      </Menu>
    </Header>
  );
};
