//1.If Type(argument) is not Object, return false.
//2.If argument has a [[Call]] internal method, return true.
//3.Return false.
//Reflect是一个对象，但是不是一个构造函数.
//let a=true&&true&&X;这时候a=X;
//let a=true&&false&&Y;这个时候a=false;

function IsCallable(fn){
	let arrlike={length:0};
	//分为是否支持Reflect.apply()方法
	let reflectApply=Reflect.apply;
	//判断是否是es6中的class，class是函数类型，但是不能够被直接调用运行
	let constructorRegex = /^\s*class\b/;
	let isES6ClassFn = function isES6ClassFunction(value) {
		// console.log("es6判断启用");
		try {
			let fnStr = Function.prototype.toString.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false; // not a function
		}
	};
	//避免Reflect.apply方法遭遇改动
	if(typeof reflectApply ==="function" && reflectApply){
		if(!fn){
			return false;
		}
		if(typeof fn !=="function" && typeof fn!== 'object'){return false;}
		if(typeof fn ==="function" && !fn.prototype){return true;}
		try{
			reflectApply(fn,null,arrlike);
			return true;
		}catch(e){
			return false;
			//TODO handle the exception
		}
		return !isES6ClassFn(fn);
	}else{
		if(!fn){
			return false;
		}
		if(typeof fn !=="function" && typeof fn!== 'object'){return false;}
		if(typeof fn ==="function" && !fn.prototype){return true;}
		return !isES6ClassFn(fn);
		let fnType = Object.prototype.toString.call(value);
		//上面已经排除了class了，所以这里是个函数就行
		return fnType === '[object Function]' || strClass === '[object GeneratorFunction]';
	}
	
	
}



