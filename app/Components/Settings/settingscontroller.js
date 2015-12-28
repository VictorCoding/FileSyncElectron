class SettingsCtrl {
  constructor() {
    this.showCurrentPaths();
  }
  
  savePath(type) {
    let content = fs.readFileSync('./settings.json', 'utf8');
    content = JSON.parse(content);

    if (type === 'json') {
      content.jsonPath = this.jsonPath;
    } else {
      content.propertiesPath = this.propertiesPath;
    }
    
    content = JSON.stringify(content);
    fs.writeFileSync('./settings.json', content);
    this.showCurrentPaths();
  }
  
  showCurrentPaths() {
    let content = fs.readFileSync('./settings.json');
    content = JSON.parse(content);
    
    this.currentJSONPath = content.jsonPath || 'No path set';
    this.currentPropertiesPath = content.propertiesPath || 'No path set';
  }
  
}      


angular.module('FileSync').controller('SettingsCtrl', SettingsCtrl);