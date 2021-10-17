function Factorial(value){
	//1~n的阶乘
	let result=1;
	for (let i=2;i<=value;i++) {
		result*=i;
	}
	return result;
}

