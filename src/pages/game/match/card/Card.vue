<template>
    <div class="container" @click="flip" v-bind:class="{ flipped: option.flipped }">
        <div class="card">
            <span class="content">{{this.option.cardContent}}</span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    option: {
      type: Object,
      default () {
        return {
          flipped: false,
          cardContent: '',
          cardName: ''
        };
      }
    }
  },
  methods: {
    ...mapActions(['flipCard']),
    flip () {
      if (this.option.flipped) {
        return;
      }
      this.flipCard(this.option);
      this.$emit('flipped', this.option);
    }
  },
  components: {}
};
</script>

<style scoped>
    .container {
        width: 95px;
        height: 105px;
        margin-right: 3px;
        cursor: pointer;
        position: relative;
        perspective: 800px;
        background-color: floralwhite;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .card {
        width: 100%;
        height: 100%;
        align-items: center;
    }

    .container.flipped {
        background-color: gray;
        color: grey;
    }

    .container.flipped .card .content {
        color: gray;
    }

    .content{
        font-size: 20px;
        font-weight: bold;
        display: block;
        width: 100%;
        color: #5979ac;
        text-align: center;
        margin-top: 30px;
    }


    @media screen and (max-width: 450px) {
        .container {
            width: 92px;
            height: 111px;
            margin-right: 1px;
        }
    }

    @media screen and (max-width: 380px) {
        .container {
            width: 85px;
            height: 102px;
            margin-right: 1px;
        }
    }

    @media screen and (max-width: 360px) {
        .container {
            width: 70px;
            height: 84px;
            margin-right: 1px;
        }
    }
</style>
