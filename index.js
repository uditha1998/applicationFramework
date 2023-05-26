import express from "express";
import dotenv from "dotenv";
import log from "loglevel";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";

import routes from "./src/routes/index.js";
import swaggeroption from "./src/utils/swaggerConfig.js";

import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword/index.js";
import UserRoles from "supertokens-node/recipe/userroles/index.js";
import { middleware } from "supertokens-node/framework/express/index.js";
// import {
//   createRole,
//   getAllRoles,
//   getUserInfo,
//   addRoleToUser,
// } from "./src/utils/rolesSeed.js";

dotenv.config();
log.enableAll();

const app = express();
app.use(express.json());
const specs = swaggerJsDoc(swaggeroption);

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.SUPER_CONNECTION,
    apiKey: process.env.SUPER_API_KEY,
  },
  appInfo: {
    appName: "TravelEase",
    apiDomain: process.env.API_DOMAIN,
    websiteDomain: process.env.WEBSITE_DOMAIN,
    apiBasePath: "/api",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init(), UserRoles.init()],
});

app.use(
  cors({
    origin: process.env.WEBSITE_DOMAIN,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

// createRole();
// getAllRoles();
// addRoleToUser();
// getUserInfo();

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  log.info(`DB connected successfully with ${mongoose.connection.host}`);
});

app.listen(PORT, () => {
  log.info(`Server has been started on PORT: ${PORT}`);
});
