<template>
  <div class="margintop-overflow">
  	
  		<div id="bigs" @click="hiddens">
      	<img src="" class="bigImgs"/>
      </div>
  	
      <div class="main mt23">
        <div class="con">
            <div class="conlf">时<span class="hid">空格</span>间：</div>
            <p class="conrt">{{attendDetailList.dateTime}}</p>
        </div>
        <div class="con">
            <div class="conlf">考勤地点：</div>
            <p class="conrt">{{attendDetailList.attenceAddress}}</p>
        </div>
        <div class="con">
            <div class="conlf">学<span class="hid">空格</span>生：</div>
            <p class="conrt">{{attendDetailList.studentName}}</p>
        </div>
      </div>
      <div class="wai" @click="returns" v-if="showMore">
      	<span>更多历史记录</span>
      </div>
      <div class="wai" @click="shows">
      	<span class="shows">点击查看考勤照片</span>
      </div>
      <div class="main divimg mt15" v-show="hids">
          <img v-for="(item , index) in a" :src="a[index]" alt="" @click="select(index , a[index])">
      </div>
      
  </div>
</template>
<script>
  export default {
    name: 'attenddetail',
    data(){
    	return{
    		showMore:false,
    		hids:false,
    		a:{},
    		attendDetailList:[],
    		token:this.$route.params.attenddetails.split(',')[0],
    		userId:this.$route.params.attenddetails.split(',')[1],
    		recordId:this.$route.params.attenddetails.split(',')[2],
    		os:this.$route.params.attenddetails.split(',')[3],
    		type:this.$route.params.attenddetails.split(',')[4]
    	}
    },
	  methods:{
	  	//点击图片放大缩小操作
			select: function(index , src) {
				$('#bigs').css('display' , 'block')
				$('.bigImgs').attr('src' , src)
				$('.mt23').css('display' , 'none')
				$('.wai').css('display' , 'none')
				$('.divimg').css('display' , 'none')
			},
			hiddens:function(){
				$('#bigs').css('display' , 'none')
				$('.mt23').css('display' , 'block')
				$('.wai').css('display' , 'block')
				$('.divimg').css('display' , 'block')
			},
      attendDetail:function(){
      	if(this.type == 0){
      		//教师端
      		this.$axios({
	      	    method: 'post',
	      	    url: '/class/getDeviceRecordById',
	      	    headers:{
	      	    	UserID:this.userId,
								Tonken:this.token,
								DeviceID:'',
								OS:this.os
	      	    },
	      	    data: {
	      	      recordId:this.recordId
	      	    }
	      	  }).then((response)=> {
	      	    console.log(response);
	      	    	if(response.data.code == 0){
	      	    		this.attendDetailList = response.data.data;
	      	    		this.aa = response.data.data.picList
	      	    	}
	      	  }).catch((error)=> {
	      	    console.log(error);
	      	  });
      	}else{
      		this.$axios({
	      	    method: 'post',
	      	    url: '/userHome/getDeviceRecordDetail',
	      	    headers:{
	      	    	UserID:this.userId,
								Tonken:this.token,
								DeviceID:'',
								OS:this.os
	      	    },
	      	    data: {
	      	      deviceRecordId:this.recordId
	      	    }
	      	  }).then((response)=> {
	      	    console.log(response);
	      	    	if(response.data.code == 0){
	      	    		this.attendDetailList = response.data.data;
	      	    		this.aa = response.data.data.picList
	      	    		console.log(this.aa)
	      	    		if(this.aa == ""){
	      	    			var a = document.querySelector(".wai")
	      	    				a.style.display = "none"
	      	    		}
	      	    		
	      	    	}
	      	  }).catch((error)=> {
	      	    console.log(error);
	      	  });
      	}

	      },
	      shows:function(){
	      	this.hids = true
	      	this.a = {}
  	    		for(var i=0;i<this.aa.length;i++){
  	    			this.a[i] = this.aa[i]
  	    		}
	      },
	      returns:function(){
	      	if(this.os == 0){
	      		window.android.returnLists("0"); //传值给安卓app方法
	      	}else{
	      		WebViewJavascriptBridge.callHandler('returnList', function(response) { //传值给ios app方法,params是参数

						});
	      		
	      	}
	      }
    },
    created () {
    		this.attendDetail()
    		setupWebViewJavascriptBridge(function (bridge) {
	    		
				})
		},
		mounted (){
			
		}
    
  }
</script>

<style lang="less" scoped>
  .mt23{
      margin-top:0.19rem;
      .con{
        display: flex;
        font-size: 0.17rem;
        margin-top:0.05rem;
        .hid{
          visibility: hidden;
        }
        .conlf{
          color: #999999;
          line-height: .25rem;
        }
        .conrt{
					line-height: .25rem;
        }
      }
  }
  .divimg{
      margin-top: 0.11rem;
      img{
          width: 100%;
          height:1.54rem ;
          margin-bottom: .1rem;
      }
  }
  .mt15{
    margin-top:0.15rem;
  }
  .wai{
  	line-height: .5rem;
		text-align: center;
		height: .5rem;
		color: #0CC5AF;
		border-radius: .02rem;
		font-size: .17rem;
		margin:.2rem .15rem;
		border: 1px solid #0CC5AF;
		display: block;
  }
  img {
		transition: all .2s linear;
		transform: scale(1);
	}
	.big {
		transform: scale(1.5);
		position:absolute;
		z-index: 9999999;
		top: 30%;
		width: 150%;
		left: -10%;
	}
	#bigs{
		position: absolute;
		top:0%;
		right: 0%;
		left: 0;
		bottom: 0;
		width: 150%;
		background-color:#74787C;
		opacity: .9;
		display: none;
		z-index: 99999999;
	}
	.bigImgs{
		margin-top:20%;
		width:100%;
		overflow-x: scroll;
	}
</style>
