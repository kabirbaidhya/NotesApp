(function() {

    var app = angular.module('notesApp');

    app.controller('NotesController', function($scope, Notes) {

        $scope.noteList = [];

        Notes.fetchAll()
            .success(function(response) {
                $scope.noteList = response;
            });

    });
})();
