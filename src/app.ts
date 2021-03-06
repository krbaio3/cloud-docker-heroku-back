import { connectToDB } from 'core/database';
import { createApp } from 'core/servers';
import { envConstants } from 'core/constants';
import express from 'express';
import { memberApi } from 'pods/member';
import path from 'path';

const app = createApp();
const staticFilesPath = path.resolve(__dirname, process.env.STATIC_FILES_PATH);
app.use('/', express.static(staticFilesPath))

app.use('/members', memberApi);

app.listen(envConstants.PORT, async () => {
  await connectToDB(envConstants.MONGODB_URI);
  console.log(`Server ready at PORT ${envConstants.PORT}`);
});
