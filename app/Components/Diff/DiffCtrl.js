angular
      .module('FileSync')
      .controller('DiffCtrl', DiffController);
      
function DiffController(FileDiff) {
  let self = this;
  
  self.languages = [
    {
      lang: 'English',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/en_US.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_en_US.properties'
    },
    {
      lang: 'Spanish',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/es_ES.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_es.properties'
    },
    {
      lang: 'Portuguese',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/pt_BR.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_pt.properties'
    },
    {
      lang: 'Default',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/default.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect.properties'
    },
    {
      lang: 'German',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/de_DE.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_de.properties'
    },
    {
      lang: 'Swedish',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/sv_SE.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_sv.properties'
    },
    {
      lang: 'Japanese',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/ja_JP.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_ja.properties'
    },
    {
      lang: 'Chinese',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/zh_CN.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_zh.properties'
    },
    {
      lang: 'French',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/fr_FR.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_fr.properties'
    },
    {
      lang: 'UK',
      json: '/Users/vramos/Workspace/iOfficeConnect/src/main/webapp/include/javascript/i18n/en_GB.json',
      prop: '/Users/vramos/Workspace/iOfficeConnect/src/main/resources/iOfficeConnect_en_GB.properties'
    }
  ];
                      
  self.showDiff = function showDiff(lang) {
    var chosenLang = _.filter(this.languages, (l)=> {
      return l.lang == lang.lang;
    })[0];
      
    var keys = FileDiff.getDiff(chosenLang.json, chosenLang.prop);
                                       
    self.propKeys = keys.propKeys;
    self.jsonKeys = keys.jsonKeys;
    self.keysDiff = _.map(keys.keysDiff, (text)=> {
      var color = text.removed ? 'red' : text.added ? 'green' : 'lightgrey';
      return {
        text: text.value.trim(),
        color,
      };
    });
  };
  
  self.showDiff(this.languages[0]);
}