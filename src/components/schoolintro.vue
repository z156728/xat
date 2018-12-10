<template>
    <div class="mainf">
        <header class="main header">
	      <img v-if="schoolintroList.schoolImg!=''" :src="'http://xatzht.sxxat.com/files/'+schoolintroList.schoolImg" alt="">
          <div class="titles">
          	<span class="fang"> &nbsp;</span> 
          	<span>学校介绍</span>
          </div>
          
          <p class="con">{{schoolintroList.description}}</p>
          
        </header>
        
        <div class="foot">
            <div class="main">
              <div class="address">
                <img src="../assets/img/adress.png" alt="">
                <div>
                  <p class="adre">&nbsp;&nbsp;地<span class="hid">空格</span>址：</p>
                  <p>{{schoolintroList.city}}</p>
                </div>
              </div>
              <div class="phone">
                <div class="phone1">
                  <img class="bigphone" src="../assets/img/phone.png" alt="">
                  <div>
                    <p class="adre">联系电话：</p>
                    <p>{{schoolintroList.telPhone}}</p>
                  </div>
                </div>
                <a class="call" :href="'tel:'+ schoolintroList.telPhone" @click="callPhone(schoolintroList.telPhone)">
                  <img src="../assets/img/smallphone.png" alt="">拨打电话
                </a>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'schoolintro',
        data(){
        	return{
        		schoolintroList:[],
        		token: this.$route.params.schoolIntros.split(',')[0],
				userId: this.$route.params.schoolIntros.split(',')[1],
				schoolId: this.$route.params.schoolIntros.split(',')[2],
				os: this.$route.params.schoolIntros.split(',')[3]
        	}
        },
        methods:{
	    	schoolintroFun:function(){
		      	this.$axios({
				    method: 'post',
				    url: '/userHome/getSchoolById',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      schoolId:this.schoolId
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	this.schoolintroList = response.data.data;
				    }
				  }).catch((error)=> {
				    	console.log(error);
				  });
		     },
		     callPhone:function(phone){
		     	WebViewJavascriptBridge.callHandler('callPhone' ,phone ,  function(response) { //传值给ios app方法,params是参数
					console.log(response);
				});
		     }
	    },
	    created () {
    		this.schoolintroFun()
    		setupWebViewJavascriptBridge(function (bridge) {
	    		
    		})
		}
    }
</script>

<style lang="less" scoped>
  .mainf{
    height: 100%;
  }
  .header{
    margin-top:0.15rem;
    height: auto;
    img{
      width: 100%;
      height: 1.4rem;
    }
    .con{
      text-align: justify;
      line-height:0.22rem;
      margin-top:0.18rem;
      align-self: baseline;
      margin-bottom: .15rem;
    }
  }
  .foot{
    background: #F7F7F7;
    height: 2rem;
    padding-top: .15rem;
    .address{
      display: flex;
      align-items: center;
      margin-top:0.25rem;
      img{
        width: 0.21rem;
        height: 0.27rem;
        margin-right: 0.16rem;
      }
      .adre{
        color: #999999;
        font-size: 0.13rem;
        .hid{
          visibility: hidden;
        }
      }

    }
    .phone{
      display: flex;
      align-items: center;
      margin-top:0.3rem;
      margin-bottom: .2rem;
      justify-content: space-between;
      .phone1{
        display: flex;
        align-items: center;
        .bigphone{
          width: 0.26rem;
          height: 0.26rem;
          margin-right: 0.16rem;
        }
        .adre{
          color: #999999;
          font-size: 0.13rem;
        }
      }
      .call{
        display: block;
        width: 0.99rem;
        height: 0.3rem;
        line-height:0.3rem;
        background: #0CC5AF;
        color: #ffffff;
        font-size: 0.12rem;
        border-radius: 0.2rem;
        text-align: center;
        vertical-align: middle;
        outline: none;
        img{
          width: 0.16rem;
          height: 0.16rem;
          position: relative;
          top:-0.02rem;
          margin-right: 0.05rem;
        }
      }
    }
  }
  .titles{
  	margin-top: .18rem;
  	width: 100%;
  	height: .2rem;
  	font-size: .16rem;
  	font-weight: 700;
  }
  .titles span{
  	vertical-align: middle;
  }
  .fang{
  	width: 0.2rem;
  	height: .22rem;
  	background-color: #FF9D1A;
  }
</style>
