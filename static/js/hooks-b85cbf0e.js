import{d as r,I as f,b0 as u,b1 as s,b2 as I}from"./index-f82ec64d.js";function d(e,t){const o=/^IF-/;if(o.test(e)){const n=e.split(o)[1],c=n.slice(0,n.indexOf(" ")==-1?n.length:n.indexOf(" ")),i=n.slice(n.indexOf(" ")+1,n.length);return r({name:"FontIcon",render(){return f(u,{icon:c,iconType:i,...t})}})}else return typeof e=="function"||typeof(e==null?void 0:e.render)=="function"?e:typeof e=="object"?r({name:"OfflineIcon",render(){return f(s,{icon:e,...t})}}):r({name:"Icon",render(){const n=e&&e.includes(":")?I:s;return f(n,{icon:e,...t})}})}export{d as u};
