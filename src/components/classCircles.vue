<template>
	<div class="bgf7 margintop-overflow"  id="theme-list">
		<!--教师班级圈部分-->
		<div class="parent" v-if="teacher" >
			<div v-for="item in theme_list">
				
				<!--作业通知-->
				<div class="body-item" v-if="item.publishType == '1'">
					<div class="headers">
						<section class="imgs">
							<span class="headImg" v-if="item.headImg != '' && item.headImg.indexOf('http') == -1">
								<img :src="'http://xatzht.sxxat.com/files/'+item.headImg" alt="">
							</span>
							<span class="headImg" v-else-if="item.headImg != '' && item.headImg.indexOf('http') != -1">
								<img :src="item.headImg" alt="">
							</span>
							<span class="headImg" v-else>
								<img src="../assets/img/teacher.png" />
							</span>
							<span class="teacherName">{{item.teacherName}}</span>
							<span class="objType" v-if="item.subjectName != ''">{{item.subjectName}}老师</span>
						</section>
						<section class="datas">{{item.publishTime}}</section>
					</div>
						
					<div class="contents" @click="toDetail(1 , item.classCircleId)">
						<section class="contents-item">
							<span class="types" style="background-color: #51ACF8;">
								<span style="margin-top: .1rem;">作业</span>
								<span>通知</span>
							</span>
							<span class="contents-body">
								<span style="height: .38rem;">{{item.content}}</span>
								<p class="watchDetail">点击查看详情</p>	
							</span>
						</section>
					</div>
					
					<div class="footer" v-show="reads" @click="yiyue(item.classCircleId , item.isCommit)">
						<p><span v-if="item.isCommit == '1'"> 已回复  {{item.readNum}} </span><span v-else> 已阅  {{item.readNum}} </span><a>查看></a></p>
					</div>
				</div>
				
				<!--在线作业-->
				<div class="body-item" v-else-if="item.publishType == '2'">
					<div class="headers">
						<section class="imgs">
							<span class="headImg" v-if="item.headImg != '' && item.headImg.indexOf('http') == -1">
								<img :src="'http://xatzht.sxxat.com/files/'+item.headImg" alt="">
							</span>
							<span class="headImg" v-else-if="item.headImg != '' && item.headImg.indexOf('http') != -1">
								<img :src="item.headImg" alt="">
							</span>
							<span class="headImg" v-else>
								<img src="../assets/img/teacher.png" />
							</span>
							<span class="teacherName">{{item.teacherName}}</span>
							<span class="objType" v-if="item.subjectName != ''">{{item.subjectName}}老师</span>
						</section>
						<section class="datas">{{item.publishTime}}</section>
					</div>
						
					<div class="contents" @click="toDetail(2 , item.classCircleId)">
						<section class="contents-item">
							<span class="types" style="background-color: #FFB21F;">
								<span style="margin-top: .1rem;">在线</span>
								<span>作业</span>
							</span>
							<span class="contents-body">
								<span style="height: .38rem;">{{item.content}}</span>
								<p class="watchDetail">点击查看详情</p>	
							</span>
						</section>
					</div>
					<div class="footer" v-show="reads" @click="yiyue(item.classCircleId , item.isCommit)">
						<p><span v-if="item.isCommit == '1'"> 已回复  {{item.readNum}} </span><span v-else> 已阅  {{item.readNum}} </span><a>查看></a></p>
					</div>
				</div>
				
				<!--在线投票-->
				<div class="body-item" v-else-if="item.publishType == '3'">
					<div class="headers">
						<section class="imgs">
							<span class="headImg" v-if="item.headImg != '' && item.headImg.indexOf('http') == -1">
								<img :src="'http://xatzht.sxxat.com/files/'+item.headImg" alt="">
							</span>
							<span class="headImg" v-else-if="item.headImg != '' && item.headImg.indexOf('http') != -1">
								<img :src="item.headImg" alt="">
							</span>
							<span class="headImg" v-else>
								<img src="../assets/img/teacher.png" />
							</span>
							<span class="teacherName">{{item.teacherName}}</span>
							<span class="objType" v-if="item.subjectName != ''">{{item.subjectName}}老师</span>
						</section>
						<section class="datas">{{item.publishTime}}</section>
					</div>
						
					<div class="contents" @click="toDetail(3 , item.classCircleId)">
						<section class="contents-item">
							<span class="types" style="background-color: #F57A9F;">
								<span style="margin-top: .1rem;">在线</span>
								<span>投票</span>
							</span>
							<span class="contents-body">
								<span style="height: .38rem;">{{item.content}}</span>
								<p class="watchDetail">点击查看详情</p>	
							</span>
						</section>
					</div>
					<div class="footer" v-show="reads" @click="yiyue(item.classCircleId , item.isCommit)">
						<p><span v-if="item.isCommit == '1'"> 已回复  {{item.readNum}} </span><span v-else> 已阅  {{item.readNum}} </span><a>查看></a></p>
					</div>
				</div>
				
				<!--通知-->
				<div class="body-item" v-else-if="item.publishType == '4'">
					<div class="headers">
						<section class="imgs">
							<span class="headImg" v-if="item.headImg != '' && item.headImg.indexOf('http') == -1">
								<img :src="'http://xatzht.sxxat.com/files/'+item.headImg" alt="">
							</span>
							<span class="headImg" v-else-if="item.headImg != '' && item.headImg.indexOf('http') != -1">
								<img :src="item.headImg" alt="">
							</span>
							<span class="headImg" v-else>
								<img src="../assets/img/teacher.png" />
							</span>
							<span class="teacherName">{{item.teacherName}}</span>
							<span class="objType" v-if="item.subjectName != ''">{{item.subjectName}}老师</span>
						</section>
						<section class="datas">{{item.publishTime}}</section>
					</div>
						
					<div class="contents" @click="toDetail(4 , item.classCircleId)">
						<section class="contents-item">
							<span class="types" style="background-color: #00C0FF;">
								<span style="margin-top: .2rem;">通知</span>
							</span>
							<span class="contents-body">
								<span style="height: .38rem;">{{item.content}}</span>
								<p class="watchDetail">点击查看详情</p>	
							</span>
						</section>
					</div>
					<div class="footer" v-show="reads" @click="yiyue(item.classCircleId , item.isCommit)">
						<p><span v-if="item.isCommit == '1'"> 已回复  {{item.readNum}} </span><span v-else> 已阅  {{item.readNum}} </span><a>查看></a></p>
					</div>
				</div>
		
			</div>
		
		</div>	<!--家长班级圈结束点-->
		
		<!--家长班级圈部分-->
		<div class="parent" v-if="parent">
			<div v-for="item in theme_list">
			
				<!--作业通知-->
				<div class="body-item" v-if="item.publishType == '1'">
					<div class="headers">
						<section class="imgs">
							<span class="headImg" v-if="item.publishHeadImg != '' && item.publishHeadImg.indexOf('http') == -1">
								<img :src="'http://xatzht.sxxat.com/files/'+item.publishHeadImg" alt="">
							</span>
							<span class="headImg" v-else-if="item.publishHeadImg != '' && item.publishHeadImg.indexOf('http') != -1">
								<img :src="item.publishHeadImg" alt="">
							</span>
							<span class="headImg" v-else>
								<img src="../assets/img/parent.png" />
							</span>
							<span class="teacherName">{{item.publisher}}</span>
							<span class="objType" v-if="item.subjectName != ''">{{item.subjectName}}老师</span>
						</section>
						<section class="datas">{{item.publishTime.substring(5 , 16)}}</section>
					</div>
					<div class="contents" @click="toDetail(1 , item.classCircleId)">
						<section class="contents-item">
							<span class="types" style="background-color: #51ACF8;">
								<span style="margin-top: .1rem;">作业</span>
								<span>通知</span>
							</span>
							<span class="contents-body">
								<span style="height: .38rem;">{{item.content}}</span>
								<p class="watchDetail">点击查看详情</p>	
							</span>
						</section>
					</div>
				</div>
				
				<!--在线作业-->
				<div class="body-item" v-else-if="item.publishType == '2'">
					<div class="headers">
						<section class="imgs">
							<span class="headImg" v-if="item.publishHeadImg != '' && item.publishHeadImg.indexOf('http') == -1">
								<img :src="'http://xatzht.sxxat.com/files/'+item.publishHeadImg" alt="">
							</span>
							<span class="headImg" v-else-if="item.publishHeadImg != '' && item.publishHeadImg.indexOf('http') != -1">
								<img :src="item.publishHeadImg" alt="">
							</span>
							<span class="headImg" v-else>
								<img src="../assets/img/parent.png" />
							</span>
							<span class="teacherName">{{item.publisher}}</span>
							<span class="objType" v-if="item.subjectName != ''">{{item.subjectName}}老师</span>
						</section>
						<section class="datas">{{item.publishTime.substring(5 , 16)}}</section>
					</div>
						
					<div class="contents" @click="toDetail(2 , item.classCircleId)">
						<section class="contents-item">
							<span class="types" style="background-color: #FFB21F;">
								<span style="margin-top: .1rem;">在线</span>
								<span>作业</span>
							</span>
							<span class="contents-body">
								<span style="height: .38rem;">{{item.content}}</span>
								<p class="watchDetail">点击查看详情</p>	
							</span>
						</section>
					</div>
				</div>
				
				<!--在线投票-->
				<div class="body-item" v-else-if="item.publishType == '3'">
					<div class="headers">
						<section class="imgs">
							<span class="headImg" v-if="item.publishHeadImg != '' && item.publishHeadImg.indexOf('http') == -1">
								<img :src="'http://xatzht.sxxat.com/files/'+item.publishHeadImg" alt="">
							</span>
							<span class="headImg" v-else-if="item.publishHeadImg != '' && item.publishHeadImg.indexOf('http') != -1">
								<img :src="item.publishHeadImg" alt="">
							</span>
							<span class="headImg" v-else>
								<img src="../assets/img/parent.png" />
							</span>
							<span class="teacherName">{{item.publisher}}</span>
							<span class="objType" v-if="item.subjectName != ''">{{item.subjectName}}老师</span>
						</section>
						<section class="datas">{{item.publishTime.substring(5 , 16)}}</section>
					</div>
						
					<div class="contents" @click="toDetail(3 , item.classCircleId)">
						<section class="contents-item">
							<span class="types" style="background-color: #F57A9F;">
								<span style="margin-top: .1rem;">在线</span>
								<span>投票</span>
							</span>
							<span class="contents-body">
								<span style="height: .38rem;">{{item.content}}</span>
								<p class="watchDetail">点击查看详情</p>	
							</span>
						</section>
					</div>
				</div>
				
				<!--通知-->
				<div class="body-item" v-else-if="item.publishType == '4'">
					<div class="headers">
						<section class="imgs">
							<span class="headImg" v-if="item.publishHeadImg != '' && item.publishHeadImg.indexOf('http') == -1">
								<img :src="'http://xatzht.sxxat.com/files/'+item.publishHeadImg" alt="">
							</span>
							<span class="headImg" v-else-if="item.publishHeadImg != '' && item.publishHeadImg.indexOf('http') != -1">
								<img :src="item.publishHeadImg" alt="">
							</span>
							<span class="headImg" v-else>
								<img src="../assets/img/parent.png" />
							</span>
							<span class="teacherName">{{item.publisher}}</span>
							<span class="objType" v-if="item.subjectName != ''">{{item.subjectName}}老师</span>
						</section>
						<section class="datas">{{item.publishTime.substring(5 , 16)}}</section>
					</div>
						
					<div class="contents" @click="toDetail(4 , item.classCircleId)">
						<section class="contents-item">
							<span class="types" style="background-color: #00C0FF;">
								<span style="margin-top: .2rem;">通知</span>
							</span>
							<span class="contents-body">
								<span style="height: .38rem;">{{item.content}}</span>
								<p class="watchDetail">点击查看详情</p>
							</span>
						</section>
					</div>
				</div>
		
			</div>
		</div>	<!--教师班级圈结束点-->	
		
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
		
		<!--提示信息-->
		<div class="show_msg">
	  		<span class="show_span">请填写申请事由</span>
	  	</div>
		
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	export default {
		name: 'classCircles',
		components: {
			LoadMore
		},
		data() {
			return {
				parent:false,
				teacher:false,
				reads:true,
				//加载更多部分参数数据
				tab_index: 0,
				page: 1,
				quesheng:false,
				queshengs:false,
				theme_list: [],
				load_show: false,
				had_more: true,

				token: this.$route.params.classCircless.split(',')[0],
				userId: this.$route.params.classCircless.split(',')[1],
				classId: this.$route.params.classCircless.split(',')[2],
				studentid: this.$route.params.classCircless.split(',')[3],
				os: this.$route.params.classCircless.split(',')[4],
				type: this.$route.params.classCircless.split(',')[5]
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
							this.teacher = true;
							//判断是否有数据
							if(response.data.data.length == 0) {
//								this.quesheng = true
								this.load_show = false;
							} else if(response.data.data.length < 10){	//如果数据少于每页显示数据长度，停止刷新操作，并让页面内几条数据显示出来
								window.removeEventListener('scroll', this.scrollLoad, true);
								this.had_more = false;
								this.load_show = true;
							}
							var res = response.data.data
							this.readNum = response.data.data.readNum;
							localStorage.setItem("readedNum" , this.readNum)
							// 取舍 赋值 
							this.load_show = false;
							if(scroll) {
								console.log(res.length)
								if(res.length == 10) {
									this.scrollListen();
								} else {
									this.had_more = false;
									this.load_show = true;
								}
							}

							this.theme_list = this.theme_list.concat(res);
							console.log(this.theme_list.length)
							if(this.theme_list.length == 0){
								this.quesheng = true;
							}
							
						}else if(response.data.code == 1){
							$('.show_span').text("服务器错误！！")
							$(".show_msg").css('bottom', '20%');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2000);
						}else if(response.data.code == 99){
							$('.show_span').text("登陆失效，请重新登陆！！")
							$(".show_msg").css('bottom', '20%');
							$(".show_span").css('width', '2rem');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2000);
						}
					}).catch((error) => {
						console.log(error);
					});

				} else if(this.type == 1) {
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
							this.parent = true;
							console.log(response)
							//判断是否有数据，没有就显示缺省页
							if(response.data.data.length == 0) {
								this.quesheng = true
								this.load_show = false;
							}else if(response.data.data.length < 10 ){
								window.removeEventListener('scroll', this.scrollLoad, true);
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
							$(".show_span").css('width', '2rem');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2700);
						}
					}).catch((error) => {
						console.log(error);
					});
				}

			},
			//跳转到详情页
			toDetail:function(index , id){
				//存储点进去的类型，用来判断详情页内的数据显示
				localStorage.setItem("classCircleType" , index)
				
				var params = id + "," + this.studentid
				var param = {
					"studentid": this.studentid.toString(),
					"classCicleId": id.toString()
				}
				if(this.os == 1) {	//ios端
					if(this.type == 0){	//教师端
						WebViewJavascriptBridge.callHandler('toDetailss', id.toString(), function(response) { //传值给ios app方法,params是参数
							
						});
					}else{	//家长端
						WebViewJavascriptBridge.callHandler('toDetails', param, function(response) { //传值给ios app方法,params是参数
							
						});
					}
					
				} else if(this.os == 0){	//安卓端
					if(this.type == 0){	//教师端
						window.android.toDetail(id.toString()); //传值给安卓app方法
					}else{	//家长端
						window.android.toDetail1(params); //传值给安卓app方法
					}
				}
				
				
			},
			//教师查看已阅情况
			yiyue:function(id , commit){
				localStorage.setItem("commits" , commit);
				if(this.os == 0){	//教师端
					window.android.toYiYue(id.toString()); //传值给安卓app方法
				}else{	//家长端
					WebViewJavascriptBridge.callHandler('toYiYue1', id.toString(), function(response) { //传值给ios app方法,params是参数
							
					});
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

<style scoped lang="less">
	.body-item{
		margin-bottom: .05rem;
		border-bottom: 1px solid #f0f0f0;
		margin-top: .15rem;
		font-size: .14rem;
		width: 100%;
		.headers{
			section{
			 	display: inline-block;
			 	height: .36rem;
			 	line-height: .36rem;
			 	vertical-align: middle;
			}
		    .imgs{
				height: .36rem;
				line-height:.36rem;
				width: 2.1rem;
		    }
		    .headImg{
				img{
					margin-left: .15rem;
					vertical-align: top;
					width: .36rem;
					height: .36rem;
					border-radius:50% ;
				}
			}
			.teacherName{
				margin-left: .08rem;
				font-weight:600;
			}
			.objType{
				font-size: .13rem;
				margin-left: .1rem;
				background-color: #0CC5AF;
				color: white;
				border-radius:.03rem;
				padding: .03rem .02rem .01rem .02rem;
			}
			.datas{
				width: auto;
				float: right;
				margin-right: .15rem;
				color: #c6c6c6;
			}
		}
		.contents{
			width: 3.75rem;
			display: flex;
			justify-content: flex-end;
			.contents-item{
				margin: .05rem 0.15rem .15rem .3rem;
				display: flex;
				width: 2.8rem;
				background-color:#F3F3F3 ;
				padding:.08rem;
			}
		}
	}
	.contents-item>span{
		display: inline-block;
	}
	.types{
		width: .6rem;
		height: .6rem;
		font-size: .14rem;
		display: block;
		text-align: center;
		span{
			color: white;
			display: block;
		}
	}
	.contents-body{
		display: flex;
		font-size: .13rem;
		padding: .03rem 0 0 .08rem;
		line-height: 150%;
		flex: 1;
		position: relative;
		span{
			height: .35rem;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			/* autoprefixer: off */
		    -webkit-box-orient: vertical;
		    /* autoprefixer: on */
			-webkit-line-clamp: 2;
			white-space: normal
		}
		p{
			bottom: 0;
			right: .1rem;
			display: block;
			position: absolute;
			margin-top: .05rem;
			text-align: right;
			color: #FF9800;
		}
	}
	.footer{
		line-height: .2rem;
		height: .3rem;
		font-size: .13rem;
		color:#474747;
		margin-left: .64rem;
	}
	.watchDetail{
		font-size: .12rem;
		font-weight: bold;
		color: #3FCFBE;
	}
</style>