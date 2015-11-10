angular
      .module('FileSync')
      .service('FileManager', FileManager);
      
      
function FileManager(){
  return {
      exists: exists,
      write: write
  };
  
  function exists(name){
    return IsThere(name);
  }
  
  function write(fileName, newText){   
    var fileContent = fs.readFileSync(fileName, 'utf8');       
    var fileExtension = fileName.split('.')[1];
    var defaultsFiles = ['en_US', 'default', 'en_GB', 'iOfficeConnect', 'iOfficeConnect_en_US',
                        'iOfficeConnect_en_GB'];
                        //Crazy chain!
                        // 1. Split filename by the period. Then grab the first item, which
                        //    will be the file path without the extension.
                        // 2. Then split it by the '/' to seperate the directories names
                        // 3. You figure out the last index of '/' and splice that mofo right there,
                        //    which will return you the last name being the actual localization file name.
    var locale =  fileName.split('.')[0].split('/').splice(_.lastIndexOf(fileName.split('.')[0].split('/'), '/'))[0];    
    var pos;
    
    fileContent = fileContent.split('\n');
    pos = fileContent.length;
    
    if(newText && fileName){            
      if(fileExtension === 'json'){        
        //replace the equal sign(=) with quotes and a colon(": ")
        if(defaultsFiles.indexOf(locale) < 0){
          newText = newText.replace(/=/gi, '": "!!');
        } else {
          newText = newText.replace(/=/gi, '": "');
        }
        //wrap everything in double quotes because json
        //and two tabs because code styles
        //ex: "this_is_a_key": "this is a key"
        newText = '  "' + newText + '"';                
        
        pos = pos - 1;
        var lastItem = fileContent[pos - 1] + ',';
        fileContent.splice(pos - 1, 1, lastItem);
      } else {
        if(defaultsFiles.indexOf(locale) < 0){
          newText = newText.replace(/=/gi, '=!!');
        }
      }      
                              
      fileContent.splice(pos, 0, newText);
      fileContent = fileContent.join('\n');      
    }
    fs.writeFileSync(fileName, fileContent);
  }
}
