<template>
    <div class="mainf">
      <div>
        <div class="main">
            <p class="title">申请学生：</p>
            <div class="name">
            	<span v-if="applyStudent">
	                <img :src="'http://xatzht.sxxat.com/files/'+paysMent.studentHeadImg" alt="">
            	</span>
            	<span v-else>
	                <img src="../assets/img/children.png" alt="">
            	</span>
                <span style="margin-left: .11rem;">{{paysMent.studentName}}</span>
            </div>
          <p class="title" style="margin-top:0.2rem;">补卡费用：</p>
          <div class="con" style="margin-top:0.09rem;">
              <p>补卡费用：</p>
              <p>{{paysMent.totalPrice}}元/人</p>
          </div>
          <div class="con" style="margin-top:0.04rem;">
              <p>人数：</p>
              <p>1人</p>
          </div>
          <div class="con1">
              <p>总计：</p>
              <p class="price">{{paysMent.totalPrice}}元</p>
          </div>
          <p class="title" style="margin-top:0.2rem;">付费方式：</p>
          <div @click="check(0)" class="type" v-bind:class="{typeactive:0==isactive}">
              <div>
                <img src="../assets/img/wechat.png" alt="">
                <span>微信支付</span>
              </div>
              <i></i>
          </div>
          <div @click="check(1)" class="type" v-bind:class="{typeactive:1==isactive}">
              <div>
                <img src="../assets/img/zhifubao.png" alt="">
                <span>支付宝支付</span>
              </div>
              <i></i>
          </div>
        </div>
      </div>
      <a class="apply" @click="applyNow()">立即申请</a>
      
      <div class="show_msg">
	  	<span class="show_span">请选择付款方式</span>
	  </div>
      
    </div>
</template>

<script>
    export default {
        name:'applysupplecard',
        data (){
          return{
          	applyStudent:true,
            isactive:-1,
            paysMent:[],
            token: this.$route.params.applySuppleCard.split(',')[0],
			userId: this.$route.params.applySuppleCard.split(',')[1],
			os: this.$route.params.applySuppleCard.split(',')[2]
          }
        },
      methods:{
        check:function (index) {
          this.isactive=index;
        },
        //从本地存储获取学校id，学生id和班级id，用来调模板费用接口，和用来提交申请
        cardFun:function(){
    		this.studentId = localStorage.getItem("studentId");
    		this.schoolId = localStorage.getItem("schoolId");
    		this.classId = localStorage.getItem("classId");
    		//请求费用接口
    		this.$axios({
			    method: 'post',
			    url: '/userHome/getMouldPrice',
			    headers:{
			    	UserID:this.userId,
					Tonken:this.token,
					DeviceID:'',
					OS:this.os
			    },
			    data: {
			      schoolId:this.schoolId,
			      studentId:this.studentId,
			      type:"1"
			    }
			  }).then((response)=> {
			    console.log(response);
			    if(response.data.code==0){
			    	this.paysMent = response.data.data;
			    	this.paysMoney = response.data.data.totalPrice
			    	this.studentImgss = response.data.data.studentHeadImg
			    	if(this.studentImgss == ""){
			    		this.applyStudent = false
			    	}else{
			    		this.applyStudent = true
			    	}
			    	
			    }
			  }).catch((error)=> {
			    console.log(error);
			  });
    		
    	},
    	applyNow:function(){
    		if(this.isactive == -1){
    			$(".show_msg").css('bottom', '20%');
				$('.show_msg').hide();
				$('.show_msg').fadeIn(1000);
				$('.show_msg').fadeOut(2000);
    		}else{
    			this.$axios({
				    method: 'post',
				    url: '/userHome/immediateApply',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      classId:this.schoolId,
				      studentId:this.studentId,
				      userId:this.userId,
				      totalAmount:this.paysMoney.toString()
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	var studentApplyId = response.data.data.studentApplyId;
				    	var totalAmount = response.data.data.totalAmount;
				    	var params = studentApplyId +","+ this.paysMoney +","+ this.isactive+","+this.studentId
				    	
				    	console.log(params)
				    	var param = {
				    		"studentApplyId":studentApplyId.toString(),
				    		"paysMoney":this.paysMoney.toString(),
				    		"payType":this.isactive.toString(),
				    		"studentId":this.studentId.toString()
				    	}
				    	if(this.os == 0){
				    		window.android.paysMoment(params); //传值给安卓app方法
				    	}else{
				    		console.log(param)
				    		WebViewJavascriptBridge.callHandler('payMoments', param  , function(response) { //传值给ios app方法
										
							});
				    	}
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
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
    display: flex;
    flex-direction: column;
    height: 97%;
    justify-content: space-between;
  }
    .title{
        color: #999999;
        margin-top:0.2rem;
    }
    .name{
        margin-top:0.15rem;
        padding-bottom:.2rem ;
        border-bottom: 1px solid #f5f5f5;
        img{
          width:0.45rem;
          height: 0.45rem;
          border-radius: 50%;
        }
        span{
          font-size: 0.17rem;
        }
    }
  .con{
      display:flex;
      justify-content: space-between;
      font-size: 0.17rem;
  }
  .con1{
    display:flex;
    justify-content: space-between;
    font-size: 0.21rem;
    margin-top: 0.18rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #f5f5f5;
    .price{
      color: #FB4E44;
    }
  }
  .type{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.17rem;
    margin-top:0.15rem;
    img{
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.05rem;
    }
    i{
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      background: url("../assets/img/unsel1.png") no-repeat;
      background-size: 0.2rem auto;
    }
  }
  .typeactive{
    i{
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      background: url("../assets/img/sel.png") no-repeat;
      background-size: 0.2rem auto;
    }
  }
  .apply{
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
