const {google} = require('googleapis');
const compute = google.compute('v1');

const authorize = async () => {
  const client = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/compute',
    'https://www.googleapis.com/auth/compute.readonly']
  });
  return client;
};

const ssGcloud = async (cmd) => {
  google.options({auth: await authorize()});
  const request = {
    project: process.env.GCP_PROJECT,
    zone: process.env.GCP_ZONE,
    instance: process.env.GCP_INSTANCE,
  };
  const response = await compute.instances[cmd](request);
  const obj = {
    operation: response.data.name,
    project: request.project,
    zone: request.zone
  };
  let result = await compute.zoneOperations.wait(obj);
  
  while(result.data.status === 'RUNNING'){
    result = await compute.zoneOperations.wait(obj);
  }

  const details = await compute.instances.get(request)

  return {
    status: result.data.status,
    ip: details['data']['networkInterfaces'][0]['accessConfigs'][0]['natIP'] ? details['data']['networkInterfaces'][0]['accessConfigs'][0]['natIP'] : null,
    errors: Object.keys(result.data).includes('error') ? result.data.error.errors : [],
    warnings: Object.keys(result.data).includes('warnings') ? result.data.warnings : [],
    operationType: result.data.operationType || null,
    data: result.data || null
  };
};

module.exports = ssGcloud;
