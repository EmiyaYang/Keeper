/**
 * Created by 10388 on 2017/9/20.
 */
import $ from 'jquery';
window.Date.prototype.Format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
  return fmt;
};
/**
 * 根据时间戳获取指定格式的时间字符串
 * @param format
 * @param timestamp
 */
export const getTimeString = (format, timestamp) => {
  if (!format) return;
  return new Date(timestamp).Format(format);
};

/**
 * 将权限数组转化为整型
 * @param arr
 */
export const parseIntAuthority = (arr) => {
  let authorityStamp;
  for (let i in arr) {
    authorityStamp |= arr[i];
  }
  return authorityStamp;
};

/**
 * 数字精确度处理
 * @param x
 * @returns {*|string}
 */
export const numProcess = (x, n) => {
  return x.toFixed(n);
};

/**
 * 根据出生日期的时间戳获取年龄
 * @param birthday
 * @returns {number}
 */
export const getAge = birthday => {
  return new Date(new Date().getTime() - birthday).getFullYear() - 1970;
};
/**
 * 性别值映射
 * @param gender
 * @returns {string}
 */
export const getGender = gender => {
  return gender === 'male' ? '男' : '女';
};

/**
 * 对loacakStorage的设置方法再封装
 * @param key
 * @param value
 */
export const setStore = (key, value) => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};
/**
 * 对localStorage的获取方法进行再封装
 * @param key
 */
export const getStore = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
};
/**
 * 对loacalStorage的删除方法进行再封装
 * @param key
 */
export const removeStore = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
};
/**
 * 对loacalStorage的清空方法进行再封装
 */
export const clearStore = () => {
  window.localStorage.clear();
};
/**
 * 限制文件大小
 * @param target
 * @returns {boolean}
 */
export const fileSizeLimit = target => {
  let isIE = /msie/i.test(navigator.userAgent) && !window.opera;

  let fileSize = 0;
  if (isIE && !target.files) {    // IE浏览器
    let filePath = target.value; // 获得上传文件的绝对路径
    let fileSystem = new window.ActiveXObject('Scripting.FileSystemObject');
    // GetFile(path) 方法从磁盘获取一个文件并返回。
    let file = fileSystem.GetFile(filePath);
    fileSize = file.Size;    // 文件大小，单位：b
  } else {    // 非IE浏览器
    fileSize = target.files[0].size;
  }
  var size = fileSize / 1024;
  if (size > 100) {
    alert('附件不能大于100k');
    return false;
  } else {
    return true;
  }
};
/**
 * 根据年月返回最大天数限制
 * @param year
 * @param month
 * @returns {number}
 */
export const getMaxDay = (year, month) => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28;
  }
};

/**
 * JSON对象深度拷贝
 * @param target
 */
export const deepCopy = (target) => {
  return JSON.parse(JSON.stringify(target));
};

/**
 * 比较两个JSON对象的文本是否一致
 * @param j1
 * @param j2
 * @returns {boolean}
 */
export const compareJson = (j1, j2) => {
  return JSON.stringify(j1) === JSON.stringify(j2);
};

/**
 * 导出文件为txt格式
 * @param invitationCodes
 */
export const exportToTxt = (invitationCodes) => {
  if (invitationCodes.length === 0) return;
  let name = prompt('请输入导出 txt 的文件名', '邀请码');
  if (name === null || name === '') {
    return;
  }

  let link = document.createElement('a');

  let actual = invitationCodes.toString().replace(/\n/g, '\r\n');

  link.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(actual);
  link.innerHtml = 'Open the text file';
  link.download = name.endsWith('.txt') ? name : name + '.txt';

  link.click();
};

/**
 * 根据value获取group中的txt值
 * @param map {value: [], txt: []}
 * @param value
 */
export const mapSelectTxt = (map, value) => {
  for (let i = 0; i < map.value.length; i++) {
    if (map.value[i] === value) {
      return map.txt[i];
    }
  }
  return null;
};

/**
 * 网络加载方法
 * @param type
 * @param url
 * @param paramStr
 * @param data
 * @param dataType
 * @param contentType
 * @returns {Promise}
 */
export const _fetch = async (type, url, paramStr, data, dataType = 'json', contentType = 'application/x-www-form-urlencoded') => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: type,
      url: url + paramStr,
      data,
      crossDomain: true,
      dataType,
      contentType,
      headers: {
        'Authorization': 'Bearer ' + getStore('token')
      },
      // beforeSend (request) {
      //   request.setRequestHeader('Authorization', 'Bearer ' + getStore('token'));
      // },
      success: (result, status, xhr) => {
        resolve(result);
      },
      error: (xhr, textStatus, errorThrown) => {
        reject(xhr);
      }
    });
  });
};

/**
 * 使用url参数进行传参
 * @param type
 * @param url
 * @param params
 * @param contentType
 * @param dataType
 * @returns {Promise}
 */
export const fetchWithParams = (type, url, params, contentType = 'application/x-www-form-urlencoded', dataType = 'json') => {
  let dataStr = ''; // 数据拼接字符串
  if (params) {
    Object.keys(params).forEach(key => {
      if (params[key] === 'all') return;
      dataStr += '&' + key + '=' + params[key];
    });
    dataStr = dataStr.replace('&', '?'); // 将第一个&替为？
  }
  return _fetch(type, url, dataStr, {}, dataType, contentType);
};

/**
 * 使用JSON进行传参
 * @param type
 * @param url
 * @param data
 * @param dataType
 * @param contentType
 * @returns {Promise}
 */
export const fetchWithData = (type, url, data, dataType = 'json', contentType = 'application/json') => {
  // let body = JSON.stringify(data)
  return _fetch(type, url, '', data, dataType, contentType);
};

/**
 * 传输文件
 * @param type
 * @param url
 * @param data
 * @param dataType
 * @returns {Promise}
 */
export const fetchFile = async (type, url, data, dataType = 'json') => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: type,
      url,
      data,
      cache: false,
      processData: false,
      contentType: false,
      dataType,
      beforeSend (request) {
        request.setRequestHeader('Authorization', 'Bearer ' + getStore('token'));
      },
      success: (result, status, xhr) => {
        resolve(result);
      },
      error: (xhr, textStatus, errorThrown) => {
        reject(textStatus);
      }
    });
  });
};

// 将数组内容随机打乱；用于 cards 的洗牌
export const shuffle = function (arr) {
  let newArr = arr.slice();
  for (let i = newArr.length; i; i -= 1) {
    let j = Math.floor(Math.random() * i);
    let x = newArr[i - 1];
    newArr[i - 1] = newArr[j];
    newArr[j] = x;
  }
  return newArr;
};

export const exportCsv = (text) => {
  // let link = html.create("a", {
  //   href: 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(text),
  //   target: '_blank',
  //   download: filename
  // }, this.domNode);
  // if (has('safari')) {
  //   // # First create an event
  //   var click_ev = document.createEvent("MouseEvents");
  //   // # initialize the event
  //   click_ev.initEvent("click", true /* bubble */ , true /* cancelable */ );
  //   // # trigger the evevnt/
  //   link.dispatchEvent(click_ev);
  // } else {
  //   link.click();
  // }
};
