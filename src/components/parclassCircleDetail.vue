<template>
	<div class="bgf7 margintop-overflow">
		<!--黑色背景部分-->
		<div class="zhezhao" ></div>
		<img src="" class="bigsImgs" @click="hiddens"/>
		<img src="../assets/img/3301@2x.png" class="closeImg" @click="hiddens"/>
		
		<div class="body-item"> 
			<div class="headers">
				<section class="imgs">
					<span class="headImg" v-if="details.publishHeadImg != '' && details.publishHeadImg.indexOf('http') == -1">
						<img :src="'http://xatzht.sxxat.com/files/'+ details.publishHeadImg" alt="">
					</span>
					<span class="headImg" v-else-if="details.publishHeadImg != '' && details.publishHeadImg.indexOf('http') != -1">
						<img :src="details.publishHeadImg" alt="">
					</span>
					<span class="headImg" v-else>
						<img src="../assets/img/teacher.png" />
					</span>
					<span class="teacherName">{{details.publisher}}</span>
					<span class="objType">{{details.subjectName}}老师123</span>
				</section>
			</div>
			<div class="contents">
				<h3>{{details.title}}</h3>
				<p class="pcon">
					{{details.content}}
				</p>
				<div class="piclist imgss">
						<img id="inpus11" class="inpus111" :src="'http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[0]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[0])">
						<input class="lest1" type="text" :value="details.pictureUrl.split(',')[0]"/>
						
						<img id="inpus22" class="inpus222" :src="'http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[1]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[1])">
						<input class="lest2" type="text" :value="details.pictureUrl.split(',')[1]"/>
						
						<img id="inpus33" class="inpus333" :src="'http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[2]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[2])">
						<input class="lest3" type="text" :value="details.pictureUrl.split(',')[2]"/>								
				</div>
				
				<div class="piclist imgss">
						<img id="inpus44" class="inpus444" :src="'http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[3]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[3])">
						<input class="lest4" type="text" :value="details.pictureUrl.split(',')[3]"/>
						
						<img id="inpus55" class="inpus555" :src="'http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[4]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[4])">
						<input class="lest5" type="text" :value="details.pictureUrl.split(',')[4]"/>
						
						<img id="inpus66" class="inpus666" :src="'http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[5]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.pictureUrl.split(',')[5])">
						<input class="lest6" type="text" :value="details.pictureUrl.split(',')[5]"/>								
				</div>
				
				<div class="contents-cli" @click="toHomework()" v-if="homework">
					<span class="types homes">
						<span style="margin-top: .05rem;">在线</span>
						<span>作业</span>
					</span>
					<span class="titles">
						点击完成在线作业
					</span>
					<span class="jian">
						<img src="../assets/img/right2.png" />
					</span>
				</div>
				
				<div class="contents-cli" @click="toVote()" v-if="votes">
					<span class="types votes">
						<span style="margin-top: .05rem;">在线</span>
						<span>投票</span>
					</span>
					<span class="titles votess">
						点击在线投票
					</span>
					<span class="jian">
						<img src="../assets/img/right2.png" />
					</span>
				</div>
				
			</div>
			
			<div class="footer" v-if="replyContent != ''" style="margin-top: .3rem;">
				<div class="foot-title">
					<p style="font-weight: bold;">
						<span v-if="finishHom">完成的作业</span>
						<span v-if="subFan">提交的反馈</span>
					</p>	
				</div>
				<div class="backContent">
					<span class="textArea">{{replyContent}}</span>
					<span class="edits" @click="bianji">
						编辑
					</span>
				</div>
			</div>
		</div>
		
		<div class="fixWork" v-if="replyContent == ''">
			<div class="uploadFeedback" v-if="tijiaofankui" @click="Submission(1)">
				<p>提交反馈</p>
			</div>
			<div class="completeHomework" v-if="wanchengzuoye" @click="Submission(2)">
				<p>完成作业</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
        name: 'parclassCircleDetail',
        data(){
        	return{
        		replyContent:'',
        		top:true,
        		bottom:true,
        		tijiaofankui:false,
        		wanchengzuoye:false,
        		finishHom:false,
        		subFan:false,
        		homework:true,
        		votes:true,
        		details:{},
        		tonken:this.$route.params.parClassCircleDetails.split(',')[0],
        		userid:this.$route.params.parClassCircleDetails.split(',')[1],
        		classcircleid:this.$route.params.parClassCircleDetails.split(',')[2],
        		studentid:this.$route.params.parClassCircleDetails.split(',')[3],
        		os:this.$route.params.parClassCircleDetails.split(',')[4]
        	}
        },
        methods:{
        	//点击图片放大缩小操作
				selects: function(src) {
					$(".bigsImgs").css('display' , 'block')
					$(".bigsImgs").attr("src" , src)
					$(".bigsImgs").addClass("IOSbig");
					$(".zhezhao").css('display' , 'block')
					$(".closeImg").css('display', 'block');
				},
				hiddens:function(){
					$(".bigsImgs").removeAttr("src");
					$(".bigsImgs").removeClass("big");
					$(".bigsImgs").css('display' , 'none')
					$(".zhezhao").css('display' , 'none')
					$(".closeImg").css('display', 'none');
				},
			classCircleDetail:function(){
				
				//获取详情页面数据接口
		      	this.$axios({
				    method: 'post',
				    url: '/userHome/getClassCircleDetail',
				    headers:{
				    	UserID:this.userid,
						Tonken:this.tonken,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      studentId:this.studentid,
				      classCircleId:this.classcircleid
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	this.details = response.data.data
				    	this.contents = response.data.data.content
				    	this.classCircleId = response.data.data.classCircleId
				    
				    	var pictures = response.data.data.pictureUrl
				    	//根据查询出的数据对元素进行操作
							this.$nextTick(function() {
									//如果返回的数据里没有图片数据，那就把该元素隐藏掉（隐藏所占位置）
									if(pictures == "") {
										$('.imgss').css('display' , 'none')
									} else {		//对有数据的图片进行分割 放进数组
										var ins1 = $('.lest1').val()
										var ins2 = $('.lest2').val()
										var ins3 = $('.lest3').val()
										var ins4 = $('.lest4').val()
										var ins5 = $('.lest5').val()
										var ins6 = $('.lest6').val()
										if(ins1 ==""){
											document.getElementById("inpus11").style.display = "none"
										}else{
											document.getElementById("inpus11").style.display = "inline-block"
										}
										
										if(ins2 ==""){
											document.getElementById("inpus22").style.display = "none"
										}else{
											document.getElementById("inpus22").style.display = "inline-block"
										}
										
										if(ins3 ==""){
											document.getElementById("inpus33").style.display = "none"
										}else{
											document.getElementById("inpus33").style.display = "inline-block"
										}
										
										if(ins4 ==""){
											document.getElementById("inpus44").style.display = "none"
										}else{
											document.getElementById("inpus44").style.display = "inline-block"
										}
										
										if(ins5 ==""){
											document.getElementById("inpus55").style.display = "none"
										}else{
											document.getElementById("inpus55").style.display = "inline-block"
										}
										
										if(ins6 ==""){
											document.getElementById("inpus66").style.display = "none"
										}else{
											document.getElementById("inpus66").style.display = "inline-block"
										}
									}
									
							})
				    	
				    	
				    	//判断老师发布时是否需要回复															!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				    	this.isSubmitOnline = response.data.data.isSubmitOnline;	//接口返回是否需要提交 1为需要  2 为不需要
				    	this.publishType = response.data.data.publishType;	//类型 1:作业通知;2:在线作业;3:在线投票;4:通知;
				    	this.replyContent = response.data.data.replyContent;
				    	
				    	
				    	if(this.isSubmitOnline == 2){	//既然不需要，那底部的按钮和编辑那边的内容就肯定不存在了
				    		this.tijiaofankui = false;
				    		this.wanchengzuoye = false;
				    		this.top = false;
				    		
				    		if(this.publishType == '1' || this.publishType == '4'){
								this.homework = false;
								this.votes = false;
							}else if(this.publishType == '2'){
								this.homework = true;
								this.votes = false;
							}else if(this.publishType == '3'){
								this.votes == true;
								this.homework = false;
							}
				    		
				    		
				    	}else if(this.isSubmitOnline == 1){
							var mail = localStorage.getItem(this.classcircleid);		//这是存储的填写内容
								this.homework = false;
								this.votes = false;
							
							if(this.publishType == '1'){	//这是作业通知
								if(this.replyContent == ''){
									this.wanchengzuoye = true;
								}else{
									this.finishHom = true;
								}
								
							}else if(this.publishType == '4'){	//这是通知
								if(this.replyContent == ''){
									this.tijiaofankui = true;
								}else{
									this.subFan = true;
								}
							}
				    		
				    	}
				    	
					}
				  }).catch((error)=> {
				    console.log(error);
				  });
		    },
		    //点击进入作业页面
		    toHomework:function(){
		    	var params = this.classCircleId + "," + this.studentid
				var param = {
					"classCicleId": this.classCircleId.toString(),
					"studentid": this.studentid.toString()
				}
		    	if(this.os == 0) {
					window.android.tohomeworks(params); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('tohomeworks1',param, function(response) { //传值给ios app方法
						
					});
				}
		    },
		    //点击进入投票页面
		    toVote:function(){
		    	localStorage.setItem(this.classCircleId+"Contentss" , this.contents)
		    	localStorage.setItem("voteContent" , this.contents)
		    	var param = this.classCircleId
		    	if(this.os == 0) {
					window.android.toVotes(param); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('toVotes1',param, function(response) { //传值给ios app方法
						
					});
				}
		    },
		    //点击提交
		    Submission:function(index){
		    	localStorage.setItem(this.classCircleId+this.studentid+"Contentss" , this.contents)
		    	localStorage.setItem("areas" , this.contents)
		    	var params = this.classCircleId + "," + this.studentid
				var param = {
					"classCicleId": this.classCircleId.toString(),
					"studentid": this.studentid.toString()
				}
		    	if(index == 1){		//提交反馈
		    		if(this.os == 0) {
						window.android.toFanKui(params); //传值给安卓app方法
					} else if(this.os == 1) {
						WebViewJavascriptBridge.callHandler('toFanKui1',param, function(response) { //传值给ios app方法
							
						});
					}
		    	}else if(index == 2){		//完成作业
		    		if(this.os == 0) {
						window.android.toZuoYe(params); //传值给安卓app方法
					} else if(this.os == 1) {
						WebViewJavascriptBridge.callHandler('toZuoYe1',param, function(response) { //传值给ios app方法
							
						});
					}
		    	}
		    },
		    //点击编辑
		    bianji:function(){
		    	var params = this.classCircleId + "," + this.studentid
				var param = {
					"classCicleId": this.classCircleId.toString(),
					"studentid": this.studentid.toString()
				}
		    	localStorage.setItem(this.classCircleId+"istrue" , this.replyContent)
		    	localStorage.setItem(this.classCircleId+this.studentid+"Contentss" , this.contents)
		    	var classCircleType = localStorage.getItem("classCircleType")
		    	if(classCircleType == 1){	//作业通知，跳到完成作业页面去
		    		if(this.os == 0) {
						window.android.toZuoYe(params); //传值给安卓app方法
					} else if(this.os == 1) {
						WebViewJavascriptBridge.callHandler('toZuoYe1',param, function(response) { //传值给ios app方法
							
						});
					}
		    	}else if(classCircleType == 4){	//通知，跳到提交反馈页面去
		    		if(this.os == 0) {
						window.android.toFanKui(params); //传值给安卓app方法
					} else if(this.os == 1) {
						WebViewJavascriptBridge.callHandler('toFanKui1',param, function(response) { //传值给ios app方法
							
						});
					}
		    	}
		    }
	    },
	    created () {
    		this.classCircleDetail()
    		setupWebViewJavascriptBridge(function (bridge) {
    			
    		})
		}
    }
</script>

<style scoped lang="less">
.body-item{
	margin-bottom: .05rem;
	font-size: .14rem;
	.headers{
		padding:.1rem 0 .1rem .08rem;
		border-bottom:.01rem solid #f0f0f0;
		section{
		 	display: inline-block;
		 	height: .36rem;
		 	line-height: .36rem;
		 	vertical-align: middle;
		}
	    .imgs{
			height: .36rem;
			line-height:.36rem;
			width: 2.42rem;
	    }
	    .headImg{
			img{
				vertical-align: top;
				width: .36rem;
				height: .36rem;
				border-radius:50% ;
			}
		}
		.teacherName{
			margin-left: .1rem;
			font-weight:600;
		}
		.objType{
			font-size: .13rem;
			margin-left: .1rem;
			background-color: #FF9800;
			color: white;
			border-radius:.03rem;
			padding: .02rem;
		}
	}
	.contents{
		padding: .2rem .15rem 0 .15rem;
		.pcon {
			margin-top: 0.07rem;
			padding-bottom: 0.6rem;
			text-align: justify;
			line-height: 0.22rem;
		}
		.piclist {
			display: flex;
			margin-top: 0.09rem;
			
			img {
				width: 1rem;
				height: 1rem;
				margin-right: .1rem;
			}
		}
		.contents-cli{
			margin: .2rem 0 .2rem 0;
			display: flex;
			justify-content: space-between;
			border: .01rem solid #d0d0d0;
			height: .5rem;
			padding: .08rem;
			.types{
				text-align: center;
				width:.5rem;
				height: .5rem;
				display: inline-block;
				color: white;
				span{
					display: block;
				}
			}
			.votes{
				background-color: #F57A9F;
			}
			.titles{
				line-height: .5rem;
				margin-left: -1rem;
				font-size: .15rem;
			}
			.votess{
				margin-left: -1.3rem;
			}
			.jian{
				line-height: .5rem;
				img{
					height: .15rem;
					margin-right: .2rem;
				}
			}
		}
	}
	.footer{
		.foot-title{
			background-color: #f0f0f0;
			height: .4rem;
			margin-bottom: .15rem;
			line-height: .4rem;
			padding-left: .1rem;
		}
		.backContent{
			padding: .15rem .1rem .1rem .1rem ;
			display: flex;
			justify-content: space-between;
			.textArea{
				flex: 1;
				margin-right: .3rem;
			}
			.edits{
				width: .7rem;
				height: .3rem;
				border-radius:.15rem;
				border: 1px solid #d0d0d0;
				line-height: .3rem;
				text-align: center;
				display: block;
			}
		}
	}
}
.uploadFeedback ,.completeHomework{
	position: fixed;
	text-align: center;
	width: 100%;
	height: .5rem;
	line-height: .5rem;
	background-color: #0CC5AF;
	color: white;
	font-size: .15rem;
	bottom: 0;
}
img {
	transition: all .2s linear;
	transform: scale(1);
}
.big {
	transform: scale(1.1);
	position: fixed;
	top:17%;
	left: 1%;
	right: 1%;
	z-index: 999;
}
.IOSbig {
	width:100%;
	height: auto;
	position: fixed;
	top:15%;
	left: 0%;
	right: 0%;
	z-index: 999;
}
.zhezhao {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: #474747;
	opacity: 0.8;
	z-index: 22;
	display: none;
}
.bigsImgs{
	display: none;
}
.closeImg{
	position: fixed;
	display: none;
	bottom: 18%;
	z-index: 99999;
	width: .5rem;
	height: .5rem;
	left: 50%;
	margin-left: -.25rem;
}
.inpus11 , .inpus22 , .inpus33 , .inpus44 , .inpus55 , .inpus66{
	display: none;
}
.inpus111 , .inpus222 , .inpus333 , .inpus444 , .inpus555 , .inpus666{
	display: none;
}
.inpus1 , .inpus2 , .inpus3 , .inpus4 , .inpus5 , .inpus6{
	display: none;
}
.lest1 , .lest2 , .lest3 , .lest4 , .lest5 , .lest6{
	display: none;
}
.homes{
	background-color: #FFB21F;
}
.imgss{
	margin-bottom: .7rem;
}
</style>