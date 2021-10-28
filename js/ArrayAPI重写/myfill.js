//原来的fill(value,[start,end));
//该函数可以更改数组
//根据 ECMA-262, 6th edition的规范设计
function fill(arg){
	//如果输出的是3个参数，那么arg也只能是第一个参数
	if(this===null){
		throw new TypeError("不能为空");
	}
	let obj=Object(this);
	//原数组的长度
	let lg=this.length>>>0;
	let start=arguments[1];
	//输出start位置的参数
	let relativeStart=start>>0;
	//默认从下标0开始,如果为负则倒过来添加
	let k=relativeStart<0?Math.max(lg+relativeStart,0):Math.min(relativeStart,lg);
	let end=arguments[2];
	let relativeEnd=end===undefined?lg:end>>0;
	
	let final=relativeEnd<0?Math.max(lg+relativeEnd,0):Math.min(relativeEnd,lg);
	while(k<final){
		obj[k]=arg;
		k++;
	}
	return obj;
}

Array.prototype.myfill=fill;
