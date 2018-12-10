<template>
    <div>
	    	<!--家长申请相关数据接口-->
	    	<div v-if="show">
		        <div class="main header" @click="newApply(0 , '')">
		            <div>
		              <img src="../assets/img/applytab.png" alt="">
		              <span class="newapply" id="newapply">新申请</span>
		            </div>
		            <img class="rightjt" src="../assets/img/rightjt.png" alt="">
		        </div>
		        <div class="height10"></div>
		        <div class="myapplyf">
		            <div class="main myapply">我的申请</div>
		        </div>
		        
		        <div class="list borBottom"  v-if="have">
		          <div class="main itemss" v-for="items in applyLists" @click="newApply(1 , items.applyId)">
		              <p class="ptitle">{{items.content}}</p>
		              <div class="mt14">
		                  <span>申请学生：</span>{{items.studentName}}
		              </div>
		              <div class="mt4">
		                  <span>申请原因：</span><span v-if="items.applyReason=='0'">请假</span>
		              </div>
		              <div class="wait">
		              	<div class="left-side">
			                <div v-if="items.applyStatus == '0'">
			                  <img src="../assets/img/wait.png" alt="">
			                  <span class="pf">申请中</span>
			                </div>
			                <div v-else-if="items.applyStatus == '1'">
			                  <img src="../assets/img/waitblue.png" alt="">
			                  <span class="agree">同意</span>
			                </div>
			                <div v-else-if="items.applyStatus == '2'">
			                  <img src="../assets/img/waitgrey.png" alt="">
			                  <span class="chehui">不同意</span>
			                </div>
			                <div v-else-if="items.applyStatus == '3'">
			                  <img src="../assets/img/waitorange.png" alt="">
			                  <span class="noagree">已撤回</span>
			                </div>
		              	</div>
		              	<div class="right-side">
		              		<span style="color: #B7B7B7;font-size: 0.13rem;">{{items.applyTime.substring(5 , 16)}}</span>
		              	</div>
		              </div>
		          </div>
		        </div>	
		        <!--缺省部分-->
		    	<div class="quesheng" v-else>
		        	<div>
		        		<img src="../assets/img/notApply.png" />
		        		<p>暂无申请</p>
		        	</div>
		        </div> 
		        
	    	</div>
	    	
			<!--教师申请相关数据接口-->
	    	<div v-else>
		        <div class="main header" @click="newApply(0 , '')">
		            <div>
		              <img src="../assets/img/applytab.png" alt="">
		              <span class="newapply" id="newapply">新申请</span>
		            </div>
		            <img class="rightjt" src="../assets/img/rightjt.png" alt="">
		        </div>
		        <div class="height10"></div>
		        <div class="myapplyf">
		            <div class="main myapply">我的申请</div>
		        </div>
		        
		        <div class="list borBottom" v-if="have">
		          <div class="main itemss" v-for="item in applyList" @click="newApply(1 , item.applyId )">
		              <p class="ptitle">{{item.content}}</p>
		              <div class="mt4">
		                  <span>申请原因：</span><span v-if="item.applyType=='0'">请假</span>
		              </div>
		              <div class="wait">
		              	<div class="left-side">
			                <div v-if="item.applyStatus == 0">
			                  <img src="../assets/img/wait.png" alt="">
			                  <span class="pf">申请中</span>
			                </div>
			                <div v-else-if="item.applyStatus == 1">
			                  <img src="../assets/img/waitblue.png" alt="">
			                  <span class="agree">同意</span>
			                </div>
			                <div v-else-if="item.applyStatus == 2">
			                  <img src="../assets/img/waitgrey.png" alt="">
			                  <span class="chehui">不同意</span>
			                </div>
			                <div v-else-if="item.applyStatus == 3">
			                  <img src="../assets/img/waitorange.png" alt="">
			                  <span class="noagree">已撤回</span>
			                </div>
		              	</div>
		              	<div class="right-side">
		              		<span style="color: #B7B7B7;font-size: 0.13rem;">{{item.applyTime}}</span>
		              	</div>
		              </div>
		          </div>
		        </div>
		        
		       <!--缺省部分-->
		    	<div class="quesheng" v-else>
		        	<div>
		        		<img src="../assets/img/notApply.png" />
		        		<p>暂无申请</p>
		        	</div>
		        </div> 
		        
		        
	    	</div>
    	
    </div>
</template>

<script>
    export default {
        name: 'applylist',
        data(){
        	return{
        		have:true,
        		applyList:[],
        		applyLists:[],
        		token:this.tokens,
        		userId:this.userId,
        		applyStudentId:this.applyStudentId,
        		studentName:this.studentname,
        		teacherId:this.teacherId,
        		teacherName:this.teacherName,
        		os:this.os,
        		type:this.type,
        		show:true
        	}
        },
        methods:{
	    	applyListFun:function(){
	    		var route = this.$route.params.applyParam
	    		//截取token
	    		var tokens = route.substring(route.indexOf('token=')+6, route.indexOf('userid=')-1);
	    		//截取userId
	    		var userId = route.substring(route.indexOf('userid=')+7, route.indexOf('studentid=')-1);
	    		//截取applyStudentId
	    		var applyStudentId = route.substring(route.indexOf('studentid=')+10, route.indexOf('studentname=')-1);
	    		//截取studentname
	    		var studentname = route.substring(route.indexOf('studentname=')+12, route.indexOf('headmasterid=')-1);
	    		//截取teacherId
	    		var teacherId = route.substring(route.indexOf('headmasterid=')+13, route.indexOf('headmastername=')-1);
	    		//截取teacherName
	    		var teacherName = route.substring(route.indexOf('headmastername=')+15, 15);
	    		//截取os
	    		var os =route.substr(-3 , 1);
	    		//截取type
	    		var type = route.charAt(route.length-1);
	    		
	    		if(type == 0){
	    			console.log("教师端的请求返回结果");
	    			this.show = false
	    			//教师端的数据请求
	    			this.$axios({
					    method: 'post',
					    url: '/apply/getMyApplyList',
					    headers:{
					    	UserID:userId,
							Tonken:tokens,
							DeviceID:'',
							OS:os
					    },
					    data:{
					    	pageIndex:"0",
					    	pageSize:"100"
					    }
					  }).then((response)=> {
					  	console.log(response);
					    if(response.data.code==0){
					    	this.applyList = response.data.data;
					    	if(this.applyList.length != 0){
					    		this.have = true
					    	}else{
					    		this.have = false
					    	}
					    }
					  }).catch((error)=> {
					    console.log(error);
					  });
	    		}else if(type == 1){
	    			//家长端的数据请求
	    			console.log("家长端的请求返回结果");
	    			this.show = true;
	    			this.$axios({
					    method: 'post',
					    url: '/userHome/getStudentApply',
					    headers:{
					    	UserID:userId,
							Tonken:tokens,
							DeviceID:'',
							OS:os
					    },
					    data: {
					    	applyStudentId:applyStudentId
					    }
					  }).then((response)=> {
					  	console.log(response);
					    if(response.data.code==0){
					    	this.applyLists = response.data.data;
					    	if(this.applyLists.length != 0){
					    		this.have = true
					    	}else{
					    		this.have = false
					    	}
					    }
					  }).catch((error)=> {
					     console.log(error);
					  });
	    		}
	    		
		     },
		     //点击新申请或进到申请详情里
		     newApply:function(index , id){
		     	var route = this.$route.params.applyParam
	    		//截取token
	    		var tokens = route.substring(route.indexOf('token=')+6, route.indexOf('userid=')-1);
	    		//截取userId
	    		var userId = route.substring(route.indexOf('userid=')+7, route.indexOf('studentid=')-1);
	    		//截取applyStudentId
	    		var applyStudentId = route.substring(route.indexOf('studentid=')+10, route.indexOf('studentname=')-1);
	    		//截取studentname
	    		var studentname = route.substring(route.indexOf('studentname=')+12, route.indexOf('headmasterid=')-1);
	    		//截取teacherId
	    		var teacherId = route.substring(route.indexOf('headmasterid=')+13, route.indexOf('headmastername=')-1);
	    		//截取teacherName
	    		var teacherName = route.substring(route.indexOf('headmastername=')+15, 15);
	    		//截取os
	    		var os =route.substr(-3 , 1);
	    		//截取type
	    		var type = route.charAt(route.length-1);
		     	
		     	//判断点击的是新申请还是修改申请
		     	if(index == 0){		//新申请
		     		localStorage.setItem("applys", "");
		     		if(os == 0){
		     			window.android.applyFun1(index);//传值给安卓app方法
		     		}else{
			     		WebViewJavascriptBridge.callHandler('applyFunNew', function (response) {
			     			
					    });
		     		}
		     	}else{		//进入详情
		     		localStorage.setItem("applys", id);
		     		if(os == 0){
		     			window.android.applyFun1(id);//传值给安卓app方法
		     		}else{
			     		WebViewJavascriptBridge.callHandler('applyFunDetail', id , function (response) {//传值给ios app方法,params是参数
					       
					    });
		     		}
		     		
		     	}
				
		     }
		     
	    },
	    
	    created () {
    		this.applyListFun()
    		//页面初始化交互方法
    		setupWebViewJavascriptBridge(function (bridge) {
//	    		
    		})
    		
		}
    }
</script>

<style lang="less" scoped>
  .header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.6rem;
      .newapply{
        font-size: 0.17rem;
        margin-left:0.1rem;
      }
      .rightjt{
        width: 0.07rem;
        height: 0.11rem;
      }
      img{
          width: 0.36rem;
          height: 0.36rem;
      }
  }
  .myapplyf{
    border-bottom:.002rem solid #e6e6e6;
    height:0.44rem;
    display: flex;
    align-items: center;
    .myapply{
      box-sizing: border-box;
      border-left:4px solid #FFB21F;
      height: 0.15rem;
      line-height:0.15rem;
      padding-left:0.05rem;
    }
  }
  .list{
    border-bottom:1px solid #d0d0d0;
    .ptitle{
      margin-top:0.13rem;
      font-size: 0.17rem;
    }
    .mt14{
      margin-top:0.14rem;
      span{
        color: #999999;
      }
    }
    .mt4{
      margin-top:0.04rem;
      span{
        color: #999999;
      }
    }
    .wait{
      margin-top:0.09rem;
      padding-bottom:0.13rem;
      img{
        width: 0.17rem;
        height: 0.17rem;
      }
      .pf{
        color: #0CC5AF;
      }
      .agree{
        color: #3383FB;
      }
      .noagree{
        color: #FFB21F;
        font-size: .14rem;
      }
      .chehui{
        color: #999999;
      }
    }
  }
  
  .wait>div{
  	display: inline-block;
  }
  .right-side{
  	float: right;
  }
  #applyID{
  	display: none;
  }
  .borBottom{
  	border-bottom:1px solid #f5f5f5 ;
  }
  .quesheng>div{
  	margin-top: 40%;
  }
  .itemss{
  	border-bottom:1px solid #f5f5f5;
  }
  .itemss:last-child{
  	border: none;
  }
</style>
