<template>
	<div>
		<div>
			<div class="main">
				<header class="head">申请类型：<span v-if="applyLists.applyType=='0'">请假</span></header>
				<p class="con">{{applyLists.content}}</p>
				<div class="wait">
					<div class="pifu" v-if="applyLists.applyStatus == '0'"><i></i>等待批复</div>
					<div class="pifu" v-else-if="applyLists.applyStatus == '1'"><i></i>已同意</div>
					<div class="pifu" v-else-if="applyLists.applyStatus == '2'"><i></i>老师未同意此次申请</div>
					<div class="pifu" v-else><i></i>已撤回</div>
					<div class="time">{{applyLists.applyTime.substring(5 , 16)}}</div>
				</div>
			</div>
			<div class="height"></div>
			<div class="main">
				<div class="apply">
					<p class="sqr">申&nbsp;&nbsp;请&nbsp;&nbsp;人</p>
					<span v-if="applyLists.applyUserHeadImg != '' && applyLists.applyUserHeadImg.indexOf('http') == -1">
						<img :src="'http://xatzht.sxxat.com/files/'+applyLists.applyUserHeadImg" alt="">
					</span>
					<span v-else-if="applyLists.applyUserHeadImg != '' && applyLists.applyUserHeadImg.indexOf('http') != -1">
						<img :src="applyLists.applyUserHeadImg" alt="">
					</span>
					<span v-else>
						<img src="../assets/img/parent.png" alt="">
					</span>
					<p class="name">{{applyName}}</p>
				</div>
				<div class="apply">
					<p class="sqr">申请学生</p>
					<span v-if="applyStudent">
						<img :src="'http://xatzht.sxxat.com/files/'+applyLists.applyStudentHeadImg" alt="">
					</span>
					<span v-else>
						<img src="../assets/img/children.png">
					</span>
					<p class="name">{{applyLists.applyStudentName}}</p>
				</div>
				<div class="apply">
					<p class="sqr">审批老师</p>
					<span v-if="applyLists.replyTeacherHeadImg != '' && applyLists.replyTeacherHeadImg.indexOf('http') == -1">
						<img :src="'http://xatzht.sxxat.com/files/'+applyLists.replyTeacherHeadImg" alt="">
					</span>
					<span v-else-if="applyLists.replyTeacherHeadImg != '' && applyLists.replyTeacherHeadImg.indexOf('http') != -1">
						<img :src="applyLists.replyTeacherHeadImg" alt="">
					</span>
					<span v-else>
						<img src="../assets/img/teacher.png">
					</span>
					<p class="name">{{applyLists.replyTeacherName}}</p>
				</div>
			</div>
			<div class="bottom" v-if="applyCao">
				<a class="che" @click="withdrawApply()">撤回申请</a>
				<a class="edit" @click="changeApply(applyLists.applyId)">修改申请</a>
			</div>
			
			<div id="dialogs" v-if="dialog">
				<div class="dialogs-item">
					<div style="margin: .08rem;">
						<span>您确定撤销此申请吗？</span>
					</div>
					<div class="caozuo">
						<span @click="giveUp()">放弃</span>
						<span @click="confirmDo(applyLists.applyId)" style="margin-left: .3rem;margin-right: .1rem;">确定撤销</span>
					</div>
				</div>
			</div>
			
		</div>


	</div>
</template>

<script>
	export default {
		name: 'applydetail',
		data() {
			return {
				applyPerson:true,
				applyStudent:true,
				applyTeacher:true,
				applyCao:true,
				dialog:false,
				applyLists: [],
				applyName:{},
				token: this.$route.params.applyDetails.split(',')[0],
				userId: this.$route.params.applyDetails.split(',')[1],
				os: this.$route.params.applyDetails.split(',')[2],
				applyId: this.$route.params.applyDetails.split(',')[3],
			}
		},
		methods: {
			applyDetail: function() {
				this.$axios({
					method: 'post',
					url: '/userHome/getApplyDetailById',
					headers: {
						UserID: this.userId,
						Tonken: this.token,
						DeviceID: '',
						OS: this.os
					},
					data: {
						applyId: this.applyId,
						userId: this.userId
					}
				}).then((response) => {
					console.log(response);
					if(response.data.code == 0) {
						this.applyLists = response.data.data;
						this.applyName = response.data.data.applyUserName;
						this.applyStatus = response.data.data.applyStatus;
						
						this.applyStudentId = response.data.data.applyStudentId;
						this.applyStudentName = response.data.data.applyStudentName;
						this.replyTeacherId = response.data.data.replyTeacherId;
						this.replyTeacherName = response.data.data.replyTeacherName;
						
						
						if(this.applyName == "我"){
							this.applyCao = true
						}else{
							this.applyCao = false
						}
						if(this.applyStatus != 0){
							this.applyCao = false
						}
						
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			
			changeApply: function(applyId) {
				localStorage.setItem("applys", applyId);
					
				var param = this.applyStudentId + "," +this.applyStudentName + "," + this.replyTeacherId + "," + this.replyTeacherName
				
				var params = {
					"applyStudentId":this.applyStudentId,
					"applyStudentName":this.applyStudentName,
					"replyTeacherId":this.replyTeacherId,
					"replyTeacherName":this.replyTeacherName
				}
				
				if(this.os == 0) {
					window.android.applyFun2(param); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('applyFunOS2' , params , function(response) { //传值给ios app方法,params是参数
						console.log(response);
					});
				}

			},
			withdrawApply:function(){
				this.dialog = true
			},
			//确认撤销
			confirmDo:function(applyId){
					//进行撤销操作请求
					this.$axios({
						method: 'post',
						url: '/userHome/revokeApply',
						headers: {
							UserID: this.userId,
							Tonken: this.token,
							DeviceID: '',
							OS: this.os
						},
						data: {
							applyId: applyId,
						}
					}).then((response) => {
						console.log(response);
						if(response.data.code == 0) {
							this.dialog = false
							if(this.os == 0) {
								window.android.applyFun3("0"); //传值给安卓app方法
							} else if(this.os == 1) {
								WebViewJavascriptBridge.callHandler('applyFunOS3', function(response) { //传值给ios app方法,params是参数
									console.log(response);
								});
							}
							
						}
					}).catch((error) => {
						console.log(error);
					});
					
					
				},
				//取消操作
				giveUp:function(){
					this.dialog = false
				}
		},
		created() {
			this.applyDetail()
			setupWebViewJavascriptBridge(function (bridge) {
//	    		
    		})
		}

	}
</script>

<style lang="less" scoped>
	.head {
		color: #FFB21F;
		font-size: 0.18rem;
		margin-top: 0.18rem;
	}
	
	.con {
		font-size: 0.18rem;
		margin-top: 0.2rem;
	}
	
	.divimg {
		margin-top: 0.19rem;
		img {
			width: 2rem;
			height: 1.2rem;
		}
	}
	
	.wait {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: .4rem;
		.pifu {
			color: #0CC5AF;
			font-size: 0.16rem;
			i {
				display: inline-block;
				width: 0.16rem;
				height: 0.16rem;
				background: url("../assets/img/wait.png") no-repeat;
				background-size: 0.16rem auto;
				position: relative;
				top: 0.02rem;
				margin-right: 0.04rem;
			}
		}
		.time {
			color: #999999;
			font-size: 0.13rem;
		}
	}
	
	.height {
		background: #F7F7F7;
		height: 0.1rem;
		margin-top: 0.13rem;
		margin-bottom: 0.23rem;
	}
	
	.apply {
		display: flex;
		align-items: center;
		margin-bottom: .2rem;
		.sqr {
			color: #999999;
			width: 0.63rem;
		}
		img {
			width: 0.3rem;
			height: 0.3rem;
			border-radius: 50%;
			margin-left: 0.24rem;
		}
		.ml {
			margin-left: 0.27rem;
		}
		.name {
			margin-left: 0.1rem;
		}
	}
	
	.dotted {
		height: 0.15rem;
		width: 1.02rem;
		border-right: 1px dotted #0CC5AF;
	}
	
	.bottom {
		display: flex;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		width: 100%;
		position: fixed;
		bottom: 0;
		.che,
		.edit {
			color: #ffffff;
			font-size: 0.17rem;
		}
		.che {
			width: 44%;
			background: #999999;
		}
		.edit {
			background: #0CC5AF;
			width: 56%;
		}
	}
	#dialogs{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
	}
	.dialogs-item{
		width: 70%;
		height: 1.2rem;
		background-color:#fcfcfc;
		position: absolute;
		bottom: 2rem;
		left: 15%;
		box-shadow: 1px 2px 3px #999999;
	}
	.caozuo{
		float: right;
		margin:.5rem auto;
	}
</style>