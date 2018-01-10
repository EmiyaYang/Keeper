<template>
  <div class="question">
    <div></div>
    <div class="topic">{{selectedCard.topic}}</div>
    <div class="option-group">
      <div
        class="option"
        v-for="(item, index) in selectedCard.options"
        :key="'option:' + index">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['question', 'side'],
    data () {
      return {};
    },
    computed: {
      selectedCard () {
        let rd = Math.floor(Math.random() * this.question.length);
        let options = [];
        if (this.side) {
          for (let i = 0; i < this.question.length; i++) {
            options.push(this.question[i].back);
          }
          return {
            topic: this.question[rd].front,
            options: options,
            answerIndex: rd
          };
        } else {
          for (let i = 0; i < this.question.length; i++) {
            options.push(this.question[i].front);
          }
          return {
            topic: this.question[rd].back,
            options: options,
            answerIndex: rd
          };
        }
      }
    }
  };
</script>

<style scoped>
  .question {
    background-color: whitesmoke;
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .topic {
    font-size: 30px;
  }
  .option-group {
    height: 252px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
  }
  .option {
    border: 1px #333 solid;
    border-radius: 10px;
    margin: 5px;
    padding: 10px;
  }
  .option:active {
    background-color: #333;
    color: whitesmoke;
  }
</style>
