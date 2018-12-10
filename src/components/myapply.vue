<template>
    <div class="bgf7 margintop-overflow">
    	
      <div class="list" v-if="have">
        <div class="main" v-for="item in applyLists">
          <p class="ptitle">{{item.content}}</p>
          <div class="mt14">
            <span>申请学生：</span>{{item.studentName}}
          </div>
          <div class="mt4">
            <span>申请原因：</span>{{item.applyReason}}
          </div>
          <div class="wait">
            <div v-if="item.applyStatus== 0">
              	<img src="../assets/img/wait.png" alt="">
              	<span class="pf">等待批复</span>
            </div>
            <div v-else-if="item.applyStatus== 1">
	            <img src="../assets/img/waitblue.png" alt="">
	            <span class="agree">已同意</span>
            </div>
            <div v-else-if="item.applyStatus== 2">
	            <img src="../assets/img/waitgrey.png" alt="">
	            <span class="chehui">已撤回</span>
            </div>
            <div v-else-if="item.applyStatus== 3">
	            <img src="../assets/img/waitorange.png" alt="">
	            <span class="noagree">老师未同意此次申请</span>
            </div>
            
          </div>
        </div>
      </div>
      
      <!--缺省-->
        <div class="quesheng" v-else>
        	<div>
        		<img src="../assets/img/notApply.png" />
        		<p>暂无申请</p>
        	</div>
        </div>
      
    </div>
</template>

<script>
    export default {
        name: 'myapply',
        data(){
        	return{
        		have:true,
        		applyLists:[],
        		token: this.$route.params.myApplys.split(',')[0],
				userId: this.$route.params.myApplys.split(',')[1],
				os: this.$route.params.myApplys.split(',')[2]
        	}
        },
       methods:{
			myyApplyLists:function(){
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
	    created () {
    		this.myyApplyLists()
		}
    }
</script>

<style lang="less" scoped>
    .list{
        box-sizing: border-box;
        width: 3.55rem;
        margin: 0 auto;
        background: #ffffff;
        border:1px solid #F1F1F1;
        margin-top:0.12rem;
      .main{
        width: 3.25rem;
        .ptitle{
          font-size: 0.17rem;
          margin-top:0.13rem;
        }
        .mt14{
          margin-top:0.12rem;
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
            width: 0.19rem;
            height: 0.19rem;
          }
          .pf{
            color: #0CC5AF;
          }
          .agree{
            color: #3383FB;
          }
          .noagree{
            color: #FFB21F;
          }
          .chehui{
            color: #999999;
          }
        }
      }
    }
</style>
