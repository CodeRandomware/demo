process.env.NODE_ENV = "tt";

import chai = require("chai");
import request = require("supertest");
import app from "../../src/app";
import db = require("../../src/db");

const expect = chai.expect;

describe("Testing Put Request", () => {
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

  it("OK, update user.", (done) => {
    request(app.listen())
      .put("/users/12")
      .send({ fname: "123", lname: "123" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.be.equal("User Updated");
        done();
      });
  });

  it("Fail, update user not found.", (done) => {
    request(app.listen())
      .put("/users/11")
      .send({ fname: "123", lname: "123" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.be.equal("User not found");
        done();
      });
  });
});
