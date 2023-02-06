import { CurrentUser, UserLogin } from "../../types/User";
import Service from "../Service";
import axios from "../Axios";

class LoginService extends Service {
  static login(userData: UserLogin) {
    return axios.post<CurrentUser>("/login", userData).then(this.getData);
  }
}

export default LoginService;
