# Data-Imdb Api V2 Docs

### Povides complete and updated data for over 9 milion titles ( movies, series and episodes)

###### Recent titles are updated weekley - Ratings / episodes light are updated daily

- ## **Endpoints**: 
  
  **Every endpoint returns and object with 'results' key. Endpoints with pages has aditional keys -> 'page', 'next', 'entries'**

  **ALL query parameters are OPTIONAL**

    - ### **Titles**

      ###### *Query parameters and model are explain below, in 'Description Of Optionals Query Parameters' and 'Description Of The Information (Models)'

      1. **Titles**:
          - path: /titles
          - description: returns array of titles acording to filters / sorting query parameters provided
          - query parameters: *multiple
          - model: title
      2. **Title**
          - path: /titles/{id}
          - path parameter (*required*) : id -> imdb id of title
          - description: returns title acording to filters / sorting query parameters provided
          - query parameters: info
          - model: title
      3. **Title Rating**
          - path: /titles/{id}/ratings
          - path parameter (*required*) : id -> imdb id of title
          - description: returns title rating and votes number
          - query parameters: -
          - model: rating
      4. **Seasons and Episodes**
          - path: /titles/series/{id}
          - path parameter (*required*) : id -> imdb id of series
          - description: returns array of episodes only with episode id, episode number and season number in ascending order
          - query parameters: -
          - model: light episode
      5. **Seasons Number**
          - path: /titles/seasons/{id}
          - path parameter (*required*) : id -> imdb id of series
          - description: returns number of seasons for the series (integer)
          - query parameters: -
      6. **Episodes Id`s By Series Id and Season**
          - path: /titles/series/{id}/{season}
          - path parameter (*required*) : id -> imdb id of series, season -> season number
          - description: returns array of episodes only with episode id, season number and episode number (only of the season provided in path)
          - query parameters: -
          - model: light episode
      7. **Episode**
          - path: /titles/episode/{id}
          - path parameter (*required*) : id -> imdb id of episode
          - description: returns episode acording to filters / sorting query parameters provided
          - query parameters: info
          - model: title
      8. **Upcoming Titles**
          - path: /titles/x/upcoming
          - description: returns array of upcoming titles acording to filters / sorting query parameters provided
          - query parameters: *multiple
          - model: title

    - ### **Search**

      1. **Titles by Keyword**
          - path: /titles/search/keyword/{keyword}
          - path parameter (*required*) : keyword
          - description: returns array of titles acording to filters / sorting query parameters provided and the keyword provided in path
          - query parameters: *multiple
          - model: title
      2. **Titles by Title**
          - path: /titles/search/title/{title}
          - path parameter (*required*) : title -> a title or **part** of a title 
          - description: returns array of titles acording to filters / sorting query parameters provided and the title provided in path
          - query parameters: *multiple
          - model: title

    - ### **Actors**

      1. **Actors**
          - path: /actors
          - description: returs array of actors acording to filters provided
          - query parameters: limit, page
          - model: actor
      2. **Actor By Id**
          - path: /actors/{id}
          - path parameter (*required*) : imdb id of actor
          - description: returns actor details
          - model: actor

- ## **Description of optional query parameters**:

  **Endpoints with '*multiple' query parameters can use all of the below**

    * **info** *STRING*
        * default: mini_ info
        * description : option to get specific informations
        * there is 3 predefinded options (exemple below) : 
            * base_info
            * mini_info
            * image
            * creators_directors_writers
            * revenue_budget
            * extendedCast
            * rating
            * awards
        * **IMPORTANT** : in the info query parameter can be used, beside of predefined options above, **ANY** key of the title object (exemple object in 'Description of the information' no.4 )
    * **limit** *NUMBER*
        * default: 10
        * description: number of objects per page (max 50)
    * **page** *NUMBER*
        * default: 1
    * **series** *BOOLEAN*
        * default : -
        * description*: if this field is true, returnd array will contain only series
        * description**: if this field is false, returnd array will not contain series
    * **episodes** *BOOLEAN*
        * default : -
        * description*: if this field is true, returnd array will contain only episodes
        * description**: if this field is false, returnd array will not contain episodes
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
        * description: filter by genre of title, **case sensitive - has to be capitalize**
    * **sort** *STRING*
        * default : -
        * description: sorts returned array by selected predefined options
        * there is 2 predefinded options *work in progress*:
            * year.incr
                * description: sorts result by year ascending 
            * year.decr
                * description: sorts result by year ascending


  #### *Exemple of predefinded **info** options*:
  * **base_info**
      *exemple*
      <sub>
      titleText: ... ,<br>
      id: ... ,<br>
      primaryImage: ... ,<br>
      titleType: ... ,<br>
      releaseDate: ... ,<br>
      genres: ... ,<br>
      runtime: ... ,<br>
      plot: ... ,<br>
      meterRanking: ... ,<br>
      ratingsSummary: ... ,<br>
      episodes: ... ,<br>
      series: ...
      </sub>

  * **mini_info**
      *exemple*
      <sub>
      titleText: ... ,<br>
      id: ... ,<br>
      primaryImage: ... ,<br>
      titleType: ... ,<br>
      releaseDate: ...
      </sub>
    
  * **image**
      *exemple*
      <sub>
      id: ... ,<br>
      primaryImage: ...
      </sub>
  
  * **creators_directors_writers**
      *exemple*
      <sub>
      id: ... ,<br>
      creators: ... ,<br>
      directors: ... ,<br>
      writers: ...
      </sub>
  
  * **revenue_budget**
      *exemple*
      <sub>
      id: ... ,<br>
      productionBudget: ... ,<br>
      lifetimeGross: ... ,<br>
      openingWeekendGross: ... ,<br>
      worldwideGross: ... 
      </sub>

  * **extendedCast**
      *exemple*
      <sub>
      id: ... ,<br>
      cast: ... 
      </sub>
  
  * **rating**
      *exemple*
      <sub>
      id: ... ,<br>
      ratingsSummary: ...
      </sub>

  * **awards**
      *exemple*
      <sub>
      id: ... ,<br>
      wins: ... ,<br>
      nominations: ... ,<br>
      prestigiousAwardSummary: ... 
      </sub>

- ## **Description of the information (models)**

  1. **(model) rating object contains 3 keys:**

      *exemple of ratings object*:
      <sub>
      tconst:"tt0000003"<br>
      averageRating:6.5<br>
      numVotes:1631
      </sub>

  2. **(model) light episode contains 4 keys:**

      *exemple of light episode object*:
      <sub>
      tconst:"tt0020666"<br>
      parentTconst:"tt15180956"<br>
      seasonNumber:1<br>
      episodeNumber:2
      </sub>

  3. **(model) actor contains 6 keys:**

      *exemple of actor object*:
      <sub>
      nconst:"nm0000001"<br>
      primaryName:"Fred Astaire"<br>
      birthYear:1899<br>
      deathYear:1987<br>
      primaryProfession:"soundtrack,actor,miscellaneous"<br>
      knownForTitles:"tt0050419,tt0053137,tt0072308,tt0031983"
      </sub>

  4. **(model) title  object contains around 58 keys, this can be obtained thru INFO query parameter (described above)**
      #### **Titles refers to movies, series and episodes**

      #### *Exemple of complete title object*:
      <sub>
        id:"tt0000270"<br>
        wins:Object<br>
        nominations:Object<br>
        prestigiousAwardSummary:null<br>
        ratingsSummary:Object<br>
        episodes:null<br>
        videos:Object<br>
        videoStrip:Object<br>
        titleMainImages:Object<br>
        productionStatus:null<br>
        primaryImage:null<br>
        imageUploadLink:Object<br>
        titleType:Object<br>
        canHaveEpisodes:false<br>
        cast:Object<br>
        principalCast:Array<br>
        creators:Array<br>
        directors:Array<br>
        writers:Array<br>
        isAdult:false<br>
        moreLikeThisTitles:Object<br>
        summaries:Object<br>
        outlines:Object<br>
        synopses:Object<br>
        storylineKeywords:Object<br>
        taglines:Object<br>
        genres:Object<br>
        certificate:null<br>
        parentsGuide:Object<br>
        triviaTotal:Object<br>
        trivia:Object<br>
        goofsTotal:Object<br>
        goofs:Object<br>
        quotesTotal:Object<br>
        quotes:Object<br>
        crazyCredits:Object<br>
        alternateVersions:Object<br>
        connections:Object<br>
        soundtrack:Object<br>
        titleText:Object<br>
        originalTitleText:Object<br>
        releaseYear:Object<br>
        reviews:Object<br>
        featuredReviews:Object<br>
        canRate:Object<br>
        iframeAddReviewLink:Object<br>
        faqsTotal:Object<br>
        faqs:Object<br>
        releaseDate:null<br>
        countriesOfOrigin:Object<br>
        detailsExternalLinks:Object<br>
        spokenLanguages:Object<br>
        akas:Object<br>
        filmingLocations:Object<br>
        production:Object<br>
        companies:Object<br>
        productionBudget:null<br>
        lifetimeGross:null<br>
        openingWeekendGross:null<br>
        worldwideGross:null<br>
        technicalSpecifications:Object<br>
        runtime:null<br>
        series:null<br>
        news:Object<br>
        contributionQuestions:Object<br>
        meterRanking:null<br>
        images:Object<br>
        primaryVideos:Object<br>
        externalLinks:Object<br>
        metacritic:null<br>
        keywords:Object<br>
        plot:null<br>
        plotContributionLink:Object<br>
        credits:Object<br>
        principalCredits:Array<br>
        criticReviewsTotal:Object<br>
        meta:Object<br>
        castPageTitle:Object<br>
        creatorsPageTitle:Array<br>
        directorsPageTitle:Array
      </sub>