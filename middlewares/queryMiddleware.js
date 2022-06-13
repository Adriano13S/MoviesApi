const {errorFunction} = require('../middlewares/errorMiddlewares');
const {sortStructure} = require('../routes.controllers/sortStructure');
const {filterStructure} = require('../routes.controllers/filterStructure');
const {listsCollections} = require('../routes.controllers/filterStructure');
const infoStructure = require('../routes.controllers/infoStructure');

const queryMiddleware = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  let {sort, info, page, limit, exact, list, idsList, ...filter} = req.query

  //req.query.limit
  if(req.query.limit){
    if(isNaN(+req.query.limit)){
      return errorFunction(req, res, next, 'Limit parameter error, limit has to be a number between 1 an 51', 200);
    }
    if(+req.query.limit < 1){
      return errorFunction(req, res, next, 'Limit to Low, limit has to be a greater than 0', 200);
    }
    if(+req.query.limit > 50){
      return errorFunction(req, res, next, 'Limit to Low, limit has to be less then 51', 200);
    }
  }else{
    req.query.limit = 10;
  }

  //req.query.page
  if(req.query.page){
    if(isNaN(+req.query.page)){
      return errorFunction(req, res, next, 'Page has to be a number', 200);
    }
    if(+req.query.page < 1){
      return errorFunction(req, res, next, 'Page has to be a number greater than 0', 200);
    }// TODO:NEED SOME MAX PAGE (solution:  condition that next page 
    // coul not be more than current page + some value (ex:5) )
  }else{
    req.query.page = 1;
  }

  //req.query.sort
  if(req.query.sort){
    const filter = req.query.sort.split('.')
    if(!Object.keys(sortStructure).includes(filter[0]) || !Object.keys(sortStructure[filter[0]]).includes(filter[1])){
      return errorFunction(req, res, next, `Wrong sort query parameter: ${req.query.sort}`, 200);
    }
    req.query.sort = {[sortStructure[filter[0]].path] : sortStructure[filter[0]][filter[1]]};
  } else{
    req.query.sort = {}
  }

  //req.query.info
  if(req.query.info){
    if(!Object.keys(infoStructure).includes(req.query.info)){
      return errorFunction(req, res, next, `Wrong info query parameter: ${req.query.info}`, 200);
    }
  }else{
    req.query.info = 'mini_info'
  }

  //req.query.list
  if(req._parsedUrl.pathname === '/' || req._parsedUrl.pathname === '/x/titles-by-ids'){
    if(req.query.list){
      if(!Object.keys(listsCollections).includes(req.query.list)){
        return errorFunction(req, res, next, `Wrong list query parameter: ${req.query.list}`, 200);
      }
    }else{
      req.query.list = 'titles'
    }
    if(req.query.list === 'titles' && Object.keys(req.query.sort).includes('position')){
      return errorFunction(req, res, next, `Sort by position in this list in not possible`, 200);
    }
  }

  // req.query.idsList
  if(req._parsedUrl.pathname === '/x/titles-by-ids'){
    if(req.query.idsList){
      try{
        if(typeof req.query.idsList !== Array){
          req.query.idsList = req.query.idsList.split(",")
        }
        if(idsList.length > 25){
          return errorFunction(req, res, next, `List of id's is too big - max 25`, 200);
        }else{
          req.query.idsList = req.query.idsList.map( el => el.trim())
        }
      }catch(error){
        return errorFunction(req, res, next, `${error.message}`, 200);
      }
    }else{
      return errorFunction(req, res, next, `List of id's is required`, 200);
    }
  }

  //req.query.filter
  if(filter){
    try{
      Object.entries(filter).map((entry)=>{
        delete req.query[entry[0]]
        if(filterStructure[entry[0]]){
          if(filterStructure[entry[0]].range){
            req.query[filterStructure[entry[0]].path] = {...req.query[filterStructure[entry[0]].path], [filterStructure[entry[0]].range] : filterStructure[entry[0]].type(entry[1])}
          }else{
            //CASE SENSITIVE FILTER
            req.query[filterStructure[entry[0]].path] = filterStructure[entry[0]].type(entry[1]);
          }
        }else{
          filter = null
          return errorFunction(req, res, next, `Wrong filter query parameter : ${entry[0]}`, 200);
        }
      });
      if(filter){
        next();
      }
    } catch {
      return errorFunction(req, res, next, 'Wrong filter query parameter', 200);
    }
  }else{
    filter = {}
    next();
  }
}

module.exports = queryMiddleware;