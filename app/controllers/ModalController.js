(function() {

    var app = angular.module('notesApp');

    app.controller('ModalController', function($scope, Notes) {

        $scope.modalBox = {
            title: null,
            type: 'view'
        };

        $scope.activeNote = {};

        $scope.editSave = scopeUpdateNote;
        $scope.editCancel = scopeCancelEdit;
        $scope.createSave = scopeSaveNote;
        $scope.createCancel = scopeCancelCreate;

        $scope.$on('request-note-details', function(e, args) {

            var noteItem = Notes.findInList(args.noteId, $scope.noteList);

            setActiveItem(noteItem);

            setupModal(noteItem.title, 'view');
        });

        $scope.$on('request-edit-note-form', function() {

            var item = getActiveItem();

            setupModal('Edit Note', 'edit', item);

        });

        $scope.$on('request-create-note-form', function() {

            setupModal('Add Note', 'create');

        });

        $scope.$on('request-delete-note', function(e, args) {
            var noteId = args.noteId;
            Notes.destroy(noteId)
                .success(function() {

                    forItem(noteId, function(index) {
                        if (index > -1) {
                            $scope.noteList.splice(index, 1);
                        }
                    });

                });
        });

        function scopeUpdateNote() {

            var noteId = $scope.form.id;
            var data = {
                title: $scope.form.title,
                text: $scope.form.text
            };

            Notes.update(noteId, data)
                .success(function(response) {

                    forItem(noteId, function(index) {
                        $scope.noteList[index] = response.note;
                    });

                    hideModalBox();
                });

        }


        function scopeCancelEdit() {

            setupModal(getActiveItem().title, 'view');

        }

        function scopeSaveNote() {

            var data = {
                title: $scope.form.title,
                text: $scope.form.text
            };

            Notes.create(data)
                .success(function(response) {

                    $scope.noteList.push(response.note);

                    hideModalBox();
                });

        }

        function scopeCancelCreate() {
            hideModalBox();
        }

        function setupModal(title, type, formData) {
            $scope.modalBox.title = title;
            $scope.modalBox.type = type;
            $scope.form = formData || {};
        }

        function hideModalBox() {
            $('#note-modal-box').modal('hide');
        }

        function setActiveItem(item) {
            console.log('active item set to : ', item);
            $scope.activeNote = item;
        }

        function getActiveItem() {
            return $scope.activeNote;
        }

        function forItem(noteId, callback) {
            var list = $scope.noteList;
            for (var i = 0; i < list.length; i++) {

                var item = list[i];

                if (item.id == noteId) {
                    callback(i, list[i]);
                    break;
                }
            }
        }

    });

})();
