/**
 * 存储tokens
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export function saveTokens(accessToken, refreshToken) {
  localStorage.setItem("access_token", `Bearer ${accessToken}`);
  localStorage.setItem("refresh_token", `Bearer ${refreshToken}`);
  localStorage.setItem("loggedIn", "1");
}

/**
 * 存储access_token
 * @param {string} accessToken
 */
export function saveAccessToken(accessToken) {
  localStorage.setItem("access_token", `Bearer ${accessToken}`);
  localStorage.setItem("loggedIn", "1");
}

/**
 * 获得某个token
 * @param {string} tokenKey
 */
export function getToken(tokenKey) {
  return localStorage.getItem(tokenKey);
}

/**
 * 移除token
 */
export function removeToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.setItem("loggedIn", "0");
}
