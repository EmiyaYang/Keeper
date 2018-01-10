<template>
  <div class="panel" >
    <div class="mask" @click="flip"></div>
    <div class="front" :style="ifFlipped ? backStyle : frontStyle">{{card.front}}</div>
    <div class="back" :style="!ifFlipped ? backStyle : frontStyle">{{card.back}}</div>
  </div>
</template>

<script>
  export default {
    props: ['card'],
    data () {
      return {
        ifFlipped: false,
        frontStyle: {
          transform: 'rotatey(0deg)',
          opacity: 1,
          transition: 'all ease .5s'
        },
        backStyle: {
          transform: 'rotatey(180deg)',
          opacity: 0,
          transition: 'all ease .5s'
        }
      };
    },
    methods: {
      flip (e) {
//        let dom = e.currentTarget;
//        dom.style.transform = 'rotatey(180deg)';
//        dom.style.transition = 'ease .5s';
        this.ifFlipped = !this.ifFlipped;
      }
    }
  };
</script>

<style scoped>
  @-webkit-keyframes fadeOut {
    0% {
      opacity:1;
    }
    25% {
      opacity: 0.75;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }
  .panel {
    margin: 20px;
    box-sizing: border-box;
    height: 97%;
    position: relative;
  }

  .flip {
    transform: rotatey(180deg);
    transition: ease .5s;
    /*-webkit-animation-name: fadeOut;*/
    /*-webkit-animation-timing-function: ease-in-out;*/
    /*-webkit-animation-duration: 1s;*/
    /*-webkit-animation-direction: alternate;*/
    /*-webkit-animation-fill-mode: forwards;*/
  }

  .panel > div {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    box-sizing: border-box;
    padding: 10px;
  }

  .panel .mask {
    z-index: 1003;
  }

  .panel .front {
    background-color: whitesmoke;
    z-index: 1002;
    border-radius: 10px;
    border: 2px solid #333;
  }

  .panel .back {
    background-color: #333;
    color: whitesmoke;
    border-radius: 10px;
    z-index: 1001;
    transform: rotatey(180deg);
  }
  /*.panel:hover {*/
    /*transform: rotatey(180deg);*/
    /*transition: ease .5s;*/
  /*}*/
</style>
