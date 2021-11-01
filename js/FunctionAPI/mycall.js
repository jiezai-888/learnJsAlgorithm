//这里只考虑非严格模式下，thisarg为全局
//严格模式下，未指定thisarg则为undefined
//如果this是个箭头函数则thisarg被无视,不过this可能会是箭头函数的外层this

function call(thisarg,...argument){
	let func=thisarg;
	//判断箭头函数
	if(func){
		func=Object(thisarg);
	}else{
		func=window;
	}
	func['fn']=this;
	if(!argument){
		return func.fn();
	}else{
		return func.fn(...argument);
	}
	delete func.fn;
}

Function.prototype.mycall=call;




