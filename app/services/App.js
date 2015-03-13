(function() {

    var app = angular.module('notesApp');

    var apiBase = 'http://127.0.0.1:8080/';

    app.factory('App', function($http) {

        return {
            apiUrl: function getApiUrl(path) {
                return apiBase + (path || '');
            }
        };


    });
})();
