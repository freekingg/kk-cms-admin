import{u as c}from"./app-83e84a9f.js";import{d as n,a2 as l,x as f,r as p,aZ as d,bj as e,y as h,e as m,k as u,a$ as b}from"./index-f82ec64d.js";const _=n({__name:"Bar",setup(g){const{isDark:a}=l(),r=f(()=>a.value?"dark":"light"),t=p(null),{setOptions:o,resize:s}=d(t,{theme:r});return o({tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{bottom:"20px",right:"10px"},legend:{right:!0,data:["watchers","fork","star"]},xAxis:[{type:"category",axisTick:{alignWithLabel:!0},axisLabel:{interval:0},data:["2021","2022","2023"],triggerEvent:!0}],yAxis:[{type:"value",triggerEvent:!0}],series:[{name:"watchers",type:"bar",barWidth:"15%",itemStyle:{color:new e(0,0,0,1,[{offset:0,color:"#e6a23c"},{offset:1,color:"#eebe77"}])},data:[200,320,800]},{name:"fork",type:"bar",barWidth:"15%",itemStyle:{color:new e(0,0,0,1,[{offset:0,color:"#f56c6c"},{offset:1,color:"#f89898"}])},data:[1600,2460,4500]},{name:"star",type:"bar",barWidth:"15%",itemStyle:{color:new e(0,0,0,1,[{offset:0,color:"#409EFF"},{offset:1,color:"#53a7ff"}])},data:[1450,3620,7500]}],addTooltip:!0},{name:"click",callback:i=>{}}),h(()=>c().getSidebarStatus,()=>{b(600).then(()=>s())}),(i,y)=>(m(),u("div",{ref_key:"barChartRef",ref:t,style:{width:"100%",height:"35vh"}},null,512))}});export{_};
