<template>
    <div class="bgf7 margintop-overflow" style="background-color: #f7f7f7;">
        <div class="list" v-for="(item , index) in schoolBusApplyList" v-if="have">
            <div class="con">
              <div>
                <img src="../assets/img/parent.png" alt="">
                <span class="name">{{item.userName}}</span>
              </div>
              <div class="mt9"><span class="color999">申请学生：</span>{{item.studentName}}</div>
              <div class="mt4"><span class="color999">所在班级：</span>{{item.className}}</div>
              <div class="mt4"><span class="color999">手&nbsp;机&nbsp;号：</span>{{item.phone}}</div>
              <div class="mt4"><span class="color999">申请时间：</span>{{item.applyTime}}</div>
            </div>
          <div class="footer">
            <a class="noagree" @click="agreeApplyState('3' , item.applyId , item.userId , item.studentId , index)">不同意</a>
            <a class="agree" @click="agreeApplyState('2' , item.applyId , item.userId , item.studentId , index)">同意加入</a>
          </div>
        </div>
        
          <!--缺省-->
	    <div class="quesheng" v-if="haves">
	    	<div>
	    		<img src="../assets/img/notRecord.png" />
	    		<p>暂无申请</p>
	    	</div>
	    </div>
        
        <div class="show_msg">
	  		<span class="show_span">请填写申请事由</span>
	  	</div>
        
    </div>
</template>

<script>
    export default {
        name: 'schoolbusapply',
        data(){
        	return{
        		have:true,
        		haves:false,
        		schoolBusApplyList:[],
        		token: this.$route.params.schoolBusApplys.split(',')[0],
				userId: this.$route.params.schoolBusApplys.split(',')[1],
				groupId: this.$route.params.schoolBusApplys.split(',')[2],
				os: this.$route.params.schoolBusApplys.split(',')[3]
        	}
        },
        methods:{
	    	schoolBusApplyFun:function(){
		      	this.$axios({
				    method: 'post',
				    url: '/schoolbusgroup/getSchoolBusApplyList',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      pageIndex:"0",
				      pageSize:"60",
				      groupId:this.groupId
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	this.schoolBusApplyList = response.data.data;
				    	if(this.schoolBusApplyList.length == 0){
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
		      agreeApplyState:function(index , applyId , userId , studentId , indexId){
		      	console.log(indexId)
		      	if(index == 2){
		      		$('.show_span').text("已同意加入")
					$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
		      	}else if(index == 3){
		      		$('.show_span').text("未同意加入")
					$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
		      	}
		      	this.$axios({
				    method: 'post',
				    url: '/schoolbusgroup/updateSchoolBusApply',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      applyId:applyId,
				      applyStatus:index,
				      groupId:this.groupId,
				      userId:userId,
				      studentId:studentId
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	console.log("成功啦")
				    	this.schoolBusApplyList.splice(indexId, 1)
				    }
				  }).catch((error)=> {
				    	console.log(error);
				  });
		      	
		      }
	    },
	    created () {
    		this.schoolBusApplyFun()
		}
    }
</script>

<style lang="less" scoped>
.list{
  box-sizing: border-box;
  width: 3.55rem;
  height:2.17rem ;
  margin: 0 auto;
  border: 1px solid #e6e6e6;
  background: #ffffff;
  margin-top:0.13rem;
  .con{
    width: 3.3rem;
    margin: 0 auto;
    margin-top:0.14rem;
    img{
      width:0.35rem ;
      height:0.35rem ;
      border-radius: 50%;
    }
    .name{
      font-size: 0.17rem;
      margin-left:0.05rem;
    }
    .color999{
      color: #999999;
      .hid{
        visibility: hidden;
      }
    }
    .mt9{
      margin-top:0.09rem;
    }
    .mt4{
      margin-top:0.05rem;
    }
  }
  .footer{
    width: 3.15rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top:0.15rem;
    padding-bottom: .15rem;
    a{
      box-sizing: border-box;
      width: 1.45rem;
      height: 0.38rem;
      text-align: center;
      line-height:0.38rem;
      color: #ffffff;
      border-radius: 2px;
      background: #0CC5AF;
    }
    .noagree{
      color: #999999;
      background: #ffffff;
      border: 1px solid #D9D9D9;
    }
  }
}
.notAllowed , .allowed{
	color: white;
}

</style>
