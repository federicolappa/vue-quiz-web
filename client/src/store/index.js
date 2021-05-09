import jwt from "jsonwebtoken";
import { createStore } from "vuex";
import * as string from "../common/string";
import router from "../router/index";
import { socketConnect } from "./socket";

const JWT_TOKEN = process.env.VUE_APP_JWT_TOKEN;

export default createStore({
  state: {
    string,
    jwtToken: JWT_TOKEN,
    user: null,
    socket: null,
    isLoadingPage: false,
    isLoadingAction: false,
  },
  mutations: {
    setIsLoadingPage(state, payload) {
      state.isLoadingPage = payload;
    },
    setIsLoadingAction(state, payload) {
      state.isLoadingAction = payload;
    },
    setQuizUserStorage(_, payload) {
      const { quiz_code, username } = payload;
      const quizStorage =
        JSON.parse(localStorage.getItem(".quiz_config_user")) || {};
      quizStorage[quiz_code] = username;
      localStorage.setItem(".quiz_config_user", JSON.stringify(quizStorage));
    },
  },
  actions: {
    async actLoadingPage(context) {
      context.commit("setIsLoadingPage", true);

      // socket connect
      const socket = await socketConnect();
      context.state.socket = socket;

      // load user storage
      await context.dispatch("actLoadUserStorage");

      // middleware user login
      const currentPath = router.currentRoute.value.path;
      // middleware user login
      if (currentPath.indexOf("/admin") === 0 && !context.state.user)
        router.push({ name: "Login" });
      if (currentPath.indexOf("/auth") === 0 && context.state.user)
        router.push({ name: "Admin" });

      context.commit("setIsLoadingPage", false);
    },
    async actLoadingAction(context, callback) {
      context.commit("setIsLoadingAction", true);
      await callback();
      context.commit("setIsLoadingAction", false);
    },
    async actLoadUserStorage(context) {
      const token = localStorage.getItem(".config_user");
      return new Promise((resolve) => {
        jwt.verify(token, context.state.jwtToken, (err, decoded) => {
          if (err) return resolve(err);
          if (decoded) {
            context.state.user = decoded;
            resolve(decoded);
          }
        });
      });
    },
  },
  modules: {},
});
