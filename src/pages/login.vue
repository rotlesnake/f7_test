<template>
<f7-page name="login" login-screen>
    <f7-navbar title="Вход в систему" back-link="Back" @click:back="onBack"></f7-navbar>

    <f7-login-screen-title>Приложение</f7-login-screen-title>

    <f7-list form>
      <f7-list-input
        label="Логин"
        type="text"
        placeholder="Имя пользователя"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Пароль"
        type="password"
        placeholder="Пароль..."
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
    </f7-list>

    <f7-button @click="signIn">Войти</f7-button>
      

</f7-page>
</template>

<script>
import {
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex';

import storage from '@/js/storage.js';

export default {

    data() {
        return {
            username: '',
            password: '',

        }
    },

    computed: {
    },

    methods: {

        pageAfterIn(page) {
        },

        onBack() {
        },

        signIn() {
            RouterContext.back();
        },

    },

    mounted() {},

}
</script>
