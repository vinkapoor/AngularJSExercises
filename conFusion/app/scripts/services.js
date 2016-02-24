'use strict';

angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3000/")

.service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {




    this.getDishes = function () {
        //var addr = baseURL + "/dishes"
        //console.log(addr);
        //return $http.get(baseURL + "dishes");
        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

    };

    this.getPromotions = function () {

        return $resource(baseURL + "promotions", null, {
            'update': {
                method: 'PUT'
            }
        });

    }


}])

.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    var corpfac = {};

    // Implement two functions, one named getLeaders,
    // the other named getLeader(index)
    // Remember this is a factory not a service

    corpfac.getLeaders = function () {
        return $resource(baseURL + "leadership", null, {
            'update': {
                method: 'PUT'
            }
        });
    }

    corpfac.getLeader = function () {
        return $resource(baseURL + "leadership/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }


    return corpfac;
}])

.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    var feedbackfac = {};

    feedbackfac.postFeedback = function () {
        return $resource(baseURL + "feedback", null, {
            'update': {
                method: 'POST'
            }
        });
    }

    return feedbackfac;
}])

;