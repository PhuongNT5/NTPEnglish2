angular.module('app.admin')
    .component('createLesson', {
        templateUrl: 'app/components/admin/lessonmanage/createlesson/createlesson.html',
        controller: createlessonController,
        controllerAs: 'vm',
        bindings: {

        }
    });
createlessonController.$inject = ['$q', '$http', '$state', '$scope', 'lessonService', 'unitService'];

function createlessonController($q, $http, $state, $scope, lessonService, unitService) {
    var vm = this;
    vm.lesson = {};
    vm.createlesson = createlesson;
    init();

    function createlesson()
    if (!vm.lesson.name) {
        toastr.error('Lesson Name must not empty');
    }
    function successCallBack(response) {
        $state.go('admin.lessonmanage', { reload: true });
        lessonService.loadLessons().then(function (lesson) {
            vm.lesson = lesson;
        }, function (err) {
            console.log(err);
            toastr.error(err.message);
        });
    }

    function errorCallBack(err) {
        console.log(err);
        toastr.error(err.message);
    }
    lessonService.createLesson(vm.lesson).then(successCallBack, errorCallBack);

};
function init() {
    unitService.loadUnits().then(function (unit) {
        vm.units = unit;
    }, function (err) {
        console.log(err);
        toastr.error(err.message);
    })
}

}