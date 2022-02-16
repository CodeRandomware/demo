import de = require("dotenv");
import mongoose = require("mongoose");

de.config();
const host = process.env.MONGO_URI || "mongodb://localhost:27017";

// main
export function main() {
  return new Promise((resolve) => {
    mongoose
      .connect(host)
      .then((value) => {
        //console.log(`successfully connected`);
        resolve(value);
      })
      .catch((e) => {
        return e;
      });
  });
}

export function close(): Promise<void> {
  return mongoose.disconnect();
}
