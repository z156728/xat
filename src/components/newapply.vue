<template>
    <div class="mainf">
      <div>
        <div class="main">
            <div class="applytype">
                <p>申请类型：</p>
                <select class="sel" id="sel" style="color: #999999">
                  <option value="0">请假</option>
                </select>
            </div>
          <div class="height1"></div>
          <div class="applytype">
            <p>申请学生:</p>
            <div>
            	<span v-if="applyStudent">
	              <img :src="'http://xatzht.sxxat.com/files/' + studentImg" alt="">
            	</span>
            	<span v-else>
	              <img src="../assets/img/children.png" alt="">
            	</span>
              <span>{{studentName}}</span>
            </div>
          </div>
        </div>
        <div class="height10"></div>
        <div class="main">
            <p class="reason">申请事由</p>
            <textarea placeholder="请输入申请事由" id="applyText" maxlength="140">{{contents}}</textarea>
            <div class="applyteacher">
                <p>审批老师</p>
                <div class="applyteachername">
                	<span v-if="teacherImg != '' && teacherImg.indexOf('http') == -1">
	                  <img :src="'http://xatzht.sxxat.com/files/' + teacherImg" alt="">
                	</span>
                	<span v-if="teacherImg != '' && teacherImg.indexOf('http') != -1">
	                  <img :src="teacherImg" alt="">
                	</span>
                	<span v-else>
	                  <img  src="../assets/img/teacher.png" alt="">
                	</span>
                  <span>{{teacherName}}</span>
                  <span class="tab">班主任</span>
                </div>
            </div>
        </div>
      </div>
      <a class="vote" @click="confirmApply()">提交申请</a>
      
      <div class="show_msg">
	  	<span class="show_span">请填写申请事由</span>
	  </div>
	  
    </div>
</template>

<script>
  export default {
        name: 'newapply',
        data(){
              return{
              	applyStudent:true,
              	choiceTeacher:true,
              	studentImg:'',
              	teacherImg:'',
              	contents:'',
              	token:this.$route.params.newsApply.split(',')[0],
        		userId:this.$route.params.newsApply.split(',')[1],
        		applyStudentId:this.$route.params.newsApply.split(',')[2],
        		studentName:this.$route.params.newsApply.split(',')[3],
        		teacherId:this.$route.params.newsApply.split(',')[4],
        		teacherName:this.$route.params.newsApply.split(',')[5],
        		os:this.$route.params.newsApply.split(',')[6]
              }
        },
        methods:{
        	//由local获取是新申请还是修改申请
        	newAndchange:function(){
        		var indexs = localStorage.getItem("applys")
        		
        		//为空时，是新申请
        		if(indexs == ""){
        			this.contents = ""
        			//根据接口获取老师和学生头像
        			this.$axios({
					    method: 'post',
					    url: '/userHome/getStudentTeacherInfo',
					    headers:{
					    	UserID:this.userId,
							Tonken:this.token,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      studentId:this.applyStudentId,
					      teacherId:this.teacherId
					    }
					  }).then((response)=> {
					  	console.log(response.data.data)
					    if(response.data.code== 0){
					    	//头像问题
					    	this.studentImg = response.data.data.studentImg
					    	if(this.studentImg == ""){
					    		this.applyStudent = false
					    	}else{
					    		this.applyStudent = true
					    	}
					    	
					    }
					  }).catch((error)=> {
					    console.log(error);
					  });
        			
        		}else{	//不为空时，是修改申请，并根据接口数据填充
        			this.$axios({
					    method: 'post',
					    url: '/userHome/getApplyDetailById',
					    headers:{
					    	UserID:this.userId,
							Tonken:this.token,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      applyId:indexs,
					      userId:this.userId
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	this.contents = response.data.data.content
					    	this.teacherName = response.data.data.replyTeacherName
					    	this.teacherId = response.data.data.replyTeacherId
					    	this.studentName = response.data.data.applyStudentName
					    	
					    	this.studentImg = response.data.data.applyStudentHeadImg
					    	if(this.studentImg == ""){
					    		this.applyStudent = false
					    	}else{
					    		this.applyStudent = true
					    	}
					    	
					    }
					  }).catch((error)=> {
					    console.log(error);
					  });
        		}
        	},
        	
        	//提交申请
	    	confirmApply:function(){
	    		//获取请假类型的value
	    		var applyType = document.getElementById("sel");
				var applyTypeVal = applyType.value;	  
				//获取申请内容
	    		var contents = document.getElementById("applyText");
	    		var contentss = contents.value;
	    		
	    		var indexs = localStorage.getItem("applys")
	    		
	    		//判断是否输入了申请内容
	    		if(contentss == ""){
	    			$('.show_span').text("请输入申请内容")
					$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
	    		}else{
			      	this.$axios({
					    method: 'post',
					    url: '/userHome/saveOrUpdateApply',
					    headers:{
					    	UserID:this.userId,
							Tonken:this.token,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      applyId:indexs,
					      userId:this.userId,
					      applyType:applyTypeVal,
					      studentId:this.applyStudentId,
					      content:contentss,
					      teacherId:this.teacherId
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	this.contents = ""
					    	console.log("成功啦");
					    	if (this.os == 0) {
					    		localStorage.setItem("applys", response.data.data.applyId);
			  					window.android.applyDetailss(response.data.data.applyId);//传值给安卓app方法
							} else if (this.os == 1) {
								localStorage.setItem("applys", response.data.data.applyId);
							    WebViewJavascriptBridge.callHandler('applyDetailse', response.data.data.applyId ,  function (response) {//传值给ios app方法,params是参数
							        console.log(response);
							    });
							}
							
					    }
					  }).catch((error)=> {
					    console.log(error);
					  });
	    		}
	    		
		      }
	    },
	    created () {
	    	this.newAndchange()
	    	//初始化交互方法
	    	setupWebViewJavascriptBridge(function (bridge) {
    		
    		})
	    }
    }
</script>

<style lang="less" scoped>
  .mainf{
    height: 97%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
    .applytype{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.49rem;
        line-height:0.49rem;
      img{
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        margin-right:0.04rem;
      }
      .sel{
        /*去除select默认样式start*/
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        /*去除select默认样式end*/
        background: url("../assets/img/bottom.png") no-repeat scroll right center transparent;
        background-size:0.12rem 0.07rem;
        padding-right:0.21rem;
        border: none;
        outline: none;
        font-size: 0.15rem;
        color: #474747;
      }
    }
    .vote{
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
  .height1{
    width: 3.6rem;
    height: 1px;
    background: #F9F9F9;
  }
  .reason{
    height: 0.49rem;
    line-height:0.49rem;
  }
    textarea{
      box-sizing: border-box;
      width: 3.45rem;
      height:1.54rem;
      border: none;
      background: #F7F7F7;
      padding-top: 0.1rem;
      padding-left:0.1rem;
      resize: none;
      outline: none;
      font-size: 0.13rem;
    }
  .applyteacher{
    display: flex;
    align-items: center;
    margin-top:0.2rem;
    img{
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      margin-right:0.01rem;
    }
    .applyteachername{
      margin-left:0.23rem;
      .tab{
        display: inline-block;
        line-height:normal;
        padding: 0.01rem 0.05rem;
        background: #0CC5AF;
        color: #ffffff;
        font-size: 0.12rem;
        border-radius: 2px;
        margin-left:0.06rem;
      }
    }
  }
</style>
