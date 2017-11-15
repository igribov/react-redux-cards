import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

export default function (props) {
  const {links} = props;

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          { _.map(links, link => <Link
            key={link.to}
            className={link.className ? link.className : "btn btn-primary"}
            onClick={link.onClick}
            to={link.to}>{link.title}
          </Link>)
          }
        </div>
      </div>
    </nav>
  );
};