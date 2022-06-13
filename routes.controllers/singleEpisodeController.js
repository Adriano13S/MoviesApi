const client = require('../db/db');
const infoStructure = require('./infoStructure');
const errorHandler = require('../middlewares/errorMiddlewares')

const singleEpisodeController = async (req, res, next) =>{
  try{
    const result = await client.db(process.env.DB_NAME)
                              .collection(process.env.DB_COLL)
                              .findOne({'id': req.params.id}, {projection: infoStructure[req.query.info]});
    res.json({'results': result});
  }catch(error){
    return errorHandler.errorHandle(req, res, next, error)
  }
}

module.exports = singleEpisodeController;