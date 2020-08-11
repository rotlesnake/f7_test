<template>
<f7-app :params="f7params" >

  <!-- Left panel with cover effect when hidden -->
  <f7-panel left cover class="theme-blue" swipeOnlyClose>
    <f7-view>
      <f7-page>
        <f7-navbar title="Меню">
           <div class="right"><f7-link panel-close class="color-black" icon-material="close"></f7-link></div>
        </f7-navbar>
        <f7-block-title>Основное меню</f7-block-title>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view id="main-view" main class="safe-areas" url="/"></f7-view>

  <!-- Right panel with reveal effect -->
  <f7-panel right cover class="theme-blue" swipeOnlyClose>
    <f7-view>
      <f7-page>
        <f7-navbar title="Настройки">
          <div class="right"><f7-link panel-close class="color-black" icon-f7="xmark_circle"></f7-link></div>
        </f7-navbar>
        <f7-block-title>Секретное меню</f7-block-title>
      </f7-page>
    </f7-view>
  </f7-panel>


</f7-app>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import routes from './js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'App',
          theme: 'md',

          data: function () {
            return {
                app_name: "app name",
            };
          },

          routes: routes,

          on:{
             pageBeforeIn: function (page) {
                window['PageContext'] = page;
                window['PageVueContext'] = page.el.__vue__.$parent;
                window['RouterContext'] = page.router;
                if (PageVueContext.pageBeforeIn) PageVueContext.pageBeforeIn(page);
             },
             pageAfterIn: function (page) {
                window['PageContext'] = page;
                window['PageVueContext'] = page.el.__vue__.$parent;
                window['RouterContext'] = page.router;
                if (PageVueContext.pageAfterIn) PageVueContext.pageAfterIn(page);
             }
          },

          methods:{
            
                onNFCCardReceive(card_id){
                    if (PageVueContext.onNFCCardReceive) PageVueContext.onNFCCardReceive(card_id);
                },

                onBackKeyDown: function() {
                      var panel_left = AppContext.panel.get( RootContext.Dom7(".panel.panel-left") );
                      var panel_right = AppContext.panel.get( RootContext.Dom7(".panel.panel-right") );
                      if ( panel_left.opened ) {
                          panel_left.close();
                          return false;
                      }
                      if ( panel_right.opened ) {
                          panel_right.close();
                          return false;
                      }
                      var openedModals =  RootContext.Dom7('.popup').filter(function(index, el) { return RootContext.Dom7(this).css('display')!='none'; });
                      if (openedModals.length > 0) {
                          AppContext.popup.close( openedModals[0] );
                          return false;
                      }
                      if (RootContext.Dom7('.modal-in').length > 0) {
                          AppContext.dialog.close();
                          return false;
                      }
                      if (RouterContext.url=='/' || RouterContext.url=='/login/') {
                        AppContext.dialog.create({
                          title: 'Закрыть',
                          text: 'Вы точно хотите закрыть приложение?',
                          buttons: [
                            {text: 'Отмена', cssClass:'text-color-red'},
                            {text: 'Да', cssClass:'border-color-blue', onClick: function() { NativeFunction.closeFragment(); }   }
                          ],
                          verticalButtons: false,
                        }).open();
                      } else {
                          RouterContext.back();
                      }
                }//onBackKeyDown
          },//methods

        },//f7

      }//data()
    },
    computed:{
      ...mapGetters(['isAuthorized']),
    },
    methods: {

    },
    mounted() {
      window['RootContext'] = this;
      this.$f7ready((f7) => {
         window['AppContext'] = f7;  
         console.log('App ready');
      });
    }
  }
</script>