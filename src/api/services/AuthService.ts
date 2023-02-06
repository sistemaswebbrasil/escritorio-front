import { UserLogin } from "types/User";
import Service from "../Service";

class LoginService extends Service {
  static login(userData: UserLogin) {
    return this.Http.post<UserLogin>("/login", userData).then(this.getData);
  }
}

export default LoginService;
