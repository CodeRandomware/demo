process.env.NODE_ENV = "tt";

import chai = require("chai");
import request = require("supertest");
import app from "../../src/app";
import db = require("../../src/db");

const expect = chai.expect;

describe("Testing Get Request", () => {
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

  it("OK, get all users.", (done) => {
    request(app.listen())
      .get("/users")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.length).to.not.equal(0);
        done();
      });
  });

  it("OK, get one user.", (done) => {
    request(app.listen())
      .get("/users/10")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("singleUser");
        done();
      });
  });

  it("Fail, get no user.", (done) => {
    request(app.listen())
      .get("/users/12")
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal("User not found");
        done();
      });
  });
});
