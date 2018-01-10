import { fetchWithParams } from '../config/mUtils';
export const testData = {
  username: 'admin',
  nickname: '测试用户',
  collections: [
    {
      name: '四六级单词',
      publishTime: 1514338250814,
      labels: ['英语', '词汇'],
      cards: [
        {
          front: 'whole',
          back: '整体'
        }, {
          front: 'reporters',
          back: '记者'
        }, {
          front: 'prime',
          back: '最好的'
        }, {
          front: 'choice',
          back: '选择'
        }, {
          front: 'minister',
          back: '大臣'
        }, {
          front: 'minister',
          back: '大臣'
        }, {
          front: 'paint',
          back: '绘制'
        }, {
          front: 'test',
          back: '测试'
        }, {
          front: 'target',
          back: '目标'
        }, {
          front: 'bloom',
          back: '开花'
        }, {
          front: 'blooming',
          back: '盛开的'
        }
      ]
    }, {
      name: '操作系统重点概念',
      labels: ['概念', '计算机'],
      publishTime: 1514338250814,
      cards: [
        {
          front: '死锁',
          back: '两个或两个以上的进程在执行过程中，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象'
        }, {
          front: '线程',
          back: '程序执行流的最小单元'
        }
      ]
    }, {
      name: '编译原理',
      publishTime: 1514338250814,
      labels: [],
      cards: [
        {
          front: '死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁死锁v',
          back: '两个或两个以上的进程在执行过程中，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象'
        }, {
          front: '线程',
          back: '程序执行流的最小单元'
        }
      ]
    }, {
      name: '软件工程',
      publishTime: 1514338250814,
      labels: [],
      cards: [
        {
          front: '死锁',
          back: '两个或两个以上的进程在执行过程中，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象'
        }, {
          front: '线程',
          back: '程序执行流的最小单元'
        }
      ]
    }, {
      name: '嵌入式系统',
      publishTime: 1514338250814,
      labels: [],
      cards: [
        {
          front: '死锁',
          back: '两个或两个以上的进程在执行过程中，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象'
        }, {
          front: '线程',
          back: '程序执行流的最小单元'
        }, {
          front: '用例图',
          back: 'hhh'
        }
      ]
    }
  ]
};

const domain = 'https://9441721c.ap.ngrok.io/';

export const getProfile = (username) => fetchWithParams('GET', domain + '/profile', {username});
