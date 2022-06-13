// eslint-disable-next-line no-unused-vars
const React = require('react');
// eslint-disable-next-line no-unused-vars
const Layout = require('./hoc/layout');


const userDbComponent = (props) => {
  return(
    <Layout user={props.user}>
      <table className='dbTable'>
        <tr>
          {Object.keys(props.data[0]).map(el => <th>{el}</th>)}
        </tr>
      {props.data.map( el => 
        <tr>
          {/* {Object.values(el).map(el => <td>{el.toLocaleString()}</td>)} */}
          <td><a href={`/admin/users/${props.user}/collections/${el.name}`}><p>{el.name}</p></a></td>
          <td>{el.size}</td>
          <td>{el.documents}</td>
          <td>{el.avgDocSize}</td>
          <td>{el.indexCount}</td>
          <td>{el.indexSize}</td>
        </tr>
      )}

      </table>
    </Layout>
  );
};


module.exports = userDbComponent;