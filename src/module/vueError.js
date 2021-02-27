import BaseError from './base.js';

/*
捕获 vue 异常
*/
export default class VueError extends BaseError {
  constructor(params) {
    super(params);
  }
  /*
     处理 vue 异常
    */
  hanleError(Vue) {
    if (!Vue) return;
    Vue.config.errorHandler = (error, vm, info) => {
      let matchfile = error.stack.match(/at\s+(.+):(\d+):(\d+)/);
      try {
        this.category = 'stability';
        this.filename = matchfile[1];
        this.type = 'vueError'; // 错误类型
        this.msg = info;
        this.postion = matchfile[2] + ':' + matchfile[3];
        this.stack = error.stack;
        this.recordError();
      } catch (error) {
        // console.log('vue error', error);
      }
    };
  }
}
