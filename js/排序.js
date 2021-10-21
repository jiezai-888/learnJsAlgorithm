//选择排序1
function bs1(arr) {
	//数组的选择排序:从小到大
	for (let i = 0; i < arr.length - 1; i++) {
		let m = null;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] > arr[j]) {
				m = arr[j];
				arr[j] = arr[i];
				arr[i] = m;
			}
		}
	}
	return arr;
}

//冒泡排序2
function bs2(arr){
	//利用引用类型加解构
	for (let i = 1; i < arr.length; i++) {
		//每比较一层后就能够得出一个最大/小的值，比较的个数会减1
		for(let j=0;j<arr.length-i;j++){
			// console.log(arr[i]);
			if(moreThan(arr[j],arr[j+1])){
				//解构赋值
				[arr[j+1],arr[j]]=[arr[j],arr[j+1]];
			}
		}
	}
	
	function moreThan(a,b){
		return a>b;
	}
	return arr;
}

//插入排序
function bs3(arr){
	//外循环
	for(let i=1;i<arr.length;i+=1){
		let currentIndex=i;
		//内循环
		while(arr[currentIndex-1]!==undefined&&lessThan(arr[currentIndex-1],arr[currentIndex])){
			[arr[currentIndex-1],arr[currentIndex]]
			=
			[arr[currentIndex],arr[currentIndex-1]];
			currentIndex-=1;
		}
	}
	
	function lessThan(a,b){
		return b<a;
	}
	return arr;
}


//归并排序
function bs4(arr){
	if(arr.length<=1){
		// console.log("只有一个：",arr)
		return arr;
	}
	//Js向下取整Math.floor();
	let flagindex=Math.floor(arr.length/2);
	// console.log("flagindex=",flagindex);
	if(arr.length===2){
		// console.log('长度为2的时候:',arr);
		if(lessThan(arr[0],arr[1])){
			[arr[0],arr[1]]=[arr[1],arr[0]];
		}
		// console.log("哈哈：",arr);
		return arr;
	}else{
		let front=arr.slice(0,flagindex);
		let next=arr.slice(flagindex,arr.length);
		let littlefront=bs4(front);
		let littlenext=bs4(next);
		if(littlefront&&littlenext){
			// console.log("进来的：",littlefront,littlenext)
			let newarr=[];
			if(littlefront.length>littlenext.length){
				return compare(littlefront,littlenext,newarr);
			}
			return compare(littlenext,littlefront,newarr);;
		}
	}
	function lessThan(a,b){
		return b<a;
	}
	function compare(a,b,newarr){
		let aindex=0;
		let bindex=0;
		while(aindex<a.length&&bindex<b.length){
			if(lessThan(a[aindex],b[bindex])){
				newarr.push(b[bindex]);
				bindex+=1;
			}else if(a[aindex]===b[bindex]){
				newarr.push(a[aindex]);
				newarr.push(b[bindex]);
				aindex+=1;
				bindex+=1;
			}else{
				newarr.push(a[aindex]);
				aindex+=1;
			}
			
		}
		if(a[aindex]){
			newarr.push(a[aindex]);
		}else if(b[bindex]){
			newarr.push(b[bindex]);
		}
		return newarr;
	}
	return arr;
}



