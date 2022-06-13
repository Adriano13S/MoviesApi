const client = require('../db/db');
const errorMiddlewares = require('../middlewares/errorMiddlewares');
const infoStructure = require('./infoStructure');
const {listsCollections} = require('./filterStructure');
const nextUrl = require('./utils');
// const {filterFunction} = require('./filterStructure');
// const {sortFunction} = require('./sortStructure');

const baseMoviesController = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const {sort, info, page, limit, list, ...filter} = req.query
  
  try {
    const result = await client.db(process.env.DB_NAME)
                              .collection(listsCollections[list])
                              .find(filter)
                              .sort(sort)
                              .limit(+limit*1)
                              .skip((+page-1)*limit)
                              .project(infoStructure[info])
                              .maxTimeMS(Number(process.env.MAX_TIME))
                              .toArray();
    // TODO: SLOW ON HIGH PAGE NUMBER -->> range queries /  SOLUTION: https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3
    const nextPage = nextUrl(req.originalUrl, req.protocol, req.headers.host, req.query.page, result.length, limit);
    res.json({'page': page, 'next': result.length == limit ? nextPage : null, 'entries': result.length, 'results': result});
  } catch (error) {
    return errorMiddlewares.errorHandle(req, res, next, error);
  }
};



// TODO : GET RANDOM TITLES ( WITH FILTERS AND SORTING)

module.exports = baseMoviesController;