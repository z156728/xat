<template>
	<div class="bgf7 margintop-overflow">
		<div class="headsImg">
			<span>
				<img src="../assets/img/children.png">
			</span>
			<span style="font-size: .17rem;margin-left: .1rem;">{{name}}</span>
			<span style="font-size: .16rem;color: #9D9D9D;margin-left: .2rem;" v-if="remarks != ''">备注名 :&nbsp;&nbsp;{{remarks}}</span>
		</div>
		<div class="areas">
			<p>{{detail.content}}</p>
		</div>
	</div>
</template>

<script>
	    export default {
        name: 'parentReply',
        data(){
          return{
          	name:'',
          	remarks:'',
          	detail:{},
            token: this.$route.params.parentReplys.split(',')[0],
			userId: this.$route.params.parentReplys.split(',')[1],
			recordid: this.$route.params.parentReplys.split(',')[2],
			os: this.$route.params.parentReplys.split(',')[3],
          }
        },
        methods:{
        	details:function(){
        		this.name = localStorage.getItem("names");
        		this.remarks = localStorage.getItem("remarks");
        		this.$axios({
				    method: 'post',
				    url: '/class/getClassCircleRecordContent',
				    headers:{
				    	UserID:this.userId,
						Tonken:this.token,
						DeviceID:'',
						OS:this.os
				    },
				    data:{
				    	recordId:this.recordid
				    }
				  }).then((response)=> {
				  	console.log(response);
				    if(response.data.code==0){
				    	this.detail = response.data.data;
				    }
				  }).catch((error)=> {
				    console.log(error);
				  });
        	}
        },
        created (){
        	this.details();
        }
        
    }
</script>

<style scoped lang="less">
	.headsImg{
		height: .6rem;
		border-bottom: .01rem solid #f2f2f2;
		span{
			display: inline-block;
			height: .6rem;
			line-height: .6rem;
			vertical-align: middle;
			img{
				margin-top: .09rem;
				margin-left: .15rem;
				height: .42rem;
			}
		}
	}
	.areas{
		padding: .1rem;
		font-size: .16rem;
	}
</style>