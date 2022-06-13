// eslint-disable-next-line no-unused-vars
const React = require('react');
// eslint-disable-next-line no-unused-vars
const Nav = require('./nav');

const Layout = (props) =>{
  return(
    <html>
      <head>
        <link rel='stylesheet' href='/css/layout.css' />
      </head>
      <section id='Main'>
        <section id='Header'>
          <Nav user={props.user}/>
        </section>
        <section id='Content'>
        {props.children}
        </section>
        <section id='Footer'>

        </section>
      </section>
    </html>
  );
};

module.exports = Layout;