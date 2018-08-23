const amctoken = "amcToken";
const getPayload = function(token) {
    return JSON.parse(window.atob(token.split('.')[1]));
}
const amcAuth = {
    authenticateUser(token, time) { //time is in seconds convert to milliseconds for javascript
      if (arguments.length === 2) {
        const weekAhead = time * 1000 * 7; //set a week ahead of time
        const obj = {
            timeStamp: weekAhead + new Date().getTime(),
            amcTokenData: token
        }
        localStorage.setItem(amctoken, JSON.stringify(obj));
        return true
      }
      return false;
    },


    isUserAuthenticated() {
        const object = JSON.parse(this.getLocalStorage());
        if (object) {
            const dateString = object.timeStamp;
            if (dateString > new Date().getTime()) {
                return getPayload(object.amcTokenData).uuid;
            } else {
                this.deauthenticateUser();
                return false;
            }
        }
        return false;
    },


    deauthenticateUser() {
      localStorage.removeItem(amctoken);
    },

    getLocalStorage() {
        return localStorage.getItem(amctoken);
    },


    getToken() {
      const object = JSON.parse(this.getLocalStorage());
      if (object) {
          return object.amcTokenData;
      }
    }

  }

  exports.default = amcAuth;
  module.exports = exports['default'];
