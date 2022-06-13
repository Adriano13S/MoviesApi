const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');

const episodesController = async (req, res, next) =>{
  try {
    const result = await client.db(process.env.DB_NAME)
                        .collection('movies_episodes')
                        .find({'parentTconst' : req.params.seriesId, 'seasonNumber' : +req.params.season})
                        .sort({'episodeNumber': 1})
                        .project({_id:0,parentTconst:0})
                        .maxTimeMS(Number(process.env.MAX_TIME))
                        .toArray();
    
    res.json({ 'results': result});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = episodesController;