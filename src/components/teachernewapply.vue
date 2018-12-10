<template>
  <div class="mainf">
    <div>
      <div class="main">
        <div class="applytype">
          <p>申请类型：</p>
          <select class="sel" style="color: #999999">
            <option value="0">请假</option>
          </select>
        </div>
        <div class="height1"></div>
      </div>
      <div class="main">
        <p class="reason">申请事由</p>
        <textarea placeholder="请输入申请事由" class="applyContent" maxlength="140">{{contentss}}</textarea>
        <div class="applyteacher">
          <div class="applyteachername">
            <span>审批老师</span>
            <img src="../assets/img/teacher.png" alt="">
            <span class="masterName">{{schoolMasterName}}</span>
          </div>
          <span class="chooseMaster" @click="chooseMaster()">选择审批人></span>
        </div>
      </div>
    </div>
    <a class="vote" @click="teacherNewApplyFun()">提交申请</a>
    
	  <div class="show_msg">
	  	<span class="show_span">请填写申请事由</span>
	  </div>
	  
  </div>
</template>

<script>
	import $ from 'jquery'
  export default {
    name: 'teachernewapply',
    data(){
      return{
				teacherNewApplyList:[],
				token: this.$route.params.teacherNewApplys.split(',')[0],
				userId: this.$route.params.teacherNewApplys.split(',')[1],
				schoolMasterId: this.$route.params.teacherNewApplys.split(',')[2],
				schoolMasterName: this.$route.params.teacherNewApplys.split(',')[3],
				os: this.$route.params.teacherNewApplys.split(',')[4]
      }
    },
    
    methods:{
	    	teacherNewApplyFun:function(){
	    			var a = document.querySelector(".masterName").innerHTML
	    			console.log(a)
	    			if(a == ""){
								$('.show_span').text("请选择审批老师")
								$(".show_msg").css('bottom', '20%');
								$('.show_msg').hide();
								$('.show_msg').fadeIn(1000);
								$('.show_msg').fadeOut(2000);
	    			}else{
		    			var masterId = localStorage.getItem("masterId")
		    			var applyType = document.getElementsByClassName("sel")[0].value;
		    			var applyVal = document.getElementsByClassName("applyContent")[0].value;
		    			console.log(applyVal)
		    			if(applyVal == ""){
		    					$(".show_msg").css('bottom', '20%');
									$('.show_msg').hide();
									$('.show_msg').fadeIn(1000);
									$('.show_msg').fadeOut(2000);
		    			}else{
			    				this.$axios({
								    method: 'post',
								    url: '/apply/saveTeacherApply',
								    headers:{
								    	UserID:this.userId,
											Tonken:this.token,
											DeviceID:'',
											OS:this.os
								    },
								    data: {
								    	applyType:applyType,
								    	content:applyVal,
								    	replyUserID:this.schoolMasterId
								    }
								  }).then((response)=> {
								    console.log(response);
								    if(response.data.code==0){
								    	this.contentss = ""
								    	
								    	if(this.os == 0){
							      		window.android.returnApplyLists("0"); //传值给安卓app方法
							      	}else{
							      		WebViewJavascriptBridge.callHandler('returnApplysList', function(response) { //传值给ios app方法,params是参数
							      			
												});
							      	}
								    	
								    }
								  }).catch((error)=> {
								    console.log(error);
								  });
		    			}
	    			}
	    			
		      },
		      //跳到选择审批人页面
		      chooseMaster:function(){
		      	var applyVal = document.getElementsByClassName("applyContent")[0].value;
		      	var applyContents = localStorage.setItem("applyContents" , applyVal)
		      	
		      	if(this.os == 0){
		      		window.android.toMasters("0"); //传值给安卓app方法
		      	}else{
		      		WebViewJavascriptBridge.callHandler('chooseMasters', function(response) { //传值给ios app方法,params是参数
		      			
							});
		      	}
		      	
		      }
	    },
	    
	    created () {
	    	//在接收传过来的值之后，存储,方便调用
	    	localStorage.setItem("masterId" , this.schoolMasterId);
	    	localStorage.setItem("masterName" , this.schoolMasterName);
	    	this.contentss = localStorage.getItem("applyContents")
	    	if(this.contentss == null || this.contentss == undefined){
	    		this.contentss =""
	    	}else{
	    		this.contentss = this.contentss
	    		localStorage.clear("applyContents")
	    	}
	    	setupWebViewJavascriptBridge(function (bridge) {
	    		
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
  .applytype{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.49rem;
    line-height:0.49rem;
    img{
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      margin-right:0.04rem;
    }
    .sel{
      /*去除select默认样式start*/
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
      /*去除select默认样式end*/
      background: url("../assets/img/bottom.png") no-repeat scroll right center transparent;
      background-size:0.12rem 0.07rem;
      padding-right:0.21rem;
      border: none;
      outline: none;
      font-size: 0.15rem;
      color: #474747;
    }
  }
  .vote{
    width: 3.35rem;
    height: 0.5rem;
    background: #0CC5AF;
    text-align: center;
    line-height: 0.5rem;
    color: #ffffff;
    font-size: 0.17rem;
    position: relative;
    bottom: .2rem;
    left: .2rem;
  }
  .height1{
    width: 3.6rem;
    height: 1px;
    background: #F9F9F9;
  }
  .reason{
    height: 0.49rem;
    line-height:0.49rem;
    margin-top:0.05rem;
  }
  textarea{
    box-sizing: border-box;
    width: 3.45rem;
    height:1.54rem;
    border: none;
    background: #F7F7F7;
    padding-top: 0.1rem;
    padding-left:0.1rem;
    resize: none;
    outline: none;
    font-size: 0.13rem;
  }
  .applyteacher{
    display: flex;
    align-items: center;
    margin-top:0.2rem;
    justify-content: space-between;
    .applyteachername{
      img{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        margin-right:0.01rem;
        margin-left:0.2rem;
      }
    }
    .chooseMaster{
    	color: #a0a0a0;
    	font-size:.14rem;
    	margin-bottom: .05rem;
    }
  }

</style>
