// query.filter
const filterStructure = {
  startYear: {path: 'releaseYear.year', range: '$gte', type:Number},
  endYear: {path: 'releaseYear.year', range: '$lte', type:Number},
  year : {path:'releaseYear.year', type:Number},

  genre: {path:'genres.genres.text', type:String},

  titleType: {path:'titleType.id', type:String},

  startRevenue: {path:'lifetimeGross.total.amount', range: '$gte', type:Number},
  endRevenue: {path:'lifetimeGross.total.amount', range: '$lte', type:Number},
  revenue: {path:'lifetimeGross.total.amount', type:Number},

  spokenLanguages : {path: 'spokenLanguages.spokenLanguages.text', type:String}, // TODO: not indexed
  countriesOfOrigin: {path: 'countriesOfOrigin.countries.text', type:String} // TODO: not indexed
};

const listsCollections = {
  most_pop_movies: 'xmost_pop_movies',
  most_pop_series: 'xmost_pop_series',
  top_boxoffice_200: 'xtop_boxoffice_200',
  top_boxoffice_last_weekend_10: 'xtop_boxoffice_last_weekend',
  top_rated_250: 'xtop_rated_250',
  top_rated_english_250: 'xtop_rated_english_250',
  top_rated_lowest_100: 'xtop_rated_lowest_100',
  top_rated_series_250: 'xtop_rated_series_250',
  titles: 'ztitles'
};

module.exports = {
  filterStructure,
  listsCollections
};

//V1
// const filterFunction = (filter) => {
//   let query = {};
//   try{
//     Object.entries(filter).map((entry)=>{
//       if(filterStructure[entry[0]]){
//         if(filterStructure[entry[0]].range){
//           query[filterStructure[entry[0]].path] = {...query[filterStructure[entry[0]].path], [filterStructure[entry[0]].range] : filterStructure[entry[0]].type(entry[1])}
//         }else{
//           //CASE SENSITIVE FILTER
//           query[filterStructure[entry[0]].path] = filterStructure[entry[0]].type(entry[1]);
//         }
//       }
//     });
//   } catch (error){
//     return {};
//   }
//   console.log(query)
//   return query;
// }; 
