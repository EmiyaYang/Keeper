import Vue from 'vue';
import VueX from 'vuex';
import mutations from './mutation';
import actions from './action';
import { getStore } from '../config/mUtils';

Vue.use(VueX);

const state = {
  lastTabIndex: 0, // 功能键索引
  token: null,
  userInfo: null,
  authority: null,
  managerName: getStore('managerName'),
  available: JSON.parse(getStore('available')),
  popMessage: null, //  弹出框信息
  popDisplay: true, //  弹出框出现与否
  alertBarDisplay: false, // 警告栏出现与否
  alertBarReminder: null,
  carouselDisplay: false, //  轮播图出现与否
  RECORD_USER_INFO: null,
  searchResult: null,
  type: null,
  leftMatched: 0,
  highestSpeed: 0,
  status: '',
  cards: [],
  elapsedMs: 0,
  gameCards: []
};
export default new VueX.Store({
  state,
  mutations, //  改变状态的唯一方式
  actions //  处理异步操作
});
