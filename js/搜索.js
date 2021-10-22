
//1.线性搜索
function linearSearch(arr,seekElement){
	//找第一个位置的匹配值
	for (let i = 0; i < arr.length; i++) {
		if(comparator(arr[i],seekElement)){
			return `找着了${arr[i]} --- 位置：${i}`;
		}
	}
}

//二分查找法
function binarySearch(arr,seekElement){
	//这里的arr必须是事先排序好的
	let startindex=0;
	let endindex=arr.length-1;
	//类似于等差数列,
	while(startindex<=endindex){
		const middleIndex=startindex+Math.floor((endindex-startindex)/2);
		if(comparator(arr[middleIndex],seekElement)){
			return `找着了${arr[middleIndex]} --- 位置：${middleIndex}`;
		}
		//中心项小于目标值
		if(lessThan(arr[middleIndex],seekElement)){
			startindex=middleIndex+1;
		}else{
			endindex=middleIndex-1;
		}
	}
	
	//没有查询到返回-1
	return -1;
}


//判断相等
function comparator(a,b){
	//这里只做简单的判断
	//对于基本类型,NaN,引用类型只需要判断地址
	return Object.is(a,b);
}

//判断小于
function lessThan(a,b){
	return a<b;
}



