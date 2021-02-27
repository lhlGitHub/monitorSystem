// 监控基类
export default class BaseMonitor {
  constructor(params) {
    this.category = ''; // 分类
    this.filename = ''; // 错误文件
    this.timeStamp = ''; // 访问时间戳
    this.userAgent = navigator.userAgent; //客户端
    this.msg = ''; //错误信息
    this.type = ''; // 错误类型
    this.postion = ''; // 位置
    this.stack = '';
    this.selector = ''; //选择器
    this.reportUrl = params.reportUrl;
  }

  report(url, dataStr) {
    try {
      if (Math.random() < 0.3) {
        new Image().src = `${url}?logs=${dataStr}`;
      }
    } catch (error) {}
  }
  recordError() {
    let data = this.handleErrorInfo();
    this.report(this.reportUrl, data);
  }
  handleErrorInfo() {
    try {
      let message = '';
      if (this.type === 'ajaxError') {
        message = `
      类别: ${this.category}\r\n
      异常类型: ${this.type}\r\n
      日志信息: ${this.msg}\r\n
      url:${this.url}\r\n
      status :${this.status}\r\n
      statusText:${this.statusText}\r\n
      客户端: ${this.userAgent}\r\n
      `;
      } else {
        message = `
       类别: ${this.category}\r\n
      异常类型: ${this.type}\r\n
      日志信息: ${this.msg}\r\n
      位置: ${this.postion}\r\n
      文件名: ${this.filename}\r\n
      堆栈: ${this.stack}\r\n
      客户端: ${this.userAgent}\r\n

      `;
      }
      this.selector && (message += `选择器: ${this.selector}`);
      console.log(message);
      return message;
    } catch (err) {
      console.log(err);
    }
  }
}
