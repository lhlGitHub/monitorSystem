import AjaxError from './ajaxError.js';
import PromiseError from './promiseError.js';
import JsResourceError from './jsResourceError.js';
import VueError from './vueError.js';

  
  class Monitor {
    constructor() {}
  
    init(options) {
      console.log('options',options)
      let param = {reportUrl:options.url}
      new PromiseError(param).hanleError();
  
      new JsResourceError(param).hanleError();
      new AjaxError(param).hanleError();
  
      options.vue && new VueError(param).hanleError(options.vue);
    }
  }
  
  export default Monitor