function doublyLinkedList() {
	this.head = null;
	this.tail = null;

	//初始化节点
	doublyLinkedList.prototype.prareNode = function(value) {
		const newNode = new createNewNode(value, this.head);

		//如果已经存在头了，则更新头节点(相当于往前面添加一个头节点)
		if (this.head) {
			this.head.pre = newNode;
		}
		this.head = newNode;
		if (!this.tail) {
			this.tail = newNode;
		}
		return this;
	}

	// 添加新的节点
	doublyLinkedList.prototype.append=function(value){
		const newNode=new createNewNode(value);
		if(!this.head){
			this.head=newNode;
			this.tail=newNode;
			return this;
		}
		this.tail.next=newNode;
		newNode.pre=this.tail;
		this.tail=newNode;
		return this;
	}
	
	//删除节点,从头遍历
	doublyLinkedList.prototype.delete=function(value){
		//不存在的时候
		if(!this.head){
			return null;
		}
		let currentNode=this.head;
		let deleteNode=null;
		//全部进行遍历
		while(currentNode){
			
			//如果是头节点
			if(comparetor(this.head.value,value)){
				deleteNode=this.head;
				this.head=deleteNode.next;
				
				if(this.head){
					this.head.pre=null;
				}
				//这里需要注意：到尾了要设置tail为null
				if(deleteNode===this.tail){
					this.tail=null;
				}
			}else if(comparetor(this.tail.value,value)){
				deleteNode=this.tail;
				this.tail=deleteNode.pre;
				this.tail.next=null;
			}else{
				if(comparetor(currentNode.value,value)){
					deleteNode=currentNode;
					let prenode=currentNode.pre;
					let nextnode=currentNode.next;
					
					prenode.next=nextnode;
					nextnode.pre=prenode;
				}
			}
			// console.log("删除的元素：",deleteNode,currentNode)
			currentNode=currentNode.next; 
		}
		return deleteNode;
	}
	
	//删除头元素
	doublyLinkedList.prototype.deleteHead=function(){
		//不存在的时候
		if(!this.head){
			return null;
		}
		let deletedHeadNode=this.head;
		if(deletedHeadNode.next){
			this.head=deletedHeadNode.next;
			this.head.pre=null;
		}else{
			this.head=null;
			this.tail=null;
		}
		return deletedHeadNode;
	}
	
	//删除尾元素
	doublyLinkedList.prototype.deleteTail=function(){
		//不存在的时候
		if(!this.head){
			return null;
		}
		let deletedTailNode=this.tail;
		// if(deletedTailNode.pre){
		// 	this.tail=deletedTailNode.pre;
		// 	this.tail.next=null;
		// }else{
		// 	this.head=null;
		// 	this.tail=null;
		// }
		
		//另外一种写法
		if(this.head===this.tail){
			this.head=null;
			this.tail=null;
		}
		this.tail=deletedTailNode.pre;
		this.tail.next=null;
		
		return deletedTailNode;
	}
	
	//寻找合适值的节点
	doublyLinkedList.prototype.find=function(value){
		if(!this.head){
			return null;
		}
		let currentNode=this.head;
		while(currentNode){
			if(value!==undefined && comparetor(currentNode.value,value)){
				return currentNode;
			}
			currentNode=currentNode.next;
		}
		
		return null;
	}
	
	//变换成数组
	doublyLinkedList.prototype.toArray = function() {
		const nodes = [];
		let currentNode = this.head;
		while (currentNode) {
			// console.log("输出的值为：",currentNode.value)
			nodes.push(currentNode.value);
			currentNode = currentNode.next;
		}

		return nodes;
	}
	
	function comparetor(a, b) {
		//仅仅是简单的判断
		return a === b;
	}

}


function createNewNode(value, next = null, pre = null) {
	this.value = value;
	this.next = next;
	this.pre = pre;
}
