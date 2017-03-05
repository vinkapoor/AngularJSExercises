angular.module('conFusion.controllers', [])

.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$localStorage', '$ionicPlatform', '$cordovaCamera', '$cordovaImagePicker', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = $localStorage.getObject('userinfo', '{}');
    $scope.reservation = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo', $scope.loginData);


        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    // Create the reserve modal that we will use later
    $ionicModal.fromTemplateUrl('templates/reserve.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.reserveform = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeReserve = function () {
        $scope.reserveform.hide();
    };

    // Open the login modal
    $scope.reserve = function () {
        $scope.reserveform.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doReserve = function () {
        console.log('Doing reservation', $scope.reservation);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeReserve();
        }, 1000);
    };

    $scope.registration = {};

    // Create the registration modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerform = modal;
    });

    // Triggered in the registration modal to close it
    $scope.closeRegister = function () {
        $scope.registerform.hide();
    };

    // Open the registration modal
    $scope.register = function () {
        $scope.registerform.show();
    };

    // Perform the registration action when the user submits the registration form
    $scope.doRegister = function () {
        console.log('Doing reservation', $scope.reservation);

        // Simulate a registration delay. Remove this and replace with your registration
        // code if using a registration system
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };
    $ionicPlatform.ready(function () {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $scope.takePicture = function () {
            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
                console.log("taken picture and set to registration");
            }, function (err) {
                console.log(err);
            });

            $scope.registerform.show();

        };
    });

    $ionicPlatform.ready(function () {
        var options = {
            maximumImagesCount: 1,
            width: 100,
            height: 100,
            quality: 80
        };

        $scope.selectPicture = function () {
            $cordovaImagePicker.getPictures(options).then(function (imageData) {
                //$scope.registration.imgSrc = "data:image/jpeg;base64," + imageData[0];
                $scope.registration.imgSrc = imageData[0];
                console.log("taken picture and set to registration");
            }, function (err) {
                console.log(err);
            });

            $scope.registerform.show();

        };
    });

}])

.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', 'dishes', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, dishes, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    $scope.baseURL = baseURL;
    console.log(baseURL);
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    $scope.dishes = dishes;
    /*
    menuFactory.query(
        function (response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
*/

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

    $scope.addFavorite = function (index) {
        favoriteFactory.addToFavorites(index);
        $ionicListDelegate.closeOptionButtons();

        $ionicPlatform.ready(function () {
            $cordovaLocalNotification.schedule({
                id: 1,
                title: "Added Favorite",
                text: $scope.dishes[index].name

            }).then(function () {
                    console.log('Added Favorite' + $scope.dishes[index].name);
                },
                function () {
                    console.log('Failed to add Notification');
                });

            $cordovaToast.show('Added Favorite' + $scope.dishes[index].name, 'long', 'center')
                .then(function (success) {
                    console.log('Added Favorite: success toast');
                }, function (error) {
                    console.log('Failed to raise favorite toast message');
                });

        });
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
            $scope.invalidChannelSelection = false;
            feedbackFactory.save($scope.feedback);
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

.controller('DishDetailController', ['$scope', 'dish', '$stateParams', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, dish, $stateParams, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    $scope.baseURL = baseURL;
    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = dish;
    /*
    $scope.dish = menuFactory.get({
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
        */

    // Create the popover 

    $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
        scope: $scope
    }).then(function (popover) {
        console.log("popover registered");
        $scope.mypopover = popover;
    });


    $scope.showPopover = function ($event) {
        $scope.mypopover.show($event);
        console.log("popover shown");
    };

    $scope.closePopover = function () {
        $scope.mypopover.hide();
        console.log("popover hidden");
    };


    $scope.addFavorites = function () {
        favoriteFactory.addToFavorites($scope.dish.id);
        $scope.mypopover.hide();
        console.log("in addFavorite");

        $ionicPlatform.ready(function () {
            $cordovaLocalNotification.schedule({
                id: 1,
                title: "Added Favorite",
                text: $scope.dish.name

            }).then(function () {
                    console.log('Added Favorite' + $scope.dishes[index].name);
                },
                function () {
                    console.log('Failed to add Notification');
                });

            $cordovaToast.show('Added Favorite' + $scope.dish.name, 'long', 'bottom')
                .then(function (success) {
                    console.log('Added Favorite: success toast');
                }, function (error) {
                    console.log('Failed to raise favorite toast message');
                });

        });

    };

    // Create the modal that we will use later
    $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.commentform = modal;
    });

    // Triggered in the comment modal to close it
    $scope.closeComment = function () {
        $scope.commentform.hide();
    };

    // Open the comment modal
    $scope.comment = function () {

        $scope.newcomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };

        $scope.commentform.show();
    };

    // Perform the action when the user submits the comment form
    $scope.addComment = function () {
        console.log('adding comment', $scope.newcomment);

        $scope.newcomment.date = new Date().toISOString();
        console.log($scope.newcomment);

        $scope.dish.comments.push($scope.newcomment);
        menuFactory.update({
            id: $scope.dish.id
        }, $scope.dish);

        $scope.closeComment();
        $scope.closePopover();

    };

        }])

.controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.mycomment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
    };

    $scope.submitComment = function () {

        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);

        $scope.dish.comments.push($scope.mycomment);
        menuFactory.update({
            id: $scope.dish.id
        }, $scope.dish);

        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
    }
        }])

// implement the IndexController and About Controller here

.controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', 'leader', 'dish', 'promotion', function ($scope, menuFactory, promotionFactory, corporateFactory, baseURL, leader, dish, promotion) {

    $scope.baseURL = baseURL;
    /*
    $scope.leader = corporateFactory.getLeader().get({
        id: 3
    });
    */
    $scope.leader = leader;

    $scope.showDish = false;
    $scope.message = "Loading ...";
    /*
    $scope.dish = menuFactory.get({
            id: 0
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
        */
    $scope.dish = dish;
    /*
    $scope.promotion = promotionFactory.get({
        id: 0
    });
    */
    $scope.promotion = promotion;

                    }])

.controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', 'leaders', function ($scope, corporateFactory, baseURL, leaders) {

    $scope.baseURL = baseURL;

    // $scope.leaders = corporateFactory.query();
    //console.log($scope.leaders);

    $scope.showLeaders = false;
    $scope.messageLeaders = "Loading ...";


    $scope.leaders = leaders;
    /*
    $scope.leaders = corporateFactory.getLeaders().query(function (response) {
            $scope.leaders = response;
            $scope.showLeaders = true;
        },
        function (response) {
            $scope.messageLeaders = "Error : " + response.status + " " + response.statusText;
        });
        */


                    }])


.controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', '$ionicPlatform', '$cordovaVibration', function ($scope, dishes, favorites, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $ionicPlatform, $cordovaVibration) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    /*
    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading...'
    });*/

    //$scope.favorites = favoriteFactory.getFavorites();
    $scope.favorites = favorites;

    $scope.dishes = dishes;
    /*
    $scope.dishes = menuFactory.query(
        function (response) {
            $scope.dishes = response;
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
        });
        */

    $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;

    }

    $scope.deleteFavorite = function (index) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete this item?'

        });

        confirmPopup.then(function (res) {
            if (res) {
                favoriteFactory.deleteFromFavorites(index);
                // Vibrate 1000ms
                $ionicPlatform.ready(function () {
                    $cordovaVibration.vibrate(1000);
                    console.log("vibrating the device");
                })
            } else {
                console.log('Delete cancelled');
            }
        });

        $scope.shouldShowDelete = false;

    }

            }])

.filter('favoriteFilter', function () {
    return function (dishes, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < dishes.length; j++) {
                if (dishes[j].id == favorites[i].id)
                    out.push(dishes[j]);
            }
        }
        return out;
    }
})

;