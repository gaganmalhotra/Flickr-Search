'use strict';

var https = require('https');
var rp = require('request-promise');
const Promise = require('promise');

var init2 = function(page) {

    if (page === undefined || page === null) {
        page = 1;
    }

    return new Promise(function(resolve, reject) {

        var options = {
            uri: 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&page=' + page,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        rp(options)
            .then(function(parsedBody) {
                resolve(parsedBody);
            })
            .catch(function(err) {
                reject(err);
            });
    });
}


var getImageSizes = function(photoId) {
    return new Promise(function(resolve, reject) {
        var options = {
            uri: 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=a5e95177da353f58113fd60296e1d250&format=json&nojsoncallback=1&photo_id=' + photoId,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        rp(options)
            .then(function(parsedBody) {
                resolve(parsedBody);
            })
            .catch(function(err) {
                reject(err);
            });
    });

}

module.exports = {
    'getInitData': init2,
    'getImageSizes': getImageSizes
}
