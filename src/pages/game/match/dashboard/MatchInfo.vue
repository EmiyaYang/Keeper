<template>
    <div class="board">
        <span>还待配对</span>
        <h2>{{ leftMatched }} 对</h2>
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'leftMatched'
    ])
  }
};
</script>

<style scoped>
.board{
    padding: 10px;
    background-color: #bbada0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #eae0d1;
}

span{
    font-size: 19px;
    font-weight: bold;
    display: block;
    width: 100%;
    text-align: center;
}

h2{
    color: #fff;
}
@media screen and (max-width: 450px) {
    .board{
        width: 105px;
    }
    span{
        font-size: 17px;
    }
}

@media screen and (max-width: 380px) {
    .board{
        width: 95px;
    }
}

@media screen and (max-width: 360px) {
    .board{
        width: 80px;
    }
    span{
        font-size: 15px;
    }
}
</style>
