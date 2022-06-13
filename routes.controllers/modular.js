// const client = require('../db/db');
// const errorHandler = require('../middlewares/errorMiddlewares');
// const infoStructure = require('./infoStructure');
// const {filterFunction} = require('./filterStructure');

// const modularController = async (req, res, next) =>{
//   const match = ['Announced', 'Pre-production', 'Filming', 'Post-production', 'Completed', 'Development Unknown']
//   const base_query = {'productionStatus.currentProductionStage.text': {$in: match}}
//   try {
//     const result = await client.db(process.env.DB_NAME)
//                         .collection(process.env.DB_COLL)
//                         .find(req.query.filter? {...filterFunction(req.query.filter), ...base_query} : {...base_query})
//                         .project(infoStructure[req.query.info])
//                         .limit(req.query.limit*1)
//                         .skip((req.query.page-1)*req.query.limit)
//                         .toArray();
//     const nextPage = `${req.baseUrl}${req.url}?limit=${req.query.limit}&page=${+req.query.page+1}`;
//     res.json({'page': req.query.page, 'next': nextPage, 'maxEntries': req.query.limit, 'results': result});
//   } catch (error) {
//     return errorHandler.errorHandle(req, res, next, error.message);
//   }
// };

// module.exports = modularController;