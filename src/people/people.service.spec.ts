import "reflect-metadata";
import { container } from "./container";
import { PeopleService } from "./people.service";

describe("PeopleService", () => {
  let service: PeopleService;

  beforeEach(async () => {
    service = container.resolve(PeopleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get people given a page and check each person out to have 16 attributes otherwise it means the API has changed in of its attributes", async () => {
    const response = await service.getAll({ page: 1 });

    expect(response.recuento).toBeDefined();
    expect(response.siguiente).toBeDefined();
    expect(response.anterior).toBeDefined();
    response.resultados.forEach((item) => {
      const keys = Object.keys(item);
      expect(keys.length).toBe(16); // only 16 attributes have been mapped for the Person model in SWAPI
    });
  });
});
