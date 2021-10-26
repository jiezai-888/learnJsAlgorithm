//该hashtable具有无序唯一性:解决冲突的方法就是更新相同key的value
//可以说本质上还是没有解决hash冲突问题,也不具备扩容功能:冲突、扩容解决看下一个版本
const defaultHashTableSize=32;

function HashTable(defaultHashTableSize){
	//数组长度决定哈希表大小
	let hashTableSize=defaultHashTableSize;
	//链表数组，而不是链表节点数组
	this.slot=Array(hashTableSize).fill(null)
	.map(()=>new linkedLink());
	this.keys={};//对象映射到链表数组中
	
	HashTable.prototype.hash=function(key){
		let hashCode=Array.from(key).reduce((accumulator,item)=>{
			return accumulator+=item.charCodeAt();
		},0);
		console.log("hashCode:",hashCode%this.slot.length);
		return hashCode%this.slot.length;
	}
	
	HashTable.prototype.set=function(key,value){
		//获取key对应的hash值
		const hashKey=this.hash(key);
		//该对象保存的是hash值,hash值指向链表中的值
		this.keys[key]=hashKey;
		//这里的slotlink是一个链表，不是链表中的节点
		const slotlink=this.slot[hashKey];
		//获取与之对应的节点,看看该节点是否存在
		const node=slotlink.find(slotlink.head);
		//不存在就添加,存在就更新
		if(!node){
			slotlink.append({key,value});
			// console.log("不存在添加:",slotlink)
		}else{
			node.value.value=value;
			// console.log("存在更新:",node.value);
		}
		
	}
	HashTable.prototype.get=function(key){
		const slotlink=this.slot[this.hash(key)];
		const node=slotlink.find(slotlink.head);
		// console.log("输出：",node.value.value);
		return node?node.value.value:undefined;
	}
	//删除
	HashTable.prototype.delete=function(key){
		delete this.keys[key];
		const slotlink=this.slot[this.hash(key)];
		const node=slotlink.find(slotlink.head);
		if(node){
			return slotlink.delete(node.value);
		}
		return null;
	}
	
	//获取全部的键
	HashTable.prototype.getKeys=function(){
		return Object.keys(this.keys);
	}
	//获取全部的值
	HashTable.prototype.getValues=function(){
		//简单明了
		// let resultArray=[];
		// for(let i=0;i<this.slot.length;i+=1){
		// 	if(this.slot[i].head){
		// 		resultArray.push(this.slot[i].head.value.value);
		// 	}
		// }
		// console.log("获取的值数组为：",resultArray);
		// return resultArray;
		
		//
		return this.slot.reduce((accumulator,item)=>{
			let itemhead=item.head;
			itemhead?accumulator.push(itemhead.value.value):undefined;
			return accumulator;
		},[])
		
	}
	
	//判断是否存在该键
	HashTable.prototype.has=function(key){
		return Object.hasOwnProperty.call(this.keys,key);
	}
	
}




function linkedLink(){
	//链表头节点(指针)，尾节点(指针).
	//!null=true;
	this.head=null;
	this.tail=null;
    
	//初始化节点
	linkedLink.prototype.prepareNode=function (value){
		const newNode=new createLinkNode(value,this.head);
		this.head=newNode;
		//如果多次调用初始化节点函数，只能替换头节点
		if(!this.tail){
			this.tail=newNode;
		}
		return this;
	}
	
	//添加新的节点
	linkedLink.prototype.append=function (value){
		const newNode=new createLinkNode(value);
		
		//如果链表还没有初始化
		if(!this.head){
			this.head=newNode;
			this.tail=newNode;
			return this;
		}
		
		//真正的添加操作
		//第一次添加的时候next是头尾通用，这里必须先指明next,否则next指向有问题
		this.tail.next=newNode;
		this.tail=newNode;
	
		return this;
	}
	
	linkedLink.prototype.delete=function(value){
		if(!this.head){
			return null;
		}
		let deletedNode=null;
		
		//要删除的元素于头相同的情况下
		while(this.head&&equal(this.head,value)){
			deletedNode=this.head;
			this.head=this.head.next;
		}
		
		let currentnode=this.head;
		//从头遍历到尾
		if(currentnode!=null){
			//如果到尾了，currentnode.next为undefined
			while(currentnode.next){
				if(equal(currentnode.next.value,value)){
					deletedNode=currentnode;
					currentnode.next=currentnode.next.next;
				}else{
					currentnode=currentnode.next;
				}
			}
		}
		if(equal(this.tail.value,value)){
			this.tail=currentnode;
		}
		
		//返回被删除的元素
		return deletedNode;
	}
	
	linkedLink.prototype.deletetail=function(){
		const deletetail=this.tail;
		//还没初始化或者只有一个元素
		if(this.head===this.tail){
			this.head=null;
			this.tail=null;
			return deletetail;
		}
		let currentNode=this.head;
		while(currentNode.next){
			if(!currentNode.next.next){
				currentNode.next=null;
			}else{
				currentNode=currentNode.next;
			}
		}
		this.tail=currentNode;
		
		return deletetail;
	}
	
	linkedLink.prototype.deleteHead=function (){
		if(!this.head){
			return null;
		}
		const deletehead=this.head;
		if(this.head.next){
			this.head=this.head.next;
		}else{
			this.head=null;
			this.tail=null;
		}
		return deletehead;
	}
	
	//这里需要注意，find方法比较的内容是什么
	linkedLink.prototype.find=function(value){
		//这里的value可能是个链表，也可能是节点，或节点的值
		//不过应该是一个节点
		if(!this.head){
			return null;
		}
		let currentNode=this.head;
		while(currentNode){
			if(value !==undefined && equal(currentNode.value,value.value)){
				//返回的是节点
				return currentNode;
			}
			currentNode=currentNode.next;
		}
		return null;
	}
	
}

function createLinkNode(value,next=null){
	this.value=value;
	this.next=next;
}
function equal(a,b){
	return a===b;
}



