class HomeCtrl {
  constructor($mdDialog, $state) {
    this.$mdDialog = $mdDialog;
    this.$state = $state;
    this.checkLocalizationFilesSettings();
  }    
  
  checkLocalizationFilesSettings(ev) {
    var content = fs.readFileSync('./settings.json', 'utf8');
    content = JSON.parse(content);
    
    if (!content.jsonPath || !content.propertiesPath) {
      this._showAlert();
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