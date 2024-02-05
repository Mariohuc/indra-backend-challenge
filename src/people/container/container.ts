import { container } from "@common";
import { IRepository } from "src/common/database";
import { Persona } from "../models";
import { PeopleRepository } from "../people.repository";

container.registerSingleton<IRepository<Persona>>(
  "IRepository",
  PeopleRepository
);

export { container };
