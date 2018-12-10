<template>
  <div>
    <div class="main margintop-overflow">
      <p class="title">{{newsDetailLists.title}}</p>
      <div class="time">{{newsDetailLists.schoolName}}<span>{{newsDetailLists.publishTime}}</span></div>
      <p class="con"></p>
      <span v-if="newsDetailLists.picImg!=''">
	      <img class="pic" :src="'http://xatzht.sxxat.com/files/'+newsDetailLists.picImg" alt="">
      </span>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'newsdetail',
        data(){
        	return{
        		newsDetailLists:{},
        		userID:this.$route.params.newsDetails.split(',')[0],
        		token:this.$route.params.newsDetails.split(',')[1],
        		newsID:this.$route.params.newsDetails.split(',')[2],
        		os:this.$route.params.newsDetails.split(',')[3]
        	}
        },
        methods:{
        	newsDetailsFun:function(){
        		this.$axios({
					    method: 'post',
					    url: '/news/getNewsById',
					    headers:{
					    	UserID:this.token,
								Tonken:this.userID,
								DeviceID:"",
								OS:this.os
					    },
					    data: {
					    	newsId:this.newsID
					    }
					  }).then((response)=> {
					    console.log(response.data);
					    if(response.data.code==0){
					    	this.newsDetailLists = response.data.data;
					    	this.contents = response.data.data.content;
					    	$('.con').append(this.contents)
					    }
					  }).catch((error)=> {
					    console.log(error);
					  });
        	}
        	
        },
        created () {
		    		this.newsDetailsFun()
				}
    }
</script>

<style lang="less" scoped>
  .title{
    font-size: 0.17rem;
    text-align: justify;
    margin-top:0.19rem;
  }
  .time{
    font-size: 0.12rem;
    margin-top:0.09rem;
    span{
      color: #999999;
      margin-left:0.15rem;
    }
  }
  .con{
    text-align: justify;
    line-height:0.22rem;
    margin-top:0.23rem;
  }
  .pic{
    height: 1.3rem;
    width: 100%;
    margin-top:0.14rem;
  }
  .con1{
    margin-top:0.13rem;
  }
</style>
