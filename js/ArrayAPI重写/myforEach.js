//根据 ECMA-262, 6th edition的规范设计
//返回值 undefined
function forEach(fn,thisarg){
	if(this===null){
		throw new TypeError("不能为空");
	}
	if(typeof fn !=='function'){
		throw new TypeError("第一个参数必须是一个回调函数");
	}
	let that;
	if(thisarg){
		that=thisarg;
	}
	let obj=Object(this);
	let len=obj.length>>>0;
	let k=0;
	while(k<len){
		//这里需要跳过稀疏数组的空项
		if(k in obj){
			const currentItem=obj[k];
			fn.call(that,currentItem,k,obj);
		}
		k++;
	}
}

Array.prototype.myforEach=forEach;


