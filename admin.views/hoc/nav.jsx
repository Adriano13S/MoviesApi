// eslint-disable-next-line no-unused-vars
const React = require('react');

const Nav = (props) =>{
  return(
    <div id='nav'>
      <div id='hello'>
        <h5>Hello {props.user}</h5>
      </div>
      <div id='home'>
        <a href={`/admin/users/${props.user}`}>
          <h5>Home</h5>
        </a>
      </div>
      <div id='logout'>
        <a href='/admin/logout'>
          <h5>Sign Out</h5>
        </a>
      </div>
    </div>
  );
};

module.exports = Nav;