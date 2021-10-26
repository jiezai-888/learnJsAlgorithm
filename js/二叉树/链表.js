//该链表还没有find，需要的时候可以定制
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
	
}

function createLinkNode(value,next=null){
	this.value=value;
	this.next=next;
}
function equal(a,b){
	return a===b;
}



