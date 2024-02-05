import { Person, Persona } from "../models";

export default class PersonDictionary {
  private static getSWAPIAtributessInSpanish(): { [key: string]: string } {
    return {
      name: "nombre",
      birth_year: "anio_de_nacimiento",
      eye_color: "color_de_ojos",
      gender: "género",
      hair_color: "color_de_cabello",
      height: "altura",
      mass: "masa",
      skin_color: "color_de_piel",
      homeworld: "planeta_natal",
      films: "películas",
      species: "especies",
      starships: "naves_estelares",
      vehicles: "vehiculos",
      url: "url",
      created: "creado",
      edited: "editado",
    };
  }

  public static mapFromEnglishtoSpanish(person: Person): Persona {
    let new_person = {};
    let SAE = this.getSWAPIAtributessInSpanish();
    let SAE_keys = Object.keys(SAE);

    new_person[SAE[SAE_keys[0]]] = person[SAE_keys[0]];
    new_person[SAE[SAE_keys[1]]] = person[SAE_keys[1]];
    new_person[SAE[SAE_keys[2]]] = person[SAE_keys[2]];
    new_person[SAE[SAE_keys[3]]] = person[SAE_keys[3]];
    new_person[SAE[SAE_keys[4]]] = person[SAE_keys[4]];
    new_person[SAE[SAE_keys[5]]] = person[SAE_keys[5]];
    new_person[SAE[SAE_keys[6]]] = person[SAE_keys[6]];
    new_person[SAE[SAE_keys[7]]] = person[SAE_keys[7]];
    new_person[SAE[SAE_keys[8]]] = person[SAE_keys[8]];
    new_person[SAE[SAE_keys[9]]] = person[SAE_keys[9]];
    new_person[SAE[SAE_keys[10]]] = person[SAE_keys[10]];
    new_person[SAE[SAE_keys[11]]] = person[SAE_keys[11]];
    new_person[SAE[SAE_keys[12]]] = person[SAE_keys[12]];
    new_person[SAE[SAE_keys[13]]] = person[SAE_keys[13]];
    new_person[SAE[SAE_keys[14]]] = person[SAE_keys[14]];
    new_person[SAE[SAE_keys[15]]] = person[SAE_keys[15]];

    return new_person as Persona;
  }
}
