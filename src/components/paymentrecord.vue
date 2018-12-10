<template>
    <div class="bgf7">
      <div class="list"  v-for="item in payLists" v-show="have">
        <div class="con">
          <p class="name">{{item.studentName}}</p>
          <div class="comdiv"><span>缴费时间：</span>{{item.payTime}}</div>
          <div class="comdiv"><span>缴费用户：</span>{{item.studentName}}</div>
          <div class="comdiv"><span>缴费金额：</span>{{item.payAmount}}</div>
          <div class="comdiv"><span>使用截止时间：</span>{{item.useEndTime}}</div>
          <div class="comdiv"><span>付费单号：</span>{{item.payCode}}</div>
        </div>
      </div>
      <!--缺省-->
	    <div class="quesheng" v-show="haves">
	    	<div>
	    		<img src="../assets/img/notRecord.png" />
	    		<p>暂无记录</p>
	    	</div>
	    </div>
      
    </div>
</template>

<script>
    export default {
        name: 'paymentrecord',
        data(){
        	return{
        		have:false,
        		haves:false,
        		payLists:[],
        		token:this.$route.params.prama.split(',')[0],
        		UserID:this.$route.params.prama.split(',')[1],
        		os:this.$route.params.prama.split(',')[2],
        	}
        },
        methods:{
	    	payListFun:function(){
		      	this.$axios({
				    method: 'post',
				    url: '/userMine/getPayRecord',
				    headers:{
				    	UserID:this.UserID,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				    	userId:this.UserID
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	this.payLists = response.data.data;
				    	if(this.payLists.length == 0){
				    		console.log("数据长度为0")
				    		this.have = false
				    		this.haves = true
				    	}else{
				    		console.log("数据长度不")
				    		this.have = true
				    		this.haves = false
				    	}
				    	
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
		     }
	    },
	    
	    created () {
    		this.payListFun();
		}
    }
</script>

<style lang="less" scoped>
.list{
  box-sizing: border-box;
  width: 3.53rem;
  border: 1px solid #f0f0f0;
  margin: 0 auto;
  background: #ffffff;
  margin-top:0.12rem;
  padding-bottom:0.12rem;
  .con{
    width: 3.25rem;
    margin: 0 auto;
    .name{
      font-size: 0.17rem;
      color: #0CC5AF;
      margin-top:0.13rem;
      margin-bottom:0.1rem;
    }
    .comdiv{
      margin-top:0.05rem;
      span{
        color: #999999;
      }
    }
  }
}
.list:first-child{
	margin-top: 0;
}
.bgf7{
	background-color:#f7f7f7;
	height: auto;
	padding: .15rem 0 .15rem 0;
}
</style>
