// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import CustomLayout from './components/LayoutComp';
// import Home from './pages/Home';
// import Category from './components/Category';
// import CreateCategoryComp from './components/category/CreateCategoryComp';
// import EditCategoryComp from './components/category/EditCategoryComp';

// import ProductListComp from './components/product/ProductListComp';
// import CreateProductComp from './components/product/CreateProductComp';

// import CreateBrandComp from './components/brand/CreateBrandComp';
// import GetBrandListComp from './components/brand/BrandListComp';
// import EditBrandComp from './components/brand/EditBrandComp';

// const App = () => {
//   return (
    // <Router>
    //   <CustomLayout>
    //     <Switch>
    //       <Route path="/" exact component={Home} />
    //       <Route path="/category">
    //         <Route path='/category' exact component={Category} />
    //         <Route path="/category/create" component={CreateCategoryComp} />
    //         <Route path="/category/edit/:id" component={EditCategoryComp} />
    //       </Route>


    //       <Route path="/brand">
    //         <Route path='/brand' exact component={GetBrandListComp} />
    //         <Route path='/brand/create' exact component={CreateBrandComp} />
    //         <Route path="/brand/edit/:id" component={EditBrandComp} />
    //       </Route>

    //       <Route path="/product">
    //         <Route path='/product' exact component={ProductListComp} />
    //         <Route path='/product/create' exact component={CreateProductComp} />
    //         <Route path='/product/edit/:id' exact component={CreateProductComp} />
    //       </Route>
    //     </Switch>
    //   </CustomLayout>
    // </Router>
//   );
// };

// export default App;

// App.js

import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import AdminPage from './pages/AdminPage';
import SignUpPage from './pages/SiginUpPage';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  // const isAuthenticated = !!localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <ProtectedRoute path="/admin" component={AdminPage} isAuthenticated={isAuthenticated} />
      </Switch>
    </Router>
  );
};

export default App;