const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');

const episodesSeasonsNumberController = async (req, res, next) =>{
  try {
    const result = await client.db(process.env.DB_NAME)
                        .collection('movies_episodes')
                        .find({'parentTconst' : req.params.seriesId})
                        .sort({'seasonNumber': -1})
                        .limit(1)
                        .maxTimeMS(Number(process.env.MAX_TIME))
                        .toArray();
    
    res.json({ 'results': result[0].seasonNumber});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = episodesSeasonsNumberController;