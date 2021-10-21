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


//快速排序-快慢指针方法
function bs5(arr){
	if(arr.length<=2){
		return arr;
	}
	if(sort(arr)){
		return arr;
	}
	//以数组第一个元素为基准点
	let datumPoint=arr.shift();
	let leftarr=new Array();
	let rightarr=new Array();
	let leftindex=-1,currentindex=0;
	let newarr=[];
	//当前元素比基准点小，快慢指针都+1，否则只是块+1
	for (let i = 0; i < arr.length; i++) {
		currentindex=i;
		if(arr[currentindex]<=datumPoint){
			leftindex+=1;
			if(arr[leftindex]&&arr[currentindex]<arr[leftindex]){
				[arr[currentindex],arr[leftindex]]
				=
				[arr[leftindex],arr[currentindex]];
			}
		}
	}
	arr.splice(leftindex+1,0,datumPoint);
	// console.log("遍历后：",arr);
	leftarr=arr.splice(0,leftindex+2)
	rightarr=arr;
	let newleftarr=bs5(leftarr);
	let newrightarr=bs5(rightarr);
	
	function sort(arr){
		let flag=true;
		for (let i = 0; i < arr.length; i++) {
			while(arr[i]>arr[i+1]){
				flag=false;
				console.log(flag)
				return flag;
			}
		}
		return flag;
	}
	return newleftarr.concat(newrightarr);
}


//快速排序-左右指针方法
function bs6(arr){
	if(arr.length<=2){
		return arr;
	}
	if(sort(arr)){
		return arr;
	}
	let middle=Math.floor(arr.length/2);
	let middlevalue=arr.splice(middle,1)[0];
	// console.log("最后的middle:",middlevalue);
	let leftindex=null,rightindex=arr.length;
	let leftarr=[],rightarr=[];
	for(let i=0;i<arr.length;i+=1){
		leftindex=i;
		rightindex-=1;
		let middleindex=Math.floor(arr.length/2);
		if(leftindex==middleindex){
			// console.log('索引相等',leftindex,rightindex);
			if(arr[leftindex]&&arr[leftindex]<=middlevalue){
				leftarr.push(arr[leftindex]);
				leftarr.push(middlevalue);
				
			}else{
				rightarr.push(arr[leftindex]);
				leftarr.push(middlevalue);
				
			}
			break;
		}
		// console.log("索引",leftindex,rightindex);
		if(arr[leftindex]&&arr[leftindex]<=middlevalue){
			leftarr.push(arr[leftindex]);
		}else{
			rightarr.push(arr[leftindex]);
		}
		if(arr[rightindex]&&arr[rightindex]>middlevalue&&rightindex>middleindex){
			rightarr.push(arr[rightindex]);
		}else if(rightindex>middleindex){
			leftarr.push(arr[rightindex]);
		}
		
	}
	
	let l=bs6(leftarr);
	let r=bs6(rightarr);
	
	function sort(arr){
		let flag=true;
		for (let i = 0; i < arr.length; i++) {
			while(arr[i]>arr[i+1]){
				flag=false;
				return flag;
			}
		}
		return flag;
	}
	return l.concat(r);
}


