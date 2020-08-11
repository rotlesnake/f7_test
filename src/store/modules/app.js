import api from '@/rest-services/api'
import REST from '@/rest-services/rest';


const state = {
    appTitle: process.env.VUE_APP_TITLE,
    appVersion: 1,
    showLeftDrawer: true,
    isAuthorized: false,
    authorizedToken: "",
    userData: {},
}

const getters = {
    appTitle: state => state.appTitle,
    appVersion: state => state.appVersion,
    isAuthorized: state => state.isAuthorized,
    authorizedToken: state => state.authorizedToken,
    userData: state => state.userData,
}

const actions = {
    userLogin({ commit }, payload) {
        return REST.post('?action=login', payload)
            .then((response) => {
                //console.log(response);
                if (response.data.error == 0) {
                    commit('SET_AUTHORIZED', true);
                    commit('SET_AUTHORIZED_DATA', response.data);
                } else {
                    commit('SET_AUTHORIZED', false);
                }
                return response;
            }).catch(() => {
                commit('SET_AUTHORIZED', false);
            });
    },
    userLogout({ commit }) {
        commit('SET_AUTHORIZED', false);
        return true;
    },
    userHasRoles({ commit }, roles ) {
        if (!roles) return false;
        console.log('tag', roles)
        var user_roles = state.userData.roles.split(",");
        for (let id in user_roles) {
            if (roles.indexOf(user_roles[id]) != -1) {
                console.log('tag', true)
                return true;
            }
        }
        console.log('tag', false)
        return false;
    },
    downloadFile({ commit }, { path, postData, filename, contentType }) {
        return api.post(path, postData, { responseType: 'arraybuffer' }).then((response) => {
            contentType = contentType || 'application/octet-stream';
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            return response;
        });
    },
}

const mutations = {
    SET_APP_VERSION(state, version) {
        state.appVersion = version;
    },
    SET_AUTHORIZED(state, value) {
        state.isAuthorized = value;
        if (!value) {
            state.authorizedToken = false;
            state.userData = {};
        }
    },
    SET_AUTHORIZED_DATA(state, payload) {
        state.authorizedToken = payload.token;
        state.userData = payload;
    },

}


export default {
    state,
    getters,
    actions,
    mutations
}
