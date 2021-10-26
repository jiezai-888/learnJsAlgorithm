//该hashtable解决了冲突问题：链表法
//解决了哈希表的扩容问题:>=70%
//为质数
const defaultHashTableSize=31;
let num=0;

//设置初始化容量，和最大容量
function HashTable(defaultHashTableSize,biggestSize=2053){
	//数组长度决定哈希表大小
	this.hashTableSize=defaultHashTableSize;
	//链表数组，而不是链表节点数组
	this.slot=Array(this.hashTableSize).fill(null)
	.map(()=>new linkedLink());
	// console.log("初始化的slot:",this.slot);
	this.keys={};//对象映射到链表数组中
	
	
	//哈希函数
	HashTable.prototype.hash=function(key,value){
		let hashCode=Array.from(key).reduce((accumulator,item)=>{
			return accumulator+=item.charCodeAt();
		},0);
		console.log("hashCode:",hashCode%this.slot.length,
		key,value);
		return hashCode%this.slot.length;
	}
	HashTable.prototype.set=function(key,value){
		//如果表的内存不够了(>70%)，扩容
		// let num=0;
		// this.slot.forEach((item)=>{
		// 	if(item.head){
		// 		num+=1;
		// 	}
		// })
		if(num>=Math.floor(this.hashTableSize*0.7)&&num<=biggestSize){
			//每一次都在原来的基础上面扩大到一倍
			let newArr=Array(this.hashTableSize).fill(null)
			.map(()=>new linkedLink());
			let reslot=this.slot.concat(newArr);
			this.slot=reslot;
		}
		//获取key对应的hash值
		const hashKey=this.hash(key,value);
		//该对象保存的是hash值,hash值指向链表中的值
		this.keys[key]=hashKey;
		//这里的slotlink是一个链表，不是链表中的节点
		const slotlink=this.slot[hashKey];
		//解决冲突如下:
		//不存在就添加,存在也在该链表上面append
		const currentNode=slotlink.head;
		const nodevalue={key,value};
		//与之前添加的内容相同，则不会添加
		if(currentNode && currentNode.value===nodevalue){
			return;
		}else{
			slotlink.append(nodevalue);
		}
		num+=1;
		// console.log("存在next:",slotlink);
	}
	HashTable.prototype.get=function(key){
		//这里为什么不用映射keys对象里面的key呢？
		//避免冲突的时候出现的一键多值
		const resultArr=[];
		const slotlink=this.slot[this.hash(key)];
		const currentNode=slotlink.head;
		while(currentNode){
			const node=slotlink.find(currentNode);
			resultArr.push(node.value.value);
			currentNode=currentNode.next;
		}
		return resultArr.length!=0?resultArr:undefined;
	}
	//删除
	HashTable.prototype.delete=function(key){
		const slotlink=this.slot[this.hash(key)];
		const currentNode=slotlink.head;
		if(!currentNode.next){
			delete this.keys[key];
		}
		while(currentNode){
			const node=slotlink.find(currentNode);
			if(node){
				return slotlink.delete(node.value);
			}
			currentNode=currentNode.next;
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
		const accumulator=[];
		this.slot.map((item)=>{
			if(item.head){
				let itemhead=item.head;
				if(!itemhead.next){
					return itemhead?accumulator.push(itemhead.value.value):undefined;
				}
				while(itemhead){
					accumulator.push(itemhead.value.value);
					itemhead=itemhead.next;
				}
			}
		})
		return accumulator.length>=0?accumulator:undefined;
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



