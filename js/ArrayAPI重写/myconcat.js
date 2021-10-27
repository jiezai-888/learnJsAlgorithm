//注意该函数不改变原来的数组，返回一个新的数组
let concat =function(otherArray){
	// console.log("执行了",otherArray);
	let lg=this.length;
	if(this===null||this===undefined){
		throw new TypeError("类型错误");
	}
	const newArray=[];
	this.forEach((item,index)=>{
		newArray[index]=item;
	})
	if(arguments){
		
		function addItem(arg){
			// console.log("里面的参数：",arg);
			for (let i = 0; i < arg.length; i++) {
				if(arg[i]&&Array.isArray(arg[i])){
					addItem(arg[i]);
				}else{
					newArray[lg]=arg[i];
					lg++;
				}
			}
		}
		addItem(arguments);
		return newArray;
	}
	return newArray;
}
Array.prototype.myconcat=concat;