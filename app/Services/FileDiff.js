class FileDiff {
  constructor(firebaseDB) {
    angular.extend(this, {
      firebaseDB,
    });
    
    
    this.firebaseDB.loadFiles().then((f) => this.files = f);
  }

  getDiff() {
    
  }
}

angular.module('FileSync').service('FileDiff', FileDiff);
