<template>
  <section>
    <mt-header title="搜索集合">
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-search v-model.trim="keyword" :result="result" :autofocus="true" :show="true" cancel-text="清空">
      <mt-cell
        v-for="(item, index) in result"
        :title="item.name"
        :key="'searchedCollection:' + index"
        :value="item.cardCount + '张卡片'"
        @click.native="viewCollection(item)"
      >
      </mt-cell>
    </mt-search>
    <div v-if="ifLoading" style="text-align: center; padding-top: 60px">
      <mt-spinner :size="60" color="#1db0b8" type="snake" style="display: inline-block"></mt-spinner>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import { getStore } from '../../../config/mUtils';
  export default {
    data () {
      return {
        keyword: null,
        result: [],
        page: 0,
        size: 10,
        ifLoading: true
      };
    },
    watch: {
      keyword (val) {
        this.result = [];
        this.search();
      }
    },
    methods: {
      search () {
        axios.get('/collections', {
          params: {
            username: getStore('username'),
            page: this.page,
            size: this.size,
            label: this.keyword
          }
        }).then(res => {
          this.result = res.data.content;
          this.ifLoading = false;
        }).catch(e => {
          console.log(e);
          this.ifLoading = false;
        });
      },
      viewCollection (data) {
        this.$router.push({path: '/main/collection', query: {data: JSON.stringify(data)}});
      }
    }
  };
</script>
