
import Base from "../core/base";



class Auth extends Base {
    _name = 'auth';
    key = 'vic-auth';
    alias = '$a';
    constructor(Vic) {
        super();
    }

    setup(options = {}) {
        this.init(options);
    }

    login() {
        
    }

    logout() {

    }

    setToken() {

    }

    removeToken() {

    }

    getToken() {

    }

}

export default Auth;