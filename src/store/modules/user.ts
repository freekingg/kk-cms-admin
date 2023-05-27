import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import User from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { removeToken } from "@/utils/token";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    user: {}, // 当前用户
    loggedIn: localStorage.getItem("loggedIn") || "0", // 是否登录
    permissions: [], // 每个用户的所有权限
    username: "",
    roles: [],
    verifyCode: "",
    currentPage: 0
  }),
  actions: {
    /** 存储用户 */
    SET_USER(user: any) {
      this.user = user;
    },
    /** 存储用户登录状态 */
    SET_LOGGED_IN(loggedIn: any) {
      this.loggedIn = loggedIn;
      localStorage.setItem("loggedIn", "1");
    },
    /** 存储角色 */
    SET_USER_PERMISSIONS(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储前端生成的验证码 */
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode;
    },
    /** 存储登录页面显示哪个组件 */
    SET_CURRENTPAGE(value: number) {
      this.currentPage = value;
    },
    /** 登入 */
    async loginByUsername({ username, password }) {
      return new Promise<any>((resolve, reject) => {
        User.getToken(username, password)
          .then(data => {
            if (data) {
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
