<template>
	<div id="theme-list">
		
		<!--黑色背景部分-->
		<div class="zhezhao" ></div>
		<img src="" class="bigsImgs" @click="hiddens"/>
		<img src="../assets/img/3301@2x.png" class="closeImg" @click="hiddens"/>
		<!--家长端数据渲染-->
		<div class="father" v-if="par">
			<div v-for="(item , index) in theme_list" v-if="jiazhang">
				<div class="contentf">
					<div class="main content">
						<span v-if="item.publishHeadImg != ''">
							<img class="headimg heads" :src="'http://xatzht.sxxat.com/files/'+item.publishHeadImg" alt="">
						</span>
						<span v-else>
							<img class="headimg headImgTeacher" src="../assets/img/teacher.png" alt="">
						</span>
						<div class="content1">
							<div class="name">
								<div>
									<span class="xname">{{item.publisher}}</span>
									<span class="teachertype">{{item.subjectName}}老师</span>
								</div>
								<!--<div>
									<span class="type" v-if="item.publishType == '1'">活动</span>
									<span class="type" v-else-if="item.publishType == '2'">作业</span>
									<span class="type" v-else-if="item.publishType == '3'">投票</span>
								</div>-->
							</div>
							<p class="pcon">{{item.content}}</p>
							<!--内容区分部分-->
							<!--活动-->
							<div class="piclist imgss" v-if="item.publishType == '1'">
									<img :id="item.classCircleId + 'inpus1'" class="inpus11" :src="'http://xatzht.sxxat.com/files/'+ item.pictureUrl.split(',')[0]" @click="select('http://xatzht.sxxat.com/files/'+ item.pictureUrl.split(',')[0])">
									<input class="inpus1" type="text" :value="item.pictureUrl.split(',')[0]"/>
									
									<img :id="item.classCircleId + 'inpus2'" class="inpus22" :src="'http://xatzht.sxxat.com/files/'+ item.pictureUrl.split(',')[1]" @click="select('http://xatzht.sxxat.com/files/'+ item.pictureUrl.split(',')[1])">
									<input class="inpus2" type="text" :value="item.pictureUrl.split(',')[1]"/>
									
									<img :id="item.classCircleId + 'inpus3'" class="inpus33" :src="'http://xatzht.sxxat.com/files/'+ item.pictureUrl.split(',')[2]" @click="select('http://xatzht.sxxat.com/files/'+ item.pictureUrl.split(',')[2])">
									<input class="inpus3" type="text" :value="item.pictureUrl.split(',')[2]"/>								
								
							</div>
							<!--作业-->
							<div class="piclist typesChoose" v-else-if="item.publishType == '2'" @click="homeworkFun(item.classCircleId)">
								<div>
									<span class="typeTitle">作业</span>
									<span>今天的{{item.subjectName}}作业</span>
								</div>
							</div>
							<!--投票-->
							<div class="piclist typesChoose" v-else-if="item.publishType == '3'" @click="voteFun(item.classCircleId , item.content)">
								<div>
									<span class="typeTitle">投票</span>
									<span>今天的投票作业</span>
								</div>
							</div>
							<!--内容区分结束部分-->
						</div>
					</div>
					<div class="main time">{{item.publishTime}}</div>
				</div>
			</div>

			<!--缺省-->
			<div class="quesheng" v-if="quesheng">
				<div>
					<img src="../assets/img/notMessage.png" />
					<p>暂无消息</p>
				</div>
			</div>

			<!--加载更多部分-->
			<div v-show="load_show">
				<load-more :tip="'正在加载'" v-show="had_more"></load-more>
				<load-more :show-loading="false" :tip="'加载完成'" background-color="#fbf9fe" v-show="!had_more"></load-more>
			</div>

		</div>
		<!--家长端数据渲染结束-->

		<!--教师端数据渲染-->
		<div class="father" v-else>
			<div v-for="(items , index) in theme_list" v-if="jiaoshi">
				<div class="contentf">
					<div class="main content">
						<span v-if="items.headImg != ''">
							<img class="headimg heads" :src="'http://xatzht.sxxat.com/files/'+items.headImg" alt="">
						</span>
						<span v-else>
							<img class="headimg headImgTeacher" src="../assets/img/teacher.png" alt="">
						</span>
						<div class="content1">
							<div class="name">
								<div>
									<span class="xname">{{items.teacherName}}</span>
									<span class="teachertype">{{items.subjectName}}老师</span>
								</div>
								<!--<div>
									<span class="type" v-if="items.publishType == '1'">活动</span>
									<span class="type" v-else-if="items.publishType == '2'">作业</span>
									<span class="type" v-else-if="items.publishType == '3'">投票</span>
								</div>-->
							</div>
							<p class="pcon">{{items.content}}</p>
							<!--内容区分部分-->
							<!--活动-->
							<div class="piclist imgss" v-if="items.publishType == '1'">
									<img :id="items.classCircleId + 'inpus11'" class="inpus111" :src="'http://xatzht.sxxat.com/files/'+ items.picture.split(',')[0]" @click="selects('http://xatzht.sxxat.com/files/'+ items.picture.split(',')[0])">
									<input class="lest1" type="text" :value="items.picture.split(',')[0]">
									
									<img :id="items.classCircleId + 'inpus22'" class="inpus222" :src="'http://xatzht.sxxat.com/files/'+ items.picture.split(',')[1]" @click="selects('http://xatzht.sxxat.com/files/'+ items.picture.split(',')[1])">
									<input class="lest2" type="text" :value="items.picture.split(',')[1]">
									
									<img :id="items.classCircleId + 'inpus33'" class="inpus333" :src="'http://xatzht.sxxat.com/files/'+ items.picture.split(',')[2]" @click="selects('http://xatzht.sxxat.com/files/'+ items.picture.split(',')[2])">
									<input class="lest3" type="text" :value="items.picture.split(',')[2]">
								
							</div>
							<!--作业-->
							<div class="piclist typesChoose" v-else-if="items.publishType == '2'">
								<div>
									<span class="typeTitle">作业</span>
									<span>今天的{{items.subjectName}}作业</span>
								</div>
							</div>
							<!--投票-->
							<div class="piclist typesChoose" v-else-if="items.publishType == '3'">
								<div>
									<span class="typeTitle">投票</span>
									<span>今天的投票作业</span>
								</div>
							</div>
							<!--内容区分结束部分-->
						</div>
					</div>
					<div class="main time">{{items.publishTime}}</div>
				</div>
			</div>

			<!--缺省-->
			<div class="quesheng" v-if="queshengs">
				<div>
					<img src="../assets/img/notMessage.png" />
					<p>暂无消息</p>
				</div>
			</div>

			<!--加载更多部分-->
			<div v-show="load_show">
				<load-more :tip="'正在加载'" v-show="had_more"></load-more>
				<load-more :show-loading="false" :tip="'加载完成'" background-color="#fbf9fe" v-show="!had_more"></load-more>
			</div>

		</div>
		<!--教师端数据渲染结束-->
	
	    <div class="show_msg">
	  		<span class="show_span">请填写申请事由</span>
	  	</div>

	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	export default {
		name: 'classcircle',
		components: {
			LoadMore
		},
		data() {
			return {
				par:false,
				//加载更多部分参数数据
				tab_index: 0,
				page: 1,
				jiazhang:true,
				quesheng:false,
				jiaoshi:true,
				queshengs:false,
				theme_list: [],
				load_show: false,
				had_more: true,

				token: this.$route.params.classcircles.split(',')[0],
				userId: this.$route.params.classcircles.split(',')[1],
				classId: this.$route.params.classcircles.split(',')[2],
				studentid: this.$route.params.classcircles.split(',')[3],
				os: this.$route.params.classcircles.split(',')[4],
				type: this.$route.params.classcircles.split(',')[5]
			}
		},
		created() {
			this.classItem(0, false);
			setupWebViewJavascriptBridge(function(bridge) {

			})
		},
		activated() {
			this.scrollListen();
		},
		deactivated() {
			window.removeEventListener('scroll', this.scrollLoad, true);
		},
		methods: {
			//点击图片放大缩小操作
			select: function(src) {
				$(".bigsImgs").css('display' , 'block')
				$(".bigsImgs").attr("src" , src)
				$(".bigsImgs").addClass("IOSbig");
				$(".zhezhao").css('display' , 'block')
				$(".closeImg").css('display', 'block');
			},
			selects: function(src) {
				$(".bigsImgs").css('display' , 'block')
				$(".bigsImgs").attr("src" , src)
				$(".bigsImgs").addClass("IOSbig");
				$(".zhezhao").css('display' , 'block')
				$(".closeImg").css('display', 'block');
			},
			hiddens:function(){
				$(".bigsImgs").removeAttr("src");
				$(".bigsImgs").removeClass("big");
				$(".bigsImgs").css('display' , 'none')
				$(".zhezhao").css('display' , 'none')
				$(".closeImg").css('display', 'none');
			},
			
			
			classItem: function(index, scroll) {
				if(index == this.tab_index) {
					this.load_show = true;
					this.had_more = true;
					this.tab_index = index;
					this.page = 0;
					this.theme_list = [];
					this.scrollListen();
				}
				//教师端请求接口
				if(this.type == 0) {
					console.log("这是教师端")
					this.$axios({
						method: 'post',
						url: '/class/getClassCircleList',
						headers: {
							Tonken: this.token,
							UserID: this.userId,
							DeviceID: '',
							OS: this.os
						},
						data: {
							classId: this.classId,
							pageIndex: this.page.toString(),
							pageSize: "10"
						}
					}).then((response) => {
						if(response.data.code == 0) {
							this.par = false
							//判断是否有数据
							if(response.data.data.length == 0) {
								this.jiaoshi = false
								this.queshengs = true
							} else if(response.data.data.length < 10){	//如果数据少于每页显示数据长度，停止刷新操作，并让页面内几条数据显示出来
								this.jiaoshi = true
								this.queshengs = false
								window.removeEventListener('scroll', this.scrollLoad, true);
								this.had_more = false;
								this.load_show = true;
							}
							var res = response.data.data

							// 取舍 赋值 
							this.load_show = false;
							if(scroll) {
								console.log(res.length)
								if(res.length == 10) {
									console.log("有没有走到这")
									this.scrollListen();
								} else {
									console.log("好像走岔了")
									this.had_more = false;
									this.load_show = true;
								}
							}

							this.theme_list = this.theme_list.concat(res);
							
							//根据查询出的数据对元素进行操作
							this.$nextTick(function() {
								for(var i = 0; i < this.theme_list.length; i++) {
									//如果返回的数据里没有图片数据，那就把该元素隐藏掉（隐藏所占位置）
									if(this.theme_list[i].picture == "") {
										var defaults = document.getElementsByClassName("imgss")
										for(var b = 0; b < defaults.length; b++) {
											defaults[i].style.display = "none"
										}
									} else {		//对有数据的图片进行分割 放进数组
										var ins1 = document.getElementsByClassName("lest1")[i].value
										var ins2 = document.getElementsByClassName("lest2")[i].value
										var ins3 = document.getElementsByClassName("lest3")[i].value
										if(ins1 ==""){
											document.getElementById(this.theme_list[i].classCircleId + "inpus11").style.display = "none"
										}else{
											document.getElementById(this.theme_list[i].classCircleId + "inpus11").style.display = "inline-block"
										}
										
										if(ins2 ==""){
											document.getElementById(this.theme_list[i].classCircleId + "inpus22").style.display = "none"
										}else{
											document.getElementById(this.theme_list[i].classCircleId + "inpus22").style.display = "inline-block"
										}
										
										if(ins3 ==""){
											document.getElementById(this.theme_list[i].classCircleId + "inpus33").style.display = "none"
										}else{
											document.getElementById(this.theme_list[i].classCircleId + "inpus33").style.display = "inline-block"
										}
									}
									
								}
							})
							
						}else if(response.data.code == 1){
							$('.show_span').text("服务器错误！！")
							$(".show_msg").css('bottom', '20%');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2000);
						}else if(response.data.code == 99){
							$('.show_span').text("登陆失效，请重新登陆！！")
							$(".show_msg").css('bottom', '20%');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2000);
						}
					}).catch((error) => {
						console.log(error);
					});

				} else if(this.type == 1) {
					console.log("2134124234")
					//家长端请求接口
					this.$axios({
						method: 'post',
						url: '/userHome/getClassCircle',
						headers: {
							Tonken: this.token,
							UserID: this.userId,
							DeviceID: '',
							OS: this.os
						},
						data: {
							classId: this.classId,
							pageIndex: this.page.toString(),
							pageSize: "10"
						}
					}).then((response) => {
						if(response.data.code == 0) {
							this.par = true
							console.log(response)
							console.log("safasfasfas")
							//判断是否有数据，没有就显示缺省页
							if(response.data.data.length == 0) {
								this.jiazhang = false
								this.quesheng = true
								this.load_show = false;
							}else if(response.data.data.length < 10 ){
								window.removeEventListener('scroll', this.scrollLoad, true);
								this.jiazhang = true
								this.quesheng = false
								this.had_more = false;
								this.load_show = true;
							}
							
							// 取舍 赋值 
							var res = response.data.data
							if(scroll) {
								if(res.length == 10) {
									this.scrollListen();
								} else {
									this.had_more = false;
									this.load_show = true;
								}
							}
							
							this.theme_list = this.theme_list.concat(res);
							
							//根据查询出的数据对元素进行操作
							this.$nextTick(function() {
								console.log(this.theme_list.length)
								for(var i = 0; i < this.theme_list.length; i++) {
									//如果返回的数据里没有图片数据，那就把该元素隐藏掉（隐藏所占位置）
									if(this.theme_list[i].pictureUrl == "") {
										var defaults = document.getElementsByClassName("imgss")
										for(var b = 0; b < defaults.length; b++) {
											defaults[i].style.display = "none"
										}
									} else {		//对有数据的图片进行分割 放进数组
										var imgsss = document.getElementsByClassName("inpus1")[i].value
										var imgssss = document.getElementsByClassName("inpus2")[i].value
										var imgsssss = document.getElementsByClassName("inpus3")[i].value
										if(imgsss ==""){
											document.getElementById(this.theme_list[i].classCircleId + "inpus1").style.display = "none"
										}else{
											document.getElementById(this.theme_list[i].classCircleId + "inpus1").style.display = "inline-block"
										}
										
										if(imgssss ==""){
											document.getElementById(this.theme_list[i].classCircleId + "inpus2").style.display = "none"
										}else{
											document.getElementById(this.theme_list[i].classCircleId + "inpus2").style.display = "inline-block"
										}
										
										if(imgsssss ==""){
											document.getElementById(this.theme_list[i].classCircleId + "inpus3").style.display = "none"
										}else{
											document.getElementById(this.theme_list[i].classCircleId + "inpus3").style.display = "inline-block"
										}
									}//else部分结束点
									
								}//最外围for循环结束点
								console.log(this.theme_list)
							})//等待执行的方法结束点
						}else if(response.data.code == 1){
							$('.show_span').text("服务器错误！！")
							$(".show_msg").css('bottom', '20%');
							$(".show_span").css('width', '1.9rem');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2700);
						}else if(response.data.code == 99){
							$('.show_span').text("登陆失效，请重新登陆！！")
							$(".show_msg").css('bottom', '20%');
							$(".show_span").css('width', '1.9rem');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2700);
						}
					}).catch((error) => {
						console.log(error);
					});
				}

			},
			homeworkFun: function(classCicleId) {
				var params = classCicleId + "," + this.studentid
				var param = {
					"classCicleId": classCicleId.toString(),
					"studentid": this.studentid.toString()
				}
				if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('homeworkDetails', param, function(response) { //传值给ios app方法,params是参数

					});
				} else {
					window.android.homeworkDetail(params); //传值给安卓app方法
				}
			},
			voteFun: function(classCicleId, contents) {
				localStorage.setItem("contentss", contents);
				var params = classCicleId;
				if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('voteDetails', params, function(response) { //传值给ios app方法,params是参数

					});
				} else {
					window.android.voteDetail(params); //传值给安卓app方法
				}
			},

			scrollListen() {
				var that = this;
				window.addEventListener('scroll', that.scrollLoad, true);
			},

			scrollLoad(event) {
				var list_height = document.getElementById('theme-list').offsetHeight;
				var scroll_height = event.target.scrollTop;
				var screen_height = document.documentElement.clientHeight;
				var that = this;
				if((list_height - screen_height - scroll_height) <= 10) {
					window.removeEventListener('scroll', that.scrollLoad, true);
					that.page++;
					that.load_show = true;
					setTimeout(function() {
						that.classItem(that.page, true);
					}, 1000)
				}
			}
		},

	}
</script>

<style lang="less" scoped>
	.header {
		font-size: 0.17rem;
		margin-top: 0.19rem;
		padding-bottom: 0.11rem;
	}
	
	.father {
		.contentf {
			border-bottom: 1px solid #f2f2f2;
			padding-bottom: 0.14rem;
			.content {
				display: flex;
				justify-content: space-between;
				margin-top: 0.14rem;
				.headimg {
					width: 0.42rem;
					height: 0.42rem;
					border-radius: 50%;
				}
				.content1 {
					width: 2.92rem;
					.name {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 0.12rem;
						.xname {
							font-size: 0.17rem;
						}
						.teachertype,
						.type {
							border-radius: 2px;
						}
						.teachertype {
							display: inline-block;
							line-height: normal;
							padding: 0.02rem 0.06rem;
							background: #0CC5AF;
							color: #ffffff;
							margin-left: 0.04rem;
						}
						.type {
							display: inline-block;
							line-height: normal;
							padding: 0.01rem 0.04rem;
							color: #0CC5AF;
							border: 1px solid #0CC5AF;
						}
					}
					.pcon {
						margin-top: 0.07rem;
						text-align: justify;
						line-height: 0.22rem;
					}
					.piclist {
						width: 2.52rem;
						/*display: flex;*/
						justify-content: space-between;
						margin-top: 0.09rem;
						img {
							width: 0.75rem;
							height: 0.75rem;
							margin-right: .05rem;
						}
					}
				}
			}
			.time {
				text-align: right;
				margin-top: 0.15rem;
				color: #999999;
				font-size: 0.13rem;
			}
		}
	}
	
	.typesChoose {
		width: 2.85rem;
		background-color: #F0F0F0;
		height: .5rem;
		.typeTitle {
			width: .5rem;
			height: .5rem;
			background-color: #3F51B5;
			display: inline-block;
			color: white;
			text-align: center;
			line-height: .5rem;
			font-size: .13rem;
		}
	}
	
	img {
		transition: all .2s linear;
		transform: scale(1);
	}
	
	.big {
		transform: scale(1.1);
		position: fixed;
		top:17%;
		left: 1%;
		right: 1%;
		z-index: 999;
	}
	.IOSbig {
		width:100%;
		height: auto;
		position: fixed;
		top:15%;
		left: 0%;
		right: 0%;
		z-index: 999;
	}
	.zhezhao {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: #474747;
		opacity: 0.8;
		z-index: 22;
		display: none;
	}
	.bigsImgs{
		display: none;
	}
	.inpus11 , .inpus22 , .inpus33{
		display: none;
	}
	.inpus111 , .inpus222 , .inpus333{
		display: none;
	}
	.inpus1 , .inpus2 , .inpus3{
		display: none;
	}
	.lest1 , .lest2 , .lest3{
		display: none;
	}
	.closeImg{
		position: fixed;
		display: none;
		bottom: 18%;
		z-index: 99999;
		width: .5rem;
		height: .5rem;
		left: 50%;
		margin-left: -.25rem;
	}
</style>