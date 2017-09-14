import React from 'react';
import {render} from 'react-dom';

import App from './components/app/app.component';

import 'jquery'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

render(<App/>, document.getElementById('app'));

