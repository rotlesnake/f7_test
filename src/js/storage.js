export default {

  save(token, data) {
    if (typeof(NativeFunction)!="undefined") {
        try {
            NativeFunction.storageSet(token, data);
        } catch(e) {
        }
    } else { 
        try {
            localStorage.setItem(token,data);
        } catch(e) {
        }
    }
  },

  load(token) {
    var data = null;

    if (typeof(NativeFunction)!="undefined") {
        try {
            data = NativeFunction.storageGet(token);
        } catch(e) {
        }
    } else { 
        try {
            data = localStorage.getItem(token);
        } catch(e) {
        }
    }

    return data;
  },

};
