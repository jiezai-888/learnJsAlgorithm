//重写Array的isArray()方法
let isArray=function(v){
	// console.log("调用了自定义的判断方法");
	return Object.prototype.toString.call(v)==="[object Array]";
}

