import app from "./app.js";
import configuration from "./config/config.js";
import connectDb from "./config/dbConnect.js";

const port = configuration.port || 3000;

app.listen(port, async () => {
  await connectDb();
  console.log(`server running on http://localhost:${port}`);
});
