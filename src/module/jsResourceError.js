import BaseError from './base.js';
import getLastEvent from '../libs/getLastEvent';
import { getSelector } from '../libs/utils';

/*
捕获 js 异常和资源加载异常
*/
export default class JsResourceError extends BaseError {
  constructor(params) {
    super(params);
  }
  /*
     处理 js 和资源加载异常
    */
  hanleError() {
    window.addEventListener(
      'error',
      (event) => {
        try {
          let target = event.target;
          let isElementTarget =
            target instanceof HTMLScriptElement ||
            target instanceof HTMLLinkElement ||
            target instanceof HTMLImageElement;
          if (isElementTarget) {
            //资源加载错误
            this.type = 'resourceError'; // 错误类型
            this.filename = target.src || target.href;
            this.tagName = target.tagName;
            this.selector = getSelector(target)
          } else {
            let lastEvent = getLastEvent();
            this.msg = event.error.message; //错误信息
            this.type = 'jsError'; // 错误类型
            this.postion = event.lineno + ',' + event.colno; // 位置
            this.filename = event.filename;
            this.stack = event.error.stack;
            this.selector = lastEvent ? getSelector(lastEvent.path) : ''; //选择器
          }
         
          this.category = 'stability';
          this.timeStamp = event.timeStamp; // 访问时间戳
          this.recordError();
        } catch (error) {
          console.log('资源加载收集异常', error);
        }
        if (!event) return;
      },
      true
    );
  }
}
