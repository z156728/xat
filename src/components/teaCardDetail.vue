<template>
	<div class="bgf7 margintop-overflow">
		<div class="headers">
			<div class="left-item">
				<div v-if="details.headImg != '' && details.headImg.indexOf('http') == -1">
		          <img :src="'http://xatzht.sxxat.com/files/'+details.headImg" alt="" id="studentImg" class="headsImg">
		      	</div>
		      	<div v-else-if="details.headImg != '' && details.headImg.indexOf('http') != -1">
		          <img :src="details.headImg" alt="" id="studentImg" class="headsImg">
		      	</div>
		      	<div v-else>
		          <img src="../assets/img/children.png" alt="" class="head-side headsImg">
		      	</div>
				<div>
					<p>{{details.studentName}}</p>
				</div>
			</div>
			<div class="right-item" @click="toApplyCard">
				<img src="../assets/img/3409@2x.png" style="height: .29rem;" class="head-side"/>
			</div>
		</div>
		<div class="cardsItem">
			<div class="addCard">
				<img src="../assets/img/3497@2x.png" style="width:100%;margin-top: .2rem;" @click="addCards"  v-if="addCard">
				<div class="card-item" v-else>
					<div class="cardName">
						<span class="card">添加考勤卡</span>
					</div>
					<div class="cardNo">
						<span><input type="text" placeholder="请填写卡号" class="first inp"></span>
						<span @click="confirms"><img src="../assets/img/3498@2x.png" style="height: .35rem;float: right;"></span>
					</div>
				</div>
			</div>
			<div class="tishi">
				<p v-show="noCard">尚未绑定考勤卡</p>
				<p v-show="haveCard">已绑定的考勤卡</p>
				<div v-show="haveCard" style="margin-bottom: .2rem;">
					<p v-for="item in cards" class="cards">
						<img src="../assets/img/34589@2x.png" style="width: .18rem;"/>
						<span>{{item.card}}</span>
					</p>
				</div>
			</div>
			
		</div>
		
		<div class="footers">
			<div>
				<p style="font-size: .15rem;">友情提示:</p>
				<p>1、老师端可以进行考勤卡的绑定，请输入正确的考勤卡号;</p>
				<p>2、考勤卡请根据学校安排进行绑定;</p>
				<p>3、考勤卡的挂失、解绑请在后台进行或者联系校安通技术支持;</p>
				<p>4、如有考勤卡绑定失败或查询考勤卡绑定情况可通过以下查询功能;</p>
			</div>
			
			<div class="checkInput" v-show="this.type == '0'">
				<span><input type="text" class="inpus" placeholder="请填写需校验卡号"></span>
				<span @click="checks">查询</span>
			</div>
			<p class="tishis" v-if="yibang">此卡号已绑定学生</p>
			<p class="tishis" v-if="yigua">此卡号已挂失</p>
			<p class="tishis" v-if="buzai">此卡号不存在</p>
			<p class="tishis" v-if="keyong">此卡号未绑定学生，可使用</p>
		</div>
		
		<!--提示信息-->
		<div class="show_msg">
	  		<span class="show_span">请填写申请事由</span>
	  	</div>
		
		
	</div>
</template>

<script>
		export default {
        name: 'teaCardDetail',
        data(){
        	return{
        		yibang:false,
        		yigua:false,
        		buzai:false,
        		keyong:false,
        		
        		addCard:true,
        		noCard:false,
        		haveCard:true,
        		details:{},
        		cards:[],
        		tonken:this.$route.params.teaCardDetails.split(',')[0],
        		userid:this.$route.params.teaCardDetails.split(',')[1],
        		schoolid:this.$route.params.teaCardDetails.split(',')[2],
        		classid:this.$route.params.teaCardDetails.split(',')[3],
        		studentid:this.$route.params.teaCardDetails.split(',')[4],
        		os:this.$route.params.teaCardDetails.split(',')[5],
        		type:this.$route.params.teaCardDetails.split(',')[6]
        	}
        },
        methods:{
        	getStudentDetail:function(){
        		//获取学生详情
        		this.$axios({
					    method: 'post',
					    url: '/student/getStudentById',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      studentId:this.studentid
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	this.details = response.data.data
						  }
					  }).catch((error)=> {
					    console.log(error);
				  });
				  //获取绑定的考勤卡号
				  this.$axios({
					    method: 'post',
					    url: '/student/getStudentCardNoById',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      studentId:this.studentid
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	this.cards = response.data.data;
					    	if(this.cards.length == 0){
					    		this.haveCard = false;
					    		this.noCard = true;
					    	}else{
					    		this.haveCard = true;
					    		this.noCard = false;
					    	}
						  }
					  }).catch((error)=> {
					    console.log(error);
				  });
        	},
        	//页面点击添加考勤卡的点击事件
        	addCards:function(){
        		this.addCard = false;
        	},
        	//确定操作
			confirms:function(){
				var a = $('.first').val();
				if(a == ""){
					$('.show_span').text("请输入考勤卡号")
					$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
				}else{
					this.$axios({
					    method: 'post',
					    url: '/student/saveStudentCardNo',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      studentId:this.studentid,
					      cardNo:a
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	$('.show_span').text("绑定成功")
							$(".show_msg").css('bottom', '20%');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2000);
							this.getStudentDetail();
							this.addCard = true;
						}else if(response.data.code == 1){
							$('.show_span').text("考勤卡号不存在!")
							$(".show_msg").css('bottom', '20%');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2000);
						}else if(response.data.code == 2){
							$('.show_span').text("考勤卡号已绑定!")
							$(".show_msg").css('bottom', '20%');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2000);
						}else if(response.data.code == 3){
							$('.show_span').text("考勤卡号已满!")
							$(".show_msg").css('bottom', '20%');
							$('.show_msg').hide();
							$('.show_msg').fadeIn(1000);
							$('.show_msg').fadeOut(2000);
						}
					  }).catch((error)=> {
					    console.log(error);
					  });
					}
			},
        	
        	//点击底部查询检测按钮
        	checks:function(){
        		var texts = $('.inpus').val();
        		if(texts == ""){
        			$('.show_span').text("你还没有输入测试卡号哦！")
					$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
        		}else{
        			//先把显示的都清掉
	        		this.yibang=false;
					this.yigua=false;
					this.buzai=false;
					this.keyong=false;
        			
        			this.$axios({
					    method: 'post',
					    url: '/student/getStudentCardNo',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      cardNo:texts
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){	//可以使用的卡号
							this.keyong=true;
						}else if(response.data.code == 1){	//此卡号不存在
							this.buzai=true;
						}else if(response.data.code == 2){	//此卡号已绑定学生
							this.yibang=true;
						}else if(response.data.code == 3){	//此卡号已挂失
							this.yigua=true;
						}
					  }).catch((error)=> {
					    console.log(error);
					  });
        			
        		}
        		
        		
        	},
        	
        	
        	
        	//点击跳转到申请补卡页面
			toApplyCard:function(){
				localStorage.setItem("studentId" , this.studentid);
		  		localStorage.setItem("classId" , this.classid);
		  		localStorage.setItem("schoolId" , this.schoolid);
				
				if(this.type == 1){	//家长端
					if(this.classid == ""){
						$('.show_span').text("请先选择班级")
						$(".show_msg").css('bottom', '20%');
						$('.show_msg').hide();
						$('.show_msg').fadeIn(1000);
						$('.show_msg').fadeOut(2000);
					}else{
						if(this.os == 0){	//安卓端
							window.android.toApplyCard("0"); //传值给安卓app方法
						}else{	//苹果端
							WebViewJavascriptBridge.callHandler('toApplyCard1', function(response) { //传值给ios 
								
							});
						}
					}
				}else{
					if(this.os == 0){	//安卓端
						window.android.toApplyCards("0"); //传值给安卓app方法
					}else{	//苹果端
						WebViewJavascriptBridge.callHandler('toApplyCards1', function(response) { //传值给ios 
							
						});
					}
				}
				
				
				
			}
	    },
	    created () {
	    	this.getStudentDetail();
    		setupWebViewJavascriptBridge(function (bridge) {
    			
    		})
		}
    }
</script>

<style lang="less" scoped>
	.bgf7{
		overflow-x: hidden;
		background-color: #f7f7f7;
	}
	.headers{
		background-color: white;
		width:100%;
		height: .8rem;
		border-bottom: 1px solid #f2f2f2;
		line-height: .8rem;
	}
	.headers>div{
		height: .8rem;
	}
	.headers div{
		display: inline-block;
		vertical-align: top;
	}
	.head-side{
		margin-top: -.05rem;
	}
	.left-item>div:first-child{
		margin-left: .15rem;
	}
	.left-item>div:last-child{
		margin-left: .15rem;
		font-size: .18rem;
	}
	.left-item img{
		width: .45rem;
		height: .45rem;
		border-radius:50% ;
	}
	.right-item{
		float: right;
		margin-right: .15rem;
	}
	.footers{
		background-color: #f7f7f7;
		font-size: .12rem;
		margin: .16rem .17rem .3rem .15rem;
		color: #474747;
		p:nth-child(2){
			margin-top: .1rem;
		}
		p{
			margin-top: .08rem;
		}
	}
	.card-item{
		padding-top: .2rem;
		.card{
			color:#a5a5a5;
		}
		.cardNo{
			height: .35rem;
			margin-top: .1rem;
			span{
				height: .35rem;
				display: inline;
				vertical-align: middle;
			}
			span:last-child{
				margin-left: .1rem;
			}
		}
	}
	.inp{
        box-sizing: border-box;
        border: 1px solid #E5E5E5;
        height: 0.35rem;
        width: 2.63rem;
        font-size: 0.15rem;
        padding-left:0.08rem;
        border-radius: 2px;
        vertical-align: middle;
        -webkit-appearance: none;
        outline: none;
        color: #999;
    }
    .cardsItem{
    	min-height: 3.2rem;
    	padding-left: .15rem;
    	padding-bottom: .1rem;
    	background-color: white;
    	.addCard{
    		width:96%;
    	}
    }
    .tishi{
    	margin-top: .2rem;
    }
    .tishi>p{
    	margin-bottom: .1rem;
    	color: #474747;
    	font-size: .17rem;
    }
    .cards{
    	margin-bottom:.1rem ;
    }
    
    .checkInput{
    	margin-top: .2rem;
    	margin-bottom: .02rem;
    	display: flex;
    	justify-content: space-between;
    	span{
    		display: inline-block;
    		vertical-align: top;
    	}
    	input{
    		border: none;
    		width: 2.45rem;
    		height: .35rem;
    		border: .01rem solid #e5e5e5;
    		padding: 0;
    		outline: none;
    		padding-left: .06rem;
    		font-size: .13rem;
    		color: #999;
    	}
    	span:last-child{
    		margin-left: .12rem;
    		background-color: white;
    		border: 1px solid #e5e5e5;
    		width: .8rem;
    		height: .35rem;
    		text-align: center;
    		line-height: .35rem;
    		color: #474747;
    		font-size: .15rem;
    	}
    }
    .tishis{
    	color: #FF3B30;
    	font-size: .12rem;
    }
</style>