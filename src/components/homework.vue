<template>
    <div>
    	
    	<div class="show_msg">
		  <span class="show_span">请填写申请事由</span>
		</div>
    	
    	<div v-if="homework">
	        <div class="main" v-for="(item , index) in homeworkLists">
	            <p class="title">{{index+1}}.{{item.questionContent}}</p>
	            <div class="answer">
	            	<div class="menus">
	            		<div>
						  <input type="radio" :id="item.taskId + 0" :value="{taskId:item.taskId , answer:'A'}" @change="get_radio_value(index , item.taskId , 'A')" v-model="checkedValue[index]">
						  <label :for="item.taskId + 0" class="lables">A、{{item.answer1}}</label><br />
	            		</div>
					    <div>
						  <input type="radio" :id="item.taskId + 1" :value="{taskId:item.taskId , answer:'B'}" @change="get_radio_value(index , item.taskId , 'B')" v-model="checkedValue[index]">
						  <label :for="item.taskId + 1" class="lables">B、{{item.answer2}}</label><br />
					    </div>
						<div>
						  <input type="radio" :id="item.taskId + 2" :value="{taskId:item.taskId , answer:'C'}" @change="get_radio_value(index , item.taskId , 'C')" v-model="checkedValue[index]">
						  <label :for="item.taskId + 2" class="lables">C、{{item.answer3}}</label><br />
						</div>
					  	<div>
						  <input type="radio" :id="item.taskId + 3" :value="{taskId:item.taskId , answer:'D'}" @change="get_radio_value(index , item.taskId , 'D')" v-model="checkedValue[index]">
						  <label :for="item.taskId + 3" class="lables">D、{{item.answer4}}</label>
					  	</div>
					</div>
	            </div>
	        </div>
	        <div class="footbtn" @click="confirmPut()" v-if="cos">填写完成&nbsp;查看成绩</div>
	        <div class="foot"  v-if="cos">请确认所有题目已做完</div>
    	</div>
    	
    	<div v-else class="applyRequire">
    		<div class="moments">
    			<div class="body-items" v-for="(item , index) in data">
    				<p class="question-title">{{index+1}}、{{item.questionContent}}</p>
    				<p class="chooseResult">
    					<span>选择结果：</span>
    					<span>{{item.studentAnswer}}</span>
    				</p>
    				<p class="correctResult">
    					<span>正确答案：</span>
    					<span>{{item.correctAnswer}}</span> 
    					<span class="check" ref="check">
    						<img src="../assets/img/dui.png"/>
    					</span>
    					<span class="checks" ref="checks">
    						<img src="../assets/img/cuo.png" />
    					</span>
    				</p>
    			</div>
    		</div>
    	</div>
    	
    	<div v-show="dialogs">
    		<div class="dialogs"></div>
    		<div class="dia">
    			<h4>答题完毕 !请点击确认查看答题结果!</h4>
    			<button @click="confirms()">确认</button>
    		</div>
    	</div>
    	
    	
    </div>
</template>

<script>
    export default {
        name: 'homework',
        data (){
            return{
            	dialogs:false,
            	cos:false,
            	success:false,
            	all_list: [],
				checkedValue: [], // 绑定单选框的值
				data:[],
            	picked:'',
            	ab:[],
            	result:false,
            	homework:true,
            	homeworkLists:[],
            	checkedNames: [],
                isActive:'-1',
                token:this.$route.params.homeworks.split(',')[0],
		        userId:this.$route.params.homeworks.split(',')[1],
		        classcicleId:this.$route.params.homeworks.split(',')[2],
		        studentid:this.$route.params.homeworks.split(',')[3],
		        os:this.$route.params.homeworks.split(',')[4],
		        type:this.$route.params.homeworks.split(',')[5]
            }
        },
        methods:{
        	//获取点击的值，存起来
        	get_radio_value: function(index , questionId , choose) {
				// 根据index值往对象里存数据数组
				this.all_list[index] = this.checkedValue[index]
			},
        	
        	//点击提交作业
        	confirmPut: function() {
				for(var i = 0; i < this.all_list.length; i++) {
					if(this.all_list[i] === '' || typeof(this.all_list[i]) === 'undefined') {
						this.all_list.splice(i, 1)
					}
				}
				// 循环
				if(this.homeworkLists.length !== this.all_list.length) {
					$('.show_span').text("先把题目都做完哦")
					$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
				} else {
		         	this.$axios({
					    method: 'post',
					    url: '/userHome/submitTask',
					    headers:{
					    	UserID:this.userId,
							Tonken:this.token,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      classCircleId:this.classcicleId,
					      studentId:this.studentid,
					      list:this.all_list
					    }
					  }).then((response)=> {
					    if(response.data.code == 0){
					    	this.dialogs = true;
					    }
					  }).catch((error)=> {
					    console.log(error);
					  });
				}
			},
			
		confirms:function(){
//			window.location.reload();
			//苹果可以自己刷新
			if(this.os == 1){
				window.location.reload();
	    	}else if(this.os == 0){		//安卓就不行了
	    		this.dialogs = false;
			    this.homeworksFun();
	    	}
		},
			
			
		//页面启动时，查数据
          homeworksFun:function(){
          	if(this.type == 0){	//教师点进来的，隐藏提交作业按钮
          		this.cos = false;
          		//老师调作业接口
          		this.$axios({
				    method: 'post',
				    url: '/class/getTaskListByClassCircleId',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      classCircleId:this.classcicleId
				    }
				  }).then((response)=> {
				    if(response.data.code == 0){
				    	this.homeworkLists = response.data.data;
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
          		
          		
          	}else{
	          	this.$axios({
				    method: 'post',
				    url: '/userHome/getTaskList',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      classCircleId:this.classcicleId,
				      studentId:this.studentid
				    }
				  }).then((response)=> {
				    if(response.data.code == 0){
				    	for(var i=0;i<response.data.data.length;i++){
				    		this.homeworkRes = response.data.data[i].studentAnswer
			    		if(this.homeworkRes == ""){
			    			this.homeworkLists = response.data.data;
			    			this.homework = true
			    			this.cos = true
			    		}else{
			    			//判断是答过题的状态，根据接口获取数据
			    			this.$axios({
							    method: 'post',
							    url: '/userHome/getTaskList',
							    headers:{
							    	UserID:this.userId,
									Tonken:this.token,
									DeviceID:'',
									OS:this.os
							    },
							    data: {
							      classCircleId:this.classcicleId,
							      studentId:this.studentid
							    }
							  }).then((response)=> {
							    if(response.data.code == 0){
							    	this.homework = false;
							    	this.data = response.data.data
							    	
							    	this.$nextTick(function () {
								    	for(var i=0;i<this.data.length;i++){
							    			if(this.data[i].studentAnswer == this.data[i].correctAnswer){
							    				this.$refs.check[i].style.display = "block"
							    			}else{
							    				this.$refs.checks[i].style.display = "block"
							    			}
								    	}
									})
							    }
							  }).catch((error)=> {
							    console.log(error);
							  });
			    			
			    		}
				      }
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
          	}
         	}
        },
        
        created () {
    		this.homeworksFun()
    		setupWebViewJavascriptBridge(function (bridge) {
	    		
    		})
		}
        
    }
</script>

<style lang="less" scoped>
.dialogs{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color:#515256;
	opacity: .9;
}
.dia{
	top:40%;
	left: 12%;
	position: absolute;
	background-color: white;
	width:75%;
	height: 1.1rem;
	border-radius:.1rem;
	z-index: 9999999999999999999;
	h4{
		text-align: center;
		margin-top: .2rem;
	}
	button{
		position: absolute;
		bottom: 0;
		border-bottom-left-radius: .1rem;
		border-bottom-right-radius: .1rem;
		width: 100%;
		height: .45rem;
		border: none;
		border-top:1px solid #d0d0d0 ;
		font-size: .18rem;
		outline: none;
		color: white;
		background-color: #0CC5AF;
	}
}

  .title{
      font-size: 0.17rem;
      margin-top:0.19rem;
      padding-bottom:0.07rem;
  }
  .answer{
    margin-top:0.07rem;
   	>div div{
   		width:auto;
   		height: .4rem;
   		line-height: .4rem;
   		vertical-align: middle;
   	}
  }
  .check{
  	display: none;
  	float: right;
    background-size: 0.35rem 0.3rem;
    width: .35rem;
    height: .3rem;
  }
  .checks{
  	display: none;
  	float: right;
    background-size: 0.35rem 0.3rem;
    width: .35rem;
    height: .3rem;
  }
  .footbtn{
      font-size: 0.17rem;
      background: #0CC5AF;
	    text-align: center;
	    color: #ffffff;
	    width: 3.35rem;
	    margin: 0 auto;
	    height: 0.5rem;
	    line-height:0.5rem;
	    border-radius: 2px;
	    margin-top:0.3rem;
  }
  .foot{
    text-align: center;
    color: #999999;
    font-size: 0.13rem;
    height: 0.36rem;
    line-height:0.36rem;
  }
  .body-items{
  	border-bottom: 1px solid #f2f2f2;
  	padding: .15rem;
  	.question-title{
  		margin-bottom: .2rem;
  	}
  	.chooseResult , .correctResult{
  		margin: .1rem .2rem;
  		.result{
  			margin-left: .7rem;
  		}
  		img{
  			width: .3rem;
  			height: .3rem;
  		}
  	}
  }
  .applyRequire{
  	width: 100%;
  	height: 100%;
  	overflow-y: auto;
  	animation-iteration-count:1;
  	animation: bounceInLeft 1.5s
  }
  
  @keyframes bounceInLeft {
		0% {
			opacity: 0;
			transform: translate3d(-300px, 0, 0);
		}
		60% {
			opacity: 1;
			transform: translate3d(25px, 0, 0);
		}
		75% {
			transform: translate3d(-5px, 0, 0);
		}
		90% {
			transform: translate3d(0px, 0, 0);
		}
		100% {
			transform: none;
		}
	}
    input{
	    outline: none;
	    width: .2rem;
	    height: .2rem;
	    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);/*解决input在手机上上边框显示异常问题*/
	  }
  .lables{
		width: 90%;
		display: inline-block;
	}
	.menus div input , .menus div label{
		vertical-align: middle;
	}
</style>
