import { system, permission, frame, tabs } from "@/router/enums";

const systemRouter = {
  path: "/system",
  meta: {
    icon: "setting",
    title: "menus.hssysManagement",
    rank: system
  },
  children: [
    {
      path: "/system/user/index",
      name: "User",
      meta: {
        icon: "flUser",
        title: "menus.hsUser"
      }
    },
    {
      path: "/system/role/index",
      name: "Role",
      meta: {
        icon: "role",
        title: "menus.hsRole"
      }
    }
  ]
};

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "menus.permission",
    icon: "lollipop",
    rank: permission
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "menus.permissionPage"
      }
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "menus.permissionButton"
      }
    }
  ]
};

const tabsRouter = {
  path: "/tabs",
  meta: {
    icon: "IF-pure-iconfont-tabs",
    title: "menus.hstabs",
    rank: tabs
  },
  children: [
    {
      path: "/tabs/index",
      name: "Tabs",
      meta: {
        title: "menus.hstabs"
      }
    },
    // query 传参模式
    {
      path: "/tabs/query-detail",
      name: "TabQueryDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false
      }
    },
    // params 传参模式
    {
      path: "/tabs/params-detail/:id",
      component: "params-detail",
      name: "TabParamsDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false
      }
    }
  ]
};

export const getAsyncRoutes = async () => {
  return [systemRouter];
};
