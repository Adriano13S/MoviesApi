const nextUrl = (originalUrl, protocol, host, page, resultLength, limit) =>{
  if(resultLength == limit){
    const url = new URL(originalUrl, `${protocol}://${host}`);
    url.searchParams.set('page', +page+1);
    return `${url.pathname}${url.search}`;
  }else{
    return null;
  }
};

module.exports = nextUrl;