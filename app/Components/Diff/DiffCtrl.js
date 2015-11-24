class DiffController {
  contructor(FileDiff) {
    angular.extend(this, {
      FileDiff
    });        
  }
  
}

angular.module('FileSync').controller('DiffCtrl', DiffController);