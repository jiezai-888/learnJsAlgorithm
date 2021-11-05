
function mytoObject(obj){
	if(obj===null || obj===undefined){
		throw new TypeError("不能为null或者是undefined")
	}
	return Object(obj);
}