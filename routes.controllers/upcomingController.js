const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');
const infoStructure = require('./infoStructure');
const nextUrl = require('./utils');

const upcomingController = async (req, res, next) =>{
  const date = new Date()
  const base_query = {'releaseDate.year':{'$gte':date.getFullYear()}, 'releaseDate.month':{'$gte':date.getMonth()+1},'releaseDate.day':{'$gte':date.getDate()}}
  try {
    const {sort, info, page, limit, ...filter} = req.query
    const result = await client.db(process.env.DB_NAME)
                        .collection(process.env.DB_COLL)
                        .find(filter ? {...filter, ...base_query} : {...base_query})
                        .project(infoStructure[info])
                        .limit(+limit*1)
                        .skip((+page-1)*limit)
                        .sort(sort)
                        .maxTimeMS(Number(process.env.MAX_TIME))
                        .toArray();
    const nextPage = nextUrl(req.originalUrl, req.protocol, req.headers.host, req.query.page, result.length, limit);
    res.json({'page': page, 'next': result.length == limit ? nextPage : null, 'entries': result.length, 'results': result});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = upcomingController;