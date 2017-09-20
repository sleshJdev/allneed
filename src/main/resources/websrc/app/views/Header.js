import React from 'react';
import Link from "../component/header/Link";

export default () => (
    <nav className="navber navbar-default navbar-static-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar">asd</span>
                    <span className="icon-bar">qwe</span>
                    <span className="icon-bar">123</span>
                </button>
                <a className="navbar-brand" href="#">City Info</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    <li><a href="#/">Home</a></li>
                    <li><a href="#/settings">Settings</a></li>
                </ul>
            </div>
        </div>
    </nav>
);