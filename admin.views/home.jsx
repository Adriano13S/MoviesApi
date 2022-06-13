// eslint-disable-next-line no-unused-vars
const React = require('react');
// eslint-disable-next-line no-unused-vars
const Layout = require('./hoc/layout');

const homeComponent = (props) => {
  return(
    <Layout user={props.user}>
      <div className='homeContainer'>
        <a id='dbWindow' href={`${props.user}/db`}><div id='dbWindow'>Database stats</div></a>
        <a id='statsWindow' href={`${props.user}/stats`}><div id='statsWindow'>Api stats</div></a>
      </div>
    </Layout>
  );
};


module.exports = homeComponent;