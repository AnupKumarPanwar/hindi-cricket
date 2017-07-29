var matchId='';
var playerId='';

function countdown() {
  setTimeout('Decrement()',1000);
}
function Decrement() {

    minutes = $("#mins").html();
    seconds = $("#secs").html();
    hours = $("#hrs").html();
    // if less than a minute remaining
    if (seconds > 0) {
      seconds--;
      $("#secs").html(seconds);

    } 
    else if(minutes > 0) 
    {
      seconds = 59;
      minutes--;
      $("#mins").html(minutes);
      $("#secs").html(seconds);
    }
    else if(minutes == 0 && seconds == 0) 
    {
      hours--;
      seconds = 59;
      minutes = 59;
      $("#mins").html(minutes);
      $("#secs").html(seconds);
      $("#hrs").html(hours);
    }
    
    setTimeout('Decrement()',1000);

}





var nameApp = angular.module('starter', ['ionic', 'ui.router']);

nameApp.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
    .state('menu', {
      url: '/',
      templateUrl: 'menu.html',
      controller: 'LiveCtrl'
    })
    .state('results', {
      url: '/results',
      templateUrl: 'results.html',
      controller: 'ResultsCtrl'
      
    })
    .state('allresults', {
      url: '/allresults',
      templateUrl: 'allresults.html',
      controller: 'AllResultsCtrl'
      
    })
    .state('matches', {
      url: '/matches',
      templateUrl: 'matches.html',
      controller: 'NextMatchesCtrl'
      
    })
    .state('knowyourteam', {
      url: '/knowyourteam',
      templateUrl: 'knowyourteam.html',
      controller: 'TeamCtrl'
    })
    .state('gallery', {
      url: '/gallery',
      templateUrl: 'gallery.html',
      controller: 'GalleryCtrl'
    })
    .state('memegallery', {
      url: '/memegallery',
      templateUrl: 'memegallery.html',
      controller: 'MemeCtrl'
    })
    .state('videos', {
      url: '/videos',
      templateUrl: 'videos.html',
      controller: 'VideosCtrl'
    })
    .state('news', {
      url: '/news',
      templateUrl: 'news.html',
      controller: 'NewsCtrl'
    })
    .state('merchendise', {
      url: '/merchendise',
      templateUrl: 'merchendise.html'
    })
    .state('standings', {
      url: '/standings',
      templateUrl: 'standings.html',
      controller: 'StandingsCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'about.html',
      controller: 'AboutCtrl'
    })
    .state('fansclub', {
      url: '/fansclub',
      templateUrl: 'fansclub.html',
      controller: 'FansClubCtrl'
    })
    .state('playerdetail', {
      url: '/playerdetail/:playerid',
      templateUrl: 'playerdetail.html',
      controller: 'PlayerDetailCtrl'
    })
    .state('postdetail', {
      url: '/postdetail/:postid',
      templateUrl: 'postdetails.html',
      controller: 'postDetailCtrl'
    })
    .state('fanpostdetail', {
      url: '/fanpostdetail/:fanpostid',
      templateUrl: 'fanpostdetail.html',
      controller: 'fanPostDetailCtrl'
    });
 
  $urlRouterProvider.otherwise("/");
 
});

nameApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});

// nameApp.controller('MenuCtrl', function($scope, $state) {
//   $scope.changePage = function(){
//     $state.go('matches');
//   }    
// });
 
// nameApp.controller('MatchesCtrl', function($scope, $stateParams, $ionicHistory) {
//   $scope.goBack = function(){
//     $ionicHistory.goBack();
//   }    
// });

nameApp.run(function($rootScope, $state) {
    $rootScope.setMatchId = function (id) {
        matchId=id;
        $state.go('results');
        // alert(matchId);
    }

    $rootScope.setPlayerId = function (id) {
        playerId=id;
        $state.go('fansclub');
        // alert(matchId);
    }
})


nameApp.controller('AllResultsCtrl', function($scope, $http, $ionicLoading) {
  $scope.matches = [];
  $ionicLoading.show({template: 'loading'});
  // $http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/latest_results?callback=JSON_CALLBACK').then(function(resp) {
  $http.get('http://www.islamabadunited.com/wp-json/wp/v2/latest_results_all?callback=JSON_CALLBACK').then(function(resp) {
    //console.log('Success', resp);
    $ionicLoading.hide();
    $scope.matches = resp.data;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})


.controller('LiveCtrl', function($scope, $http, $ionicSlideBoxDelegate, $ionicLoading){


    $ionicLoading.show({template: 'loading'});

    $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/match/livematches/')
    .then(function(resp){
      $scope.liveMatches=resp.data.matches;
      console.log(resp.data.matches);
      $ionicSlideBoxDelegate.update();
      $ionicLoading.hide();
    })


setInterval(function(){
  $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/match/livematches/')
  .then(function(resp){
    $scope.liveMatches=resp.data.matches;
    console.log(resp.data.matches);
    $ionicSlideBoxDelegate.update();
  })
}, 60000)

  


})

.controller('ResultsCtrl', function($scope, $http, $ionicLoading, $ionicScrollDelegate) {


  $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTo(0, 290, true);
    };


    AdMob.showInterstitial();

    $ionicLoading.show({template: 'loading'});

    $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/match/'+matchId)
    .then(function(resp){
      $scope.match=resp.data;
      console.log(resp.data);
      $ionicLoading.hide();
      // $ionicSlideBoxDelegate.update();
    })



    $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/match/'+matchId+'/mini-commentary')
    .then(function(resp){
      $scope.matchDetails=resp.data;
      console.log(resp.data);
      $ionicLoading.hide();
      // $ionicSlideBoxDelegate.update();
    })




     $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/match/'+matchId+'/scorecard')
    .then(function(resp){
      $scope.scorecard=resp.data;
      console.log(resp.data);
      $ionicLoading.hide();
      // $ionicSlideBoxDelegate.update();
    })


  // $ionicLoading.show({template: 'loading'});
setInterval(function(){

      $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/match/'+matchId)
      .then(function(resp){
        $scope.match=resp.data;
        console.log(resp.data);
        $ionicLoading.hide();
        // $ionicSlideBoxDelegate.update();
      })



      $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/match/'+matchId+'/mini-commentary')
      .then(function(resp){
        $scope.matchDetails=resp.data;
        console.log(resp.data);
        $ionicLoading.hide();
        // $ionicSlideBoxDelegate.update();
      })




       $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/match/'+matchId+'/scorecard')
      .then(function(resp){
        $scope.scorecard=resp.data;
        console.log(resp.data);
        $ionicLoading.hide();
        // $ionicSlideBoxDelegate.update();
      })

}, 60000)



  $scope.s2n=function(str)
  {
    return Number(str);
  }

})

.controller('StandingsCtrl', function($scope, $http, $ionicLoading) {

    AdMob.showInterstitial();
  
 //  $scope.teams = [];
 //  $ionicLoading.show({template: 'loading'});
 // //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/league_table?callback=JSON_CALLBACK').then(function(resp) {
 // $http.get('http://www.islamabadunited.com/wp-json/wp/v2/league_table?callback=JSON_CALLBACK').then(function(resp) {
 //    $ionicLoading.hide();
 //    $scope.teams = resp.data;
 //    // For JSON responses, resp.data contains the result
 //  }, function(err) {
 //    console.error('ERR', err);
 //    // err.status will contain the status code
 //  })
})

.controller('NextMatchesCtrl', function($scope, $http, $ionicLoading) {
  $scope.matches = [];
   
  $ionicLoading.show({template: 'loading'});
 //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/next_matches?callback=JSON_CALLBACK').then(function(resp) {
 $http.get('http://www.islamabadunited.com/wp-json/wp/v2/next_matches?callback=JSON_CALLBACK').then(function(resp) {
    $ionicLoading.hide();
    $scope.matches = resp.data;
    countdown();
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });

 


})

.controller('GalleryCtrl', function($scope, $http, $ionicLoading) {
    AdMob.showInterstitial();

})

.controller('VideosCtrl', function($scope, $http, $ionicLoading) {
  $scope.openInExternalBrowser = function()
  {
    var url = $('#vidlink span').html();
    // Open in external browser
    window.open(url,'_system','location=yes'); 
  };
  $scope.videos = [];
  $ionicLoading.show({template: 'loading'});
 //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/next_matches?callback=JSON_CALLBACK').then(function(resp) {
 $http.get('http://www.islamabadunited.com/wp-json/wp/v2/videos?callback=JSON_CALLBACK').then(function(resp) {
    $ionicLoading.hide();
    //$scope.videos = resp.data;
    var videoslist = [];
    $scope.videos = resp.data;

    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('MemeCtrl', function($scope, $http, $ionicLoading) {
  $scope.memes = [];
  $ionicLoading.show({template: 'loading'});
 //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/memes?callback=JSON_CALLBACK').then(function(resp) {
 $http.get('http://www.islamabadunited.com/wp-json/wp/v2/memes?callback=JSON_CALLBACK').then(function(resp) {
    $ionicLoading.hide();
    $scope.memes = resp.data;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('TeamCtrl', function($scope, $http, $ionicLoading) {
  $scope.plyers = [];
  $ionicLoading.show({template: 'loading'});
 //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/players_list?callback=JSON_CALLBACK').then(function(resp) {
 $http.get('http://www.islamabadunited.com/wp-json/wp/v2/players_list?callback=JSON_CALLBACK').then(function(resp) {
    $ionicLoading.hide();
    $scope.players = resp.data;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
.controller('NewsCtrl', function($scope, $http, $ionicLoading) {
  $scope.posts = [];
  $ionicLoading.show({template: 'loading'});
 //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/posts?callback=JSON_CALLBACK').then(function(resp) {
 $http.get('http://www.islamabadunited.com/wp-json/wp/v2/posts?filter[category__not_in][]=85?callback=JSON_CALLBACK').then(function(resp) {
    $ionicLoading.hide();
    $scope.posts = resp.data;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
.controller('FansClubCtrl', function($scope, $http, $ionicLoading) {
  
    AdMob.showInterstitial();
    
    $ionicLoading.show({template: 'loading'});


  $http.get('http://mapps.cricbuzz.com/cbzvernacular/hindi/stats/player/'+playerId)
  .then(function(resp){
    $scope.playerDetails=resp.data;

    if (resp.data.batting.stats.test && resp.data.batting.stats.odi && resp.data.batting.stats.t20) {

      $scope.career=[{"name":resp.data.batting.title[0], "test":resp.data.batting.stats.test.matches, "odi":resp.data.batting.stats.odi.matches, "t20":resp.data.batting.stats.t20.matches},
      {"name":resp.data.batting.title[1], "test":resp.data.batting.stats.test.innings, "odi":resp.data.batting.stats.odi.innings, "t20":resp.data.batting.stats.t20.innings},
      {"name":resp.data.batting.title[2], "test":resp.data.batting.stats.test.runs, "odi":resp.data.batting.stats.odi.runs, "t20":resp.data.batting.stats.t20.runs},
      {"name":resp.data.batting.title[3], "test":resp.data.batting.stats.test.avg, "odi":resp.data.batting.stats.odi.avg, "t20":resp.data.batting.stats.t20.avg},
      {"name":resp.data.batting.title[4], "test":resp.data.batting.stats.test.sr, "odi":resp.data.batting.stats.odi.sr, "t20":resp.data.batting.stats.t20.sr},
      {"name":resp.data.batting.title[5], "test":resp.data.batting.stats.test.no, "odi":resp.data.batting.stats.odi.no, "t20":resp.data.batting.stats.t20.no},
      {"name":resp.data.batting.title[6], "test":resp.data.batting.stats.test.highest, "odi":resp.data.batting.stats.odi.highest, "t20":resp.data.batting.stats.t20.highest},
      {"name":resp.data.batting.title[7], "test":resp.data.batting.stats.test.balls, "odi":resp.data.batting.stats.odi.balls, "t20":resp.data.batting.stats.t20.balls},
      {"name":resp.data.batting.title[8], "test":resp.data.batting.stats.test["4s"], "odi":resp.data.batting.stats.odi["4s"], "t20":resp.data.batting.stats.t20["4s"]},
      {"name":resp.data.batting.title[9], "test":resp.data.batting.stats.test["6s"], "odi":resp.data.batting.stats.odi["6s"], "t20":resp.data.batting.stats.t20["6s"]},
      {"name":resp.data.batting.title[10], "test":resp.data.batting.stats.test["0s"], "odi":resp.data.batting.stats.odi["0s"], "t20":resp.data.batting.stats.t20["0s"]},
      {"name":resp.data.batting.title[11], "test":resp.data.batting.stats.test["50s"], "odi":resp.data.batting.stats.odi["50s"], "t20":resp.data.batting.stats.t20["50s"]},
       {"name":resp.data.batting.title[12], "test":resp.data.batting.stats.test["100s"], "odi":resp.data.batting.stats.odi["100s"], "t20":resp.data.batting.stats.t20["100s"]},
       {"name":resp.data.batting.title[13], "test":resp.data.batting.stats.test["200s"], "odi":resp.data.batting.stats.odi["200s"], "t20":resp.data.batting.stats.t20["200s"]},
       {"name":resp.data.batting.title[14], "test":resp.data.batting.stats.test["300s"], "odi":resp.data.batting.stats.odi["300s"], "t20":resp.data.batting.stats.t20["300s"]},
       {"name":resp.data.batting.title[15], "test":resp.data.batting.stats.test["400s"], "odi":resp.data.batting.stats.odi["400s"], "t20":resp.data.batting.stats.t20["400s"]}];
     }
     else if (!resp.data.batting.stats.test && resp.data.batting.stats.odi && resp.data.batting.stats.t20) 
     {
      $scope.career=[{"name":resp.data.batting.title[0], "test":"-", "odi":resp.data.batting.stats.odi.matches, "t20":resp.data.batting.stats.t20.matches},
           {"name":resp.data.batting.title[1], "test":"-", "odi":resp.data.batting.stats.odi.innings, "t20":resp.data.batting.stats.t20.innings},
           {"name":resp.data.batting.title[2], "test":"-", "odi":resp.data.batting.stats.odi.runs, "t20":resp.data.batting.stats.t20.runs},
           {"name":resp.data.batting.title[3], "test":"-", "odi":resp.data.batting.stats.odi.avg, "t20":resp.data.batting.stats.t20.avg},
           {"name":resp.data.batting.title[4], "test":"-", "odi":resp.data.batting.stats.odi.sr, "t20":resp.data.batting.stats.t20.sr},
           {"name":resp.data.batting.title[5], "test":"-", "odi":resp.data.batting.stats.odi.no, "t20":resp.data.batting.stats.t20.no},
           {"name":resp.data.batting.title[6], "test":"-", "odi":resp.data.batting.stats.odi.highest, "t20":resp.data.batting.stats.t20.highest},
           {"name":resp.data.batting.title[7], "test":"-", "odi":resp.data.batting.stats.odi.balls, "t20":resp.data.batting.stats.t20.balls},
           {"name":resp.data.batting.title[8], "test":"-", "odi":resp.data.batting.stats.odi["4s"], "t20":resp.data.batting.stats.t20["4s"]},
           {"name":resp.data.batting.title[9], "test":"-", "odi":resp.data.batting.stats.odi["6s"], "t20":resp.data.batting.stats.t20["6s"]},
           {"name":resp.data.batting.title[10], "test":"-", "odi":resp.data.batting.stats.odi["0s"], "t20":resp.data.batting.stats.t20["0s"]},
           {"name":resp.data.batting.title[11], "test":"-", "odi":resp.data.batting.stats.odi["50s"], "t20":resp.data.batting.stats.t20["50s"]},
            {"name":resp.data.batting.title[12], "test":"-", "odi":resp.data.batting.stats.odi["100s"], "t20":resp.data.batting.stats.t20["100s"]},
            {"name":resp.data.batting.title[13], "test":"-", "odi":resp.data.batting.stats.odi["200s"], "t20":resp.data.batting.stats.t20["200s"]},
            {"name":resp.data.batting.title[14], "test":"-", "odi":resp.data.batting.stats.odi["300s"], "t20":resp.data.batting.stats.t20["300s"]},
            {"name":resp.data.batting.title[15], "test":"-", "odi":resp.data.batting.stats.odi["400s"], "t20":resp.data.batting.stats.t20["400s"]}];
     }
     else if(!resp.data.batting.stats.test && !resp.data.batting.stats.odi && resp.data.batting.stats.t20)
     {
        $scope.career=[{"name":resp.data.batting.title[0], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20.matches},
             {"name":resp.data.batting.title[1], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20.innings},
             {"name":resp.data.batting.title[2], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20.runs},
             {"name":resp.data.batting.title[3], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20.avg},
             {"name":resp.data.batting.title[4], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20.sr},
             {"name":resp.data.batting.title[5], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20.no},
             {"name":resp.data.batting.title[6], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20.highest},
             {"name":resp.data.batting.title[7], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20.balls},
             {"name":resp.data.batting.title[8], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20["4s"]},
             {"name":resp.data.batting.title[9], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20["6s"]},
             {"name":resp.data.batting.title[10], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20["0s"]},
             {"name":resp.data.batting.title[11], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20["50s"]},
              {"name":resp.data.batting.title[12], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20["100s"]},
              {"name":resp.data.batting.title[13], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20["200s"]},
              {"name":resp.data.batting.title[14], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20["300s"]},
              {"name":resp.data.batting.title[15], "test":"-", "odi":"-", "t20":resp.data.batting.stats.t20["400s"]}];
     }

      else if (!resp.data.batting.stats.test && !resp.data.batting.stats.odi && !resp.data.batting.stats.t20) {
        $scope.career=[{"name":resp.data.batting.title[0], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[1], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[2], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[3], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[4], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[5], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[6], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[7], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[8], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[9], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[10], "test":"-", "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[11], "test":"-", "odi":"-", "t20":"-"},
              {"name":resp.data.batting.title[12], "test":"-", "odi":"-", "t20":"-"},
              {"name":resp.data.batting.title[13], "test":"-", "odi":"-", "t20":"-"},
              {"name":resp.data.batting.title[14], "test":"-", "odi":"-", "t20":"-"},
              {"name":resp.data.batting.title[15], "test":"-", "odi":"-", "t20":"-"}];
      }
      else if (resp.data.batting.stats.test && !resp.data.batting.stats.odi && resp.data.batting.stats.t20) {
        $scope.career=[{"name":resp.data.batting.title[0], "test":resp.data.batting.stats.test.matches, "odi":"-", "t20":resp.data.batting.stats.t20.matches},
             {"name":resp.data.batting.title[1], "test":resp.data.batting.stats.test.innings, "odi":"-", "t20":resp.data.batting.stats.t20.innings},
             {"name":resp.data.batting.title[2], "test":resp.data.batting.stats.test.runs, "odi":"-", "t20":resp.data.batting.stats.t20.runs},
             {"name":resp.data.batting.title[3], "test":resp.data.batting.stats.test.avg, "odi":"-", "t20":resp.data.batting.stats.t20.avg},
             {"name":resp.data.batting.title[4], "test":resp.data.batting.stats.test.sr, "odi":"-", "t20":resp.data.batting.stats.t20.sr},
             {"name":resp.data.batting.title[5], "test":resp.data.batting.stats.test.no, "odi":"-", "t20":resp.data.batting.stats.t20.no},
             {"name":resp.data.batting.title[6], "test":resp.data.batting.stats.test.highest, "odi":"-", "t20":resp.data.batting.stats.t20.highest},
             {"name":resp.data.batting.title[7], "test":resp.data.batting.stats.test.balls, "odi":"-", "t20":resp.data.batting.stats.t20.balls},
             {"name":resp.data.batting.title[8], "test":resp.data.batting.stats.test["4s"], "odi":"-", "t20":resp.data.batting.stats.t20["4s"]},
             {"name":resp.data.batting.title[9], "test":resp.data.batting.stats.test["6s"], "odi":"-", "t20":resp.data.batting.stats.t20["6s"]},
             {"name":resp.data.batting.title[10], "test":resp.data.batting.stats.test["0s"], "odi":"-", "t20":resp.data.batting.stats.t20["0s"]},
             {"name":resp.data.batting.title[11], "test":resp.data.batting.stats.test["50s"], "odi":"-", "t20":resp.data.batting.stats.t20["50s"]},
              {"name":resp.data.batting.title[12], "test":resp.data.batting.stats.test["100s"], "odi":"-", "t20":resp.data.batting.stats.t20["100s"]},
              {"name":resp.data.batting.title[13], "test":resp.data.batting.stats.test["200s"], "odi":"-", "t20":resp.data.batting.stats.t20["200s"]},
              {"name":resp.data.batting.title[14], "test":resp.data.batting.stats.test["300s"], "odi":"-", "t20":resp.data.batting.stats.t20["300s"]},
              {"name":resp.data.batting.title[15], "test":resp.data.batting.stats.test["400s"], "odi":"-", "t20":resp.data.batting.stats.t20["400s"]}];
      }

      else if(resp.data.batting.stats.test && !resp.data.batting.stats.odi && !resp.data.batting.stats.t20)
      {
        $scope.career=[{"name":resp.data.batting.title[0], "test":resp.data.batting.stats.test.matches, "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[1], "test":resp.data.batting.stats.test.innings, "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[2], "test":resp.data.batting.stats.test.runs, "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[3], "test":resp.data.batting.stats.test.avg, "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[4], "test":resp.data.batting.stats.test.sr, "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[5], "test":resp.data.batting.stats.test.no, "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[6], "test":resp.data.batting.stats.test.highest, "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[7], "test":resp.data.batting.stats.test.balls, "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[8], "test":resp.data.batting.stats.test["4s"], "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[9], "test":resp.data.batting.stats.test["6s"], "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[10], "test":resp.data.batting.stats.test["0s"], "odi":"-", "t20":"-"},
             {"name":resp.data.batting.title[11], "test":resp.data.batting.stats.test["50s"], "odi":"-", "t20":"-"},
              {"name":resp.data.batting.title[12], "test":resp.data.batting.stats.test["100s"], "odi":"-", "t20":"-"},
              {"name":resp.data.batting.title[13], "test":resp.data.batting.stats.test["200s"], "odi":"-", "t20":"-"},
              {"name":resp.data.batting.title[14], "test":resp.data.batting.stats.test["300s"], "odi":"-", "t20":"-"},
              {"name":resp.data.batting.title[15], "test":resp.data.batting.stats.test["400s"], "odi":"-", "t20":"-"}];
      }
      else if(resp.data.batting.stats.test && resp.data.batting.stats.odi && !resp.data.batting.stats.t20)
      {
        $scope.career=[{"name":resp.data.batting.title[0], "test":resp.data.batting.stats.test.matches, "odi":resp.data.batting.stats.odi.matches, "t20":"-"},
             {"name":resp.data.batting.title[1], "test":resp.data.batting.stats.test.innings, "odi":resp.data.batting.stats.odi.innings, "t20":"-"},
             {"name":resp.data.batting.title[2], "test":resp.data.batting.stats.test.runs, "odi":resp.data.batting.stats.odi.runs, "t20":"-"},
             {"name":resp.data.batting.title[3], "test":resp.data.batting.stats.test.avg, "odi":resp.data.batting.stats.odi.avg, "t20":"-"},
             {"name":resp.data.batting.title[4], "test":resp.data.batting.stats.test.sr, "odi":resp.data.batting.stats.odi.sr, "t20":"-"},
             {"name":resp.data.batting.title[5], "test":resp.data.batting.stats.test.no, "odi":resp.data.batting.stats.odi.no, "t20":"-"},
             {"name":resp.data.batting.title[6], "test":resp.data.batting.stats.test.highest, "odi":resp.data.batting.stats.odi.highest, "t20":"-"},
             {"name":resp.data.batting.title[7], "test":resp.data.batting.stats.test.balls, "odi":resp.data.batting.stats.odi.balls, "t20":"-"},
             {"name":resp.data.batting.title[8], "test":resp.data.batting.stats.test["4s"], "odi":resp.data.batting.stats.odi["4s"], "t20":"-"},
             {"name":resp.data.batting.title[9], "test":resp.data.batting.stats.test["6s"], "odi":resp.data.batting.stats.odi["6s"], "t20":"-"},
             {"name":resp.data.batting.title[10], "test":resp.data.batting.stats.test["0s"], "odi":resp.data.batting.stats.odi["0s"], "t20":"-"},
             {"name":resp.data.batting.title[11], "test":resp.data.batting.stats.test["50s"], "odi":resp.data.batting.stats.odi["50s"], "t20":"-"},
              {"name":resp.data.batting.title[12], "test":resp.data.batting.stats.test["100s"], "odi":resp.data.batting.stats.odi["100s"], "t20":"-"},
              {"name":resp.data.batting.title[13], "test":resp.data.batting.stats.test["200s"], "odi":resp.data.batting.stats.odi["200s"], "t20":"-"},
              {"name":resp.data.batting.title[14], "test":resp.data.batting.stats.test["300s"], "odi":resp.data.batting.stats.odi["300s"], "t20":"-"},
              {"name":resp.data.batting.title[15], "test":resp.data.batting.stats.test["400s"], "odi":resp.data.batting.stats.odi["400s"], "t20":"-"}];
      }
      else if(!resp.data.batting.stats.test && resp.data.batting.stats.odi && !resp.data.batting.stats.t20)
      {
        $scope.career=[{"name":resp.data.batting.title[0], "test":"-", "odi":resp.data.batting.stats.odi.matches, "t20":"-"},
             {"name":resp.data.batting.title[1], "test":"-", "odi":resp.data.batting.stats.odi.innings, "t20":"-"},
             {"name":resp.data.batting.title[2], "test":"-", "odi":resp.data.batting.stats.odi.runs, "t20":"-"},
             {"name":resp.data.batting.title[3], "test":"-", "odi":resp.data.batting.stats.odi.avg, "t20":"-"},
             {"name":resp.data.batting.title[4], "test":"-", "odi":resp.data.batting.stats.odi.sr, "t20":"-"},
             {"name":resp.data.batting.title[5], "test":"-", "odi":resp.data.batting.stats.odi.no, "t20":"-"},
             {"name":resp.data.batting.title[6], "test":"-", "odi":resp.data.batting.stats.odi.highest, "t20":"-"},
             {"name":resp.data.batting.title[7], "test":"-", "odi":resp.data.batting.stats.odi.balls, "t20":"-"},
             {"name":resp.data.batting.title[8], "test":"-", "odi":resp.data.batting.stats.odi["4s"], "t20":"-"},
             {"name":resp.data.batting.title[9], "test":"-", "odi":resp.data.batting.stats.odi["6s"], "t20":"-"},
             {"name":resp.data.batting.title[10], "test":"-", "odi":resp.data.batting.stats.odi["0s"], "t20":"-"},
             {"name":resp.data.batting.title[11], "test":"-", "odi":resp.data.batting.stats.odi["50s"], "t20":"-"},
              {"name":resp.data.batting.title[12], "test":"-", "odi":resp.data.batting.stats.odi["100s"], "t20":"-"},
              {"name":resp.data.batting.title[13], "test":"-", "odi":resp.data.batting.stats.odi["200s"], "t20":"-"},
              {"name":resp.data.batting.title[14], "test":"-", "odi":resp.data.batting.stats.odi["300s"], "t20":"-"},
              {"name":resp.data.batting.title[15], "test":"-", "odi":resp.data.batting.stats.odi["400s"], "t20":"-"}];
      }

    console.log(resp.data);
    $ionicLoading.hide();
    // $ionicSlideBoxDelegate.update();
  })





})
.controller('PlayerDetailCtrl', function($scope, $http, $ionicLoading, $stateParams) {
  $scope.playerid = $stateParams.playerid;
  $scope.player = [];
  $ionicLoading.show({template: 'loading'});
 //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/player/' + $scope.playerid + '?callback=JSON_CALLBACK').then(function(resp) {
 $http.get('http://www.islamabadunited.com/wp-json/wp/v2/player/' + $scope.playerid + '?callback=JSON_CALLBACK').then(function(resp) {
    $ionicLoading.hide();
    $scope.player = resp.data;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
}).controller('postDetailCtrl', function($scope, $http, $ionicLoading, $stateParams) {
  $scope.postid = $stateParams.postid;
  $scope.post = [];
  $ionicLoading.show({template: 'loading'});
 //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/posts/' + $scope.postid + '?callback=JSON_CALLBACK').then(function(resp) {
 $http.get('http://www.islamabadunited.com/wp-json/wp/v2/posts/' + $scope.postid + '?callback=JSON_CALLBACK').then(function(resp) {
    $ionicLoading.hide();
    $scope.post = resp.data;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
}).controller('fanPostDetailCtrl', function($scope, $http, $ionicLoading, $stateParams) {
  $scope.fanpostid = $stateParams.fanpostid;
  $scope.fanpost = [];
  $ionicLoading.show({template: 'loading'});
 //$http.get('http://www.islamabadunited.com/demoisbunited/wp-json/wp/v2/posts/' + $scope.postid + '?callback=JSON_CALLBACK').then(function(resp) {
 $http.get('http://www.islamabadunited.com/wp-json/wp/v2/posts/' + $scope.fanpostid + '?callback=JSON_CALLBACK').then(function(resp) {
    $ionicLoading.hide();
    $scope.fanpost = resp.data;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
.controller('AboutCtrl', function($scope) {
    $scope.openInExternalBrowser = function()
    {
       // Open in external browser
       window.open('http://www.islamabadunited.com/about-us','_system','location=yes'); 
    };
});

nameApp.controller('HomeCtrl', function($scope, $ionicSideMenuDelegate) {

    setInterval(function(){ 
    //console.log($ionicSideMenuDelegate.isOpen()); 
  }, 1000);  

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
   
});

