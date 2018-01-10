<template>
  <div>
    <mt-header :title="'翻牌学习('+ cards.length +')'" fixed>
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="disorganize">
        <img src="../../../assets/icon_renew.png" slot="icon">
      </mt-button>
    </mt-header>
    <div style="margin-top: 45px;">
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="swiperCallback">
        <!-- slides -->
        <swiper-slide
          v-for="(item, index) in cards"
          :key="'flip:' + index">
          <flip-card :card="item">
          </flip-card>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import flipCard from './components/flipCard';
  import { mapState } from 'vuex';
  import { deepCopy } from '../../../config/mUtils';
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  export default {
    data () {
      return {
        cards: [],
        swiperOption: {
          direction: 'vertical',
          height: window.innerHeight - 200
        }
      };
    },
    computed: {
      ...mapState(['gameCards']),
      swiper () {
        return this.$refs.mySwiper.swiper;
      }
    },
    methods: {
      swiperCallback () {
      },
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
      },
      deepCopy
    },
    created () {
      if (this.gameCards.length === 0) {
        this.$router.push({path: '/main'});
      }
      // 接收传来的card参数，若空跳转到main
      this.cards = this.gameCards;
    },
    components: {
      'flip-card': flipCard,
      swiperSlide,
      swiper
    }
  };
</script>

<style scoped>
  .mint-header {
    z-index: 2001;
  }
</style>
