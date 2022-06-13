const listCollections = require('../db/db.listCollections');
const client = require('../db/db');

const homeDb = (req, res) => {
  let info = [];
  listCollections().then((data) => {
    const promises = data.map(async el => {
      const x = await client.db('Imdb').collection(el.name).stats({scale: 1024});
      return x;
    });
    Promise.all(promises).then((values) => {
      values.forEach((x) => info.push({name: x.ns, size: x.size, documents: x.count, avgDocSize: x.avgObjSize, indexCount: Object.keys(x.indexSizes).length,indexSize: x.totalIndexSize}))
      res.render('homeDb', {user: req.session.passport.user, data: info})
    });
  });
};

module.exports = homeDb;