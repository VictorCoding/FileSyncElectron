angular
      .module('FileSync')
      .service('firebaseDB', firebaseDB);
      

function firebaseDB(FIREBASEREF, $q){
    return {
      saveFilePath: saveFilePath,
      loadFiles: loadFiles
    };
    
    function saveFilePath(path){
      FIREBASEREF().child('Files').push(path).then(function(response){
        console.log(response);
      });
    }
    
    function loadFiles(){
      var defer = $q.defer();
      FIREBASEREF().child('Files').once('value', function(snapshot){
        defer.resolve(snapshot.val());
      });
      return defer.promise;
    }
}