//质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。

//for循环方法
function sieveOfEratosthenes_one(max) {
	let result = [];
	for (let i = 2; i <= max; i += 1) {
		let flag = true;
		for (let j = 2; j < i; j += 1) {
			if (i % j === 0) {
				flag = false;
			}
		}
		if (flag) {
			result.push(i);
		}
	}
	return result;
}

//埃拉特斯特尼筛法
function sieveOfEratosthenes_two(max){
	let totalArray=new Array(max+1).fill(true);
	//结果数组
	const result=[];
	//排除0、1
	totalArray[0]=false;
	totalArray[1]=false;
	//遍历把不是素数的设置为false，挑选出素数
	for (let i = 2; i <= max; i++) {
		if(totalArray[i]){
			//按倍数挑选出不是素数的
			result.push(i);
			let next=i*i;
			while(next<=max){
				totalArray[next]=false;
				next+=i;
			}
		}
	}
	return result;
} 


