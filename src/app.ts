/// import modules
import { Context } from "koa";
import Koa = require("koa");
import bodyParser = require("koa-bodyparser");
import json = require("koa-json");
import Router = require("koa-router");
import * as userx from "./functions";

/// declare const
const app = new Koa();
const route = new Router();

/// add middleware
app.use(json());
app.use(bodyParser());

// routes
app.use(route.routes()).use(route.allowedMethods());

// login homepage
route.get("/", async (ctx: Context) => {
  ctx.response.status = 200;
  ctx.body = "<h1> Home Page </h1>";
});

// all users
route.get("/users", async (ctx: Context) => {
  ctx.response.status = 200;
  ctx.body = await userx.displayUsers();
});

// single user
route.get("/users/:id", async (ctx: Context) => {
  const singleUser = await userx.findUser(Number(ctx.params.id));
  if (!singleUser) {
    ctx.response.status = 404;
    ctx.body = {
      message: "User not found",
    };
  } else {
    ctx.response.status = 200;
    ctx.body = { singleUser };
  }
});

// user signup
route.post("/users/login", async (ctx: Context) => {
  const { userID, fname, lname } = ctx.request.body;
  if (!userID) {
    ctx.response.status = 400;
    ctx.body = {
      message: "Error UserID Required",
    };
  } else {
    ctx.response.status = 200;
    const result = userx.addUser(Number(userID), fname, lname);
    ctx.body = {
      text: `Hello ${fname} ${lname} \n\n <a href="/users"> back to home </a>`,
      message: result,
    };
  }
});

// update user
route.put("/users/:id", async (ctx: Context) => {
  const { fname, lname } = ctx.request.body;
  const singleUser = await userx.updateUser(
    fname,
    lname,
    Number(ctx.params.id)
  );
  if (!singleUser) {
    ctx.response.status = 404;
    ctx.body = {
      message: "User not found",
    };
  } else {
    ctx.response.status = 200;
    ctx.body = { singleUser, message: "User Updated" };
  }
});

// delete user
route.delete("/users/:id", async (ctx: Context) => {
  const singleUser = await userx.deleteUser(Number(ctx.params.id));
  if (!singleUser) {
    ctx.response.status = 404;
    ctx.body = {
      message: "User not found",
    };
  } else {
    ctx.response.status = 200;
    ctx.body = { singleUser, message: "User Deleted" };
  }
});

export default app;
