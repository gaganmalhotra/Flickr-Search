app.service('dataService', function($http, $q) {
    this.getData = function() {
        deferred = $q.defer();
        $http({
            method: 'GET',
            //url: 'http://localhost:8080/data'
            url: 'https://flickrsearch.mybluemix.net/data'
        }).then(function(data) {
            deferred.resolve(data.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.getSize = function(photoId) {
        deferred = $q.defer();
        //$http.post('http://localhost:8080/getSize', { id:photoId })
        $http.post('https://flickrsearch.mybluemix.net/getSize', {
                id: photoId
            })
            .then(function(data) {
                deferred.resolve(data.data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }
});
