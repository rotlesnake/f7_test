
import HomePage from '../pages/home.vue';
import NewsDetailPage from '../pages/news_detail.vue';

import LoginPage from '../pages/login.vue';


import NotFoundPage from '../pages/404.vue';



var routes = [
  {    path: '/',         component: HomePage,  },
  {    path: '/news_detail/:id', component: NewsDetailPage,  },


  {    path: '/login/',   component: LoginPage,  },
  

  {    path: '(.*)',      component: NotFoundPage,  },
];

export default routes;
