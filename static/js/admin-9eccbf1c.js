var p=Object.defineProperty;var P=(n,s,e)=>s in n?p(n,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[s]=e;var r=(n,s,e)=>(P(n,typeof s!="symbol"?s+"":s,e),e);import{bo as i,bp as o,bq as g,br as m}from"./index-2290b500.js";const u=class{constructor(s=0,e=10,a=0,t=5){r(this,"uPage");r(this,"uCount");r(this,"lPage");r(this,"gCount");this.uPage=s,this.uCount=e,this.lPage=a,this.gCount=t}async increaseUPage(){this.uPage+=1}async increaseGPage(){this.lPage+=1}async decreaseUPage(){this.uPage-=1,this.uPage<0&&(this.uPage=0)}async decreaseGPage(){this.lPage-=1,this.lPage<0&&(this.lPage=0)}static getAllPermissions(){return i("cms/admin/permission")}static async getAdminUsers({groupId:s,count:e=this.uCount,page:a=this.uPage}){let t;return s?t=await i("cms/admin/users",{count:e,page:a,group_id:s}):t=await i("cms/admin/users",{count:e,page:a}),t}async nextUsersPage(){return await this.increaseUPage(),u.getAdminUsers({})}async preUsersPage(){return await this.decreaseUPage(),u.getAdminUsers({})}async getGroupsWithPermissions({count:s=this.uCount,page:e=this.uPage}){return await i("cms/admin/groups",{count:s,page:e})}async nextGroupsPage(){return await this.increaseGPage(),this.getGroupsWithPermissions({})}async preGroupsPage(){return await this.decreaseGPage(),this.getGroupsWithPermissions({})}static async getAllGroups(){return await i("cms/admin/group/all")}static async getOneGroup(s){return await i(`cms/admin/group/${s}`)}static async createOneGroup(s,e,a){return await o("cms/admin/group",{name:s,info:e,permission_ids:a})}static async updateOneGroup(s,e,a){return await g(`cms/admin/group/${a}`,{name:s,info:e})}static async deleteOneGroup(s){return await m(`cms/admin/group/${s}`)}static async deleteOneUser(s){return await m(`cms/admin/user/${s}`)}static async updateOneUser(s,e,a){return await g(`cms/admin/user/${a}`,{email:s,group_ids:e})}static async dispatchPermissions(s,e){return await o("cms/admin/permission/dispatch/batch",{group_id:s,permission_ids:e})}static async changePassword(s,e,a){return await g(`cms/admin/user/${a}/password`,{new_password:s,confirm_password:e})}static async removePermissions(s,e){return await o("cms/admin/permission/remove",{group_id:s,permission_ids:e})}};let c=u;r(c,"uPage"),r(c,"uCount");export{c as A};