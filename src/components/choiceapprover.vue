<template>
    <div class="body-item">
        <header class="header">
            <div class="main">
                <span class="xiaowc">{{partsNames}}></span>
                <span class="choice">请选择审批人</span>
            </div>
        </header>
        <div class="main" v-for="item in personLists" @click="returnNews(item.teacherName , item.teacherId)">
            <div class="list" >
            	<span v-if="item.teacherHeadImg != '' && item.teacherHeadImg.indexOf('http') == -1">
	              <img :src="'http://xatzht.sxxat.com/files/'+item.teacherHeadImg" alt="" class="correct">
            	</span>
            	<span v-else-if="item.teacherHeadImg != '' && item.teacherHeadImg.indexOf('http') != -1">
	              <img :src="item.teacherHeadImg" alt="" class="correct">
            	</span>
            	<span v-else>
	              <img src="../assets/img/teacher.png" alt="" class="default">
            	</span>
              <span>{{item.teacherName}}</span>
            </div>
        </div>
        
        <div class="show_msg">
		  	<span class="show_span">不能选择自己哦</span>
		  </div>
        
    </div>
</template>

<script>
    export default {
        name: 'choiceapprover',
        data(){
        	return{
        		personLists:[],
        		partsNames:{},
        		token: this.$route.params.choiceApprovers.split(',')[0],
				userId: this.$route.params.choiceApprovers.split(',')[1],
				schoolId: this.$route.params.choiceApprovers.split(',')[2],
				os: this.$route.params.choiceApprovers.split(',')[3],
				teacherName: this.$route.params.choiceApprovers.split(',')[4],
        	}
        },
        methods:{
        	choiceFun:function(){
        		//获取审批人列表接口
		      	this.$axios({
				    method: 'post',
				    url: '/apply/getTeacherList',
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
				    	var parts = localStorage.getItem("parts");
				    	this.partsNames = localStorage.getItem("partsNames");
				    	
				    	var a = response.data.data;
				    	//这是根据本地存储存的数据来从接口调相应的数据
				    	for(var key in a){
				    		if(key == parts){
				    			this.personLists = a[key]
				    			console.log(this.personLists)
				    		}
				    	}
				    	
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
		    },
		    //点击回到新申请界面
		    returnNews:function(name , id){
		    	var params = {
		    		"teacherName":name,
		    		"teacherId":id
		    	}
		    	console.log(params);
		    	console.log(this.teacherName + "---" + name)
		    	if(name == this.teacherName){
		    		$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
		    	}else{
			    	if(this.os == 0){
			    		window.android.returnsNews(JSON.stringify(params)); //传值给安卓app方法
			    	}else{
				    	WebViewJavascriptBridge.callHandler('returnNews', params ,  function(response) { //传值给ios app方法,params是参数
							console.log(response);
						});
			    	}
		    	}
		    	
		    }
        },
        created (){
        	this.choiceFun()
        	setupWebViewJavascriptBridge(function (bridge) {
	    		
    		})
        }
    }
</script>

<style lang="less" scoped>
.body-item{
	
}
.header{
  height: 0.44rem;
  line-height:0.44rem;
  border-bottom:1px solid #f2f2f2;
  .xiaowc{
    color: #0CC5AF;
  }
  .choice{
    color: #999999;
  }
}
  .list{
  	border-bottom: 1px solid #f2f2f2;
    height: 0.48rem;
    line-height:0.48rem;
    img{
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      margin-right: 0.05rem;
    }
  }
</style>
