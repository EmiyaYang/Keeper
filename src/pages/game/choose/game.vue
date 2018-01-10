<!-- The ref attr used to find the swiper instance -->
<template>
  <section>
    <mt-header :title="'单选测试('+ questions.length +')'" fixed>
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="disorganize">
        <img src="../../../assets/icon_renew.png" slot="icon">
      </mt-button>
    </mt-header>
    <div style="position: fixed; height: 100%; width: 100%; padding-top: 50px; background-color: whitesmoke ">
      <swiper :options="swiperOption" ref="chooseSwiper">
        <swiper-slide
          v-for="(item, index) in questions"
          :key="'question: ' + index">
          <question :question="item" :side="true"></question>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import question from './component/choiceQuestion';
  import { mapState } from 'vuex';
  import { deepCopy } from '../../../config/mUtils';
  export default {
    data () {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
          autoHeight: true
        },
        cards: []
      };
    },
    computed: {
      ...mapState(['gameCards']),
      swiper () {
        return this.$refs.chooseSwiper.swiper;
      },
      questions () { // 抽取四张卡片作为一题
        let q = [];
        let temp = [];
//        for (let i = 0; i < this.cards.length / 4; i++) {
//          let temp = [];
//          temp.push(this.cards[(this.cards.length / 4) * 4 + i]);
//        }
        for (let i = 0; i < this.cards.length; i++) {
          temp.push(this.cards[i]);
          if ((i + 1) % 4 === 0 && i !== 0) {
            q.push(temp);
            temp = [];
            continue;
          }
          if (i === this.cards.length - 1 && (i + 1) % 4 !== 0) {
            q.push(temp);
          }
        }
        return q;
      }
    },
    methods: {
      deepCopy,
      disorganize () {
        let cards = this.deepCopy(this.cards);
        for (let i = 0; i < cards.length; i++) {
          let rd = Math.floor(Math.random() * cards.length);
          let temp = null;
          temp = this.deepCopy(cards[rd]);
          cards[rd] = this.deepCopy(cards[i]);
          cards[i] = temp;
        }
        this.cards = cards;
      }
    },
    mounted () {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper);
//      this.swiper.slideTo(3, 1000, false);
      this.swiper.height = window.innerHeight;
    },
    created () {
      if (this.gameCards.length === 0) {
        this.$router.push({path: '/main'});
      }
      // 接收传来的card参数，若空跳转到main
      this.cards = this.gameCards;
    },
    components: {
      swiper,
      question,
      'swiper-slide': swiperSlide
    }
  };
</script>
