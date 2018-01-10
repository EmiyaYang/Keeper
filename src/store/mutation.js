import {
  RECORD_TOKEN,
  INIT_USERINFO,
  RECORD_LASTTABINDEX,
  TOGGLE_ALERTBAR,
  TOGGLE_EDITPANE,
  RECORD_SEARCH,
  TOGGLE_UPDATED,
  TOGGLE_CAROUSEL,
  CATCH_ERROR, RECORD_USER_INFO,
  EXIT, SET_GAME_CARDS
} from './mutation-types';
import { getStore, setStore, clearStore } from '../config/mUtils.js';

export default {
  reset (st, newState) {
    st.leftMatched = newState.leftMatched;
    st.highestSpeed = newState.highestSpeed;
    st.status = newState.status;
    st.cards = newState.cards;
    st.elapsedMs = newState.elapsedMs;
  },
  updateStatus (st, newStatus) {
    st.status = newStatus;
  },
  decreaseMatch (st) {
    st.leftMatched--;
  },

  flip (st, card) {
    let c = st.cards.find(cc => cc === card);
    c.flipped = !c.flipped;
  },

  flips (st, cards) {
    st.cards
      .filter(cc => cards.indexOf(cc) >= 0)
      .forEach(cc => {
        cc.flipped = !cc.flipped;
      });
  },
  counting (st) {
    st.elapsedMs++;
  },
  updateHighestSpeed (st) {
    if (!localStorage.getItem('highestSpeed')) {
      return localStorage.setItem('highestSpeed', st.elapsedMs);
    }
    if (localStorage.getItem('highestSpeed') > st.elapsedMs) {
      return localStorage.setItem('highestSpeed', st.elapsedMs);
    }
  },
  [SET_GAME_CARDS] (state, cards) {
    state.gameCards = cards;
  },
  [EXIT] (state) {
    state.toekn = null;
    state.userInfo = null;
    clearStore();
  },
  [RECORD_TOKEN] (state, token) {
    state.token = token;
    setStore('token', token);
  },
  [RECORD_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo;
    setStore('userInfo', userInfo);
  },
  [INIT_USERINFO] (state) {
    state.token = getStore('token');
    state.authority = getStore('authority');
    state.available = JSON.parse(getStore('available'));
  },
  [RECORD_LASTTABINDEX] (state, index) {
    state.lastTabIndex = index;
    setStore('lastTabIndex', index);
  },
  [TOGGLE_ALERTBAR] (state, {
    display,
    reminder = '登录失效，点击跳转至登录页......'
  }) {
    state.alertBarDisplay = display;
    state.alertBarReminder = reminder;
  },
  [CATCH_ERROR] (state, status) {
    state.alertBarDisplay = true;
    switch (status) {
      case 401:
        state.alertBarReminder = '登录失效，点击跳转至登录页......';
        return;
      case 429:
        state.alertBarReminder = '系统繁忙，请稍后再试。';
        setTimeout(() => { state.alertBarDisplay = false; }, 3000);
        return;
      default:
        state.alertBarReminder = '发生未知错误';
        setTimeout(() => { state.alertBarDisplay = false; }, 3000);
    }
  },
  [TOGGLE_EDITPANE] (state, {
    role,
    display
  }) {
    state.editPaneDisplay[role] = display;
  },
  [RECORD_SEARCH] (state, profile) {
    state.searchResult = profile;
  },
  [TOGGLE_UPDATED] (state, {
    role,
    update
  }) {
    state.updated[role] = update;
  },
  [TOGGLE_CAROUSEL] (state, display) {
    state.carouselDisplay = display;
  }
};
