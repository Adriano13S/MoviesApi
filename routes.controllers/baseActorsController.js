const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');
const nextUrl = require('./utils');

const baseActorsController = async (req, res, next) => {
  try {
    const result = await client.db(process.env.DB_NAME)
                              .collection('actors_basic')
                              .find({})
                              .project({'_id':0})
                              .limit(req.query.limit*1)
                              .skip((req.query.page-1)*req.query.limit)
                              .maxTimeMS(Number(process.env.MAX_TIME))
                              .toArray();
    // SLOW ON HEIGH PAGE NUMBER
    const nextPage = nextUrl(req.originalUrl, req.protocol, req.headers.host, req.query.page, result.length, req.query.limit);
    res.json({'page': req.query.page, 'next': result.length == req.query.limit ? nextPage : null, 'entries': result.length, 'results': result});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = baseActorsController;