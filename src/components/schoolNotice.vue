<template>
	<div class="bgf7 margintop-overflow">
		<div class="body-items">
			<p>{{details.title}}</p>
			<p class="datas">{{details.date}}&nbsp;&nbsp;{{details.schoolName}}</p>
			<p class="arct">
				{{details.content}}
			</p>
		</div>
		<div class="urlOut" v-if="details.url != ''" v-show="imgss">
			<a :href="details.url">
				<img src="../assets/img/3505.png" />
			</a>
		</div>
	</div>
</template>

<script>
	export default {
        name: 'schoolNotice',
        data(){
        	return{
        		imgss:false,
        		details:{},
        		tonken:this.$route.params.notice.split(',')[0],
        		userid:this.$route.params.notice.split(',')[1],
        		messageid:this.$route.params.notice.split(',')[2],
        		os:this.$route.params.notice.split(',')[3],
        	}
        },
        methods:{
        	//学生详情数据请求
			notice:function(){
					this.$axios({
					    method: 'post',
					    url: '/userMessage/getMsgDetailById',
					    headers:{
					    	UserID:this.userid,
							Tonken:this.tonken,
							DeviceID:'',
							OS:this.os
					    },
					    data: {
					      msgId:this.messageid
					    }
					  }).then((response)=> {
					    console.log(response);
					    if(response.data.code==0){
					    	this.details = response.data.data
					    	this.url = response.data.data.url
					    	if(this.url != ''){
					    		this.imgss = true;
					    	}
					    	
						}
					  }).catch((error)=> {
					    console.log(error);
				  });
		   }
	    },
	    created () {
    		this.notice()
    		setupWebViewJavascriptBridge(function (bridge) {
    			
    		})
		}
    }
</script>

<style scoped lang="less">
	.bgf7{
		padding: .15rem;
		
	}
	.datas{
		margin: .05rem 0 .1rem 0;
		font-size: .13rem;
		color: #0CC5AF;
	}
	.arct{
		line-height: 160%;
		color: 999;
		font-size: .15rem;
		white-space:normal;
		word-break:break-all;
	}
	.body-items p:first-child{
		font-size: .17rem;
		color: 474747;
	}
	.urlOut img{
		margin-top: 1rem;
		width: 3.45rem;
		margin-bottom: .6rem;
	}
</style>