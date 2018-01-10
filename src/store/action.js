import { shuffle } from '../config/mUtils';
import { STATUS } from './statusEnum';

// yourCards 是你那边的数据，为了防止命名冲突，我暂时这样写了
let yourCards = [
  {
    front: 'whole',
    back: '整体'
  }, {
    front: 'reporters',
    back: '记者'
  }, {
    front: 'prime',
    back: '最好的'
  }, {
    front: 'choice',
    back: '选择'
  }, {
    front: 'apple',
    back: '苹果'
  }, {
    front: 'minister',
    back: '大臣'
  }, {
    front: 'paint',
    back: '绘制'
  }, {
    front: 'paint',
    back: '绘制'
  }
];
// 将你那边的 cards 数据中的 front、back 内容分别提取出来；按序号顺序转换为我这边的格式
// 在下面 cards: shuffle(front.concat(back)) 中会将其合并并打乱顺序
let back = yourCards.map(o => ({ cardName: yourCards.indexOf(o), cardContent: o.back, flipped: false }));
let front = yourCards.map(o => ({ cardName: yourCards.indexOf(o), cardContent: o.front, flipped: false }));

let timerId;

let statusHandler = {
  PLAYING: function ({ commit }) {
    timerId = setInterval(function () {
      commit('counting');
    }, 1000);
  },

  PASS: function ({ commit }) {
    clearInterval(timerId);
    commit('updateHighestSpeed');
  }
};

export default {
  reset: function ({ commit }) {
    commit('reset', {
      leftMatched: 8,
      highestSpeed: localStorage.getItem('highestSpeed') || 0,
      status: STATUS.READY,
      cards: shuffle(front.concat(back)), // 将 cards 随机洗牌
      elapsedMs: 0
    });
  },

  updateStatus: function (context, status) {
    context.commit('updateStatus', status);
    statusHandler[status] && statusHandler[status](context);
  },

  flipCard: function ({ commit }, card) {
    commit('flip', card);
  },

  flipCards: function ({ commit }, cards) {
    commit('flips', cards);
  },

  match: function ({ commit }) {
    commit('decreaseMatch');
  }
};
