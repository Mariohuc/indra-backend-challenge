import "reflect-metadata";
import { AuthorsService } from "./authors.service";
import { container } from "./container";
import { Author } from "./models";
import { v4 } from "uuid";
import { emptyTable } from "../../test/helpers/dynamodb";

describe("AuthorsService", () => {
  let service: AuthorsService;

  beforeEach(async () => {
    await emptyTable({ tableName: "Authors", hashKey: ["authorId"] });
    service = container.resolve(AuthorsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new author and check the new item out to exist in the database", async () => {
    const newItem: Author = {
      authorId: v4(),
      firstName: "Walter",
      lastName: "Lee",
      email: "wlee@example.com",
      createdAt: new Date().toISOString(),
    };

    await service.create(newItem);

    const results: Author[] = await service.getAll();

    expect(results.length).toBe(1);
    expect(results[0].authorId).toBe(newItem.authorId)
    expect(results[0].firstName).toBe(newItem.firstName)
    expect(results[0].lastName).toBe(newItem.lastName)
    expect(results[0].email).toBe(newItem.email)
    expect(results[0].createdAt).toBe(newItem.createdAt)
  });
});
