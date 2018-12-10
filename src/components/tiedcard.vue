<template>
    <div class="mainf">
      <div class="margintop-overflow">
        <div class="main header">
            <img class="moren" :src="'http://xatzht.sxxat.com/files/'+studentImg" alt="" v-if="alIMG" >
            <img class="moren" :src="studentImg" alt="" v-if="alIMGs">
            <img src="../assets/img/children.png" class="default">
            <span class="name">{{studentName}}</span>
        </div>
        <div class="main con">
            <p class="title">绑定新卡片</p>
            <div class="mt10">
              <input class="inp kaoqinVal" placeholder="考勤卡" type="number" >
            </div>
        </div>
      </div>
      <a class="tied" @click="confirmBinding()">确定绑定</a>
      <div class="show_msg">
	  	<span class="show_span">请填写申请事由</span>
	  </div>
    </div>
</template>

<script>
    export default {
        name: 'tiedcard',
        data(){
        	return{
        		alIMG:true,
        		alIMGs:false,
        		inputAll:false,
        		studentImg:'',
        		informations:false,
        		bangdingSuccess:false,
        		token: this.$route.params.tiedCards.split(',')[0],
				userId: this.$route.params.tiedCards.split(',')[1],
				os: this.$route.params.tiedCards.split(',')[2]
        	}
        },
        methods:{
        	//从本地存储中取出相关数据
        	cardFun:function(){
        		var student = this.$route.params.tiedCards.split(',')[3]
        		//先根据接口获取到教师端学生信息（家长端已经存本地了）
        		if(student != undefined){	//证明这是教师端
        			this.studentImg = this.$route.params.tiedCards.split(',')[4]
        			this.studentName = this.$route.params.tiedCards.split(',')[5]
        		}else if(student == undefined){	//证明这是家长端
        			this.alIMG=false
        			this.alIMGs = false
        			this.studentImg = localStorage.getItem("studentImg");
        			this.studentName = localStorage.getItem("studentName");
        		}
        		var imgss = this.$route.params.tiedCards.split(',')[4]
        		this.$nextTick(function() {
        			if(student != undefined && imgss == ""){
        				var aa = document.querySelector(".moren")
        				var defaults = document.querySelector(".default")
        				aa.style.display="none"
        				defaults.style.display="inline-block"
        			}
        		})
        	},
        	//确定绑定操作
        	confirmBinding(){
        		var kaoqinVal = document.getElementsByClassName("kaoqinVal")[0].value;
				var studentId = localStorage.getItem("studentId");
				var student = this.$route.params.tiedCards.split(',')[3]
				
				if(kaoqinVal == ""){
					$('.show_span').text("请输入完整信息")
					$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
				}else{
        			//调用教师端绑定方法
        			if(student!=undefined){
        				this.$axios({
						    method: 'post',
						    url: '/student/saveStudent',
						    headers:{
						    	UserID:this.userId,
								Tonken:this.token,
								DeviceID:'',
								OS:this.os
						    },
						    data: {
						      studentId:student,
						      attendanceCardNo:kaoqinVal
						    }
						  }).then((response)=> {
						    console.log(response);
						    if(response.data.code==1){
						    	$('.show_span').text("没有该卡号")
								$(".show_msg").css('bottom', '20%');
								$('.show_msg').hide();
								$('.show_msg').fadeIn(1000);
								$('.show_msg').fadeOut(2000);
						    }else if(response.data.code==2){
						    	$('.show_span').text("该卡号已被绑定")
								$(".show_msg").css('bottom', '20%');
								$('.show_msg').hide();
								$('.show_msg').fadeIn(1000);
								$('.show_msg').fadeOut(2000);
						    }else if(response.data.code==0){
//						    	setTimeout(function(){
//							    	$('.show_span').text("绑定成功")
//									$(".show_msg").css('bottom', '20%');
//									$('.show_msg').hide();
//									$('.show_msg').fadeIn(500);
//									$('.show_msg').fadeOut(1500);
//								},1)	
								
//						    	setTimeout(function(){
						    		if(this.os == 0) {
										window.android.tiedCardss("0"); //传值给安卓app方法
									} else if(this.os == 1) {
										WebViewJavascriptBridge.callHandler('tiedCardsss' , function(response) { //传值给ios app方法
											
										});
									}
//						    	},2200);
						    	
						    }
						  }).catch((error)=> {
						    	console.log(error);
						  });
        			}else{//家长端绑定方法
        				this.$axios({
						    method: 'post',
						    url: '/userHome/bindNewCard',
						    headers:{
						    	UserID:this.userId,
									Tonken:this.token,
									DeviceID:'',
									OS:this.os
						    },
						    data: {
						      studentId:studentId,
						      attenceCard:kaoqinVal
						    }
						  }).then((response)=> {
						    console.log(response);
						    if(response.data.code==1){
						    	$('.show_span').text("没有该卡号")
								$(".show_msg").css('bottom', '20%');
								$('.show_msg').hide();
								$('.show_msg').fadeIn(1000);
								$('.show_msg').fadeOut(2000);
						    }else if(response.data.code==2){
						    	$('.show_span').text("该卡号已被绑定")
								$(".show_msg").css('bottom', '20%');
								$('.show_msg').hide();
								$('.show_msg').fadeIn(1000);
								$('.show_msg').fadeOut(2000);
						    }else if(response.data.code==0){
						    	var params = {
							    	"studentId": studentId
								}
//						    	setTimeout(function(){
//							    	$('.show_span').text("绑定成功")
//									$(".show_msg").css('bottom', '20%');
//									$('.show_msg').hide();
//									$('.show_msg').fadeIn(600);
//									$('.show_msg').fadeOut(1500);
//								},1)	
//						    	setTimeout(function(){
							    	if(this.os == 0) {
										window.android.tiedCards(studentId); //传值给安卓app方法
									} else if(this.os == 1) {
										WebViewJavascriptBridge.callHandler('tiedCardsOS', params , function(response) { //传值给ios app方法
											
										});
									}
//						    	},2200);
						    }
						  }).catch((error)=> {
						    	console.log(error);
						  });
        			}
        			
        		}
        		
        		
        	}
        },
        created (){
        	this.cardFun()
        	setupWebViewJavascriptBridge(function (bridge) {
//	    		
    		})
        }
    }
</script>

<style lang="less" scoped>
    .mainf{
      height: 97%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header{
      margin-top:0.15rem;
      img{
        width: 0.45rem;
        height: 0.45rem;
        border-radius: 50%;
        margin-right:0.11rem;
      }
      .name{
        font-size: 0.17rem;
      }
    }
  .con{
    margin-top:0.29rem;
    .inp{
        box-sizing: border-box;
        border: 1px solid #E5E5E5;
        height: 0.4rem;
        width: 100%;
        font-size: 0.15rem;
        padding-left:0.15rem;
        border-radius: 2px;
        -webkit-appearance: none;
    }
    .mt15{
      margin-top:0.15rem;
    }
    .mt10{
      margin-top:0.15rem;
    }
  }
  .tied{
    display: block;
    width: 3.35rem;
    margin: 0 auto;
    height: 0.5rem;
    background: #0CC5AF;
    text-align: center;
    line-height: 0.5rem;
    color: #ffffff;
    font-size: 0.17rem;
  }
</style>
