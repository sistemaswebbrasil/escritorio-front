import { Person, PersonCreate } from "../../types/Person";
import Service from "../Service";
import axios from "../Axios";
import { AxiosResponse } from "axios";

class PersonService extends Service {
  static getAllPersons() {
    return axios.get<Person[]>("/persons").then(this.getData);
  }

  static create(form: PersonCreate) {
    return axios
      .post("/persons", form)
      .then((response: AxiosResponse<Person>) => {
        console.log(response);
        return response.data;
      });
  }

  static getById(id: Number) {
    return axios
      .get<Person>(`/persons/${id}`)
      .then((response: AxiosResponse<Person>) => {
        console.log(response);
        return response.data;
      });
  }

  static update(id: number, form: PersonCreate) {
    return axios
      .put<Person>(`/persons/${id}`, form)
      .then((response: AxiosResponse<Person>) => {
        console.log(response);
        return response.data;
      });
  }
}

export default PersonService;
