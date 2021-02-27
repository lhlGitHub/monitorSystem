import Monitor from './module';
import Vue from 'vue';

new Monitor().init({
  url: 'http://127.0.0.1:7001/saveError',
  vue: Vue,
});

var vm = new Vue({
  el: document.querySelector('#app'),
  data: {
    message: '--------------------------------',
  },

  created() {
    console.log('created');
    this.ajax('http://127.0.0.1:7001/ajaxError'); // ajax 异常

    this.func1().then((ret)=>{
        throw new Error("promise error 22222222222");   //promise_error
    });
      ss();   // vue_error
  },

  methods: {
    ajax(url, dataStr) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        console.log('url', url);
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(dataStr);
      } catch (error) {
        console.log('ajax', error);
      }
    },
    func1() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
  },
});
