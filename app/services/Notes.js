(function() {

    var app = angular.module('notesApp');

    app.factory('Notes', function($http, App) {

        return {
            fetchAll: fetchAll,
            fetch: fetch,
            create: create,
            update: update,
            destroy: destroy
        };

        function fetchAll() {
            var url = App.apiUrl('notes');

            return $http.get(url);
        }

        function fetch(id) {
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
