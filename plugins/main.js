import Vue from "vue";

import "../styles/animate.css";
import "../styles/common.css";

import VueResource from "vue-resource";
Vue.use(VueResource);
import {http} from "./axios";
Vue.prototype.$axios = http;

import Head from "../components/Head.vue";//注册全局组件
Vue.component("Head",Head);

// import Mock from "./mock";
// Vue.use(Mock);
