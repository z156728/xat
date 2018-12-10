<template>
    <div>
    	<div>
	      <header class="header">
	      	<span v-if="headImgs">
	          <img :src="'http://xatzht.sxxat.com/files/'+studentInfoLists.headImg" alt="" id="studentImg">
	      	</span>
	      	<span v-else>
	          <img src="../assets/img/children.png" alt="">
	      	</span>
	          <p>{{studentInfoLists.name}}</p>
	      </header>
	      <div class="infotitle">
	        <p class="main">学生信息</p>
	      </div>
	      <div class="main">
	          <div class="con">
	              <div class="contitle">身份证号</div>
	              <div>{{studentInfoLists.identity}}</div>
	          </div>
	          <div class="height1"></div>
	      </div>
	      <div class="infotitle">
	        <p class="main">学校信息</p>
	      </div>
	      <div class="main">
	        <div class="con">
	          <div class="contitle">所在学校</div>
	          <div>{{studentInfoLists.schoolName}}</div>
	        </div>
	        <div class="height1"></div>
	        <div class="con">
	          <div class="contitle">所在班级</div>
	          <div>{{studentInfoLists.className}}</div>
	        </div>
	        <div class="height1"></div>
	        <div class="con">
	          <div class="contitle">考勤卡号</div>
	          <div>{{studentInfoLists.attenceCard}}</div>
	        </div>
	        <div class="clear" style="margin-top:-0.05rem;margin-bottom:0.14rem;">
	          <div class="guashi" ref="guashi" @click="kaoqingResut()">考勤卡挂失</div>
	          <div ref="xin" class="xin">
	          	<span class="caos"  @click="applyBuKa()">申请补卡</span>
	          	<span  class="caos" @click="bangNewKard()">绑定新卡</span>
	          </div>
	        </div>
	        <div class="height1"></div>
	        <div class="con">
	          <div class="contitle">就读类型</div>
		          <div v-if="studentInfoLists.studyType == '1'">住校</div>
		          <div v-else-if="studentInfoLists.studyType == '2'">走读</div>
	        </div>
	      </div>
	      <div class="infotitle">
	        <p class="main">付费状态</p>
	      </div>
	      <div class="main">
	        <div class="con">
	          <div class="contitle">付费状态</div>
	          <div v-if="studentInfoLists.payType == '0'"></div>
	          <div v-else>已付费</div>
	        </div>
	        <div class="height1"></div>
	        <div class="con">
	          <div class="contitle">有效时间</div>
	          <div>{{studentInfoLists.payTime}}</div>
	        </div>
	        <div class="height1"></div>
	      </div>
	      <div class="infotitle">
	        <p class="main">监护人</p>
	      </div>
	      <div class="main">
	        <div class="con" v-for="item in studentRelation">
	          <div class="contitle1">
	          	<span v-if="item.userHeadImg != ''">
		            <img :src="'http://xatzht.sxxat.com/files/'+item.userHeadImg" alt="" class="correct" >
	          	</span>
	            <span v-else>
		            <img src="../assets/img/parent.png" alt="" class="defaults" >
	            </span>
	            
	            <span class="name">{{item.userName}}</span>
	            <span class="tab">{{item.relationShip}}</span>
	          </div>
	          <div v-if="item.custodyType == '1'">第一监护人</div>
	          <div v-else-if="item.custodyType == '2'">第二监护人</div>
	          <div v-else-if="item.custodyType == '3'">第三监护人</div>
	          <div v-else>第四监护人</div>
	        </div>
	        <div class="height1"></div>
	      </div>
    		
    	</div>
    	
    	<div class="dialog" v-if="dialogs">
    		<div class="zhezhao"></div>
    		<div class="dialog-items">
    			<p>您确定将此考勤卡挂失吗？</p>
    			<div>
    				<button @click="cancle()">取消</button>
    				<button @click="confirm()">确定</button>
    			</div>
    		</div>
    	</div>
    	
    	<div class="dialog" v-if="applyDialog">
    		<div class="zhezhao"></div>
    		<div class="dialog-item">
    			<h3>友情提醒</h3>
    			<p class="contents">申请补卡需付费，付费成功后请联系校方。此功能非为孩子续费时使用！</p>
    			<div class="bottoms">
    				<button @click="giveUp()">放弃</button>
    				<button @click="confirmDo()">确定，我要补卡</button>
    			</div>
    		</div>
    	</div>
    	
    </div>
</template>

<script>
    export default {
        name: 'studentinfo',
        data(){
        	return{
        		applyDialog:false,
        		headImgs:false,
        		dialogs:false,
        		studentInfoLists:{},
        		studentRelation:[],
        		token: this.$route.params.studentInfos.split(',')[0],
				userId: this.$route.params.studentInfos.split(',')[1],
				studentId: this.$route.params.studentInfos.split(',')[2],
				os: this.$route.params.studentInfos.split(',')[3]
        	}
        },
        methods:{
        	studentInfoFun:function(){
        		this.$axios({
				    method: 'post',
				    url: '/userHome/getStudentById',
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
				  	if(response.data.code == 0){
				  		this.studentInfoLists = response.data.data;
				  		this.attenceCardId = response.data.data.attenceCardId;
				  		if(response.data.data.cardStatus == "" || response.data.data.cardStatus == 1){
				  			this.$refs.xin.style.display = "block"
				  		}else if(response.data.data.cardStatus == 0){
				  			this.$refs.guashi.style.display = "block"
				  		}
				  		
				  		this.studentImg = response.data.data.headImg
				  		//判断有无头像，没有就显示默认头像
				  		if(this.studentImg == ""){
				  			this.headImgs = false
				  		}else{
				  			this.headImgs = true
				  		}
				  		
				  		this.studentRelation = response.data.data.custodyList;
					//这是抓取页面元素所进行筛选的操作（要注意！！！！！！！）
					  	this.$nextTick(function(){
					  		for(var i=0;i<this.studentRelation.length;i++){
					  			//接口返回固定四条数据，很烦，所以要删除为空的
					  			if(this.studentRelation[i].userPhone == ""){
					  				this.studentRelation.splice(i);
					  			}
					  		}
					    })
				  		
				  		localStorage.setItem("studentId" , this.studentId);
				  		localStorage.setItem("studentName" , response.data.data.name);
				  		localStorage.setItem("classId" , response.data.data.classId);
				  		localStorage.setItem("schoolId" , response.data.data.schoolId);
				  		
				  		//存储学生头像到本地
				  		var img = document.getElementById("studentImg");
				  		   //当图片加载完成时触发回调函数
					    img.addEventListener("load",function(){
					        var imgCanvas = document.createElement('canvas');
					        var imgContest = imgCanvas.getContext('2d');
					        //确保canvas元素的大小和图片尺寸一致
					        imgCanvas.width = this.width;
					        imgCanvas.height = this.height;
					
					        //渲染图片到canvas中
					        imgContest.drawImage(this,0,0,this.width,this.height);
					
					        //用data url的形式取出
					        var imgAsDataURL = imgCanvas.toDataURL("image/png");
					
					        //保存到本地存储中
					        try{
					            localStorage.setItem("studentImg" , imgAsDataURL);
					        }
					        catch(e){
					            console.log("Storage failed" + e);
					        }
					    },false);
				  		
				  	}
				  }).catch((error)=> {
				    console.log(error);
				  });
        	},
        	//点击考勤卡挂失操作
	        kaoqingResut:function(){
	        	this.dialogs = true		//让弹出框显示出来
	        },
	        //取消
	        cancle:function(){
	        	this.dialogs = false
	        },
	        confirm:function(){
	        	//挂失卡
	        	this.$axios({
				    method: 'post',
				    url: '/userHome/reportLossCard',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      studentId:this.studentId,
				      cardNoId:this.attenceCardId
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	this.dialogs = false
				    	this.$refs.guashi.style.display = "none"
				    	this.$refs.xin.style.display = "block"
				    }
				  }).catch((error)=> {
				    	console.log(error);
				  });
	        	
	        	
	        },
	        //绑定新卡
	        bangNewKard:function(){
	       		if(this.os == 0) {
					window.android.bangNewKards("0"); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('bangNewKardsOS', function(response) { //传值给ios app方法,params是参数
						
					});
				}	
	        },
	        //申请补卡
	        applyBuKa:function(){
	       		this.applyDialog = true
	       	},
	       //补卡申请放弃按钮
	       giveUp:function(){
	       		this.applyDialog = false
	       },
	       //补卡申请确定操作
	       confirmDo:function(){
	       		this.applyDialog = false
	       		if(this.os == 0) {
					window.android.applyBuKas("0"); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('applyBukaOS', function(response) { //传值给ios app方法,params是参数
						
					});
				}
	       }
        },
        created () {
    		this.studentInfoFun()
    		setupWebViewJavascriptBridge(function (bridge) {
//	    		
    		})
		}
    }
</script>

<style lang="less" scoped>
    .header{
      background: #0CC5AF;
      height: 1.54rem;
      text-align: center;
      img{
        width:0.8rem ;
        height: 0.8rem ;
        border-radius: 50%;
        margin-top:0.2rem;
      }
      p{
        font-size: 0.19rem;
        color: #ffffff;
        margin-top:0.09rem;
      }
    }
  .infotitle{
    background: #F7F7F7;
    height: 0.3rem;
    line-height:0.3rem;
    font-size: 0.13rem;
  }
  .con{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.49rem;
    .contitle{
      color: #999999;
    }
    .contitle1{
      img{
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
      }
      .name{
        margin-left:0.06rem;
        margin-right: 0.06rem;
      }
      .tab{
        display: inline-block;
        line-height:normal;
        padding: 0.02rem 0.05rem;
        background: #0CC5AF;
        color: #ffffff;
        font-size: 0.12rem;
        border-radius: 2px;
      }
    }
  }
  .height1{
    width:3.6rem;
    height: 1px;
    background: #F9F9F9;
  }
  .guashi , .caos{
    line-height:normal;
    box-sizing: border-box;
    border: 1px solid #0CC5AF;
    width: 0.8rem;
    padding-top: 0.03rem;
    padding-bottom: 0.03rem;
    color: #0CC5AF;
    font-size: 0.13rem;
    text-align: center;
    float: right;
    border-radius: 2px;
    margin-right: .1rem;
  }
  .zhezhao{
  	position: absolute;
  	background-color: #a0a0a0;
  	opacity: .6;
  	z-index:2;
  	top: 0;
  	right: 0;
  	left: 0;
  	bottom: 0;
  }
  .dialog-items{
  	z-index: 999;
  	width:76%;
  	height: 1.2rem;
  	background-color: white;
  	position: absolute;
  	bottom: 35%;
  	left: 13%;
  	box-shadow: .02rem .02rem .3rem #A0A0A0;
  	p{
  		margin-top: .3rem;
  		margin-left: 15%;
  	}
  	button{
  		width: .75rem;
  		height: .28rem;
  		background-color: white;
  		border: 1px solid #d0d0d0;
  		border-radius:.05rem ;
  		margin-left: .4rem;
  		margin-top: .2rem;
  	}
  }
  .caos{
  	border-radius: .03rem;
  }
  .xin{
  	display: none;
  }
  .guashi{
  	display: none;
  }
  .defaults{
  	display: none;
  }
  .dialog-item{
  	z-index: 999;
  	width:76%;
  	height: 2rem;
  	background-color: white;
  	position: absolute;
  	bottom: 35%;
  	left: 13%;
  	box-shadow: .02rem .02rem .3rem #A0A0A0;
  	border-radius:.03rem ;
  	h3{
  		margin-top: .15rem;
  		margin-bottom: .15rem;
  		text-align: center;
  		font-size: .17rem;
  	}
  	button{
  		vertical-align: top;
  		width: 1.1rem;
  		height: .3rem;
  		background-color: white;
  		border: 1px solid #d0d0d0;
  		border-radius:.05rem ;
  		margin-left: .2rem;
  	}
  }
  .bottoms{
  	border-top: 1px solid #d0d0d0;
  	position: absolute;
  	bottom: 0;
  	padding: .2rem .2rem .2rem 0;
  }
  .contents{
  	padding:0 .03rem 0 .08rem;
  }
</style>
