
import Component from "../../core/component";


let getToken = (key) => {
    return wx.getStorageSync(key)
}

let removeToken = (key) => {
    try {
        wx.removeStorage({
            key: key
        })
    } catch (e) { }

}
let setToken = (key, value) => {
    try {
        wx.setStorageSync(key, value)
    } catch (e) { }
}



class Auth extends Component {
    _name = 'auth';
    key = 'vic-auth';
    alias = '$a';


    __config = {
        isLogin() {
            return this.userInfo.token;
        }

    }

    userInfo = {
        token: undefined
    };
    constructor() {
        super();
        this.userInfo.token = this.getToken();
    }

    


    updateUserInfo(info = {}) {
        Object.keys(info).map(key => {
            let value = info[key];
            this.userInfo[key] = value;
        });
    }

    setup(options = {}) {
        this.init(options);
    }

    login(useInfo) {
        this.updateUserInfo(useInfo);
        this.setToken(useInfo.token);
    }

    logout() {
        this.updateUserInfo({
            token: ''
        })
        this.removeToken();
    }

    setToken(value) {
        setToken(this.key, value)
    }

    removeToken() {
        removeToken(this.key);
    }

    getToken() {
        return getToken(this.key);
    }

    isLogin() {
        return this.__config.isLogin.call(this);
    }

}

export default Auth;