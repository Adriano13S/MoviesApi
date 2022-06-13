const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');
const infoStructure = require('./infoStructure');
const nextUrl = require('./utils');

const searchByKeywordsController = async (req, res, next) =>{
  // const keyword = req.params.keyword.replaceAll('%22','');
  try {
    const {sort, info, page, limit, ...filter} = req.query
    const result = await client.db(process.env.DB_NAME)
                        .collection(process.env.DB_COLL)
                        // .find({'keywords.edges': {$elemMatch: {'node.text': req.params.keyword}}})
                        .find(filter ? {'keywords.edges.node.text': req.params.keyword, ...filter} : {'keywords.edges.node.text' :req.params.keyword})
                        .project(infoStructure[info])
                        .limit(+limit*1)
                        .skip((+page-1)*limit)
                        .sort(sort)
                        .maxTimeMS(Number(process.env.MAX_TIME))
                        .toArray();
    const nextPage = nextUrl(req.originalUrl, req.protocol, req.headers.host, req.query.page, result.length, limit);
    res.json({'page': req.query.page, 'next': result.length == req.query.limit ? nextPage : null, 'entries': result.length, 'results': result});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = searchByKeywordsController;