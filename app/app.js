var fs = require('fs');
var IsThere = require('is-there');
var clipboard = require('clipboard');
  
angular
      .module('FileSync', ['ngMaterial'])
      .constant('FIREBASEREF', function(){
        return new Firebase('https://filesync.firebaseio.com');
      })
      .controller('MainCtrl', MainCtrl);
          
function MainCtrl(FileManager, $timeout, firebaseDB){    
  var mc = this,        
      fm = FileManager;
      
  mc.checkedFile = false;
  mc.dupFileError = false;
  mc.FilesToWriteTo = [];    
  mc.englishFileContent = fs.readFileSync('/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_en_US.properties', 'utf8').split('\n');
  
  firebaseDB.loadFiles().then(function(files){                
    if(files){
      angular.forEach(files, function(file){          
        mc.FilesToWriteTo.push(file);
      });
    }
  });
  
  mc.addFile = function addFile(file){   
    if(mc.FilesToWriteTo.indexOf(file) > -1){
      mc.dupFileError = true;
      $timeout(function(){
        mc.dupFileError = false;
      }, 2000);
      return;
    }
    mc.FileExists = fm.exists(file);
    mc.checkedFile = true;
    
    if(mc.FileExists){
      mc.FilesToWriteTo.push(file);
      firebaseDB.saveFilePath(file);
    }
    
  };
  
  
  mc.writeToAll = function writeToAll(text){
    if(mc.FilesToWriteTo.length > 0){
      angular.forEach(mc.FilesToWriteTo, function(file){          
        FileManager.write(file, text);
      });
    }
  };
  
  mc.paste = function paste(location){
    
    if(location === 'filepath'){
      mc.FileName = clipboard.readText();
    } else if(location === 'content') {
      mc.TextToWrite = clipboard.readText();
    }
    
  };        
  
}
  
  
