/**
 * 封装 axios
 */
import axios from "axios";
import { ElMessage } from "element-plus";

import { getToken, saveAccessToken } from "@/utils/token";
import { useUserStoreHook } from "@/store/modules/user";
const { VITE_API_URL } = import.meta.env;
console.log("VITE_API_URL: ", VITE_API_URL);

const config = {
  baseURL: VITE_API_URL || "",
  timeout: 5 * 1000, // 请求超时时间设置
  crossDomain: true,
  // 定义可获得的http响应状态码
  // return true、设置为null或者undefined，promise将resolved,否则将rejected
  validateStatus(status) {
    return status >= 200 && status < 510;
  }
};

/**
 * 错误码是否是refresh相关
 * @param { number } code 错误码
 */
function refreshTokenException(code) {
  const codes = [10000, 10042, 10050, 10052, 10012];
  return codes.includes(code);
}

// 创建请求实例
const _axios = axios.create(config);

_axios.interceptors.request.use(
  originConfig => {
    const reqConfig = { ...originConfig };

    // step1: 容错处理
    if (!reqConfig.url) {
      console.error("request need url");
    }

    reqConfig.method = reqConfig.method.toLowerCase(); // 大小写容错

    // 参数容错
    if (reqConfig.method === "get") {
      if (!reqConfig.params) {
        reqConfig.params = reqConfig.data || {};
      }
    } else if (reqConfig.method === "post") {
      if (!reqConfig.data) {
        reqConfig.data = reqConfig.params || {};
      }

      // 检测是否包含文件类型, 若包含则进行 formData 封装
      let hasFile = false;
      Object.keys(reqConfig.data).forEach(key => {
        if (typeof reqConfig.data[key] === "object") {
          const item = reqConfig.data[key];
          if (
            item instanceof FileList ||
            item instanceof File ||
            item instanceof Blob
          ) {
            hasFile = true;
          }
        }
      });

      // 检测到存在文件使用 FormData 提交数据
      if (hasFile) {
        const formData = new FormData();
        Object.keys(reqConfig.data).forEach(key => {
          formData.append(key, reqConfig.data[key]);
        });
        reqConfig.data = formData;
      }
    }

    // step2: permission 处理
    if (reqConfig.url === "cms/user/refresh") {
      const refreshToken = getToken("refresh_token");
      if (refreshToken) {
        reqConfig.headers.Authorization = refreshToken;
      }
    } else {
      const accessToken = getToken("access_token");
      if (accessToken) {
        reqConfig.headers.Authorization = accessToken;
      }
    }

    return reqConfig;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
_axios.interceptors.response.use(
  async (res: any) => {
    if (res.status.toString().charAt(0) === "2") {
      return res.data;
    }

    const { code, message } = res.data;

    return new Promise(async (resolve, reject) => {
      let tipMessage: any = "";
      const { url } = res.config;

      // refresh_token 异常，直接登出
      if (refreshTokenException(code)) {
        setTimeout(() => {
          useUserStoreHook().logOut;
          const { origin } = window.location;
          window.location.href = origin;
        }, 1500);
        return resolve(null);
      }
      // assessToken相关，刷新令牌
      if (code === 10041 || code === 10051) {
        const cache: any = {};
        if (cache.url !== url) {
          cache.url = url;
          const refreshResult: any = await _axios("cms/user/refresh");
          saveAccessToken(refreshResult.access_token);
          // 将上次失败请求重发
          const result = await _axios(res.config);
          return resolve(result);
        }
      }

      // 弹出信息提示的第一种情况：直接提示后端返回的异常信息（框架默认为此配置）；
      // 特殊情况：如果本次请求添加了 handleError: true，用户自行通过 try catch 处理，框架不做额外处理
      if (res.config.handleError) {
        return reject(res);
      }

      if (typeof message === "string") {
        tipMessage = message;
      }
      if (Object.prototype.toString.call(message) === "[object Object]") {
        [tipMessage] = Object.values(message).flat();
      }
      if (Object.prototype.toString.call(message) === "[object Array]") {
        [tipMessage] = message;
      }
      ElMessage.error(tipMessage);
      reject(res);
    });
  },
  error => {
    if (!error.response) {
      ElMessage.error("请检查 API 是否异常");
      console.log("error", error);
    }

    // 判断请求超时
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      ElMessage.warning("请求超时");
    }
    return Promise.reject(error);
  }
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url, data = {}, params = {}) {
  return _axios({
    method: "post",
    url,
    data,
    params
  });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url, params = {}) {
  return _axios({
    method: "get",
    url,
    params
  });
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url, data = {}, params = {}) {
  return _axios({
    method: "put",
    url,
    params,
    data
  });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url, params = {}) {
  return _axios({
    method: "delete",
    url,
    params
  });
}

export default _axios;
