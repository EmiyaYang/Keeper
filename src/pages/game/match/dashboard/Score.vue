<template>
    <div class="score">
        <span>最快纪录</span>
        <h2>{{ highestSpeed }} s</h2>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['highestSpeed'])
  }
};
</script>

<style scoped>
.score{
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
    .score{
        width: 105px;
    }
    span{
        font-size: 17px;
    }
}
@media screen and (max-width: 380px) {
    .score{
        width: 95px;
    }
}

@media screen and (max-width: 360px) {
    .score{
        width: 80px;
    }
    span{
        font-size: 15px;
    }
}
</style>
