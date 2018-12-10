<template>
	<div>
		<div>
			<div class="main">
				<header class="head">申请类型：<span v-if="">请假</span></header>
				<p class="con">{{applyLists.content}}</p>
				<div class="wait">
					<div class="pifu" v-if="applyLists.applyStatus == '0'"><i></i>等待批复</div>
					<div class="pifu" v-else-if="applyLists.applyStatus == '1'"><i></i>已同意</div>
					<div class="pifu" v-else-if="applyLists.applyStatus == '2'"><i></i>不同意</div>
					<div class="time">{{applyLists.applyTime}}</div>
				</div>
			</div>
			<div class="height"></div>
			<div class="main">
				<div class="apply">
					<p class="sqr">申&nbsp;请&nbsp;人</p>
					<span v-if="applyLists.applyHeadImg != '' && applyLists.applyHeadImg.indexOf('http') == -1">
						<img :src="'http://xatzht.sxxat.com/files/'+applyLists.applyHeadImg" alt="" >
					</span>
					<span v-else-if="applyLists.applyHeadImg != '' && applyLists.applyHeadImg.indexOf('http') != -1">
						<img :src="applyLists.applyHeadImg" alt="" >
					</span>
					<span v-else>
						<img src="../assets/img/teacher.png" alt="">
					</span>
					<p class="name">{{applyLists.applyUser}}</p>
				</div>
				<div class="apply">
					<p class="sqr">审批人</p>
					<span v-if="applyLists.replyTeacherHeadImg != '' && applyLists.replyTeacherHeadImg.indexOf('http') == -1">
						<img :src="'http://xatzht.sxxat.com/files/'+applyLists.replyTeacherHeadImg" alt="" >
					</span>
					<span v-else-if="applyLists.replyTeacherHeadImg != '' && applyLists.replyTeacherHeadImg.indexOf('http') != -1">
						<img :src="applyLists.replyTeacherHeadImg" alt="" >
					</span>
					<span v-else>
						<img src="../assets/img/teacher.png" alt="">
					</span>
					<p class="name">{{applyLists.replyTeacher}}</p>
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
				applyHeads:false,
				applySHENPI:false,
				applyLists:[],
				token: this.$route.params.teacherApplyDetails.split(',')[0],
				userId: this.$route.params.teacherApplyDetails.split(',')[1],
				applyId: this.$route.params.teacherApplyDetails.split(',')[2],
				os: this.$route.params.teacherApplyDetails.split(',')[3]
			}
		},
		methods: {
			applyDetail:function(){
				this.$axios({
				    method: 'post',
				    url: '/apply/getApplyById',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				    	applyId:this.applyId
				    }
				  }).then((response)=> {
				  	console.log(response);
				    if(response.data.code==0){
				    	this.applyLists = response.data.data;
				    	
				    	this.applyHeadImgs = response.data.data.applyHeadImg
				    	this.replyTeacherHeadImgs = response.data.data.replyTeacherHeadImg
				    	//申请人默认头像问题
				    	if(this.applyHeadImgs == ""){
				    		this.applyHeads = false
				    	}else{
				    		this.applyHeads = true
				    	}
				    	//审批人默认头像问题
				    	if(this.replyTeacherHeadImgs == ""){
				    		this.applySHENPI = false
				    	}else{
				    		this.applySHENPI = true
				    	}
				    	
				    }
				  }).catch((error)=> {
				     console.log(error);
				  });
			}
		},
		created() {
			this.applyDetail()
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
		border: 1px solid red;
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
	.apply:first-child{
		margin-bottom: .2rem;
	}
</style>