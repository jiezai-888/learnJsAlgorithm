
let empty=function empty(){}
var $Function = Function;
var FunctionPrototype = $Function.prototype;
var call = FunctionPrototype.call;
var apply = FunctionPrototype.apply;

function bind(thisarg){
	let target=this;
	console.log("target=",target)
	if(!IsCallable(target)){
		throw new TypeError("该值不可以被调用");
	}
	//把参数转换成为数组
	let args=Array.prototype.slice.call(arguments,1);
	// console.log("值：",arguments,args)
	let bound;
	let binder=function(){
		//返回target执行结果，如果是边界函数bound的调用则执行
		if(this instanceof bound){
			 
			let result=apply.call(target,this,args.concat(Array.prototype.slice.call(arguments)));
			console.log("binder函数被执行了值：",arguments,result)
			//如果result是引用类型就为true.
			if(Object(result)===result){
				console.log("是否")
				return result;
			}
			console.log("是否2",this)
			return this;
		}
		return apply.call(target,thisarg,args.concat(args,Array.prototype.slice.call(arguments)));
	};
	
	let boundLength = Math.max(0, target.length - args.length);
	let boundArgs = [];
	for (let i = 0; i < boundLength; i++) {
		//这里如果不添加'$'会报错
	    Array.prototype.push.call(boundArgs, '$' + i);
	 }
	 console.log("值：",boundArgs);
	 //构建边界函数:柯里化
	 bound = Function('binder', 'return function (' + Array.prototype.join.call(boundArgs, ',') +
	  '){ return binder.apply(this, arguments); }')(binder);
	
	if (target.prototype) {
	     empty.prototype = target.prototype;
	     bound.prototype = new empty();
	     // Clean up dangling references.
	     empty.prototype = null;
	}
	
	return bound;
}

Function.prototype.mybind=bind;


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


