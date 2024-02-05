import { injectable } from "tsyringe";
import { IRepository } from "src/common/database";
import { Persona } from "./models";
import axios from "axios";
import PersonDictionary from "./helpers/PersonDictionary";
import { AppError } from "@common";

type PeopleResponseBody = {
  recuento: number;
  siguiente: string | null;
  anterior: string | null;
  resultados: Persona[];
};

@injectable()
export class PeopleRepository implements IRepository<Persona> {
  constructor() {}
  async getAll(metadata?: { page?: number; limit?: number }): Promise<PeopleResponseBody> {
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
  }

  async getById(personId: string): Promise<Persona> {
    try {
      const { data } = await axios.get(
        "https://swapi.py4e.com/api/people/" + personId
      );
  
      return PersonDictionary.mapFromEnglishtoSpanish(data);
    } catch (error) {
      throw new AppError(error.message, error.response.status)
    }
  }

  create(): Promise<Persona> {
    throw new Error("Method not implemented.");
  }
}
