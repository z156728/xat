<template>
	<div class="bgf7 margintop-overflow">
		<!--黑色背景部分-->
		<div class="zhezhao" ></div>
		<img src="" class="bigsImgs" @click="hiddens"/>
		<img src="../assets/img/3301@2x.png" class="closeImg" @click="hiddens"/>
		
		<div class="body-item"> 
			<div class="headers">
				<section class="imgs">
					<span class="headImg" v-if="details.headImg != '' && details.headImg.indexOf('http') == -1">
						<img :src="'http://xatzht.sxxat.com/files/'+ details.headImg" alt="">
					</span>
					<span class="headImg" v-else-if="details.headImg != '' && details.headImg.indexOf('http') != -1">
						<img :src="details.headImg" alt="">
					</span>
					<span class="headImg" v-else>
						<img src="../assets/img/teacher.png" />
					</span>
					<span class="teacherName">{{details.teacherName}}</span>
					<span class="objType">{{details.subjectName}}老师</span>
				</section>
			</div>
			<div class="contents">
				<h3>{{details.title}}</h3>
				<p class="pcon">
					{{details.content}}
				</p>
				<div class="piclist imgss">
						<img id="inpus11" class="inpus111" :src="'http://xatzht.sxxat.com/files/'+ details.picture.split(',')[0]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.picture.split(',')[0])">
						<input class="lest1" type="text" :value="details.picture.split(',')[0]"/>
						
						<img id="inpus22" class="inpus222" :src="'http://xatzht.sxxat.com/files/'+ details.picture.split(',')[1]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.picture.split(',')[1])">
						<input class="lest2" type="text" :value="details.picture.split(',')[1]"/>
						
						<img id="inpus33" class="inpus333" :src="'http://xatzht.sxxat.com/files/'+ details.picture.split(',')[2]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.picture.split(',')[2])">
						<input class="lest3" type="text" :value="details.picture.split(',')[2]"/>								
				</div>
				<div class="piclist imgss">
						<img id="inpus44" class="inpus444" :src="'http://xatzht.sxxat.com/files/'+ details.picture.split(',')[3]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.picture.split(',')[3])">
						<input class="lest4" type="text" :value="details.picture.split(',')[3]"/>
						
						<img id="inpus55" class="inpus555" :src="'http://xatzht.sxxat.com/files/'+ details.picture.split(',')[4]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.picture.split(',')[4])">
						<input class="lest5" type="text" :value="details.picture.split(',')[4]"/>
						
						<img id="inpus66" class="inpus666" :src="'http://xatzht.sxxat.com/files/'+ details.picture.split(',')[5]" 
							@click="selects('http://xatzht.sxxat.com/files/'+ details.picture.split(',')[5])">
						<input class="lest6" type="text" :value="details.picture.split(',')[5]"/>								
				</div>
				
				<div class="contents-cli" v-show="hom" @click="toHomework(details.classCircleId)">
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
				
				<div class="contents-cli" v-show="vote" @click="toVote(details.classCircleId)">
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
			
			
		</div>
	</div>
</template>

<script>
	export default {
        name: 'teaclassCircleDetail',
        data(){
        	return{
        		hom:false,
        		vote:false,
        		details:{},
        		tonken:this.$route.params.teaClassCircleDetails.split(',')[0],
        		userid:this.$route.params.teaClassCircleDetails.split(',')[1],
        		studentid:this.$route.params.teaClassCircleDetails.split(',')[2],
        		classcircleid:this.$route.params.teaClassCircleDetails.split(',')[3],
        		os:this.$route.params.teaClassCircleDetails.split(',')[4]
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
		      	this.$axios({
				    method: 'post',
				    url: '/class/getClassCircleById',
				    headers:{
				    	UserID:this.userid,
						Tonken:this.tonken,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      classCircleId:this.classcircleid
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	this.details = response.data.data
				    	//根据返回的作业类型判断显示那些东西
				    	this.publishType = response.data.data.publishType
				    	if(this.publishType == 1 || this.publishType == 4){
				    		this.hom = false;
							this.vote = false;
				    	}else if(this.publishType == 2){
				    		this.hom = true;
							this.vote = false;
				    	}else if(this.publishType == 3){
				    		this.hom = false;
							this.vote = true;
				    	}
				    	
				    	var pictures = response.data.data.picture
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
				    	
				    	
				    	
					}
				  }).catch((error)=> {
				    console.log(error);
				  });
		    },
		    toHomework:function(id){
		    	if(this.os == 0) {
					window.android.tohomework(id); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('tohomework1',id, function(response) { //传值给ios app方法
						
					});
				}
		    },
		    toVote:function(id){
		    	if(this.os == 0) {
					window.android.tovotess(id); //传值给安卓app方法
				} else if(this.os == 1) {
					WebViewJavascriptBridge.callHandler('tovotess1',id, function(response) { //传值给ios app方法
						
					});
				}
		    },
		    //点击图片放大
		    select:function(url){
		    	
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
		border-bottom:1px solid #f0f0f0;
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
			padding: .01rem;
		}
	}
	.contents{
		padding: .2rem .15rem 0 .15rem;
		.pcon {
			margin-top: 0.07rem;
			text-align: justify;
			line-height: 0.22rem;
		}
		.piclist {
			display: flex;
			/*justify-content: space-between;*/
			margin-top: 0.09rem;
			img {
				border: none;
				width: 1rem;
				height: 1rem;
				margin-right: .1rem;
			}
		}
		.contents-cli{
			margin: .2rem 0 .2rem 0;
			display: flex;
			justify-content: space-between;
			border: 1px solid #d0d0d0;
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