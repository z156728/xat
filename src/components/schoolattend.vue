<template>
	<div>
	    <div class="margintop-overflow bgf7" v-if="have" style="background-color: #f7f7f7;">
	        <div class="content margintop-overflow" v-for="item in DeviceRecordLists"  >
	          <div class="content2" @click="watchDetail(item.deviceRecordId)">
	              <p class="p1">在校考勤</p>
	              <div class="time">时间：<span>{{item.dateTime}}</span></div>
	              <div class="area">考勤地点：<span>{{item.addressType}}</span></div>
	              <p class="seeDetail">查看详情></p>
	          </div>
	        </div>
        </div>
        <!--缺省-->
        <div class="quesheng" v-else>
        	<div>
        		<img src="../assets/img/notRecord.png" />
        		<p>暂无记录</p>
        	</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'schoolattend',
        data(){
        	return{
        		have:true,
        		DeviceRecordLists:[],
        		token:this.$route.params.attends.split(',')[0],
        		userId:this.$route.params.attends.split(',')[1],
        		studentId:this.$route.params.attends.split(',')[2],
        		os:this.$route.params.attends.split(',')[3]
        	}
        },
        
		methods:{
	    	schoolAttendFun:function(){
    			//教师端
    			this.$axios({
				    method: 'post',
				    url: '/class/getDeviceRecordByStudentId',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      studentId:this.studentId
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	this.DeviceRecordLists = response.data.data;
				    	if(this.DeviceRecordLists.length != 0){
				    		this.have = true
				    	}else{
				    		this.have = false
				    	}
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
		      },
		      watchDetail:function(id){
		      	if(this.os == 0) {
					window.android.attendsDetail(id); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('attendsDetails' ,id, function(response) { //传值给ios app方法
						
					});
				}
		      }
	    },
	    created () {
    		this.schoolAttendFun()
    		//初始化交互方法
	    	setupWebViewJavascriptBridge(function (bridge) {
    		
    		})
		}
    }
</script>

<style lang="less" scoped>
  .content{
    width: 3.53rem;
    height: 1.25rem;
    margin: 0 auto;
    background: #FFFFFF;
    margin-top:0.13rem;
    border: 1px solid #e6e6e6;
    .content2{
      width: 3.25rem;
      margin: 0 auto;
      .p1{
        color: #0CC5AF;
        font-size: 0.19rem;
        margin-top:0.12rem;
      }
      .p2{
        margin-top:0.09rem;
      }
      .time,.area{
        margin-top:0.04rem;
      }
      .seeDetail{
        color: #999999;
        font-size: 0.13rem;
        margin-top:0.05rem;
      }
    }
  }

</style>
