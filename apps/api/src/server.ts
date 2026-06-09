import { createApp } from './app';

const app = createApp();
const port = Number(process.env.PORT ?? 10000);

app.listen(port, () => {
  console.log(`CarbonKeeper API listening on port ${port}`);
});
