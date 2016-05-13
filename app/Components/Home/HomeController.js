class HomeCtrl {
  constructor($mdDialog, $state) {
    this.$mdDialog = $mdDialog;
    this.$state = $state;
    this.checkLocalizationFilesSettings();
    
  }    
  
  checkLocalizationFilesSettings(ev) {
    const BASE_PATH = process.env.HOME;
    const jsonPath = `${BASE_PATH}/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/en_US.json`;
    const propertiesPath = `${BASE_PATH}/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_en_US.properties`;

    // lets make sure we know where the localization files are
    // if error is thrown more than likely is because iOfficeConnect directory
    // is not under /User/username/Workspace
    try {
      fs.statSync(jsonPath);
    } catch(e) {
      let content = fs.readFileSync('./settings.json', 'utf8');
      content = JSON.parse(content);
      
      if (!content.jsonPath || !content.propertiesPath) {
        this._showAlert();
      }
    }
    
  }
  
  _showAlert() {
    var alert = this.$mdDialog.alert({
      title: 'Please set path to localization files',
      ok: 'Ok'
    });        
          
    this.$mdDialog
        .show(alert)
        .finally(()=> {
          this.$state.go('settings');
        });
  }
}

angular.module('FileSync').controller('HomeCtrl', HomeCtrl);