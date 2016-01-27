var app = angular.module('movieReviews',[]);
var today = new Date();

app.controller('ReviewController', function($scope, $sce, movieService){
    
    $scope.reviews = [
        {
            movie: {
                title: 'The Revenant',
                year: '2015',
                imdb: 'tt1663202',
                posterUrl: ''
            },
            author: 'Nick',
            createdDate: today,
            fullReview: '<p>A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.</p>'
        },
        {
            movie: {
                title: 'Star Wars: The Force Awakens',
                year: '2015',
                imdb: 'tt2488496',
                posterUrl: ''
            },
            author: 'Nick',
            createdDate: today,
            fullReview: '<p>Three decades after the defeat of the Galactic Empire, a new threat arises. The First Order attempts to rule the galaxy and only a ragtag group of heroes can stop them, along with the help of the Resistance.</p>'
        }
    ];
    
    angular.forEach($scope.reviews, function(value, key){
      movieService.getMovieDetails(value.movie.imdb).then(function(response) {
        value.movie.posterUrl = response.data.Poster;
      });
    });    

    $scope.renderHtml = function(htmlInput) {
      return $sce.trustAsHtml(htmlInput);  
    };

});


// movieService can be used in a controller like this: 
// movieService.getMovieDetails("Pulp Fiction").success(function (data) {
//    $scope.movie = data 
// }

app.factory('movieService', ['$http', function ($http) { 
    return {
        getMovieDetails: function (imdbId) {
            var getData = {
                method: 'jsonp',
                url: 'http://www.omdbapi.com/?i=' + imdbId, //add +'&apikey=YOUR_API_KEY' if you have one.
                headers: {
                    'Content-Type': undefined
                },
                params : {
                    callback : 'JSON_CALLBACK'
                }

            };
            return $http(getData)
        }

    }
}])