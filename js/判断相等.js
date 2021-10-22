//判断相等
function comparator(a,b){
	let atype=Object.prototype.toString.call(a);
	let btype=Object.prototype.toString.call(b);
	let flag=true;
	//对于引用类型判断内容
	if(typeof a=='object'&& typeof b=='object'
	&&atype===btype&&!(atype==='[object Null]')){
		if(atype==='[object Array]'){
			if(a.length!=b.length){
				return false;
			}
			for (let i = 0; i < a.length; i++) {
				if(a[i]!==b[i]&&!isNaN(a[i])){
					return false;
				}
				if(typeof a[i]==='object'){
					flag=comparator(a[i],b[i]);
				}else if(typeof b[i]==='object'){
					flag=comparator(b[i],a[i]);
				}
			}
			// return true;
		}
		if(atype==='[object Object]'){
			if(a===b){
				return true;
			}
			//判断值是否相等
			let avalue=Object.values(a);
			let bvalue=Object.values(b);
			if(avalue.length!==bvalue.length){
				return false;
			}
			for (let i = 0; i < avalue.length; i++) {
				if(avalue[i]!==bvalue[i]&&!isNaN(avalue[i])){
					return false;
				}
				if(typeof avalue[i]==='object'){
					flag=comparator(avalue[i],bvalue[i]);
				}else if(typeof bvalue[i]==='object'){
					flag=comparator(bvalue[i],avalue[i]);
				}
				// return true;
			}
		}
		return flag;
	}
	//对于基本类型,NaN,引用类型只需要判断地址
	return Object.is(a,b);
}