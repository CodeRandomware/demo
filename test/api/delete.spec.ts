process.env.NODE_ENV = "tt";

import chai = require("chai");
import request = require("supertest");
import app from "../../src/app";
import db = require("../../src/db");

const expect = chai.expect;

describe("Testing Delete Request", () => {
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

  it("OK, delete user.", (done) => {
    request(app.listen())
      .delete("/users/12")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.be.equal("User Deleted");
        done();
      });
  });

  it("Fail, delete user not found.", (done) => {
    request(app.listen())
      .delete("/users/11")
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.be.equal("User not found");
        done();
      });
  });
});
