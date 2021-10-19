//冒泡排序1
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
	console.log("进来的：",arr);	
	//利用引用类型加解构
	for (let i = 1; i < arr.length; i++) {
		for(let j=0;j<arr.length-i;j++){
			console.log(arr[i]);
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

