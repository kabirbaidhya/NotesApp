(function() {

    var app = angular.module('notesApp');

    app.factory('Notes', function($http, App) {

        return {
            all: getAll,
            create: create,
            get: get,
            update: update,
            destroy: destroy
        };

        function getAll() {
            var url = App.apiUrl('notes');

            return $http.get(url);
        }

        function get(id) {
            var url = App.apiUrl('notes/' + id);

            return $http.get(url);
        }

        function create(data) {

            var url = App.apiUrl('notes/');

            return $http.post(url, data);
        }

        function update(id, data) {

            var url = App.apiUrl('notes/' + id);

            return $http.put(url, data);

        }

        function destroy(id) {
            var url = App.apiUrl('notes/' + id);

            return $http.delete(url);
        }
    });
})();
