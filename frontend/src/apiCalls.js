const config = require('./config.json');

const backendUrl = config.google.backend.url;

export const handleStyleSubmit = async (audioBase64, styleSelected) => {
  return fetch(backendUrl, {
    method: 'POST',
    body: JSON.stringify({
      audioBase64,
      styleSelected
    }),
    mode: 'no-cors'
  });

};
