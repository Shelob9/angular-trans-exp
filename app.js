/* globals ANGTREX */
var angtrex = angtrex || {};

angtrex.app = angular.module( 'angtrex', [
        'ui.router',
        'ngResource'
    ]

);

/**
 * Translations
 */
angtrex.app.service('translationService', function ($scope) {
    $scope.translations = ANGTREX.translations;

});

/*
 * UI Router States
 */
angtrex.app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/posts');
    $stateProvider
        .state('list', {
            url: '/posts',
            templateUrl: ANGTREX.partials_dir + 'posts.html',
            controller: 'ListController'
        })
        .state('single', {
            url: '/posts/:id',
            templateUrl: ANGTREX.partials_dir + 'post.html',
            controller: 'SingleController'
        })


});


/**
 * List Controller
 */
angtrex.app.controller( 'ListController', ['$scope', '$rootScope', 'postsFactory', 'translationService', function( $scope, $rootScope, postsFactory, translationService  ){
    postsFactory.query(function(res){
        $scope.posts = res;
        console.log( $scope.posts );
    });

}]);

/*
 * Single post controller
 */
angtrex.app.controller( 'SingleController', ['$scope', '$rootScope', 'postsFactory', '$stateParams', function( $scope, $rootScope, postsFactory, $stateParams, translationService ){

    postsFactory.get({ id: $stateParams.id}, function(res){
        $scope.post = res;
    })

}]);

/**
 * Posts Factory
 */
angtrex.app.factory( 'postsFactory', function( $resource ){
    return $resource( ANGTREX.api_url + 'wp/v2/posts/:id', {
        id: '@id'
    },{
        'query':{
            method: 'GET',
            isArray: true,
            url: ANGTREX.api_url + 'wp/v2/posts?filter[posts_per_page]=-1',
        },
        'update':{
            method:'POST',
            headers: {
                'X-WP-Nonce': ANGTREX.nonce
            }
        },
        'post':{
            method:'POST',
            headers: {
                'X-WP-Nonce': ANGTREX.nonce
            }
        },
        'save':{
            method:'POST',
            headers: {
                'X-WP-Nonce': ANGTREX.nonce
            }
        },
        'delete':{
            method:'DELETE',
            headers: {
                'X-WP-Nonce': ANGTREX.nonce
            }
        }
    });
} );
