import BaseError from './base.js';

/*
捕获 ajax 异常
*/
export default class AjaxError extends BaseError {
  constructor(params) {
    super(params);
  }
  /*
     处理 ajax 异常
    */
  hanleError() {
    if (!window.XMLHttpRequest) return;
    let xhrSend = XMLHttpRequest.prototype.send;
    let _handler = (event) => {
      //  console.log('ajaxevent',event)
      try {
        this.category = 'stability';
        this.type = 'ajaxError'; // 错误类型
        this.msg = event.target.response;
        this.url = event.target.responseURL;
        this.status = event.target.status;
        this.statusText = event.target.statusText
        this.recordError();

      } catch (error) {
        console.log('error', error);
      }
    };
    XMLHttpRequest.prototype.send = function() {
      if (this.addEventListener) {
        this.addEventListener('error', _handler);
        this.addEventListener('load', _handler);
        this.addEventListener('abort', _handler);
      }
      return xhrSend.apply(this, arguments);
    };
    
  }
}
