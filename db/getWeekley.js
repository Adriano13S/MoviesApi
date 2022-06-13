const ssGcloud = require('./gcloud');
const child_process = require('child_process');
const email_alert = require('./sendMail');

try{
  ssGcloud('start').then((resp) => {
    if(resp.status === 'DONE' && resp.errors.length === 0 && resp.warnings.length === 0 && resp.ip !== null){
      email_alert('Process instance started - weekley', JSON.stringify(resp.data), process.env.MAIL_ADR).catch(e => console.log(e));
      const remoteCommand = `ssh -i "-o "StrictHostKeyChecking no" ${process.env.REMOTE_SSH_KEY_PATH} ${process.env.REMOTE_USER}@${resp.ip} 'cd /home/${process.env.REMOTE_USER}/IMDBGETJSON/; python3 weekley.py'`
      child_process.execSync(remoteCommand);
    }else{
      email_alert('Error on process instance started - weekley', JSON.stringify({error:resp}), process.env.MAIL_ADR).catch(e => console.log(e));
    }
    ssGcloud('stop').then((resp) => {
      if(resp.status === 'DONE' && resp.errors.length === 0 && resp.warnings.length === 0){
        email_alert('Process instance stoped - - weekley', JSON.stringify(resp.data), process.env.MAIL_ADR).catch(e => console.log(e));
      }else{
        email_alert('Error on process instance stoped - weekley', JSON.stringify({error:resp}), process.env.MAIL_ADR).catch(e => console.log(e));
      }
    });
  });
}catch(err){
  email_alert('Error on weekley main', JSON.stringify({error:err.message}), process.env.MAIL_ADR).catch(e => console.log(e));
}