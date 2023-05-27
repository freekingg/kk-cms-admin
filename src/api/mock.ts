import { get } from "@/utils/http";

/** 地图数据 */
export const mapJson = (params?: object) => {
  return get("/getMapInfo", { params });
};
