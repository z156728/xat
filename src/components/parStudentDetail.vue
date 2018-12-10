<template>
    <div>
    	<div v-if="teacher">
	      <header class="header">
	      	<div class="left-item">
	      		<span v-if="details.headImg != '' && details.headImg.indexOf('http') == -1">
		          <img :src="'http://xatzht.sxxat.com/files/'+details.headImg" alt="" id="studentImg" class="headsImg">
		      	</span>
		      	<span v-else-if="details.headImg != '' && details.headImg.indexOf('http') != -1">
		          <img :src="details.headImg" alt="" id="studentImg" class="headsImg">
		      	</span>
		      	<span v-else>
		          <img src="../assets/img/children.png" alt="" class="headsImg">
		      	</span>
	      		<span>
	      			{{details.studentName}}
	      		</span>
	      		<span v-if="details.gender == 1">
	      			<img src="../assets/img/3397@2x.png" style="height: .21rem;"/>
	      		</span>
	      		<span v-else-if="details.gender == 2">
	      			<img src="../assets/img/3398@2x.png" style="height: .21rem;"/>
	      		</span>
	      	</div>
	      	<div class="right-side" @click="teaChange()">
	      		<span>
	      			<img src="../assets/img/3392@2x.png" style="height: .21rem;"/>
	      			编辑资料
	      		</span>
	      	</div>
	      </header>
	      <div class="infotitle">
	        <p class="main">学生信息</p>
	      </div>
	      <div class="main">
	          <div class="con">
	              <div class="contitle">身份证号</div>
	              <div>{{details.cardNo}}</div>
	          </div>
	          <div class="height1"></div>
	      </div>
	      <div class="infotitle">
	        <p class="main">考勤卡</p>
	      </div>
	      <div class="main">
	        <div v-if="nos" class="cardsNo">
	        	<p v-for="ite in cardNos">{{ite.card}}</p>
	        </div>
	        <div v-else>
	        	<p style="margin-top: .1rem;margin-bottom: .1rem;">未绑定考勤卡</p>
	        </div>
	        
	        <div class="height1"></div>
	        <div class="con">
	          <div class="contitle">就读类型</div>
		          <div v-if="details.studyType == '1'">住校</div>
		          <div v-else-if="details.studyType == '2'">走读</div>
	        </div>
	      </div>
	      <div class="infotitle">
	        <p class="main">付费状态</p>
	      </div>
	      <div class="main">
	        <div class="con">
	          <div class="contitle">付费状态</div>
	          <div v-if="details.payType == '0'">未付费</div>
	          <div v-else>已付费</div>
	        </div>
	        <div class="height1"></div>
	        <div class="con">
	          <div class="contitle">有效时间</div>
	          <div>{{details.payTime}}</div>
	        </div>
	        <div class="height1"></div>
	      </div>
	      <div class="infotitle">
	        <p class="main">监护人</p>
	      </div>
	      <div class="main">
	        <div class="con" v-for="item in studentRelation">
	          <div class="contitle1">
	          	<span v-if="item.userHeadImg != '' && item.userHeadImg.indexOf('http') == -1">
		            <img :src="'http://xatzht.sxxat.com/files/'+item.userHeadImg" alt="">
	          	</span>
	          	<span v-else-if="item.userHeadImg != '' && item.userHeadImg.indexOf('http') != -1">
		            <img :src="item.userHeadImg" alt="">
	          	</span>
	            <span v-else>
		            <img src="../assets/img/parent.png" alt="" class="defaults" >
	            </span>
	            
	            <span class="name">{{item.userPhone}}</span>
	            <span class="tab">{{item.relationShip}}</span>
	          </div>
	          <div v-if="item.custodyType == '1'">第一监护人</div>
	          <div v-else-if="item.custodyType == '2'"></div>
	          <div v-else-if="item.custodyType == '3'"></div>
	          <div v-else></div>
	        </div>
	        <div class="height1"></div>
	      </div>
    	</div>
    	
    	
    	<div v-else>
	      <header class="header">
	      	<div class="left-item">
		      	<span v-if="details.headImg != '' && details.headImg.indexOf('http') == -1">
		          <img :src="'http://xatzht.sxxat.com/files/'+details.headImg" alt="" class="headsImg">
		      	</span>
		      	<span v-else-if="details.headImg != '' && details.headImg.indexOf('http') != -1">
		          <img :src="details.headImg" alt="" class="headsImg">
		      	</span>
		      	<span v-else>
		          <img src="../assets/img/children.png" alt="" class="headsImg">
		      	</span>
	      		<span>
	      			{{details.name}}
	      		</span>
	      		<span v-if="details.gender == 1">
	      			<img src="../assets/img/3397@2x.png" style="height: .21rem;"/>
	      		</span>
	      		<span v-else-if="details.gender == 2">
	      			<img src="../assets/img/3398@2x.png" style="height: .21rem;"/>
	      		</span>
	      	</div>
	      	<div class="right-side" @click="teaChange()">
	      		<span>
	      			<img src="../assets/img/3392@2x.png" style="height: .21rem;"/>
	      			编辑资料
	      		</span>
	      	</div>
	      </header>
	      <div class="infotitle">
	        <p class="main">学生信息</p>
	      </div>
	      <div class="main">
	          <div class="con">
	              <div class="contitle">身份证号</div>
	              <div>{{details.identity}}</div>
	          </div>
	          <div class="height1"></div>
	      </div>
	      <div class="infotitle">
	        <p class="main">考勤卡</p>
	      </div>
	      
	      	<div v-if="parNos" style="padding-left: .18rem;">
	        	<p style="margin-top: .1rem;margin-bottom: .1rem;" v-for="ite in cardNos">{{ite.card}}</p>
	        </div>
	        <div v-else>
	        	<p style="margin: .15rem;font-size: .14rem;">未绑定考勤卡</p>
	        </div>
	        <div class="height1"></div>
	        <div class="shuoming">
	        	<p>考勤卡绑定说明: </p>
	        	<p>考勤卡绑定请在我的_我的孩子页面处，点击绑定[考勤卡绑定]功能进行绑定。如考勤卡遗失请联系老师。</p>
	        </div>
	        
	        
	        <div class="main">
		        <div class="con">
		          <div class="contitle">就读类型</div>
			          <div v-if="details.studyType == '1'">住校</div>
			          <div v-else-if="details.studyType == '2'">走读</div>
		        </div>
		      </div>
	      
	      <div class="infotitle">
	        <p class="main">付费状态</p>
	      </div>
	      <div class="main">
	        <div class="con">
	          <div class="contitle">付费状态</div>
	          <div v-if="details.payType == '0'"></div>
	          <div v-else>已付费</div>
	        </div>
	        <div class="height1"></div>
	        <div class="con">
	          <div class="contitle">有效时间</div>
	          <div>{{details.payTime}}</div>
	        </div>
	        <div class="height1"></div>
	      </div>
	      <div class="infotitle">
	        <p class="main">监护人</p>
	      </div>
	      <div class="main">
	        <div class="con" v-for="item in studentRelation">
	          <div class="contitle1">
	          	<span v-if="item.userHeadImg != '' && item.userHeadImg.indexOf('http') == -1">
		            <img :src="'http://xatzht.sxxat.com/files/'+item.userHeadImg" alt="">
	          	</span>
	          	<span v-else-if="item.userHeadImg != '' && item.userHeadImg.indexOf('http') != -1">
		            <img :src="item.userHeadImg" alt="">
	          	</span>
	            <span v-else>
		            <img src="../assets/img/parent.png" alt="" class="defaults" >
	            </span>
	            
	            <span class="name">{{item.userPhone}}</span>
	            <span class="tab">{{item.relationShip}}</span>
	          </div>
	          <div v-if="item.custodyType == '1'">第一监护人</div>
	          <div v-else-if="item.custodyType == '2'"></div>
	          <div v-else-if="item.custodyType == '3'"></div>
	          <div v-else></div>
	        </div>
	        <div class="height1"></div>
	      </div>
    	</div>
    	
    </div>
</template>

<script>
	export default {
        name: 'parStudentDetail',
        data(){
        	return{
        		parNos:true,
        		nos:true,
        		headImgs:false,
        		teacher:false,
        		details:{},
        		cardNos:[],
        		studentRelation:[],
        		tonken:this.$route.params.studentDetails.split(',')[0],
        		userid:this.$route.params.studentDetails.split(',')[1],
        		studentid:this.$route.params.studentDetails.split(',')[2],
        		os:this.$route.params.studentDetails.split(',')[3],
        		type:this.$route.params.studentDetails.split(',')[4]
        	}
        },
        methods:{
        	//学生详情数据请求
			studentDetail:function(){
				if(this.type == 0){	//教师端
					this.$axios({
					    method: 'post',
					    url: '/student/getStudentById',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      studentId:this.studentid
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	this.teacher = true;
					    	this.details = response.data.data
					    	this.studentRelation = response.data.data.custody;
					    	
							//这是抓取页面元素所进行筛选的操作（要注意！！！！！！！）
						  		for(var i=0;i<this.studentRelation.length;i++){
						  			//接口返回固定四条数据，很烦，所以要删除为空的
						  			if(this.studentRelation[i].userPhone == ""){
						  				this.studentRelation.splice(i , 1);
						  				i = i-1;    //解决方案	用for循环的时候用splice 可能会因为删除导致下标错误，然后导致整体数据少一个或多一个，
						  			}
						  		}
					    	
						  }
					  }).catch((error)=> {
					    console.log(error);
				  });
				  //获取考勤卡号列表
				  this.$axios({
					    method: 'post',
					    url: '/student/getStudentCardNoById',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      studentId:this.studentid
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	console.log(response.data.data)
					    	this.cardNos = response.data.data;
					    	if(this.cardNos.length == 0){
					    		this.nos = false;
					    	}
						  }
					  }).catch((error)=> {
					    console.log(error);
				  });
				  
				  
				}else{	//家长端
					this.$axios({
					    method: 'post',
					    url: '/userHome/getStudentById',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      studentId:this.studentid
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	this.teacher = false;
					    	this.details = response.data.data
					    	this.studentRelation = response.data.data.custodyList;
					    	//这是抓取页面元素所进行筛选的操作（要注意！！！！！！！）
						  		for(var i=0;i<this.studentRelation.length;i++){
						  			//接口返回固定四条数据，很烦，所以要删除为空的
						  			if(this.studentRelation[i].userPhone == ""){
						  				this.studentRelation.splice(i , 1);
						  				i = i-1;    //解决方案	用for循环的时候用splice 可能会因为删除导致下标错误，然后导致整体数据少一个或多一个，
						  			}
						  		}
						}
					  }).catch((error)=> {
					    console.log(error);
				  });
				  
				  //获取考勤卡号列表
				  this.$axios({
					    method: 'post',
					    url: '/student/getStudentCardNoById',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      studentId:this.studentid
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	console.log(response.data.data)
					    	this.cardNos = response.data.data;
					    	if(this.cardNos.length == 0){
					    		this.parNos= false;
					    	}
						  }
					  }).catch((error)=> {
					    console.log(error);
				  });
				  
				  
				}
		   },
			//点击编辑资料，跳转出去
			teaChange:function(){
				var param = this.studentid.toString();
				if(this.type == 0){	//教师端点击跳转出去
					if(this.os == 0){	//安卓端
						window.android.toChange(param); //传值给安卓app方法
					}else{	//苹果端
						WebViewJavascriptBridge.callHandler('toChange1',param, function(response) { //传值给ios 
							
						});
					}
					
				}else{	//家长端点击跳转出去
					if(this.os == 0){	//安卓端
						window.android.toChanges(param); //传值给安卓app方法
					}else{	//苹果端
						WebViewJavascriptBridge.callHandler('toChanges1',param, function(response) { //传值给ios 
							
						});
					}
				}
			}
	    },
	    created () {
    		this.studentDetail()
    		setupWebViewJavascriptBridge(function (bridge) {
    			
    		})
		}
    }
</script>

<style lang="less" scoped>
    .header{
      background: #0CC5AF;
      height: 1.2rem;
      font-size: .19rem;
      color: white;
      position: relative;
      div{
      	display: inline-block;
      }
      .headsImg{
        width:0.6rem ;
        height: 0.6rem ;
        border-radius: 50%;
        margin-left: .2rem;
      }
      span{
      	margin-right: .06rem;
      	line-height: 1.2rem;
      	height: 1.2rem;
      	vertical-align: middle;	
      	display: inline-block;
      }
      .right-side{
      	position: absolute;
      	right: .1rem;
      	font-size: .14rem;
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
    height: 0.45rem;
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
  .cardsNo,.cardNos{
  	padding: .1rem .1rem .1rem 0;
  	p{
  		margin-bottom: .07rem;
  	}
  	p:last-child{
  		margin-bottom: 0;
  	}
  }
  .shuoming{
  	font-size: .13rem;
  	background-color: #f0f0f0;
  	padding: .17rem;
  	color: #6A6A6A;
  	p{
  		line-height: 160%;
  	}
  }
</style>
