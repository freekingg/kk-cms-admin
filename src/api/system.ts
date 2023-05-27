import { post, get } from "@/utils/http";

/** 获取用户组列表 */
export const getAllGroups = (data?: object) => {
  return get("/cms/admin/group/all", data);
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return post("/role", data);
};

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return post("/dept", data);
};
