const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');
const infoStructure = require('./infoStructure');
const nextUrl = require('./utils');

const searchByTitleController = async (req, res, next) => {
  const title = req.params.title.replaceAll('"','').replaceAll("'", '')
  try {
    const {sort, info, page, limit, exact, ...filter} = req.query
    const result = exact === 'true'? 
                              await client.db(process.env.DB_NAME)
                              .collection(process.env.DB_COLL)
                              .find(filter ? {'titleText.text': title, ...filter} : {'titleText.text': title})
                              .project(infoStructure[info])
                              .limit(+limit*1)
                              .skip((+page-1)*limit)
                              .sort(sort)
                              .maxTimeMS(Number(process.env.MAX_TIME))
                              .toArray()
                              :
                              await client.db(process.env.DB_NAME)
                              .collection(process.env.DB_COLL)
                              .find(filter ? {$text :{$search: title}, ...filter} : {$text :{$search: title}})
                              .project(infoStructure[info])
                              .limit(+limit*1)
                              .skip((+page-1)*limit)
                              .sort(sort)
                              .maxTimeMS(Number(process.env.MAX_TIME))
                              .toArray()
    const nextPage = nextUrl(req.originalUrl, req.protocol, req.headers.host, req.query.page, result.length, limit);
    res.json({'page': page, 'next': nextPage , 'entries': result.length, 'results': result});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
}

module.exports = searchByTitleController;