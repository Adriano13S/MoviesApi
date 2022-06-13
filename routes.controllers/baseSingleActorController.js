const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares')

const baseSingleActorController = async (req, res, next) =>{
  try{
    const result = await client.db(process.env.DB_NAME)
                              .collection('actors_basic')
                              .findOne({'nconst': req.params.id}, {projection:{'_id':0}})
    res.json({'results': result});
  }catch(error){
    return errorHandler.errorHandle(req, res, next, error);
  }
}

module.exports = baseSingleActorController;