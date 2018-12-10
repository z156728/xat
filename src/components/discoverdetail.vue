<template>
    <div>
        <div class="main margintop-overflow">
            <p class="title">{{discoverDetailLists.newsTitle}}</p>
            <div class="time">{{discoverDetailLists.schoolName}}<span>{{discoverDetailLists.publishTime}}</span></div>
            <p class="con"></p>
            <span v-if="discoverDetailLists.newsImg !=''">
	            <img class="pic" :src="'http://xatzht.sxxat.com/files/' + discoverDetailLists.newsImg" alt="">
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'discoverdetail',
        data(){
        	return{
        		discoverDetailLists:[],
        		token:this.$route.params.discoverDetails.split(',')[0],
        		userId:this.$route.params.discoverDetails.split(',')[1],
        		newsId:this.$route.params.discoverDetails.split(',')[2],
        		schoolName:this.$route.params.discoverDetails.split(',')[3],
        		os:this.$route.params.discoverDetails.split(',')[4]
        	}
        },
        methods:{
		    discoverDetailFun:function () {
		        this.$axios({
				    method: 'post',
				    url: '/userFind/getNewsDetailById',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data:{
				    	newsId:this.newsId,
				    	schoolName:this.schoolName
				    }
				  }).then((response)=> {
				  	console.log(response);
				    if(response.data.code==0){
				    	this.discoverDetailLists = response.data.data;
				    	this.contents = response.data.data.content;
				    	$('.con').append(this.contents)
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
		      }
        },
        created (){
        	this.discoverDetailFun()
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
