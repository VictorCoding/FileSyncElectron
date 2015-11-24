var electron = require('electron');
var app = electron.app;  // Module to control application life.
var BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var ipcMain = electron.ipcMain;
var fs = require('fs');
var http = require('http');


// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.  
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 845    
  });
  
  var server = http.createServer(requestHandler).listen(9527);

  mainWindow.loadURL('http://localhost:9527/index.html');
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.setTitle(app.getName());
  });
  mainWindow.on('closed', function() {
    mainWindow = null;
    server.close();
  });    

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

//http://clanjs.com/2015/10/20/how-to-load-my-angular-app-correctly-with-electron-throu-file/
function requestHandler(req, res) {
  var file = req.url == '/' ? '/index.html' : req.url;
  var root = __dirname + '/app';
  var page404 = root + '/Components/404.html';

  getFile((root + file), res, page404);
}

function getFile(filePath, res, page404) {
  
    if (fs.statSync(filePath)) {
      fs.readFile(filePath, function(err, contents) {        
        if (!err) {
          res.end(contents);
        } else {
          console.log(err);
        }
      });
    } else {
      fs.readFile(page404, function(err, contents) {
        if (!err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(contents);
        } else {
          console.log(err);
        }
      });
    }  
}