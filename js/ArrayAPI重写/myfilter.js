//Array.prototype.filter(callback,[thisarg];
function filter(callback){
	if(typeof callback !=='function'){
		throw new TypeError("该参数必须是回调函数");
	}
	let o=Object(this);
	let len=o.length>>>0;
	let newarry=new Array();
	let thisarg=arguments[1];
	thisarg=thisarg?thisarg:this;
	let k=0;
	let newindex=0;
	while(k<len){
		//过滤稀疏数组
		if(k in this){
			if(callback.call(thisarg,o[k],k,o)){
				newarry[newindex++]=o[k];
			}
		}
		k++;
	}
	return newarry;
}

Array.prototype.myfilter=filter;

