import React from 'react';

const Voice = () => (
  <form method="post" encType="multipart/form-data">
    <input type="file" name="audio" accept="audio/*" capture />
    <input type="submit" value="Upload" />
  </form>
);

export default Voice;
