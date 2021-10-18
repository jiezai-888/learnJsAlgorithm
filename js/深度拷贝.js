//深度拷贝
function deepClone(arr) {
	let cloneObj = null;
	if (Array.isArray(arr)) {
		cloneObj = [];
	} else if (Object.prototype.toString.call(arr) === '[object Object]') {
		cloneObj = new Object();
	} else {
		return;
	}
	if (Array.isArray(cloneObj)) {
		for (let i = 0; i < arr.length; i++) {
			if (typeof arr[i] === 'object') {
				deepClone(arr[i]);
			}
			cloneObj.push(arr[i]);
		}
		// arr.forEach((item,index)=>{
		// })
	} else {
		for (let attributeName in arr) {
			let value = arr[attributeName];

			if (typeof value === 'object') {
				deepClone(value);
			}
			cloneObj[attributeName] = value;
		}
	}

	return cloneObj;
}
