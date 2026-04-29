import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL,
  google_api_key: process.env.GOOGLE_API,
};
