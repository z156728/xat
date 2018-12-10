<template>
    <div>
      <div class="main">
        <h3>{{voteTitle}}</h3>
        <p class="con">{{contents}}</p>
        <div v-for="(item , index) in voteLists" class="menus" >
        	<span style="width: 12%;text-align: center;" @click="choose(index)">
			  <input type="radio" :id="item.voteId" :value="item.voteId" :name="item.voteId" v-model="checkedValue" class="inpus" v-if="weitou">
			  <input type="radio" :id="item.voteId" :value="item.voteId" :name="item.voteId" v-model="checkedValue" class="inpus" v-else disabled="true">
        	</span>
        	<span style="margin-left: .2rem;width: 80%;">
        		<label :for="item.voteId" class="lables" v-show="par">{{item.content}}<br /></label>
        		<label :for="item.voteId" class="lables" v-show="tea">{{item.voteContent}}<br /></label>
        		<img v-if="item.pictureImg != ''" :src="'http://120.55.54.192:8080/files/'+ item.pictureImg" v-show="tea">
        		<img v-if="item.pictureImg != ''" :src="'http://xatzht.sxxat.com/files/'+ item.pictureImg" v-show="par">
        	</span>
	    </div>
      </div>
      <a class="vote" @click="voteMoment()" v-if="votes">立即投票</a>
      <div class="show_msg">
	  	<span class="show_span">请填写申请事由</span>
	  </div>
    </div>
</template>

<script>
    export default {
        name: 'vote',
        data(){
          return{
          	par:false,
          	tea:false,
          	weitou:true,
          	votes:true,
          	checkedValue:'',
          	voteLists:{},
          	vote:{},
          	contents:'',
          	voteTitle:'',
            token:this.$route.params.votes.split(',')[0],
	        userId:this.$route.params.votes.split(',')[1],
	        classId:this.$route.params.votes.split(',')[2],
	        os:this.$route.params.votes.split(',')[3],
	        type:this.$route.params.votes.split(',')[4],
          }
        },
      methods:{
        voteFun:function(){
        	if(this.type == 0){	//点进来的是教师，隐藏投票按钮
        		this.votes = false;
        		this.$axios({
			    method: 'post',
			    url: '/class/getVoteListByClassCircleId',
			    headers:{
			    	UserID:this.userId,
					Tonken:this.token,
					DeviceID:'',
					OS:this.os
			    },
			    data: {
			      classCircleId:this.classId
			    }
			  }).then((response)=> {
			    console.log(response.data.data);
			    if(response.data.code==0){
			    	this.voteLists = response.data.data;
			    	this.tea = true;
			    	for(var i=0;i<this.voteLists.length;i++){
			    		this.voteTitle = this.voteLists[0].title
			    		this.contents = this.voteLists[0].content
			    	}
			    }
			  }).catch((error)=> {
			    console.log(error);
			  });
        		
        		
        	}else{	//点进来的是家长，显示投票按钮
        		this.votes = true;
	        	$('.lables').css('color' , 'red')
	        	this.contents = localStorage.getItem("voteContent");
	        	this.$axios({
				    method: 'post',
				    url: '/userHome/getVoteList',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      classCircleId:this.classId
				    }
				  }).then((response)=> {
				    console.log(response.data.data);
				    if(response.data.code==0){
				    	this.voteLists = response.data.data;
				    	this.par = true;
				    	for(var i=0;i<this.voteLists.length;i++){
				    		this.voteTitle = this.voteLists[0].title
				    		this.isVote = this.voteLists[i].isVote
				    		if(this.isVote == 1){
				    			this.weitou = false
				    			this.votes = false
				    			var a = localStorage.getItem(this.classId)
				    			if(a !=""){
				    				this.checkedValue = a
				    			}
				    		}
				    	}
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
        	}
        	
       },
       //选择的选项，添加相应的样式
       choose:function(index){
       		$('.menus').eq(index).addClass('a').siblings().removeClass('a')
       },
       
       
       voteMoment:function(){
       	if(this.checkedValue == ""){
        	$('.show_span').text("要选择一个选项哦")
			$(".show_msg").css('bottom', '20%');
			$('.show_msg').hide();
			$('.show_msg').fadeIn(1000);
			$('.show_msg').fadeOut(2000);
        }else{
        	localStorage.setItem(this.classId , this.checkedValue)
       		this.$axios({
			    method: 'post',
			    url: '/userHome/submitVote',
			    headers:{
			    	UserID:this.userId,
					Tonken:this.token,
					DeviceID:'',
					OS:this.os
			    },
			    data: {
			      classCircleId:this.classId,
			      voteId:this.checkedValue
			    }
			  }).then((response)=> {
			    console.log(response);
			    if(response.data.code==0){
			    	this.weitou = false
			    	$('.show_span').text("投票成功")
					$(".show_msg").css('bottom', '20%');
					$('.show_msg').hide();
					$('.show_msg').fadeIn(1000);
					$('.show_msg').fadeOut(2000);
					$('.vote').hide()
					this.votes = false
			    }
			  }).catch((error)=> {
			    console.log(error);
			  });
        	}
         }
      },
      created () {
		this.voteFun()
		//初始化交互方法
    	setupWebViewJavascriptBridge(function (bridge) {
		
		})
	  }
      
    }
</script>

<style lang="less" scoped>
    h3{
      font-size: 0.17rem;
      margin-top:0.19rem;
    }
    .con{
      margin-top:0.13rem;
      padding-bottom:0.13rem;
    }
  .list{
    background: #F7F7F7;
    height:1.54rem ;
    display: flex;
    align-items: center;
    margin-top: 0.12rem;;
    i{
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      background: url("../assets/img/unsel.png") no-repeat;
      background-size: 0.2rem auto;
      margin: 0 0.2rem;
    }
    .seldiv{
      margin-left:0.17rem;
      .imgdiv{
        margin-top:0.15rem;
        img{
          width: 1.32rem;
          height: 0.9rem;
        }
      }
    }
  }
  .listactive{
    background: #E2F1FE;
    i{
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      background: url("../assets/img/sel.png") no-repeat;
      background-size: 0.2rem auto;
      margin: 0 0.2rem;
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
    margin-top:0.3rem;
  }
    input{
	    outline: none;
	    width: .2rem;
	    height: .2rem;
	    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);/*解决input在手机上上边框显示异常问题*/
	  }
  .lables{
		width:80%;
		display: inline-block;
	}
	.menus{
		height:auto;
		margin-top: .2rem;
		background-color: #f7f7f7;
		padding: .1rem 0 .1rem 0;
		span{
			display: inline-block;
		}
		img{
			width: 50%;
			margin: .1rem 0 0 0;
		}
	}
	.menus input , .menus label{
		vertical-align: top;
	}
	.a{
		background-color: #E2F1FE;
	}
</style>
