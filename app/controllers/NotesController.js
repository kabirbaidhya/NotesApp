(function() {

    var app = angular.module('notesApp');

    app.controller('NotesController', function($scope, Notes) {

        /** Initialization **/
        $scope.noteList = [];

        Notes.fetchAll().success(function(response) {
            $scope.noteList = response;
        });


        $scope.viewNote = function(noteId) {

            $scope.$broadcast('request-note-details', {
                noteId: noteId
            });
        };

        $scope.createNote = function() {

            $scope.$broadcast('request-create-note-form');
        };

        $scope.editNote = function() {

            $scope.$broadcast('request-edit-note-form');
        };

        $scope.deleteNote = function(noteId) {

            $scope.$broadcast('request-delete-note', {
                noteId: noteId
            });

        };


    });

})();
