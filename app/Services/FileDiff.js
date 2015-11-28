const fs = require('fs');

class FileDiff {
  constructor(firebaseDB) {
    angular.extend(this, {
      firebaseDB,
    });
    this.files = ['/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_de.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_en_GB.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_en_US.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_es.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_fr.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_ja.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_pt.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_sv.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_zh.properties',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/de_DE.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/default.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/en_GB.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/en_US.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/es_ES.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/fr_FR.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/ja_JP.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/pt_BR.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/sv_SE.json',
                  '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/zh_CN.json'];
    
    // this.firebaseDB.loadFiles().then((f) => this.files = f);
  }

  getDiff(jsonFile, propFile) {
    let jsonContent = fs.readFileSync(jsonFile, 'utf8');
    let propContent = fs.readFileSync(propFile, 'utf8');
    let jsonKeys = this._getKeys(jsonContent, 'json');
    let propKeys = this._getKeys(propContent);

    var keysDiff = this._compare(propKeys, jsonKeys);
    
    return {
      jsonKeys,
      propKeys,
      keysDiff,
    };
  }
  
  _getKeys(content, type) {
    if(type === 'json'){
      let pairsArr = content.split('\n');
      pairsArr.pop();
      pairsArr.shift();
      
      return _.map(pairsArr, (pair)=> {
        return pair.split(':')[0].split('"')[1];
      });
    } else {
      let pairsArr = content.split('\n');
      
      return _.map(pairsArr, (pair)=> {
        return pair.split('=')[0];
      });
    }
  }
  
  _compare(arr1, arr2) {
    var jsonTxtBlock = arr1.join('\n');
    var propTxtBlock = arr2.join('\n');
    
    return JsDiff.diffWords(jsonTxtBlock, propTxtBlock);
    
  }
}

angular.module('FileSync').service('FileDiff', FileDiff);
