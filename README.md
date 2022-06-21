# MoviesDatabase API Documentation

### Povides complete and updated data for over 9 milion titles ( movies, series and episodes)



### Recent titles are updated weekley - Ratings / episodes light are updated daily



#### Support developers:  https://www.buymeacoffee.com/SAdrian13



- ## **Endpoints**: 
  
  **Every endpoint returns and object with 'results' key. Endpoints with pages has additional keys -> 'page', 'next', 'entries'**

  **ALL query parameters are OPTIONAL**

    - ### **Titles**

      ###### Query parameters and model are explain below, in 'Description Of Optionals Query Parameters' and 'Description Of The Information (Models)'

      1. **Titles - Multiple**:
          - path: /titles
          - description: returns array of titles according to filters / sorting query parameters provided
          - query parameters: *multiple*, **unique query parameter  'list' that sets the collection you want to query**  - options available in Utils - Titles Lists
          - model: title
      2. **Titles - By List of Id's**:
          - path: /x/titles-by-ids
          - description: returns array of titles according to array of id's provided
          - query parameters: 
                              - info
                              - list ( unique query parameter that sets the collection you want to query) - options available in Utils - Titles Lists
                              -  idsList ( the list of id's, **must be an array of strings**)
          - model: title
      3. **Title**
          - path: /titles/{id}
          - path parameter (*required*) : id -> imdb id of title
          - description: returns title acording to filters / sorting query parameters provided
          - query parameters: info
          - model: title
      4. **Title Rating**
          - path: /titles/{id}/ratings
          - path parameter (*required*) : id -> imdb id of title
          - description: returns title rating and votes number
          - query parameters: -
          - model: rating
      5. **Seasons and Episodes**
          - path: /titles/series/{id}
          - path parameter (*required*) : id -> imdb id of series
          - description: returns array of episodes only with episode id, episode number and season number in ascending order
          - query parameters: -
          - model: light episode
      6. **Seasons Number**
          - path: /titles/seasons/{id}
          - path parameter (*required*) : id -> imdb id of series
          - description: returns number of seasons for the series (integer)
          - query parameters: -
      7. **Episodes Id`s By Series Id and Season**
          - path: /titles/series/{id}/{season}
          - path parameter (*required*) : id -> imdb id of series, season -> season number
          - description: returns array of episodes only with episode id, season number and episode number (only of the season provided in path)
          - query parameters: -
          - model: light episode
      8. **Episode**
          - path: /titles/episode/{id}
          - path parameter (*required*) : id -> imdb id of episode
          - description: returns episode according to filters / sorting query parameters provided
          - query parameters: info
          - model: title
      9. **Upcoming Titles**
          - path: /titles/x/upcoming
          - description: returns array of upcoming titles according to filters / sorting query parameters provided
          - query parameters: *multiple*
          - model: title

    - ### **Search**

      1. **Titles by Keyword**
          - path: /titles/search/keyword/{keyword}
          - path parameter (*required*) : keyword 
          - description: returns array of titles according to filters / sorting query parameters provided and the keyword provided in path
          - query parameters: *multiple*
          - model: title
      2. **Titles by Title**
          - path: /titles/search/title/{title}
          - path parameter (*required*) : title -> a title or **part** of a title  
          - description: returns array of titles according to filters / sorting query parameters provided and the title provided in path
          - query parameters: *multiple, uniq query parameter **exact** that sets the looku to be exact **default : false**
          - model: title
      3. **Titles by Aka's**
          - path: /titles/search/akas/{aka}
          - path parameter (*required*) :aka -> a aka of a title ( exact only and case sensitive )
          - description: returns array of titles according to filters / sorting query parameters provided and the aka provided in path, work only for exact matches
          - query parameters: *multiple*
          - model: title

    - ### **Actors**

      1. **Actors**
          - path: /actors
          - description:  returns array of actors according to filters provided
          - query parameters: limit, page
          - model: actor
      2. **Actor By Id**
          - path: /actors/{id}
          - path parameter (*required*) : imdb id of actor
          - description: returns actor details
          - model: actor

    - ### **Utils**

      1. **Title Type**
          - path: /title/utils/titleType
          - description: returs array of title types
      2. **Genres**
          - path: /title/utils/titleType
          - description: returs array of genres
      3. **Titles Lists**
          - path: /title/utils/lists
          - description: returns array of lists (for 'list' query parameter)


- ## **Description of optional query parameters**:

  **Endpoints with '*multiple' query parameters can use all of the below**

    * **info** *STRING*
        * default: mini_ info
        * description : option to get specific informations
        * there is some predefinded options (exemple below) : 
            * base_info
            * mini_info
            * image
            * creators_directors_writers
            * revenue_budget
            * extendedCast
            * rating
            * awards
        * **IMPORTANT** : in the info query parameter can be used, beside of predefined options above, **ANY** key of the title object (ex object in 'Description of the information' no.4 )
    * **limit** *NUMBER*
        * default: 10
        * description: number of objects per page (max 50)
    * **page** *NUMBER*
        * default: 1
    * **titleType** *STRING*
        * default : -
        * description : options for this field from /title/utils/titleTypes ( Utils -> TitleTypes)
     * **startYear** *NUMBER*
        * default : -
        * description: filter by year with range, **start** range in this field
    * **endYear** *NUMBER*
        * default : -
        * description: filter by year with range, **end** range in this field
    * **year** *NUMBER*
        * default : -
        * description: filter by year, returns only titles with this year as release year
        * description**: can`t be used with *startYear* / *endYear*
    * **genre** *STRING*
        * default : -
        * description: filter by genre of title, **case sensitive - has to be capitalize**, options for this field from /title/utils/genres ( Utils -> Genres)
    * **sort** *STRING*
        * default : -
        * description: sorts returned array by selected predefined options
        * there is 2 predefined options *work in progress*:
            * year.incr
                * description: sorts result by year ascending 
            * year.decr
                * description: sorts result by year ascending
    * **exact** *STRING*
        * default : false
        * description: set the lookup to match the exact text, **available only in  Search - Titles by Title**
    * **list** *STRING*
        * default : *titles*
        * description: predefined lists of titles (**limit of 50  entries on one request**).
        *  *every title in every list other that *titles*  have an additional field *position* to identify the position of the title in the selected list (top)*
        *  options available in Utils - Titles Lists
        * there is 9 predefined options :
            * most_pop_movies
                * description:  Top 10.000 most popular movies, according to imdb ranking 
            * most_pop_series
                * description:  Top 10.000 most popular series, according to imdb ranking 
            * top_boxoffice_200
                * description:  Top 200 all time box office movies, according to boxofficemojo
            * top_boxoffice_last_weekend_10
                * description:  Top 10 box office of the last weekend, according to imdb ranking 
            * top_rated_250
                * description:  Top 250 movies by rating, according to imdb ranking 
            * top_rated_english_250
                * description:  Top 250 english movies by rating, according to imdb ranking 
            * top_rated_lowest_100
                * description:  Top 100 lowest rated movies, according to imdb ranking 
            * top_rated_series_250
                * description:  Top 250 series by rating, according to imdb ranking 
            * titles
                * description:  The entire collection with over 9.000.000 movies, series and  episodes **default** 

  #### *Exemple of predefinded **info** options*:
  * **base_info**
      *exemple*
      
      titleText: ... ,
      id: ... ,
      primaryImage: ... ,
      titleType: ... ,
      releaseDate: ... ,
      genres: ... ,
      runtime: ... ,
      plot: ... ,
      meterRanking: ... ,
      ratingsSummary: ... ,
      episodes: ... ,
      series: ...
      

  * **mini_info**
      *exemple*
      
      titleText: ... ,
      id: ... ,
      primaryImage: ... ,
      titleType: ... ,
      releaseDate: ...
      
    
  * **image**
      *exemple*
      
      id: ... ,
      primaryImage: ...
      
  
  * **creators_directors_writers**
      *exemple*
      
      id: ... ,
      creators: ... ,
      directors: ... ,
      writers: ...
      
  
  * **revenue_budget**
      *exemple*
      
      id: ... ,<br />
      productionBudget: ... ,
      lifetimeGross: ... ,
      openingWeekendGross: ... ,
      worldwideGross: ... 
      

  * **extendedCast**
      *exemple*
      
      id: ... ,
      cast: ... 
      
  
  * **rating**
      *exemple*
      
      id: ... ,
      ratingsSummary: ...
      

  * **awards**
      *exemple*
      
      id: ... ,
      wins: ... ,
      nominations: ... ,
      prestigiousAwardSummary: ... 
      

- ## **Description of the information (models)**

  1. **(model) rating object contains 3 keys:**

      *exemple of ratings object*:
      
      tconst:"tt0000003"
      averageRating:6.5
      numVotes:1631
      

  2. **(model) light episode contains 4 keys:**

      *exemple of light episode object*:
      
      tconst:"tt0020666"
      parentTconst:"tt15180956"
      seasonNumber:1
      episodeNumber:2
      

  3. **(model) actor contains 6 keys:**

      *exemple of actor object*:
      
      nconst:"nm0000001"
      primaryName:"Fred Astaire"
      birthYear:1899
      deathYear:1987
      primaryProfession:"soundtrack,actor,miscellaneous"
      knownForTitles:"tt0050419,tt0053137,tt0072308,tt0031983"
      

  4. **(model) title  object contains around 58 keys, this can be obtained thru INFO query parameter (described above)**

      **Titles refers to movies, series and episodes**

       *Exemple of complete title object*:

      **position: 97 -> available only for tops ( lists other than 'titles' )**
        id:"tt0000270"
        wins:Object
        nominations:Object
        prestigiousAwardSummary:null
        ratingsSummary:Object
        episodes:null
        videos:Object
        videoStrip:Object
        titleMainImages:Object
        productionStatus:null
        primaryImage:null
        imageUploadLink:Object
        titleType:Object
        canHaveEpisodes:false
        cast:Object
        principalCast:Array
        creators:Array
        directors:Array
        writers:Array
        isAdult:false
        moreLikeThisTitles:Object
        summaries:Object
        outlines:Object
        synopses:Object
        storylineKeywords:Object
        taglines:Object
        genres:Object
        certificate:null
        parentsGuide:Object
        triviaTotal:Object
        trivia:Object
        goofsTotal:Object
        goofs:Object
        quotesTotal:Object
        quotes:Object
        crazyCredits:Object
        alternateVersions:Object
        connections:Object
        soundtrack:Object
        titleText:Object
        originalTitleText:Object
        releaseYear:Object
        reviews:Object
        featuredReviews:Object
        canRate:Object
        iframeAddReviewLink:Object
        faqsTotal:Object
        faqs:Object
        releaseDate:null
        countriesOfOrigin:Object
        detailsExternalLinks:Object
        spokenLanguages:Object
        akas:Object
        filmingLocations:Object
        production:Object
        companies:Object
        productionBudget:null
        lifetimeGross:null
        openingWeekendGross:null
        worldwideGross:null
        technicalSpecifications:Object
        runtime:null
        series:null
        news:Object
        contributionQuestions:Object
        meterRanking:null
        images:Object
        primaryVideos:Object
        externalLinks:Object
        metacritic:null
        keywords:Object
        plot:null
        plotContributionLink:Object
        credits:Object
        principalCredits:Array
        criticReviewsTotal:Object
        meta:Object
        castPageTitle:Object
        creatorsPageTitle:Array
        directorsPageTitle:Array
      