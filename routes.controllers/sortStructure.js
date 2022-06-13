// query.sort

const sortStructure = {
  year : {path: 'releaseYear.year', decr:-1, incr: 1},
  pos:{path: 'position', decr:-1, incr: 1}               // for lists
  // revenue: {path:'lifetimeGross.total.amount',  decr:-1, incr: 1}
};

//TODO : SORT BY RATING / POPULARITY / RANKING


// const sortFunction = (filter) => {
//   const filter_query = {};
//   try{
//     const sep = filter.split('.');
//     filter_query[sortStructure[sep[0]].path] = sortStructure[sep[0]][sep[1]];
     
//   } catch (error){
//     return {};
//   }
//   return filter_query;
// }; 

module.exports = {sortStructure};