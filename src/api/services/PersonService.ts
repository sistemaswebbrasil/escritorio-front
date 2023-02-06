import { Person, PersonCreate } from "types/Person";
import Service from "../Service";

class PersonService extends Service {
  static getAllPersons() {
    return this.Http.get<Person>("/persons").then(this.getData);
  }

  static create(form: PersonCreate) {
    return this.Http.post("/persons", form).then((response) => {
      console.log(response);
      return this.getData;
    });
  }

  static getById(id: Number) {
    return this.Http.get<any>(`/persons/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);  
      });
  }
}

export default PersonService;
