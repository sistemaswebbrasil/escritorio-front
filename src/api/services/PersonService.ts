import { Person, PersonCreate } from "../../types/Person";
import Service from "../Service";
import axios from "../Axios";

class PersonService extends Service {
  static getAllPersons() {
    return axios.get<Person>("/persons").then(this.getData);
  }

  static create(form: PersonCreate) {
    return axios.post("/persons", form).then((response) => {
      console.log(response);
      return this.getData;
    });
  }

  static getById(id: Number) {
    return axios
      .get<any>(`/persons/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default PersonService;
