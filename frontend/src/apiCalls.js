const { CloudFunctionsServiceClient } = require('@google-cloud/functions');
// const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// const projectId = google.projectId;

// const getauth = async () => {
//   const auth = new GoogleAuth({
//     scopes: 'https://www.googleapis.com/auth/cloud-platform',
//     credentials: {},
//   });
//
//   const client = await auth.getClient();
//   const projectId = await auth.getProjectId();
//   const url = `https://www.googleapis.com/dns/v1/projects/${projectId}`;
//   const res = await client.request({ url });
//
//   let access_token = res.config.headers['Authorization'];
// };

// import config from './config.json';

export const handleStyleSubmit = async (audioBase64, styleSelected) => {
  const credentials = {
    client_email: 'functioninvoker@avoe-323702.iam.gserviceaccount.com',
    private_key: process.env.INVOKE_WORKFLOW_PRIVATE_KEY,
  };

  const cloudFunctionsServiceClient = new CloudFunctionsServiceClient({
    credentials,
  });

  const res = await cloudFunctionsServiceClient.callFunction({
    name: 'invokeWorkflow',
    data: JSON.stringify({
      audioBase64,
      styleSelected,
    }),
  });

  console.log(res);

  return res;

  // const res = await fetch(config.google.function.url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     audioBase64,
  //     styleSelected,
  //   }),
  //   mode: 'no-cors',
  // });

  // console.log(res);
};
