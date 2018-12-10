<template>
	<div class="menus">
		<div class="items">
			<!--微信浏览器提示部分-->
			<div class="zhezhao" id='zhezhao'></div>
			<img src="../assets/img/tishi.png" class="tishi" id="tishi">
			<div class="titles">
				<div class="imgss">
					<img src="../assets/img/downLoadTitles.png" class="menu-logo" />
					<img src="../assets/img/downLoadText.png" class="menu-text" />
				</div>
			</div>
			<div id='div' class="bottomDownload">
				<p>立即下载</p>
			</div>
		</div>
		<img src="../assets/img/downloadBG iphoneX.png" class="X"/>
		<img src="../assets/img/downloadBG.png" class="x">
	</div>
</template>

<script>
	export default {
		name: 'parentDownload',
		mounted: function() { //？？？？？？？？？？？？？？？？？？？？？？？？？？
			//原生获取屏幕高度
			var orderHight = document.body.clientHeight
			console.log(orderHight)
			if(orderHight == "812") {
				var a = document.getElementsByClassName("X")[0]
				a.style.display = "block"
			} else {
				var a = document.getElementsByClassName("x")[0]
				a.style.display = "block"
			}
			
			//判断
			var n = navigator.userAgent;
			if(n.indexOf('Android') > -1 || n.indexOf('Linux') > -1) { //安卓手机
				console.log("安卓手机");
				
			}
			
			//家长  
			var oDiv = document.getElementById('div'); //获取元素div
			oDiv.onclick = function() { //给元素增加点击事件
				if(n.indexOf('Android') > -1 || n.indexOf('Linux') > -1) { //安卓手机
					var ua = navigator.userAgent.toLowerCase();
					var isWeixin = ua.indexOf('micromessenger') != -1;	
					if (isWeixin) {
					 //这是从微信打开的
					 	var a = document.getElementById('zhezhao')
					 	var b = document.getElementById('tishi')
					 	a.style.display = "block"
					 	b.style.display = "block"
					}else{
						window.location.href = "http://p.sxxat.com/apk/xiaoantong.apk";
					}
				} else if(n.indexOf('iPhone') > -1) { //苹果手机
					console.log("苹果手机");
					window.location.href = "https://itunes.apple.com/cn/app/id1431649330?mt=8";　　
				}
			};

			　

		}
	}
</script>

<style lang="less" scoped>
	.zhezhao{
		display: none;
	  	position: fixed;
	  	background-color: #003333;
	  	opacity: .7;
	  	top: 0;
	  	right: 0;
	  	left: 0;
	  	bottom: 0;
	  	z-index: 999;
	}
	.tishi{
		display: none;
		margin-top: .2rem;
		position: fixed;
		width: 70%;
		margin-left: 28%;
		z-index:9999;
	}
	.X, .x {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		display: none;
	}
	
	.menus {
		width: 100%;
		height: 100%;
	}
	
	.items {
		width: 100%;
		height: 100%;
		position: relative;
		/*对iphoneX进行的适配操作*/
		padding-top: constant(safe-area-inset-top);
		padding-right: constant(safe-area-inset-right);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-left: constant(safe-area-inset-left);
	}
	.titles {
		z-index: 22;
		width: 1.9rem;
		height: 0.68rem;
		position: absolute;
		top: 0.68rem;
	}
	
	.menu-logo {
		margin-left: 0.85rem;
		width: 1.9rem;
		height: 0.72rem;
	}
	
	.menu-text {
		margin-left: 0.45rem;
		width: 2.85rem;
		height: 0.18rem;
	}
	
	.bottomDownload {
		z-index: 22;
		width: 2.8rem;
		height: 0.46rem;
		line-height: 0.46rem;
		border: 1px solid white;
		border-radius: 0.05rem;
		position: absolute;
		bottom: 0.6rem;
		left: 0.48rem;
	}
	
	.bottomDownload p {
		font-size: 0.2rem;
		text-align: center;
		color: white;
		vertical-align: middle;
	}
</style>