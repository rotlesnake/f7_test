<template>
  <f7-page name="form">
    <f7-navbar :title="title" back-link="Back" @click:back="onBack"></f7-navbar>

    

    
  </f7-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

import storage from "@/js/storage.js";

export default {
  data() {
    return {
      title: "Новость",
      text_len:0,
      id: 0
    };
  },

  computed: {

  },

  methods: {

    pageAfterIn(page) {
      this.id = parseInt(page.router.currentRoute.params.id);
      this.title = "Новость #" + this.id;
    },

    onBack() {
    },

    showToastCenter(toast_text) {
      const self = this;
      self.toastCenter = self.$f7.toast.create({
        text: toast_text,
        position: "center",
        closeTimeout: 5000
      });
      self.toastCenter.open();
    },

    save() {
      RouterContext.back();
    }
  },

  mounted() {}
};
</script>
