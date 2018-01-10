<template>
  <section>
    <a id="test" :download="csvName + '.csv'" :href="href"></a>
    <mt-header title="卡片集">
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="exportToCsv">
        <img src="../../../assets/icon_export.png" slot="icon">
      </mt-button>
    </mt-header>

    <div class="collection-info">
      <div style="font-size: 30px">
        <div @blur="editCollectionName" contenteditable="true" style="display: inline-block; height: 60px; padding-top: 10px; box-sizing: border-box">
          <strong>{{collection.name}}</strong>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" version="1.1" viewBox="0 0 16 16" width="16px"><title/>
          <defs/>
          <g fill="none" fill-rule="evenodd" id="Icons with numbers" stroke="none" stroke-width="1">
            <g fill="#000000" id="Group" transform="translate(-384.000000, -192.000000)">
              <path
                d="M385,203.950806 L389,208 L385,208 Z M392,196 L396,200 L389.978638,207.044189 L386,203 Z M394.084619,193.781497 C394.709458,193.156658 395.90929,193.343426 396.764518,194.198654 L397.538782,194.972918 C398.394011,195.828147 398.580778,197.027979 397.95594,197.652817 L396.720394,198.888363 L392.849074,195.017043 Z M394.084619,193.781497"
                id="Triangle 313"/>
            </g>
          </g>
        </svg>
      </div>
      <div class="label-group">
        <label v-for="(item, index) in labels" :key="'label:' + index">
          <input type="radio" :value="item" v-model="selectedLabel" style="display: none">
          <mt-badge style="margin: 0 2px" :type="selectedLabel === item ? 'error' : ''" color="#333">{{item}}</mt-badge>
        </label>
        <mt-badge style="background-color: transparent; border: 2px dotted #333; color: #333 "
                  @click.native="inputLabelPopV = true">&nbsp;+&nbsp;
        </mt-badge>
        <mt-badge v-show="labels.length > 0" style="background-color: transparent; border: 2px dotted #333; color: #333"
                  @click.native="deleteLabelAlert">&nbsp;-&nbsp;
        </mt-badge>
      </div>
    </div>

    <div class="function-group" style="margin: 10px 10px 40px; background-color:whitesmoke">
      <mt-button style="background-color: darkgrey; color: white" @click="playGame(0)" plain>选择</mt-button>
      <mt-button style="background-color: gray; color: white" @click="playGame(1)" plain>配对</mt-button>
      <mt-button style="background-color: #333; color: white" @click="playGame(2)" plain>翻牌</mt-button>
      <mt-button style="background-color: black; color: white" @click="playGame(3)" plain>填空</mt-button>
    </div>

    <div v-if="ifLoading" style="text-align: center; padding-top: 60px">
      <mt-spinner :size="60" color="#333" type="snake" style="display: inline-block"></mt-spinner>
    </div>

    <section v-else="">
      <div v-if="cards.length === 0">
        <h3 style="margin-top: 100px">暂无卡片</h3>
      </div>
      <mt-cell-swipe
        v-else=""
        class="card-list"
        v-for="(item, index) in cards"
        :key="'card:' + index"
        :right="right"
        @touchend.native="renewIndex(index, item.id)"
        @click.native="editCard(item, index)">
        <div slot="title" style="border-right: 1px solid lightgrey;">{{item.front}}</div>
        <div>{{item.back}}</div>
      </mt-cell-swipe>
      <div style="width: 100%; text-align: right; position: fixed; bottom: 3%; right: 7%">
        <mt-palette-button @click.native="createCard" content="+"
                           mainButtonStyle="color:#333; background-color:whitesmoke; border: 2px solid #333;">
          <div class="my-icon-button"></div>
        </mt-palette-button>
      </div>
    </section>

    <mt-popup
      class="input"
      v-model="inputPopV"
      popup-transition="popup-fade">
      <div style="padding: 20px 30px; border-radius: 5px; background-color: whitesmoke">
        <mt-field placeholder="输入正面信息" v-model="tempCreatedCard.front" style="margin-bottom: 1px"></mt-field>
        <mt-field placeholder="输入背面信息" v-model="tempCreatedCard.back" style="margin-bottom: 10px"></mt-field>
        <mt-button size="large" plain @click="createCard" style="margin-bottom: 5px">
          <mt-spinner :size="20" v-if="ifPopLoading" color="#fff" type="snake"
                      style="display: inline-block"></mt-spinner>
          <span v-else="">生成</span>
        </mt-button>
      </div>
    </mt-popup>

    <mt-popup
      class="input"
      v-model="inputLabelPopV"
      popup-transition="popup-fade">
      <div style="padding: 20px 30px; border-radius: 5px; background-color: whitesmoke">
        <mt-field placeholder="输入标签信息" v-model="tempLabel" style="margin-bottom: 1px"></mt-field>
        <mt-button size="large" plain @click="createLabel" style="margin-bottom: 5px">
          <mt-spinner :size="20" v-if="ifPopLoading" color="#fff" type="snake"
                      style="display: inline-block"></mt-spinner>
          <span v-else="">添加</span>
        </mt-button>
      </div>
    </mt-popup>

    <mt-popup
      class="input"
      v-model="editPopV"
      popup-transition="popup-fade">
      <div style="padding: 20px 30px; border-radius: 5px; background-color: whitesmoke">
        <mt-field placeholder="输入正面信息" v-model="tempCreatedCard.front" style="margin-bottom: 1px"></mt-field>
        <mt-field placeholder="输入背面信息" v-model="tempCreatedCard.back" style="margin-bottom: 10px"></mt-field>
        <mt-button size="large" plain @click="updateCard" style="margin-bottom: 5px">
          <mt-spinner :size="20" v-if="ifPopLoading" color="#fff" type="snake"
                      style="display: inline-block"></mt-spinner>
          <span v-else="">修改</span>
        </mt-button>
      </div>
    </mt-popup>

    <mt-popup
      class="confirm"
      v-model="confirmPopV"
      position="bottom">
      <div>
        <mt-button size="large" type="danger" @click="deleteCard">删除</mt-button>
        <mt-button size="large" plain @click="confirmPopV = false">取消</mt-button>
      </div>
    </mt-popup>

    <mt-popup
      class="confirm"
      v-model="confirmLabelPopV"
      position="bottom">
      <div>
        <mt-button size="large" type="danger" @click="deleteLabel">删除</mt-button>
        <mt-button size="large" plain @click="confirmLabelPopV = false">取消</mt-button>
      </div>
    </mt-popup>
  </section>
</template>

<script>
  import axios from 'axios';
  import { Indicator, Toast, MessageBox } from 'mint-ui';
  import { mapMutations } from 'vuex';
  export default {
    data () {
      return {
        href: null,
        csvName: '未命名',
        ifLoading: true,
        ifPopLoading: false,
        selectedLabel: null,
        confirmLabelPopV: false,
        right: [{
          content: '删除',
          style: {background: 'whitesmoke', color: '#333'},
          handler: () => {
            this.deleteCard();
          }
        }],
        selectedIndex: null,
        deleteIndex: null,
        deleteId: null,
        collection: {},
        cards: [],
        labels: [],
        inputPopV: false,
        inputLabelPopV: false,
        editPopV: false,
        confirmPopV: false,
        tempCreatedCard: {
          front: '',
          back: '',
          id: null
        },
        tempLabel: null,
        filters: {
          page: 0,
          size: 10
        }
      };
    },
    computed: {
      exportedCards () {
        let cards = [];
        for (let i = 0; i < this.cards.length; i++) {
          cards.push({
            front: this.cards[i].front,
            back: this.cards[i].back
          });
        }
        return cards;
      }
//      href () { //  作为csv文件下载链接
//        let str = 'col1,col2,col3\nvalue1,value2,value3';
//        str = encodeURIComponent(str);
//        return 'data:text/csv;charset=utf-8,' + str;
//      }
    },
    methods: {
      ...mapMutations([
        'SET_GAME_CARDS'
      ]),
      editCard (item, index) {
        this.tempCreatedCard = {
          front: item.front,
          back: item.back,
          id: item.id
        };
        this.editPopV = true;
        this.selectedIndex = index;
      },
      updateCard () {
        this.ifPopLoading = true;
        axios
          .patch('/cards/' + this.tempCreatedCard.id, {
            front: this.tempCreatedCard.front,
            back: this.tempCreatedCard.back
          })
          .then(res => {
            this.cards[this.selectedIndex] = res.data;
            this.editPopV = false;
            this.ifPopLoading = false;
          })
          .catch(e => {
            this.editPopV = false;
            this.ifPopLoading = false;
          });
      },
      playGame (index) {
        if (this.cards.length < 4) {
          this.toggleToast('至少添加4张卡片才能开始游戏');
          return;
        }
        switch (index) {
          case 0:
            this.SET_GAME_CARDS(this.cards);
            this.$router.push({path: '/main/choose'});
            break;
          case 1:
            this.$router.push({path: '/main/match'});
            break;
          case 2:
            this.SET_GAME_CARDS(this.cards);
            this.$router.push({path: '/main/flip'});
            break;
        }
      },
      renewIndex (index, id) {
        this.deleteIndex = index;
        this.deleteId = id;
      },
      deleteLabelAlert () {
        if (this.selectedLabel === null) {
          this.toggleToast('请先选择要删除的标签。');
          return;
        }
        this.confirmLabelPopV = true;
      },
      deleteCard () {
        // 删除卡片
        Indicator.open('删除中...');
        axios
          .delete('/cards/' + this.deleteId)
          .then(res => {
            this.cards.splice(this.deleteIndex, 1);
            Indicator.close();
            this.toggleToast('删除成功！');
          })
          .catch(e => {
            Indicator.close();
            this.toggleToast('删除失败！');
          });
      },
      editCollectionName (e) {
        let name = e.currentTarget.innerText;
        if (name === null || name === '') return;
        this.updateCollection({name: e.currentTarget.innerText});
      },
      createLabel () {
        this.ifPopLoading = true;
        axios.post('/collections/' + this.collection.id + '/labels', {}, {
          params: {
            content: this.tempLabel
          }
        }).then((res) => {
          this.labels.push(this.tempLabel);
          this.ifPopLoading = false;
          this.inputLabelPopV = false;
        }).catch(e => {
          this.ifPopLoading = false;
          if (e.response.status === 403) {
            this.inputLabelPopV = false;
            this.toggleToast('该标签已被添加');
          } else this.toggleToast('添加失败！');
        });
      },
      deleteLabel () {
        Indicator.open('删除中...');
        axios.delete('/collections/' + this.collection.id + '/labels', {
          params: {
            content: this.selectedLabel
          }
        }).then((res) => {
          for (let i = 0; i < this.labels.length; i++) {
            if (this.labels[i] === this.selectedLabel) {
              this.labels.splice(i, 1);
              this.confirmLabelPopV = false;
              Indicator.close();
              break;
            }
          }
        }).catch(e => {
          this.confirmLabelPopV = false;
          Indicator.close();
          this.toggleToast('删除失败！');
        });
      },
      toggleToast (message) {
        Toast({
          message,
          position: 'bottom',
          duration: 3000
        });
      },
      updateCollection (data) {
        axios
          .patch('/collections/' + this.collection.id, data)
          .then(res => {
          })
          .catch(e => {
            console.log(e);
          });
      },
      getCards () {
        axios.get('/collections/' + this.collection.id + '/cards', {
          params: {
            page: this.filters.page,
            size: this.filters.size
          }
        }).then((res) => {
          this.cards = res.data.content;
          this.ifLoading = false;
        }).catch(e => {
          console.log(e);
          this.ifLoading = false;
        });
      },
      getLabels () {
        axios
          .get('/collections/' + this.collection.id + '/labels')
          .then((res) => {
            this.labels = res.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      createCard () {
        // 新建卡片
        axios.post('/collections/' + this.collection.id + '/cards', {}, {
          params: {
//            front: this.tempCreatedCard.front,
//            back: this.tempCreatedCard.back
            front: '',
            back: ''
          }
        }).then((res) => {
          this.cards.unshift(res.data);
        }).catch(e => {
          console.log(e);
        });
      },
      exportToCsv () {
        if (this.cards.length === 0) {
          this.toggleToast('请先添加卡片或等待卡片加载完毕。');
          return;
        }
        let self = this;
        let json2csv = require('json2csv');
        let fields = ['front', 'back'];
        try {
          // 添加\uFFFF 后缀解决中文乱码问题
          this.href = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(json2csv({data: this.exportedCards, fields: fields}));
          MessageBox.prompt('请输入文件名').then(({value, action}) => { //  TODO 文件名无法即时修改
            self.csvName = value !== '' ? value : '未命名';
            setTimeout(
              () => {
                document.getElementById('test').click();
              }, 500);
          });
        } catch (err) {
          // Errors are thrown for bad options, or if the data is empty and no fields are provided.
          // Be sure to provide fields if it is possible that your data array will be empty.
          console.error(err);
        }
      }
    },
    created () {
      this.collection = JSON.parse(this.$route.query.data);
      this.getCards();
      this.getLabels();
    },
    components: {}
  };
</script>

<style>
  .function-group {
    margin: 10px 10px 40px;
    background-color: whitesmoke;
    display: flex;
    justify-content: space-around;
    font-size: 25px !important;
  }

  .function-group button {
    padding: 10px;
    border-radius: 0;
    border: hidden !important;
    flex-grow: 1;
  }

  .collection-info {
    text-align: left;
    padding: 10px;
  }

  .label-group {
    padding: 10px 0;
  }

  .confirm.mint-popup {
    width: 100%;
    background: none;
  }

  .input.mint-popup {
    width: 70%;
    background: none;
  }

  div.input {
    border: none;
    border-bottom: 1px solid gainsboro;
    outline: none;
  }

  .card-list.mint-cell-swipe {
    padding: 0 10px;
    margin: 2px 10px;
    background-color: #333;
    color: whitesmoke;
  }

  .card-list .mint-cell-wrapper {
    text-align: left;
    align-items: flex-start;
    margin-bottom: 1px;
    line-height: 1.2;
  }

  .card-list .mint-cell-title {
    width: 30%;
    padding: 1em 0.5em;
    /*box-sizing: border-box;*/
  }

  .card-list .mint-cell-value {
    width: 60%;
    padding: 1em 0.5em;
  }
  .mint-header {
    background-color: #333;
    color: whitesmoke;
  }
</style>
