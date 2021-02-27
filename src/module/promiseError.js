import BaseError from './base.js';
import getLastEvent from '../libs/getLastEvent';
import { getSelector } from '../libs/utils';
/*
捕获 promise 异常
*/
export default class ResourceError extends BaseError {
  constructor(params) {
    super(params);
  }
  /*
     处理 promise 异常
    */
  hanleError() {
    window.addEventListener('unhandledrejection', (event) => {
      try {
        console.log('event', event);
        if (!event || !event.reason) {
          return;
        }
        let lastEvent = getLastEvent();
        this.category = 'stability';

        this.timeStamp = event.timeStamp; // 访问时间戳
        this.type = 'promiseError'; // 错误类型
        this.selector = lastEvent ? getSelector(lastEvent.path) : ''; //选择器ERROR';
        let reason=event.reason
        if (typeof reason === 'string') {
          this.msg = reason;
        } else {
          this.msg = reason.message
          this.stack = reason.stack
          // at http://localhost:8080/:22:17
          let matchfile = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
          this.filename = matchfile[1]
          this.postion = matchfile[2] + ',' + matchfile[3]
        }
       

        this.recordError();
      } catch (error) {
        console.log('promise 异常' + error);
      }
    });
  }
}
