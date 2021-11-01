//Function.prototype.apply(thisarg,argArray)

function apply(thisarg){
	
	//thisarg不存在指向window
	let func=thisarg;
	if(thisarg){
		func=Object(func);
	}else{
		func=window;
	}
	func['fn']=this;
	//参数数组
	let argArray=arguments[1];
	//参数不是数组
	if(!Array.isArray(argArray) && argArray){
		throw new TypeError("参数不是一个数组")
	}
	if(!argArray){
		return func.fn();
	}else{
		return func.fn(...argArray);
	}
	delete func.fn;
}

Function.prototype.myapply=apply;




