angular
      .module('FileSync')
      .directive('navToolbar', navToolbar);
      
function navToolbar() {
  return {
    templateUrl: 'Directives/navToolbar/NavToolbar.html'
  };
}     