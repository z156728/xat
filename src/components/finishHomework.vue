<template>
	<div class="bgf7 margintop-overflow">
		<div class="areas">
			<div class="texts" style="display: flex;justify-content: space-between;">
				<span class="types">
					<span style="margin-top: .15rem;">作业</span>
					<span>通知</span>
				</span>
				<span>
					<span class="tongzhiArea">{{contents}}</span>
				</span>
			</div>
			<div class="textAreas">
				<textarea class="texts" placeholder="请填写">{{aaa}}</textarea>
			</div>
		</div>
		<div class="tijiao" @click="tijiao">
			<p>提交</p>
		</div>
	</div>
</template>

<script>
	export default {
        name: 'finishHomework',
        data(){
        	return{
        		aaa:'',
        		contents:'',
        		token: this.$route.params.finishHomeworks.split(',')[0],
				userId: this.$route.params.finishHomeworks.split(',')[1],
				classcircleid: this.$route.params.finishHomeworks.split(',')[2],
				studentid: this.$route.params.finishHomeworks.split(',')[3],
				os: this.$route.params.finishHomeworks.split(',')[4]
        	}
        },
       methods:{
       		//带过来作业或者通知内容
       		area:function(){
       			var aa = localStorage.getItem(this.classcircleid+"istrue");
       			if(aa == null){
       				this.aaa = ""
       			}else{
       				this.aaa = aa
       			}
       			this.contents = localStorage.getItem(this.classcircleid+this.studentid+"Contentss");
       		},
			tijiao:function(){
				var a =  $("textarea").val()
				console.log(a)
		      	this.$axios({
				    method: 'post',
				    url: '/userHome/submitReply',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      classCircleId:this.classcircleid,
				      studentId:this.studentid,
				      content:a
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	localStorage.setItem(this.classcircleid , a)
				    	localStorage.setItem(this.studentid + this.classcircleid + "+" , 0)//存储个规定，规定0就是已经填过了，回到班级圈详情页面时，就不显示过来时的哪个按钮了
				    	if(this.os == 0) {
							window.android.returnDetails("0"); //传值给安卓app方法
						} else if(this.os == 1) {
							WebViewJavascriptBridge.callHandler('returnDetails1', function(response) { //传值给ios app方法
								
							});
						}
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
		      }
	    },
	    created () {
	    	this.area()
	    	setupWebViewJavascriptBridge(function (bridge) {
    			
    		})
		}
    }
</script>

<style scoped lang="less">
	.areas{
		padding: .15rem .1rem 0 .1rem;
		span{
			display:inline-block;
			vertical-align: top;
		}
		.types{
			width: .6rem;
			height: .6rem;
			background-color: #FFB21F;
			text-align: center;
			font-size: .13rem;
			display: inline-block;
			color: white;
			span{
				display: block;
			}
		}
		.tongzhiArea{
			height: .55rem;
			margin-left: .05rem;
			width:2.8rem;
			font-size: .15rem;
			
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			/* autoprefixer: off */
		    -webkit-box-orient: vertical;
		    /* autoprefixer: on */
			-webkit-line-clamp: 3;
			white-space: normal
			
		}
	}
	textarea{
		font-size: .14rem;
		padding-top: .05rem;
		padding-left: .06rem;
		outline: none;
		border:none;
		width: 3.44rem;
		height: 1.7rem;
		margin-top: .2rem;
		background-color: #F7F7F7;
		margin-bottom: .2rem;
	}
	.tijiao{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: .5rem;
		background-color: #22CAB6;
		color: #fff;
		text-align: center;
		line-height: .5rem;
		font-size: .17rem;
	}
</style>