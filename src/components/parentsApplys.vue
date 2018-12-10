<template>
	<div>
		<div class="list borBottom"  v-for="items in parentsApplyLists" v-show="have">
          <div class="main" @click="returnDetail(items.applyId)">
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
	                  <span class="pf">等待批复</span>
	                </div>
	                <div v-else-if="items.applyStatus == '1'">
	                  <img src="../assets/img/waitblue.png" alt="">
	                  <span class="agree">已同意</span>
	                </div>
	                <div v-else-if="items.applyStatus == '2'">
	                  <img src="../assets/img/waitgrey.png" alt="">
	                  <span class="chehui">老师未同意此次申请</span>
	                </div>
	                <div v-else>
	                  <img src="../assets/img/waitgrey.png" alt="">
	                  <span class="chehui">已撤回</span>
	                </div>
              	</div>
              	<div class="right-side">
              		<span style="color: #B7B7B7;font-size: 0.13rem;">{{items.applyTime}}</span>
              	</div>
              </div>
          </div>
        </div>	
        
        <!--缺省部分-->
    	<div class="quesheng" v-show="haves">
        	<div>
        		<img src="../assets/img/notApply.png" />
        		<p>暂无申请</p>
        	</div>
        </div> 
        
        
	</div>
</template>

<script>
	export default{
		 name: 'parentsApplys',
		 data(){
		 	return{
		 		have:false,
		 		haves:false,
		 		parentsApplyLists:[],
		 		token: this.$route.params.parentsApplyss.split(',')[0],
				userId: this.$route.params.parentsApplyss.split(',')[1],
				os: this.$route.params.parentsApplyss.split(',')[2]
		 	}
		 },
		 methods:{
		 	applyListFun:function(){
			 	this.$axios({
				    method: 'post',
					    url: '/userMine/getMineApply',
					    headers:{
					    	UserID:this.userId,
							Tonken:this.token,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					    	userId:this.userId
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	this.parentsApplyLists = response.data.data;
					    	//缺省提示
					    	if(this.parentsApplyLists.length == 0){
					    		this.have = false
					    		this.haves = true
					    	}else{
					    		this.have = true
					    		this.haves = false
					    	}
					    }
					  }).catch((error)=> {
					    console.log(error);
					  });
		 	},
		 	returnDetail:function(id){
		 		console.log(id)
		 		if(this.os == 0){
	     			window.android.applyFun1(id);//传值给安卓app方法
	     		}else{
		     		WebViewJavascriptBridge.callHandler('applyFunDetail', id , function (response) {//传值给ios app方法,params是参数
				       console.log(response)
				    });
	     		}
		 	}
		 },
		 created(){
		 	this.applyListFun()
		 	setupWebViewJavascriptBridge(function (bridge) {
//	    		
    		})
		 }
	}
</script>

<style lang="less" scoped>
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
  	border-bottom:1px solid #f0f0f0 ;
  }
</style>