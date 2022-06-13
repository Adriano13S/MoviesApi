const https = require('https');
const zlib = require('zlib');
const fs = require('fs');
const child_process = require('child_process');
const ssGcloud = require('./gcloud');
const email_alert = require('./sendMail');


// eslint-disable-next-line no-unused-vars
let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
// const datasets_names = {actors_basic:'name.basics', movies_akas:'title.akas', movies_basic:'title.basics', movies_crew:'title.crew', movies_episodes:'title.episode', mvoies_principals:'title.principals', movies_ratings:'title.ratings'}
const datasets_names = {movies_basic:'title.basics'}


Object.entries(datasets_names).forEach((entry) => {
  try{
    const url = `https://${process.env.DATA_SOURCE}/${entry[1]}.tsv.gz`;
    const gzfile = fs.createWriteStream(`./${entry[1]}.tsv.gz`);
    const file = fs.createWriteStream(`./${entry[1]}.tsv`)
    const unzip = zlib.createGunzip();

    https.get(url, (res) => {
      res.pipe(gzfile).on('close', () => {
        const gzfileContent = fs.createReadStream(`./${entry[1]}.tsv.gz`)
        gzfileContent.pipe(unzip).pipe(file).on('finish', () => {
          fs.unlinkSync(`./${entry[1]}.tsv.gz`);
          // auth needed for mongoimport !! !! !!
          const command = `mongoimport --db Imdb --collection ${entry[0]} --mode merge --upsertFields ${entry[0] == 'actors_basic'?'nconst':'tconst'} --type tsv --file "/home/${process.env.REMOTE_USER}/${entry[1]}.tsv" --headerline`
          child_process.execSync(command);
          fs.unlinkSync(`./${entry[1]}.tsv`);
          if(entry[1] === 'title.basics'){
            ssGcloud('start').then((resp) => {
              if(resp.status === 'DONE' && resp.errors.length === 0 && resp.warnings.length === 0 && resp.ip !== null){
                email_alert('Process instance started', JSON.stringify(resp.data), process.env.MAIL_ADR).catch(e => console.log(e));
                const remoteCommand = `ssh -o "StrictHostKeyChecking no" -i ${process.env.REMOTE_SSH_KEY_PATH} ${process.env.REMOTE_USER}@${resp.ip} 'cd /home/${process.env.REMOTE_USER}/IMDBGETJSON/; python3 main.py'`
                let err;
                do{
                  try{
                    child_process.execSync(remoteCommand)
                    // sleep(10000).then(() => child_process.execSync(remoteCommand));
                    err = null;
                  }catch(error){
                    fs.writeFileSync('error.txt', JSON.stringify(error.message))
                    err = error;
                  }
                }while(err)
              }else{
                email_alert('Error on process instance started', JSON.stringify({error: resp}), process.env.MAIL_ADR).catch(e => console.log(e));
              }
              ssGcloud('stop').then((resp) => {
                if(resp.status === 'DONE' && resp.errors.length === 0 && resp.warnings.length === 0){
                  email_alert('Process instance stoped', JSON.stringify(resp.data), process.env.MAIL_ADR).catch(e => console.log(e));
                }else{
                  email_alert('Error on process instance stoped', JSON.stringify({error: resp}), process.env.MAIL_ADR).catch(e => console.log(e));
                }
              });
            });
          }
        });
      });
    });
  }catch(err){
    email_alert('Main code error', JSON.stringify({error: err.message}), process.env.MAIL_ADR).catch(e => console.log(e));
  }
});