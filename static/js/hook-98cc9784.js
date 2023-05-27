import{m as d}from"./message-95bd736c.js";import{g as R}from"./system-92232dd2.js";import{r,x as U,o as A,Y as D,B as F,aR as P}from"./index-2290b500.js";import{A as l}from"./admin-9eccbf1c.js";import{_ as k}from"./form.vue_vue_type_script_setup_true_lang-6d8f56fd.js";function G(){const n=r(),m=r([]),u=r(!0),o=r([]),f=[{label:"用户名称",prop:"username",minWidth:130},{label:"角色",minWidth:90,prop:"groups",formatter:({groups:e})=>{let i="";return e.map(s=>{i+=s.name+" "}),i}},{label:"操作",fixed:"right",width:180,slot:"operation"}],p=U(()=>["!h-[20px]","reset-margin","!text-gray-500","dark:!text-white","dark:hover:!text-primary"]);async function g(e){await l.deleteOneUser(e.id),t()}async function t(){u.value=!0;const e=await l.getAdminUsers({});m.value=e.items,setTimeout(()=>{u.value=!1},500)}const h=e=>{e&&(e.resetFields(),t())};function v(e){const i=e!=null&&e.id?"修改":"新增";D({title:`${i}用户`,props:{formInline:{username:(e==null?void 0:e.username)??"",email:(e==null?void 0:e.email)??"",groupIds:(e==null?void 0:e.groups.map(s=>s.id))??[]},allGroups:o,isEdited:!!(e!=null&&e.id)},width:"40%",draggable:!0,fullscreenIcon:!0,closeOnClickModal:!1,contentRenderer:()=>F(k,{ref:n}),beforeSure:(s,{options:b})=>{const x=n.value.getUserInfoRef(),y=n.value.getPwdRef(),I=n.value.activeTab,a=b.props.formInline;I===0?x.validate(c=>{c&&(e!=null&&e.id?(l.updateOneUser(a.email,a.groupIds,e.id).then(()=>{d("修改用户成功",{type:"success"}),t()}),s()):(P.register(a).then(()=>{d("新增用户成功",{type:"success"}),t()}),s()))}):y.validate(c=>{c&&(l.changePassword(a.password,a.confirmPassword,e.id).then(()=>{d("修改密码成功",{type:"success"}),t()}),s())})}})}return A(()=>{t(),R().then(e=>{o.value=e})}),{loading:u,columns:f,dataList:m,buttonClass:p,onSearch:t,openDialog:v,resetForm:h,handleDelete:g}}export{G as useUser};