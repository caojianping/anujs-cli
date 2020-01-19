import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Link} from 'reach-router';
// import * as PropTypes from 'prop-types';

console.log('react:', React);
console.log('react-dom:', ReactDOM);
console.log('reach-router:', Router, Link);
console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('PropTypes:', PropTypes);

import App from './App';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
