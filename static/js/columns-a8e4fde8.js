import{m as u}from"./message-f78be324.js";import{b as r}from"./data-b7be7769.js";import{r as p,a7 as i}from"./index-f82ec64d.js";function b(t){const a=p(""),o=[{label:"ID",prop:"id",width:80},{label:"日期",prop:"date"},{label:"姓名",prop:"name"},{label:"地址",prop:"address"}],n=i({pageSize:5,currentPage:1,layout:"prev, pager, next",total:r.length,background:!0,small:!0});function l({row:{name:e}}){return{cursor:"pointer",background:e===a.value?"#f5f7fa":""}}function s(e){a.value=e.name,t.value.blur(),u(`当前选中行的数据为：${JSON.stringify(e)}`,{type:"success"})}return{columns:o,pagination:n,selectValue:a,tableDataEdit:r,rowStyle:l,onRowClick:s}}export{b as useColumns};