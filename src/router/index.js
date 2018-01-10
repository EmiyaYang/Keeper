import Vue from 'vue';
import Router from 'vue-router';
import login from '@/pages/login/login';
import register from '@/pages/register/register';
import main from '@/pages/main/main';
import collection from '@/pages/main/children/collection';
import list from '@/pages/main/children/list';
import dashboard from '@/pages/main/children/dashboard';
import search from '@/pages/main/children/search';
import matchGame from '@/pages/game/match/Game';
import flipGame from '@/pages/game/flip/game';
import chooseGame from '@/pages/game/choose/game';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {keepAlive: false}
    }, {
      path: '/register',
      name: 'register',
      component: register,
      meta: {keepAlive: false}
    }, {
      path: '/main',
      component: main,
      children: [
        {
          path: 'collection',
          component: collection,
          meta: {keepAlive: false}
        }, {
          path: '/',
          component: list,
          meta: {keepAlive: true}
        }, {
          path: 'dashboard',
          component: dashboard,
          meta: {keepAlive: true}
        }, {
          path: 'search',
          component: search,
          meta: {keepAlive: true}
        }, {
          path: 'match',
          component: matchGame,
          meta: {keepAlive: false}
        }, {
          path: 'flip',
          component: flipGame,
          meta: {keepAlive: false}
        }, {
          path: 'choose',
          component: chooseGame,
          meta: {keepAlive: false}
        }
      ],
      meta: {keepAlive: true}
    }
  ]
});
