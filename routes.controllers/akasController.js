const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');

const akasController = async (req, res, next) => {
  try{
    const result = await client.db(process.env.DB_NAME)
                              .collection('movies_akas')
                              .find({'titleId': req.params.id}, {projection:{'_id':0}})
                              .maxTimeMS(Number(process.env.MAX_TIME))
                              .toArray();
    res.json({'results': result});
  }catch(error){
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = akasController;