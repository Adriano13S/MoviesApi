const errorHandler = require('../middlewares/errorMiddlewares');
const client = require('../db/db')

const titleTypesController = async (req, res, next) =>{
  try{
    const result = await client.db(process.env.DB_NAME)
                                .collection('ztitles')
                                .distinct('titleType.id');
    
    res.json({'results': result});
  }catch(error){
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = titleTypesController;