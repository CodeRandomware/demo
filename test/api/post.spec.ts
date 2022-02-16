process.env.NODE_ENV = "tt";

import chai = require("chai");
import request = require("supertest");
import app from "../../src/app";
import db = require("../../src/db");

const expect = chai.expect;

describe("Testing Post Request", () => {
  before((done) => {
    db.main()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, create user.", (done) => {
    request(app.listen())
      .post("/users/login")
      .send({ userID: 12, fname: "Janro", lname: "Duct" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal("User Added");
        setTimeout(done, 3000);
      });
  });

  it("Fail, create user.", (done) => {
    request(app.listen())
      .post("/users/login")
      .send({ fname: "Janro", lname: "Duct" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal("Error UserID Required");
        done();
      });
  });
});
