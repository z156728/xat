<template>
    <div class="margintop-overflow bgf7">
        <div class="list" v-if="have">
          <div class="con" v-for="item in resultQueryList" @click="scoreDetail(item.examinationName , item.publishTime , item.achievementId)">
            <div>
              <p class="name">{{item.examinationName}}</p>
              <div style="margin-top:0.08rem;">{{item.className}}&nbsp;&nbsp;&nbsp;班主任：{{item.teacherName}}</div>
              <div class="time">{{item.publishTime}}发布</div>
            </div>
            <div><img src="../assets/img/right2.png" alt=""></div>
          </div>
        </div>
        
        <!--缺省-->
        <div class="quesheng" v-else>
        	<div>
        		<img src="../assets/img/notRecord.png" />
        		<p>暂未发布成绩</p>
        	</div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name : 'resultquery',
        data (){
        	return{
        		have:true,
        		resultQueryList:[],
        		token: this.$route.params.resultQuerys.split(',')[0],
				userId: this.$route.params.resultQuerys.split(',')[1],
				studentId: this.$route.params.resultQuerys.split(',')[2],
				classId: this.$route.params.resultQuerys.split(',')[3],
				os: this.$route.params.resultQuerys.split(',')[4]
        	}
        },
        methods:{
	    	applyDetail:function(){
		      	this.$axios({
				    method: 'post',
				    url: '/userHome/getAchievementList',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      studentId:this.studentId,
				      classId:this.classId
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	this.resultQueryList = response.data.data;
				    	if(this.resultQueryList.length == 0){
				    		this.have = false
				    	}
				    }
				  }).catch((error)=> {
				    	console.log(error);
				  });
		    },
		    //点击到成绩详情界面
		    scoreDetail:function(examName , publishTime , id){
		    	localStorage.setItem("examName" , examName)
		    	localStorage.setItem("publishTime" , publishTime)
		    	if(this.os == 0) {
					window.android.resultDetailADFun(id); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('resultDetailFun', id , function(response) { //传值给ios app方法,params是参数
						
					});
				}	
		    }
	    },
	    created () {
    		this.applyDetail()
    		setupWebViewJavascriptBridge(function (bridge) {
//	    		
    		})
		}
    }
</script>

<style lang="less" scoped>
.bgf7{
	background-color: #f7f7f7;
}
.list{
  box-sizing: border-box;
  width: 3.53rem;
  height: 1.15rem;
  margin: 0 auto;
  margin-top:0.12rem;
  .con{
  	background: #ffffff;
  	border: 1px solid #E5E5E5;
    width: 3.4rem;
    margin:.2rem auto;
    display: flex;
    padding: .07rem;
    justify-content: space-between;
    align-items: center;
    img{
      width: 0.09rem;
      height: 0.16rem;
    }
    .name{
      font-weight: bold;
      font-size: 0.17rem;
      margin-top:0.15rem;
    }
    .time{
      color: #999999;
      margin-top:0.09rem;
      font-size: 0.13rem;
    }
  }
}
.con:last-child{
	margin-bottom: .2rem;
}
</style>
