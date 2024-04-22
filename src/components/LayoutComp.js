import React from 'react';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { Link, useLocation, useHistory} from 'react-router-dom';
import SiderComp from './SiderComp';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const { Header, Content, Footer, Sider } = Layout;

const LayoutComp = ({ children }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const history = useHistory();

  const Breadcrumb = () => {
    return(
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb mt-4">
        <li className="breadcrumb-item">
          <Link to="/">HOME</Link>
        </li>
        {pathnames.length > 0 && (
          <>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              return (
                <li className={`breadcrumb-item text-uppercase ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : null} key={routeTo}>
                  {isLast ? (
                    name
                  ) : (
                    <Link to={routeTo}>{name}</Link>
                  )}
                </li>
              );
            })}
          </>
        )}
      </ol>
    </nav>

    )
  }

  const handleLogout = () =>{
    localStorage.removeItem('token');
    window.location.href = '/signin';
  }

  return (
    <Layout>
      <Header>
        <div className="d-flex justify-content-between align-items-center">
          <div className="demo-logo">
            <span className='text-white'>Logo</span>
          </div>
          <div>
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              menuVariant="dark"
              title={<Avatar src="https://w7.pngwing.com/pngs/646/829/png-transparent-avatar-man-ico-icon-cartoon-little-boy-avatar-cartoon-character-png-material-child-thumbnail.png" alt="Avatar" />}
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="">Password</NavDropdown.Item>
              <NavDropdown.Item href="/setting">Setting</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </div>
        </div>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        {Breadcrumb()}
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <SiderComp/>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  );
};

export default LayoutComp;
