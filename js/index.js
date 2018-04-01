//得到可视区域的宽度，封装成为一个函数
function view(){
	return {
		W:document.documentElement.clientWidth,
		H:document.documentElement.clientHeight,
	}
}
//获取到某一个元素到屏幕左边的距离，封装成为一个函数
function offsetL(obj){
	var left=0;
	while(obj){
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	};
	return left;
}

//因为Script标签在</head>的上面所以要用onload事件
window.onload=function()
{
	//首先获取所有的元素
	   var aImg = document.getElementsByTagName("img");
		var aLi = document.getElementsByTagName("li");

		var oUl = document.getElementById("oUl");
		var oDiv = document.getElementById("div1");

	
	//得到每一个图片的宽度
	for(var i=0; i<aLi.length;i++){
		aImg[i].index=i;
		//七张图片平分每一个可视区域
		aLi[i].style.width=view().W / 7 /view().W*100+"%";
	};
	
	//受影响的最大宽度的范围(5张图片)
	var l=oUl.offsetWidth/7*5;
	//对图片的操作封装成为一个animation函数
	function animation()
	{  //记录执行动画的时间
		var animationTime=new Date().valueOf();
		
		//操作每张图片
		for(var j=0;j<aImg.length;j++){
			//求出中心点X轴的距离
			var middle=offsetL(aImg[j]) + aImg[j].offsetWidth/2;         //图片到屏幕左边的距离+图片的一半
			//鼠标到每张中心点X轴的一个差值
			var distance=Math.abs(clientX-middle);
			
			//因为鼠标的距离可能会超出我们可视区域的最大范围，
			//必须限制不能超出最大范围
			if(distance>l)
			distance=l;
			//得到一个比例，若根据比例得到的距离太小，就乘以一个数字
			var scale=Math.abs(distance/l)*60;
			//得到当前图片距离定位父级Y轴的距离
			var top=aImg[j].getBoundingClientRect().top-aLi[j].getBoundingClientRect().top;
			//将这个距离转化为百分比
			var n=top/aImg[j].offsetHeight*100;
			//设置缓冲值，距离目标点越近速度越慢，距离目标点越远速度越快
			var t=(scale-n)/5;//设置一个很小的摩擦系数，然后慢慢增加
			n+=t;
			//设置样式
			aImg[j].style.transform="translate3d(0,"+scale+"%,0)";
			
			//设置浏览器的兼容性
			aImg[j].style.webkitTransform="translate3d(0,"+scale+"%,0)";
			//当鼠标移入的过程中，隐藏掉CSS中的transform的样式
			aImg[j].style.webkitTransform="none";
			aImg[j].style.transform="none";	
		};
		if(animationTime-times<1000){//当差值小于1000时，会执行这个回调函数，
			                         //当差值过大时，不能执行这个回调函数，关闭定时器
		timer=requestAnimationFrame(animation);
		//当我们鼠标立马停止之后，动画里面的函数的定时器还在开着，并没有关闭
		//定时器一直在开着
		}
	};
	var timer=null;
	var clientX=0;
   var  times=0;
	function moveFn(ev){
		//在开定时器之前首先清除定时器
		clientX=ev.clientX;
		cancelAnimationFrame(timer);
		//HTML中的定时器，不用像setTimeout一样设置延迟时间
		//第一个参数是要执行的函数，调用animation函数就相当于开了一个定时器
		timer=requestAnimationFrame(animation);
		//当鼠标停止的时候，定时器就立即关闭
		times=new Date().valueOf();
		
	};
	
	oUl.onmousemove=moveFn;
	oUl.onmouseout=outFn;
	function outFn(){
		cancelAnimationFrame(timer);
		//隐藏掉所有img上的transform动画,当鼠标移出图片时，会回到CSS中设置的translated动画
		for(var i=0;i<aImg.length;i++){
			aImg[i].removeAttribute("style");
		}
	};
	//定义开关
	var onoff=true;
	oUl.onclick=function(ev)
	{//清除定时器
		cancelAnimationFrame(timer);
		if(onoff){
			var target=ev.target;
		//寻找事件源
		if(target.nodeName.toLowerCase()=="img"){
			oDiv.id="abc";
			//让图片放大的缓慢一些
			for(var j=0;j<aImg.length;j++){
				aImg[j].style.transition="transform .4s cubic-bezier(.455,.05,.55,.95)";
				aImg[j].style.webkitTransition="transform .4s cubic-bezier(.455,.05,.55,.95)";
			};
			for(var i=0;i<aImg.length;i++){
				if(i<target.index){
					aImg[i].parentNode.className="prev";
				}else if(i>target.index){
					aImg[i].parentNode.className="next"
				}
			}
			target.parentNode.className="lager";
			var targetMiddle=offsetL(target)+target.offsetWidth/2;
			var value=view().W/2-targetMiddle;
			
			oUl.style.transform="translate3d("+value*3+"px,0,0) scale(3)";//缩放3倍,缩放的那张图片在屏幕中间出现
			oUl.style.webkitTransform="translate3d("+value*3+"px,0,0) scale(3)";
			oUl.onmousemove=null;
			oUl.onmouseout=null;
			//点击一下图片会出现放大的效果，并不是说把图片放大了，
			//而是把img的父级ul放大了	
		};
		onoff=false
		}else{
			oUl.removeAttribute("style");
			for(var i=0;i<aLi.length;i++){
				aLi[i].className="";
				
			};
			oDiv.id="";
			
			setTimeout(function(){
			oUl.onmousemove=moveFn;
	        oUl.onmouseout=outFn;
	        onoff=true;
			},300)
		};	
	}
};//匿名函数 
