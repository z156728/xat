<template>
    <div>
        <div class="main" v-if="have">
            <div class="newslist" v-for="item in newsLists" @click="newsDetails(item.newsId , item.picImg , item.title)">
              <div class="con">
                <p>{{item.title}}</p>
                <p class="time">{{item.publishDate}}</p>
              </div>
              <div>
              	<span v-if="item.picImg != ''">
	                <img :src="'http://xatzht.sxxat.com/files/'+item.picImg" alt="">
              	</span>
              </div>
            </div>
        </div>
        <!--缺省-->
        <div class="quesheng" v-else>
        	<div>
        		<img src="../assets/img/notMessage.png" />
        		<p>暂无消息</p>
        	</div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: 'newslist',
        data(){
        	return{
        		offset:0,
        		newsLists:[],
        		have:true,
        		tonken:this.$route.params.parame.split(',')[0],
        		userid:this.$route.params.parame.split(',')[1],
        		schoolId:this.$route.params.parame.split(',')[2],
        		os:this.$route.params.parame.split(',')[3]
        	}
        },
        methods:{
			newsListFun:function(){
		      	this.$axios({
				    method: 'post',
				    url: '/news/getNewsList',
				    headers:{
				    	UserID:this.userid,
						Tonken:this.tonken,
						DeviceID:'',
						OS:this.os
				    },
				    data: {
				      schoolId:this.schoolId,
				      pageIndex:this.offset.toString(),
				      pageSize:"50"
				    }
				  }).then((response)=> {
				    console.log(response);
				    if(response.data.code==0){
				    	if(response.data.data.length != 0){
				    		this.have = true
				    	}else{
				    		this.have = false
				    	}
				    	this.newsLists = response.data.data
				    	
					    }
				  }).catch((error)=> {
				    console.log(error);
				  });
		    },
		    newsDetails:function(newsId , img , title){
		    	console.log(newsId)
		     	var params = {
				    "newsId":newsId,
				    "picImg":img,
				    "title":title
				}
		     	if (this.os == 0) {
    				window.android.startFunction1(JSON.stringify(params));//传值给安卓app方法
				} else if (this.os == 1) {
				    WebViewJavascriptBridge.callHandler('newsListFun', params, function (response) {//传值给ios app方法,params是参数
				        console.log(response);
				    });
				}
		    }
	    },
	    created () {
    		this.newsListFun()
    		setupWebViewJavascriptBridge(function (bridge) {
    			
    		})
		}
    }
</script>

<style lang="less" scoped>
.newslist{
  border-bottom:1px solid #F9F9F9;
  height: 0.83rem;
  display: flex;
  justify-content: space-between;
  margin-top:0.14rem;
  .con{
    display: flex;
    height:0.69rem ;
    flex-direction: column;
    justify-content: space-between;
    .time{
      margin-top:0.14rem;
      color: #999999;
      font-size: 0.13rem;
    }
  }
  img{
    width: 1.14rem;
    height: 0.69rem;
  }
}
</style>
