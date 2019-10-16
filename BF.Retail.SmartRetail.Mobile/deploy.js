const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

// See https://www.npmjs.com/package/ftp-deploy
const config = require('./ftp.json');

ftpDeploy.on('uploading', function(data) {
  console.log(data.totalFilesCount, data.transferredFileCount, data.filename);
});

ftpDeploy.on('uploaded', function(data) {
  console.log(data);
});

ftpDeploy.on('log', function(data) {
  console.log(data);
});

ftpDeploy.deploy(config)
  .then(res => console.log('finished:', res))
  .catch(err => console.log(err));
