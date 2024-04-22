// AdminDashboard.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomLayout from "../components/LayoutComp";
import Home from "../pages/Home";

import Category from "../components/Category";
import CreateCategoryComp from "../components/category/CreateCategoryComp";
import EditCategoryComp from "../components/category/EditCategoryComp";


import ProductListComp from '../components/product/ProductListComp';
import CreateProductComp from '../components/product/CreateProductComp';

import CreateBrandComp from '../components/brand/CreateBrandComp';
import GetBrandListComp from '../components/brand/BrandListComp';
import EditBrandComp from '../components/brand/EditBrandComp';

import AuthService from '../services/AuthService';
import UserListComp from '../components/User/UserListComp';
import React, {useEffect, useState} from 'react';

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const adminData = await AuthService.fetchAdminData(token);
          setData(adminData);
        } else {
          console.error('Token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <CustomLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/category">
            <Route path='/category' exact component={Category} />
            <Route path="/category/create" component={CreateCategoryComp} />
            <Route path="/category/edit/:id" component={EditCategoryComp} />
          </Route>


          <Route path="/brand">
            <Route path='/brand' exact component={GetBrandListComp} />
            <Route path='/brand/create' exact component={CreateBrandComp} />
            <Route path="/brand/edit/:id" component={EditBrandComp} />
          </Route>

          <Route path="/product">
            <Route path='/product' exact component={ProductListComp} />
            <Route path='/product/create' exact component={CreateProductComp} />
            <Route path='/product/edit/:id' exact component={CreateProductComp} />
          </Route>

          <Route path='/setting/users'>
            <Route path='/setting/users' exact component={UserListComp} />
          </Route>

        </Switch>
      </CustomLayout>
    </Router>
  );
};

export default AdminPage;
