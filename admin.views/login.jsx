// eslint-disable-next-line no-unused-vars
const React = require('react');

const authFormComponent = (props) => {
  return(
    <html>
      <head>
        <link rel='stylesheet' href='/css/login.css' />
      </head>
      <div id='mainForm'>
        <form action="/admin/login" method="post">
          <div>
              <input id="username" name="username" type="text" autoComplete="username" placeholder='Username' required />
          </div>
          <div>
              <input id="password" name="password" type="password" autoComplete="password" placeholder='Password' required />
          </div>
          <div>
              <button type="submit">Login</button>
          </div>
          {props.error && <h3 style={{'color': 'red'}}>{props.error[props.error.length -1]}</h3>}
        </form>
      </div>
    </html>
  );
};

module.exports = authFormComponent;