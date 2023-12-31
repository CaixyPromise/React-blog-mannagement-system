import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom';
import {useNavigate, useLocation} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { ClearUserInfo } from "@/store/modules/user";


const GeekLayout = () => 
{
    const { Header, Sider } = Layout;
    const items = [
        {
          label: '首页',
          key: '/home',
          icon: <HomeOutlined />,
        },
        {
          label: '文章管理',
          key: '/article',
          icon: <DiffOutlined />,
        },
        {
          label: '创建文章',
          key: '/publish',
          icon: <EditOutlined />,
        },
      ]
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onMenuClick = (route) => 
    {
        console.log(route.key)
        navigate(route.key)
    }
    const LoginOutUser = () => 
    {
        dispatch(ClearUserInfo());
        navigate('/login');
    }
    
    const location = useLocation()
    const selectKey = location.pathname

    return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">柴柴老师</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={LoginOutUser}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            // defaultSelectedKeys={['/']}
            selectedKeys={selectKey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout