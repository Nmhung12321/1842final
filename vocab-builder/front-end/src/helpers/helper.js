import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue(); 

export const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    const status = error?.response?.status || 'Network error';
    const message = error?.response?.statusText || error.message || 'Something went wrong';
    vm.flash(`${status}: ${message}`, 'error');
  });