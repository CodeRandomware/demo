import de = require("dotenv");
import app from "./app";
import { main } from "./db";

de.config();

const port = process.env.PORT;

// DB
main().then(() => {
  //open server
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
});
