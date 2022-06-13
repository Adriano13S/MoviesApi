const errorHandler = require('../middlewares/errorMiddlewares');
const client = require('../db/db')

const genresController = async (req, res, next) =>{
  try{
    const result = await client.db(process.env.DB_NAME)
                                .collection('ztitles')
                                .distinct('genres.genres.text');
    
    res.json({'results': result});
  }catch(error){
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = genresController;