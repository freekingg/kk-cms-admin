import{t as s}from"./data-62aef64d.js";import{d as C,r as l,b as c,e as g,k as v,f as n,h as p,i as h,w as u,g as d}from"./index-f82ec64d.js";const k={style:{"margin-top":"20px"}},B=C({__name:"radio",setup(w){const o=l(),i=l(),a=t=>{const{setCurrentRow:e}=o.value.getTableRef();e(t)},_=t=>{i.value=t},f=[{label:"日期",prop:"date"},{label:"姓名",prop:"name"},{label:"地址",prop:"address"}];return(t,e)=>{const m=c("pure-table"),r=c("el-button");return g(),v("div",null,[n(m,{ref_key:"tableRef",ref:o,data:p(s),columns:f,"highlight-current-row":"",onPageCurrentChange:_},null,8,["data"]),h("div",k,[n(r,{onClick:e[0]||(e[0]=b=>a(p(s)[1]))},{default:u(()=>[d("Select second row")]),_:1}),n(r,{onClick:e[1]||(e[1]=b=>a())},{default:u(()=>[d("Clear selection")]),_:1})])])}}});export{B as _};
