import React from 'react';
import {  Menu, Space } from 'antd';
import { Link } from 'react-router-dom';
import { FaDesktop } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import { TbBrandDatabricks } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";


const { SubMenu } = Menu;



const SiderComp = () => {
  return (
    <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%' }}
  >
    <Menu.Item key="1">
        <Link to="/">
          <Space>
            <FaDesktop className='text-lg'/>
            <span>Dashboard</span>
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/category">
          <Space>
            <BiCategory className='text-lg'/>
            <span>Category</span>
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/brand">
          <Space>
            <TbBrandDatabricks className='text-lg'/>
            <span>Brand</span>
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/product">
          <Space>
            <TiShoppingCart className='text-lg'/>
            <span>Product</span>
          </Space>
        </Link>
      </Menu.Item>
      <Menu mode="inline" defaultSelectedKeys={['5']}>  
      <SubMenu key="5" icon={<IoSettings />} title="Setting">
        <Menu.Item key="5-1">
          <Link to="/setting/users">
            <Space>
              <span>User</span>
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Item key="5-2">
          <Link to="/setting/role">
            <Space>
              <span>Role</span>
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Item key="5-3">
          <Link to="/setting/permission">
            <Space>
              <span>Permission</span>
            </Space>
          </Link>
        </Menu.Item>
      </SubMenu>
  </Menu>
    </Menu>
  );
};

export default SiderComp;
