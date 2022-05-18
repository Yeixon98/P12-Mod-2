let chai_ = require("chai");
let chaiHttp = require("chai-http");
const expect = chai_.expect;

chai_.use(chaiHttp);
const url = "http://localhost:5000";

describe("API Tests", () => {
  it("Reset DB", (done) => {
    chai_
      .request(url)
      .get("/reset")
      .end((_: any, res: any) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('Reinicio...')
        done();
      });
  });

  it("POST User", (done) => {
    chai_
      .request(url)
      .post("/user")
      .send({
        name: "Name Test",
        surname: "Surname Test",
        age: 25,
        email: "emailtest@gmail.com",
        password: "passwordtest",
      })
      .end((_: any, res: any) => {
        expect(res).to.have.status(201);
        expect(res.body.name).to.eql('Name Test')
        expect(res.body.surname).to.eql('Surname Test')
        expect(res.body.age).to.eql(25)
        expect(res.body.email).to.eql('emailtest@gmail.com')
        expect(res.body.password).to.eql('passwordtest')
        done();
      });
  });

  it("GET All Users", (done) => {
    chai_
      .request(url)
      .get("/user")
      .end((_: any, res: any) => {
        expect(res).to.have.status(200);
        expect(res.body[0].name).to.eql('Name Test')
        expect(res.body[0].surname).to.eql('Surname Test')
        expect(res.body[0].age).to.eql(25)
        expect(res.body[0].email).to.eql('emailtest@gmail.com')
        expect(res.body[0].password).to.eql('passwordtest')
        done();
      });
  });

  it("GET One Users", (done) => {
    chai_
      .request(url)
      .get("/user")
      .query({ email: "emailtest@gmail.com" })
      .end((_: any, res: any) => {
        expect(res).to.have.status(200);
        expect(res.body[0].name).to.eql('Name Test')
        expect(res.body[0].surname).to.eql('Surname Test')
        expect(res.body[0].age).to.eql(25)
        expect(res.body[0].email).to.eql('emailtest@gmail.com')
        expect(res.body[0].password).to.eql('passwordtest')
        done();
      });
  });

  it("PUT User", (done) => {
    chai_
      .request(url)
      .put("/user")
      .query({ email: "emailtest@gmail.com" })
      .send({
        name: "Name Test2",
        surname: "Surname Test2",
        age: 26,
        password: "passwordtest2",
      })
      .end((_: any, res: any) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Name Test2')
        expect(res.body.surname).to.eql('Surname Test2')
        expect(res.body.age).to.eql(26)
        expect(res.body.email).to.eql('emailtest@gmail.com')
        expect(res.body.password).to.eql('passwordtest2')
        done();
      });
  });

  it("DELETE User", (done) => {
    chai_
      .request(url)
      .delete("/user")
      .query({ email: "emailtest@gmail.com" })
      .end((_: any, res: any) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Name Test2')
        expect(res.body.surname).to.eql('Surname Test2')
        expect(res.body.age).to.eql(26)
        expect(res.body.email).to.eql('emailtest@gmail.com')
        expect(res.body.password).to.eql('passwordtest2')
        done();
      });
  });
});
