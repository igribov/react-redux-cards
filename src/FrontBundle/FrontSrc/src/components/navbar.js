import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class Navbar extends Component {

  render() {
    const {links} = this.props;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            { _.map(links, link => <Link key={link.to} className="btn btn-primary" to={link.to}>{link.title}</Link>) }
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;