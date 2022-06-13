const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');

const episodesAndSeasonsController = async (req, res, next) =>{
  try {
    const result = await client.db(process.env.DB_NAME)
                        .collection('movies_episodes')
                        .find({'parentTconst' : req.params.seriesId})
                        .project({_id:0,parentTconst:0})
                        .sort({'seasonNumber': 1, 'episodeNumber': 1})
                        .maxTimeMS(Number(process.env.MAX_TIME))
                        .toArray();
    
    res.json({ 'results': result});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = episodesAndSeasonsController;