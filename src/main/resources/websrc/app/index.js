import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app/app.component';

import 'jquery'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

ReactDom.render(<App/>, document.getElementById('app'));

