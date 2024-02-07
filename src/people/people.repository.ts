import { injectable } from "tsyringe";
import { IRepository } from "src/common/database";
import { Persona } from "./models";
import axios from "axios";
import PersonDictionary from "./helpers/PersonDictionary";
import { InternalServerException, NotFoundException } from "@common";

type PeopleResponseBody = {
  recuento: number;
  siguiente: string | null;
  anterior: string | null;
  resultados: Persona[];
};

@injectable()
export class PeopleRepository implements IRepository<Persona> {
  constructor() {}
  async getAll(metadata?: {
    page?: number;
    limit?: number;
  }): Promise<PeopleResponseBody> {
    try {
      const { data } = await axios.get(
        "https://swapi.py4e.com/api/people?page=" + (metadata.page || 1)
      );

      let new_people: PeopleResponseBody = {
        recuento: data["count"],
        siguiente: data["next"],
        anterior: data["previous"],
        resultados: [],
      };

      data["results"].forEach((element) => {
        new_people["resultados"].push(
          PersonDictionary.mapFromEnglishtoSpanish(element)
        );
      });
      return new_people;
    } catch (error) {
      switch (error.response?.status) {
        case 404:
          throw new NotFoundException("Resources not found");
        default:
          throw new InternalServerException("An unknown error happened");
      }
    }
  }

  async getById(personId: string): Promise<Persona> {
    try {
      const { data } = await axios.get(
        "https://swapi.py4e.com/api/people/" + personId
      );

      return PersonDictionary.mapFromEnglishtoSpanish(data);
    } catch (error) {
      switch (error.response?.status) {
        case 404:
          throw new NotFoundException("Resource not found");
        default:
          throw new InternalServerException("An unknown error happened");
      }
    }
  }

  create(): Promise<Persona> {
    throw new Error("Method not implemented.");
  }
}
