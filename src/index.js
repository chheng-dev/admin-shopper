import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css'
import "./shared/sass/App.scss";
import "./shared/sass/custom.scss";
import './shared/sass/index.scss';
import './shared/sass/overrides.scss';
import './shared/sass/variables.scss';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


