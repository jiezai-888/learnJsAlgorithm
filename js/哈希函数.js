//哈希函数解决键和值的映射关系
//取模运算就是取余数,其中余数永远比除数小,利用这个特点可以规定范围[0,n)
//比如：5%3=2,11%6=5,9%5=4

//加法
function addHash(value,size=2){
	//size的大小一般设置为质数、因为需要均匀的散布
	let varr=Array.from(value);
	let hashcode=null;
	for(let i=0;i<varr.length;i++){
		hashcode+=varr[i].charCodeAt();
	}
	
	//余数越大，范围越广，冲突的可能性就减小了
	let finallyHash=hashcode%size;
	console.log("hashcode=",hashcode,finallyHash);
	return finallyHash;
}

//解决冲突:
//链表法，有冲突写入下一个(next)元素
//开放地址法:
//1.线性探测方法(浪费性能,内存，元素可能过于集中)，
//2.平方探测(解决元素过于集中的问题)、
//3.双哈希





