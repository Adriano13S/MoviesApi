const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');

const ratingsController = async (req, res, next) => {
  try{
    const result = await client.db(process.env.DB_NAME)
                              .collection('movies_ratings')
                              .findOne({'tconst': req.params.id}, {projection:{'_id':0}});
    res.json({'results': result});
  }catch(error){
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = ratingsController;