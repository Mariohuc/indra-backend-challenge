import request from "supertest";
import { getItem, emptyTable, setData } from "../helpers/dynamodb";
import { v4 } from "uuid";

const APP_URL = "http://localhost:3000"; // Assuming that it's running in serverless offline mode
const AUTHORS_TABLE_NAME = "Authors";
let demoAuthors: any[];

describe("Author Endpoints tests using SUPERTEST: ", function () {
  describe("GET /authors", function () {
    beforeEach(async () => {
      await emptyTable({
        tableName: AUTHORS_TABLE_NAME,
        hashKey: ["authorId"],
      });

      demoAuthors = [
        {
          authorId: v4(),
          firstName: "Walter",
          lastName: "Lee",
          email: "wlee@example.com",
          createdAt: new Date().toISOString(),
        },
        {
          authorId: v4(),
          firstName: "Davy",
          lastName: "Jonas",
          email: "djonas@example.com",
          createdAt: new Date().toISOString(),
        },
        {
          authorId: v4(),
          firstName: "Paul",
          lastName: "Hugh",
          email: "phugh@example.com",
          createdAt: new Date().toISOString(),
        },
      ];
      await setData({ tableName: AUTHORS_TABLE_NAME, items: demoAuthors });
    });

    it("This request should obtain 3 authors in response", function (done) {
      request(APP_URL)
        .get("/dev/authors")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // response.body contain the response data
          expect(response.body.length).toBe(3);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("POST /authors", function () {
    it("This request should store an author within the database and obtain a new author in response", function (done) {
      request(APP_URL)
        .post("/dev/authors")
        .send({
          firstName: "Freddy",
          lastName: "Linch",
          email: "flinch@example.com",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then(async (response) => {
          // response.body contain the response data
          const toCompare = (await getItem({
            tableName: AUTHORS_TABLE_NAME,
            key: {
              authorId: response.body.authorId,
            },
          })) as any;
          expect(toCompare.authorId).toBe(response.body.authorId);
          expect(toCompare.firstName).toBe("Freddy");
          expect(toCompare.lastName).toBe("Linch");
          expect(toCompare.email).toBe("flinch@example.com");
          done();
        })
        .catch((err) => done(err));
    });
  });
});

describe("People Endpoints tests using SUPERTEST: ", function () {
  describe("GET /people", function () {
    it("This request should obtain people in response when each person only has to have 16 attributes otherwise it means the API has changed in of its attributes", function (done) {
      request(APP_URL)
        .get("/dev/people")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // response.body contain the response data
          expect(response.body.recuento).toBeDefined();
          expect(response.body.siguiente).toBeDefined();
          expect(response.body.anterior).toBeDefined();
          response.body.resultados.forEach((item) => {
            const keys = Object.keys(item);
            expect(keys.length).toBe(16); // only 16 attributes have been mapped for the Person model in SWAPI
          });
          done();
        })
        .catch((err) => done(err));
    });
  });
});
