<template>
    <div>
      <div class="main">
      	<!--校务处-->
        <div class="list xiaowu" @click="details('xwlist' , '校务部')">
          <div class="list1">
            <img src="../assets/img/parent.png" alt="">
            <span>校务处</span>
          </div>
          <div>{{choiceList.xwnum}}人</div>
        </div>
        
        <!--幼儿园部-->
        <div class="list youer" @click="details('yelist' , '幼儿园部')">
          <div class="list1">
            <img src="../assets/img/parent.png" alt="">
            <span>幼儿园部</span>
          </div>
          <div>{{choiceList.yenum}}人</div>
        </div>
        
        <!--小学部-->
        <div class="list xiaoxue" @click="details('xxlist' , '小学部')">
          <div class="list1">
            <img src="../assets/img/parent.png" alt="">
            <span>小学部</span>
          </div>
          <div>{{choiceList.xxnum}}人</div>
        </div>
        
        <!--初中部-->
        <div class="list chuzhong" @click="details('zxlist' , '初中部')">
          <div class="list1">
            <img src="../assets/img/parent.png" alt="">
            <span>初中部</span>
          </div>
          <div>{{choiceList.zxnum}}人</div>
        </div>
        
        <!--高中部-->
        <div class="list gaozhong" @click="details('gzlist' , '高中部')">
          <div class="list1">
            <img src="../assets/img/parent.png" alt="">
            <span>高中部</span>
          </div>
          <div>{{choiceList.gznum}}人</div>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data(){
        	return{
        		choiceList:[],
        		token: this.$route.params.choiceDeparts.split(',')[0],
				userId: this.$route.params.choiceDeparts.split(',')[1],
				schoolId: this.$route.params.choiceDeparts.split(',')[2],
				os: this.$route.params.choiceDeparts.split(',')[3]
        	}
        },
        methods:{
	    	choiceFun:function(){
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
				    	this.choiceList = response.data.data;
				    	
				    	this.xiaowus = response.data.data.xwnum;
				    	this.youers = response.data.data.yenum;
				    	this.xiaoxues = response.data.data.xxnum;
				    	this.zhongxues = response.data.data.zxnum;
				    	this.gaozhongs = response.data.data.gznum;
				    	
				    	if(this.xiaowus == 0){
				    		document.getElementsByClassName("xiaowu")[0].style.display = "none"
				    	}
				    	if(this.youers == 0){
				    		document.getElementsByClassName("youer")[0].style.display = "none"
				    	}
				    	if(this.xiaoxues == 0){
				    		document.getElementsByClassName("xiaoxue")[0].style.display = "none"
				    	}
				    	if(this.zhongxues == 0){
				    		document.getElementsByClassName("zhongxue")[0].style.display = "none"
				    	}
				    	if(this.gaozhongs == 0){
				    		document.getElementsByClassName("gaozhong")[0].style.display = "none"
				    	}
				    	
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
		     },
		     details:function(parts , partsNames){
		     	localStorage.setItem("parts" , parts);
		     	localStorage.setItem("partsNames" , partsNames);
		     	
		     	if(this.os == 0){
		     		window.android.toMastersList("0"); //传值给安卓app方法
		     	}else{
		     		WebViewJavascriptBridge.callHandler('toMasterLists', function(response) { //传值给ios app方法,params是参数
      		
					});
		     	}
		     	
		     	
		     	
		     }
	    },
	    created () {
    		this.choiceFun()
    		setupWebViewJavascriptBridge(function (bridge) {
	    		
    		})
    		
		}
    }
</script>

<style lang="less" scoped>
  .list{
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #F9F9F9;
    height: 0.53rem;
    line-height:0.53rem;
    .list1{
      font-size: 0.17rem;
      img{
        width: 0.36rem;
        height: 0.36rem;
        border-radius: 0.03rem;
        margin-right: 0.05rem;
      }
    }
  }
</style>
