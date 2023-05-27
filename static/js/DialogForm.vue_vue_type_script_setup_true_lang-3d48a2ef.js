import{m as T}from"./message-f78be324.js";import{d as L,r as p,y as _,b as n,e as g,c as R,w as t,f as a,g as d,k as j,F as q,l as I,C as M}from"./index-f82ec64d.js";const z=L({__name:"DialogForm",props:{visible:{type:Boolean,default:!1},data:{type:Object,default:()=>({})}},emits:["update:visible"],setup(x,{emit:w}){const m=x,k=[{label:"网关",value:1},{label:"人工智能",value:2},{label:"CVM",value:3},{label:"防火墙",value:4},{label:"未知",value:5}],i=p(),s=p(!1),u=p(m.data),v=p(""),C=async o=>{o&&await o.validate(e=>{e&&(T("提交成功",{type:"success"}),s.value=!1,b(o))})},b=o=>{o&&o.resetFields()},c=()=>{s.value=!1,b(i.value)};_(()=>s.value,o=>{w("update:visible",o)}),_(()=>m.visible,o=>{s.value=o}),_(()=>m.data,o=>{u.value=o});const F={name:[{required:!0,message:"请输入产品名称",trigger:"blur"}]};return(o,e)=>{const f=n("el-input"),r=n("el-form-item"),V=n("el-radio"),U=n("el-radio-group"),B=n("el-option"),D=n("el-select"),N=n("el-form"),y=n("el-button"),O=n("el-dialog");return g(),R(O,{modelValue:s.value,"onUpdate:modelValue":e[6]||(e[6]=l=>s.value=l),title:"新建产品",width:680,draggable:"","before-close":c},{footer:t(()=>[a(y,{onClick:c},{default:t(()=>[d("取消")]),_:1}),a(y,{type:"primary",onClick:e[5]||(e[5]=l=>C(i.value))},{default:t(()=>[d(" 确定 ")]),_:1})]),default:t(()=>[a(N,{ref_key:"ruleFormRef",ref:i,model:u.value,rules:F,"label-width":"100px"},{default:t(()=>[a(r,{label:"产品名称",prop:"name"},{default:t(()=>[a(f,{modelValue:u.value.name,"onUpdate:modelValue":e[0]||(e[0]=l=>u.value.name=l),style:{width:"480px"},placeholder:"请输入产品名称"},null,8,["modelValue"])]),_:1}),a(r,{label:"产品状态",prop:"status"},{default:t(()=>[a(U,{modelValue:u.value.status,"onUpdate:modelValue":e[1]||(e[1]=l=>u.value.status=l)},{default:t(()=>[a(V,{label:"0"},{default:t(()=>[d("已停用")]),_:1}),a(V,{label:"1"},{default:t(()=>[d("已启用")]),_:1})]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"产品描述",prop:"description"},{default:t(()=>[a(f,{modelValue:u.value.description,"onUpdate:modelValue":e[2]||(e[2]=l=>u.value.description=l),style:{width:"480px"},placeholder:"请输入产品描述"},null,8,["modelValue"])]),_:1}),a(r,{label:"产品类型",prop:"type"},{default:t(()=>[a(D,{modelValue:u.value.type,"onUpdate:modelValue":e[3]||(e[3]=l=>u.value.type=l),clearable:"",style:{width:"480px"}},{default:t(()=>[(g(),j(q,null,I(k,(l,S)=>a(B,{key:S,value:l.value,label:l.label},{default:t(()=>[d(M(l.label),1)]),_:2},1032,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1}),a(r,{label:"备注",prop:"mark"},{default:t(()=>[a(f,{modelValue:v.value,"onUpdate:modelValue":e[4]||(e[4]=l=>v.value=l),type:"textarea",style:{width:"480px"},placeholder:"请输入内容"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"])}}});export{z as _};
