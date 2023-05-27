import{d as b,I as h,N as g,J as L,D as k,x as D,E as N,b as p,c as V,w as a,e as A,f as l,i as s,h as _,C as x,G as v,H as C}from"./index-f82ec64d.js";const y=b({name:"ReTreeLine",props:{node:{type:Object,required:!0},data:{type:Array,default:()=>{}},treeData:{type:Array,default:()=>[]},indent:{type:Number,default:16},showLabelLine:{type:Boolean,default:!0}},setup(f,c){const{slots:o}=c;return{getScopedSlot:t=>{if(!t)return null;const d=t.split("||");let e=null;for(let n=0;n<d.length;n++){const i=d[n];e=(o||{})[i]}return e},getSlotValue:(t,d,e=null)=>g(t)?t(d)||e:t||e}},render(){const f=this.getScopedSlot("default"),c=this.getScopedSlot("node-label"),o=this.getScopedSlot("after-node-label"),m=f?this.getSlotValue(f,{node:this.node,data:this.data}):[c?this.getSlotValue(c,{node:this.node,data:this.data}):h("span",{class:"element-tree-node-label"},this.node.label),this.showLabelLine?h("span",{class:"element-tree-node-label-line"}):null,this.getSlotValue(o,{node:this.node,data:this.data})],r=[];let t=this.node;for(;t;){let e=t.parent;if(t.level===1&&!t.parent){if(!this.treeData||!Array.isArray(this.treeData))throw Error("if you using el-tree-v2 (Virtualized Tree) of element-plus,element-tree-line required data.");e={children:Array.isArray(this.treeData)?this.treeData.map(n=>({...n,key:n.id})):[],level:0,key:"node-0",parent:null}}if(e){const n=(e.children||e.childNodes).findIndex(i=>(i.key||i.id)===(t.key||t.id));r.unshift(n===(e.children||e.childNodes).length-1)}t=e}const d=[];for(let e=0;e<this.node.level;e++)d.push(h("span",{class:{"element-tree-node-line-ver":!0,"last-node-line":r[e]&&this.node.level-1!==e,"last-node-isLeaf-line":r[e]&&this.node.level-1===e},style:{left:this.indent*e+"px"}}));return h("span",{class:"element-tree-node-label-wrapper"},[m].concat(d).concat([h("span",{class:"element-tree-node-line-hor",style:{width:(this.node.isLeaf?24:8)+"px",left:(this.node.level-1)*this.indent+"px"}})]))}}),I=s("div",{class:"card-header"},[s("span",{class:"font-medium"}," 扩展elemenet-plus的树形组件包括虚拟树组件，支持连接线 ")],-1),T=s("div",{class:"card-header"},[s("span",{class:"font-medium"}," 普通树结构 ")],-1),q={class:"max-h-[550px] overflow-y-auto"},B={class:"text-sm"},E=s("div",{class:"card-header"},[s("span",{class:"font-medium"}," 虚拟树结构 ")],-1),P={class:"max-h-[550px] overflow-y-auto"},H={class:"text-sm"},j=b({name:"LineTree",__name:"line-tree",setup(f){const c=L(k().wholeMenus,!0),o=D(()=>C(c)),m=N(o.value),r={value:"uniqueId",children:"children"};return(t,d)=>{const e=p("el-tree"),n=p("el-card"),i=p("el-col"),S=p("el-tree-v2"),w=p("el-row");return A(),V(n,{shadow:"never"},{header:a(()=>[I]),default:a(()=>[l(w,{gutter:24},{default:a(()=>[l(i,{xs:24,sm:24,md:12,lg:12,xl:12,class:"mb-[20px]"},{default:a(()=>[l(n,{shadow:"never"},{header:a(()=>[T]),default:a(()=>[s("div",q,[l(e,{data:o.value,props:r,"show-checkbox":"","default-expand-all":"","node-key":"uniqueId",indent:30},{default:a(({node:u})=>[l(_(y),{node:u,showLabelLine:!0},{"node-label":a(()=>[s("span",B,x(_(v)(u.data.meta.title)),1)]),_:2},1032,["node"])]),_:1},8,["data"])])]),_:1})]),_:1}),l(i,{xs:24,sm:24,md:12,lg:12,xl:12},{default:a(()=>[l(n,{shadow:"never"},{header:a(()=>[E]),default:a(()=>[s("div",P,[l(S,{data:o.value,props:r,"show-checkbox":"",height:550,"default-expanded-keys":_(m)},{default:a(({node:u})=>[l(_(y),{node:u,treeData:o.value,showLabelLine:!0,indent:30},{"node-label":a(()=>[s("span",H,x(_(v)(u.data.meta.title)),1)]),_:2},1032,["node","treeData"])]),_:1},8,["data","default-expanded-keys"])])]),_:1})]),_:1})]),_:1})]),_:1})}}});export{j as default};
