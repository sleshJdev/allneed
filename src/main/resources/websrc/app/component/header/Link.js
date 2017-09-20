import React from 'react';

export default ({href, children}) => (
    <li className="navbar-btn">
        <a className="navbar-link" href={'#' + href}>
            {children}
        </a>
    </li>
);