app.controller('controller', function($scope, $uibModal, dataService) {
    $scope.loading = true;
    $scope.imageList = null;
    $scope.preferences = {};
    $scope.init = function(where) {
        $scope.isLoading = true;
        dataService.getData().then(function(response) {
            $scope.loading = false;
            $scope.imageList = response;
            initalizeImages();
        });
    };

    $scope.setSortingOrder = function(pref) {
        $scope.selectedOrder = pref;
    }

    var getSizes = function(id) {
        dataService.getSize(id).then(function(response) {
            $scope.selectedDetails = response.sizes.size;
        });
    };


    $scope.open = function(img) {
        $scope.selectedImg = img;
        getSizes(img.id);
        var modalInstance = $uibModal.open({
            templateUrl: 'modalContent.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope
        });


    };


    var initalizeImages = function() {
        $scope.img = [];
        //populate first 8 images
        for (var i = 0; i < 8; i++) {
            var sampleImgObj = $scope.imageList.photos.photo[i];
            var urlDefault = 'https://farm' + sampleImgObj.farm + '.staticflickr.com/' + sampleImgObj.server + '/' + sampleImgObj.id + '_' + sampleImgObj.secret + '.jpg';

            $scope.img.push({
                id: sampleImgObj.id,
                title: sampleImgObj.title,
                src: urlDefault
            });
        }
    }

    $scope.loadMore = function() {
        if ($scope.imageList === null) {
            return;
        }

        var last = $scope.img.length;
        if (last < $scope.imageList.photos.photo.length) {
            for (var i = last + 1; i < last + 5; i++) {
                var sampleImgObj = $scope.imageList.photos.photo[i];
                var urlDefault = 'https://farm' + sampleImgObj.farm + '.staticflickr.com/' + sampleImgObj.server + '/' + sampleImgObj.id + '_' + sampleImgObj.secret + '.jpg';
                $scope.img.push({
                    id: sampleImgObj.id,
                    title: sampleImgObj.title,
                    src: urlDefault
                });
            }
        }

    };
});

app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance) {
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
