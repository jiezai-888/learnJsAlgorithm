//二进制：左移一位等于乘以2，右移一位等于除以2
//十进制也一样：左移一位等于乘以10
//>>>无符号右移，>>有符合的右移.没有<<<运算符

//根据 ECMA-262, 6th edition的规范设计
let find=function(value){
	if(this===null){
		throw new TypeError("值不能为空");
	}
	if(typeof value !=='function'){
		throw new TypeError("参数必须是一个回调函数");
	}
	//把this强制转换成为对象,数组转换成为的对象有length属性
	let obj=Object(this);
	let lg=obj.length>>>0;
	let currentindex=0;
	let thisarg=arguments[1];
	while(currentindex<lg){
		let currentItem=obj[currentindex];
		if(value.call(thisarg,currentItem,currentindex,obj)){
			return currentItem;
		}
		currentindex+=1;
	}
	return undefined;
}

Array.prototype.myfind=find;