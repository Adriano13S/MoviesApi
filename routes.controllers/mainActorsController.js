const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');

const mainActorsController = async (req, res, next) => {
  try{
    const result = await client.db(process.env.DB_NAME)
                              .collection('movies_principals')
                              .find({'tconst': req.params.id})
                              .project({'_id':0})
                              .maxTimeMS(Number(process.env.MAX_TIME))
                              .toArray();
    res.json({'results': result});
  }catch(error){
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = mainActorsController;