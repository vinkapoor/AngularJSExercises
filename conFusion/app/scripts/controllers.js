'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    //$scope.dishes = [];

    $scope.dishes = menuFactory.getDishes().query(function (response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });



    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };
                }])

.controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

        }])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.sendFeedback = function () {

        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        } else {

            feedbackFactory.postFeedback().save(null, $scope.feedback);

            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
        }])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {



    //$scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";


    $scope.dish = menuFactory.getDishes().get({
            id: parseInt($stateParams.id, 10)
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );



        }])

.controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.feedbackComment = {
        rating: "",
        comment: "",
        author: "",
        date: ""
    };

    $scope.submitComment = function () {

        //Step 2: This is how you record the date
        //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
        $scope.feedbackComment.date = new Date().toISOString();

        // Step 3: Push your comment into the dish's comment array
        //$scope.dish.comments.push("Your JavaScript Object holding the comment");
        $scope.dish.comments.push($scope.feedbackComment);


        menuFactory.getDishes().update({
            id: $scope.dish.id
        }, $scope.dish);


        //Step 4: reset your form to pristine
        $scope.commentForm.$setPristine();

        //Step 5: reset your JavaScript object that holds your comment
        $scope.feedbackComment = {
            rating: "",
            comment: "",
            author: "",
            date: ""
        };
    }
        }])


// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

    $scope.showPromotion = false;
    $scope.messagePro = "Loading ... "

    $scope.promotions = menuFactory.getPromotions().query(function (response) {
            var allPromotions = response;
            $scope.promotions = allPromotions[0];
            $scope.showPromotion = true;
        },
        function (response) {
            $scope.messagePro = "Error : " + response.status + " " + response.statusText;
        });





    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.featuredDish = menuFactory.getDishes().get({
            id: 0
        })
        .$promise.then(
            function (response) {
                $scope.featuredDish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );



    $scope.showLeader = false;
    $scope.messageLeader = "Loading ...";

    $scope.leader = corporateFactory.getLeader().get({
            id: 0
        })
        .$promise.then(
            function (response) {
                $scope.leader = response;
                $scope.showLeader = true;
            },
            function (response) {
                $scope.messageLeader = "Error: " + response.status + " " + response.statusText;
            }
        );


}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

    $scope.showLeaders = false;
    $scope.messageLeaders = "Loading ...";

    $scope.leaders = corporateFactory.getLeaders().query(function (response) {
            $scope.leaders = response;
            $scope.showLeaders = true;
        },
        function (response) {
            $scope.messageLeaders = "Error : " + response.status + " " + response.statusText;
        });
}])

;