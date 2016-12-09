const strstr=require("./strstr");
const page=require("fs").readFileSync("j13.txt","utf8");
//const q="天子掌鳥獸也";
//const q="君子自強不息";
//const q="自強不息";
//const q="歸竄";
const q="天子自強不息";
console.time('搜尋時間');
const matches=strstr.indexOf(page,q);
console.timeEnd('搜尋時間');
console.log("搜尋文字: 【"+q+"】 找到 "+matches.length+" 個類似的文字, 如下:");
matches.map(function(m,i){
	b=m[0], e=m[1], s=m[2];
	b1=page.substring(0,b).lastIndexOf("^1")+2;n1=page.substring(b1).indexOf("\n");
	b2=page.substring(0,b).lastIndexOf("^2")+2;n2=page.substring(b2).indexOf("\n");
	console.log((i+1)+' '+page.substr(b1,n1)+' '+page.substr(b2,n2)+' 【'+page.substring(b,e)+'】 '+s);
	console.log(page.substring(b-20,e+20).replace("\n",""));
})