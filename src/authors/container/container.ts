import { container } from "@common";
import { AuthorsRepository } from "../authors.repository";
import { IRepository } from "src/common/database";
import { Author } from "../models";

container.registerSingleton<IRepository<Author>>(
  "IRepository",
  AuthorsRepository
);

export { container };
