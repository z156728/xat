<template>
    <div class="bgf7">
        <div class="tablist" v-if="yue">
            <div :class="{active:0==isactive}" @click="apply(0)">已阅</div>
            <div :class="{active:1==isactive}" @click="apply(1)">未阅</div>
        </div>
        <div class="list" v-if="yue">
        	<div class="title-content">
        		<p>有<span>{{count}}</span>位学生的家长<span v-if="isactive == 0">已</span><span v-else>未</span>读</p>
        	</div>
        	<div class="parentDetails" v-for="item in studentList">
        		<div>
	        		<span v-if="item.headImg != '' && item.headImg.indexOf('http') == -1 ">
			            <img :src="'http://xatzht.sxxat.com/files/'+item.headImg" alt="">
		          	</span>
		          	<span v-else-if="item.headImg != '' && item.headImg.indexOf('http') != -1 ">
			            <img :src="item.headImg" alt="">
		          	</span>
		            <span v-else>
			            <img src="../assets/img/parent.png" alt="" class="defaults" >
		            </span>
	        		<span style="font-size: .17rem;margin-left: .1rem;">{{item.studentName}}</span>
					<span style="font-size: .16rem;color: #9D9D9D;margin-left: .2rem;" v-if="item.remark != ''">备注名 :&nbsp;&nbsp;{{item.remark}}</span>
        		</div>
        	</div>
        </div>
		<!--下方左右选择部分-->
		<div class="tablist" v-if="hui">
            <div :class="{active:0==isactives}" @click="apply1(0)">已回复</div>
            <div :class="{active:1==isactives}" @click="apply1(1)">未回复</div>
        </div>
        <div class="list lists" style="background-color: white;" v-if="hui">
        	<div class="title-content">
        		<p>有<span>{{count}}</span>位学生的家长<span v-if="isactives == 0">已</span><span v-else>未</span>回复</p>
        	</div>
        	<div class="parentDetails reply"  v-for="items in studentList">
        		<div>
		          	<span v-if="items.headImg != '' && items.headImg.indexOf('http') == -1 ">
			            <img :src="'http://xatzht.sxxat.com/files/'+items.headImg" alt="">
		          	</span>
		          	<span v-else-if="items.headImg != '' && items.headImg.indexOf('http') != -1 ">
			            <img :src="items.headImg" alt="">
		          	</span>
		            <span v-else>
			            <img src="../assets/img/parent.png" alt="" class="defaults" >
		            </span>
	        		<span style="font-size: .17rem;margin-left: .1rem;">{{items.studentName}}</span>
					<span style="font-size: .16rem;color: #9D9D9D;margin-left: .2rem;" v-if="items.remark != ''">备注名 :&nbsp;&nbsp;{{items.remark}}</span>
					<span class="chakan" v-if="isactives == '0'" @click="lookReply(items.recordId , items.studentName , items.remark)">查看回复</span>
        		</div>
        	</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'repcardrecord',
        data(){
          return{
          	yue:false,
          	hui:false,
            isactive:0,
            isactives:0,
            count:'',
            studentList:[],
            token: this.$route.params.reads.split(',')[0],
			userId: this.$route.params.reads.split(',')[1],
			classcircleid: this.$route.params.reads.split(',')[2],
			os: this.$route.params.reads.split(',')[3],
          }
        },
        methods:{
        	aa:function(){
        		var a = localStorage.getItem("commits");
        		console.log(a)
        		if(a == 1){
        			this.hui = true;
        			this.apply1(0)
        		}else{
        			this.yue = true;
        			this.apply(0)
        		}
        	},
        	
        	
          apply:function (index) {
            this.isactive=index
            if(this.isactive == 0){
            	var actives = "1"
            }else{
            	var actives = "2"
            }
            this.$axios({
			    method: 'post',
			    url: '/class/getClassCircleRecordList',
			    headers:{
			    	UserID:this.userId,
					Tonken:this.token,
					DeviceID:'',
					OS:this.os
			    },
			    data:{
			    	classCircleId:this.classcircleid,
			    	readStatus:actives,
			    }
			  }).then((response)=> {
			  	console.log(response);
			    if(response.data.code==0){
			    	this.count = response.data.data.count;
			    	this.studentList = response.data.data.studentList;
			    }
			  }).catch((error)=> {
			    console.log(error);
			  });
         },
         apply1:function (index) {
            this.isactives=index
            if(this.isactives == 0){
            	var actives = "3"
            }else{
            	var actives = "4"
            }
            console.log(actives)
            this.$axios({
			    method: 'post',
			    url: '/class/getClassCircleRecordList',
			    headers:{
			    	UserID:this.userId,
					Tonken:this.token,
					DeviceID:'',
					OS:this.os
			    },
			    data:{
			    	classCircleId:this.classcircleid,
			    	readStatus:actives,
			    }
			  }).then((response)=> {
			  	console.log(response);
			    if(response.data.code==0){
			    	this.count = response.data.data.count;
			    	this.studentList = response.data.data.studentList;
			    }
			  }).catch((error)=> {
			    console.log(error);
			  });
         },
         //查看回复详情
         lookReply:function(id , name , remark){
         	localStorage.setItem("names" , name);
         	localStorage.setItem("remarks" , remark);
         	if(this.os == 0){	//安卓端
				window.android.toReplyDetail(id); //传值给安卓app方法
			}else{	//苹果端
				WebViewJavascriptBridge.callHandler('toReplyDetail1',id, function(response) { //传值给ios 
					
				});
			}
         }
        },
        created (){
        	this.aa();
        	
        	
        	setupWebViewJavascriptBridge(function(bridge) {
				
			})
        }
        
    }
</script>

<style lang="less" scoped>
    .tablist{
    	border-bottom: 1px solid #f2f2f2;
        font-size: 0.18rem;
        color: #999999;
        background: #ffffff;
        display: flex;
        height: 0.5rem;
        justify-content: space-around;
      div{
        box-sizing: border-box;
        height: 0.5rem;
        line-height:0.5rem;
      }
        .active{
          border-bottom:2px solid #0CC5AF;
          color: #0CC5AF;
        }
    }
    .list{
    	min-height: .2rem;
        box-sizing: border-box;
        margin:0.25rem .2rem 0 .2rem;
        border-radius: .03rem;
        background-color: #f7f7f7;
        .title-content{
        	color:#9D9D9D;
        	margin: .2rem 0 .2rem 0;
        }
        .parentDetails{
        	margin-top: .15rem;
        	margin-bottom: .15rem;
        }
        img{
        	height: .35rem;
        	border-radius:50%;
        }
        .parentDetails span{
        	vertical-align: middle;
        	line-height: .5rem;
        }
        .parentDetails span:first-child{
        	width: .35rem;
        	height: .35rem;
        }
        .parentDetails>div{
        	height: .5rem;
        }
    }
    .lists{
    	width: 100%;
    	padding:0.25rem .2rem 0 .2rem ;
    	margin: 0;
    }
    .chakan{
    	float: right;
    	color: #0CC5AF;
    }
</style>
