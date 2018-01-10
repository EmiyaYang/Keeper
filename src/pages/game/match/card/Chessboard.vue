<template>
    <div class="chessboard">
        <Card v-for="(card, index) in cards" :key="index" :option="card" @flipped="onFlipped"></Card>
    </div>
</template>

<script>
import Card from './Card';

import { mapActions, mapState } from 'vuex';

import { STATUS } from '../../../../store/statusEnum';

export default {
  data () {
    return {
      lastCard: null
    };
  },
  computed: {
    ...mapState([
      'leftMatched',
      'cards',
      'status'
    ])
  },
  methods: {
    ...mapActions([
      'updateStatus',
      'match',
      'flipCards'
    ]),
    onFlipped (e) {
      if (this.status === STATUS.READY) {
        this.updateStatus(STATUS.PLAYING);
      }
      if (!this.lastCard) {
        this.lastCard = e;
        return this.lastCard;
      }
      if (this.lastCard !== e && this.lastCard.cardName === e.cardName) {
        this.lastCard = null;
        this.match();
        return this.leftMatched || this.updateStatus(STATUS.PASS);
      }
      let lastCard = this.lastCard;
      this.lastCard = null;
      setTimeout(() => {
        this.flipCards([lastCard, e]);
      }, 200);
    }
  },
  components: {Card}
};
</script>

<style scoped>
.chessboard{
    margin-top: 20px;
    width: 100%;
    background-color: #bbada0;
    height: 530px;
    border-radius: 4px;
    padding: 10px 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: space-around;
}

.container:nth-child(4n){
    margin-right: 0px;
}

@media screen and (max-width: 450px) {
    .chessboard{
        height: 480px;
        padding: 10px 0px;
    }
}
@media screen and (max-width: 370px) {
    .chessboard{
        height: 450px;
    }
}
</style>
