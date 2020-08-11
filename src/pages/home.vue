<template>
<f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar>
        <f7-nav-left>
            <f7-link icon-material="menu" panel-open="left"></f7-link>
        </f7-nav-left>

        <f7-nav-title title="Приложение" subtitle="Неизвестно для чего"></f7-nav-title>

        <f7-nav-right>
            <f7-link icon-f7="person" href="/login/"></f7-link>
        </f7-nav-right>
    </f7-navbar>


    <f7-list media-list >
        <template v-for="(item,i) in news">
            <f7-list-item :key="i" :link="'/news_detail/'+item.id"
                :title="item.title"
                :subtitle="item.category"
                :after="item.time"
                :text="item.text"
            >
                <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80" />
            </f7-list-item>
        </template>
    </f7-list>

    
</f7-page>
</template>


<script>
import {
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex';
import storage from '@/js/storage.js';
import REST from '@/rest-services/rest';


export default {

    data() {
        return {
            app_name: AppContext.data.app_name,
            news:[
                {id:1, time:'15:00', title:'Новость 1', category:'Праздник', text:'Описание этой замечательной новости, но не большое'},
                {id:2, time:'15:10', title:'Новость 2', category:'Город', text:'Описание этой замечательной новости, но не большое'},
                {id:3, time:'15:20', title:'Новость 3', category:'Работа', text:'Описание этой замечательной новости, но не большое'},
            ],
        };
    },

    mounted() {
       REST.post('getNews', {} ).then((response) => {

       });
    },
    
    computed: {
        ...mapGetters(['isAuthorized']),
    },
 
    methods: {
        ...mapActions(['userLogout']),
        ...mapMutations(['SET_APP_VERSION']),

        showToastCenter(toast_text, icon, css, delay) {
          if (icon) {icon = '<i class="f7-icons">'+icon+'</i>'} else { icon=''; }
          css = css || '';
          delay = delay || 3000;

          const self = this;
            self.toastCenter = self.$f7.toast.create({
              icon: icon,
              text: toast_text,
              position: 'center',
              cssClass: css,
              closeTimeout: delay,
            });
          self.toastCenter.open();
        },

 
 
    }, //methods

};
</script>

<style>
  .toast_red   { background:#ee0000; font-size:20px; }
  .toast_green { background:#00ee00; font-size:20px; }
</style>
