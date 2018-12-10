<template>
  <div class="bgf7 margintop-overflow">
  	<div class="menuList" v-if="lists">
  		<div class="lists" v-for="item in listss" @click="menuDetail(item.menuId , item.isShow)">
  			<p>{{item.menuName}}</p>
  			<img src="../assets/img/2432@2x.png" v-if="item.isShow == 1" />
  			<img src="../assets/img/3513@2x.png" v-else/>
  		</div>
  	</div>
  	
  	<!--内层菜谱详情-->
  	<div class="menuDetails" v-if="menuDetails">
  		<div style="height: .6rem;display: flex;align-items: center;" @click="returnsLists" v-if="fanhui">
  			<p class="returnStatus"> &nbsp;> 返回菜谱列表</p>
  		</div>
  		
	    <div class="header" v-show="have" v-if="haveTop">
	      <div class="main margintop-overflow" >
	        <div class="con">
	          <div>菜谱开放状态</div>
	          <div class="open" :class="{close:1==isopen}">
	            <div @click="check(isopen)" class="openclose"></div>
	          </div>
	        </div>
	        <p>菜谱在开放状态，家长可以进行查看。</p>
	        <p>修改菜谱内容，请在校安通校务后台进行修改。</p>
	      </div>
	    </div>
	    <div class="main mt20" v-show="have">
	      <x-table full-bordered style="background-color:#fff;">
	        <thead>
	        <tr>
	          <th></th>
	          <th>早餐</th>
	          <th>中餐</th>
	          <th>晚餐</th>
	        </tr>
	        </thead>
	        <tbody>
							<tr v-for="item in foodMenuList">
							<td v-if="item.weekDay == '1'">周一</td>
							<td v-else-if="item.weekDay == '2'">周二</td>
							<td v-else-if="item.weekDay == '3'">周三</td>
							<td v-else-if="item.weekDay == '4'">周四</td>
							<td v-else-if="item.weekDay == '5'">周五</td>
							<td v-else-if="item.weekDay == '6'">周六</td>
							<td v-else-if="item.weekDay == '7'">周日</td>
							<td>{{item.breakFast}}</td>
							<td>{{item.lunch}}</td>
							<td>{{item.dinner}}</td>
						</tr>
	        </tbody>
	      </x-table>
	    </div>
  	</div>
  	
    <!--缺省-->
		<div class="quesheng" v-show="haves">
			<div>
				<img src="../assets/img/notApply.png" />
				<p>暂无可操作菜谱</p>
			</div>
		</div>
    
  </div>
</template>

<script>
  import { XTable } from 'vux'
  export default {
    name: 'foodmenustate',
    components: {
      XTable
    },
    data(){
      return{
      	fanhui:false,
      	lists:true,
      	menuDetails:false,
      	have:false,
      	haveTop:false,
      	haves:false,
        isopen:2,
        listss:[],
        foodMenuList: [],
				token: this.$route.params.foodMenuStates.split(',')[0],
				userId: this.$route.params.foodMenuStates.split(',')[1],
				schoolMasterId: this.$route.params.foodMenuStates.split(',')[2],
				os: this.$route.params.foodMenuStates.split(',')[3]
      }
    },
    methods:{
    	//查询菜单列表
    	foodMenuLists: function() {
				this.$axios({
					method: 'post',
					url: '/menu/getMenu',
					headers: {
						UserID: this.userId,
						Tonken: this.token,
						DeviceID: '',
						OS: this.os
					}
				}).then((response) => {
					if(response.data.code == 0) {
						
						localStorage.setItem("lengths" , response.data.data.length);  //存储查询出来的数据有几条
						
						if(response.data.data.length == 0){	//查询结果为没有数据，显示缺省图
							this.lists = false;
							this.menuDetails = false;
							$('.menuDetails').hide();
							this.haves = true;
						}else if(response.data.data.length == 1){
							//先循环显示出来每条记录的id和显示状态
							for(var i=0;i<response.data.data.length;i++){
								this.menuIds = response.data.data[i].menuId
								this.isShows = response.data.data[i].isShow
							}
//							
							this.lists = false;
							this.menuDetail(this.menuIds , this.isShows)
						}else if(response.data.data.length > 1){	//如果查出来的数据长度大于1，那肯定是校长或部门校长
							//先循环显示出来每条记录的id和显示状态
							for(var i=0;i<response.data.data.length;i++){
								this.menuIds = response.data.data[i].menuId
								this.isShows = response.data.data[i].isShow
							}
							this.lists = true;
							this.listss = response.data.data;
						}
						
					}	
				}).catch((error) => {
					console.log(error);
				});
			},
			
      menuDetail: function(id , isShow) {
      	var lengths = localStorage.getItem("lengths");
      	this.lists = false;
      	if(lengths == 1){	//如果是查询出来的菜单数量等于1  那就不能返回
      	//先进行具体的详情查询，再根据
      		this.$axios({
						method: 'post',
						url: '/menu/getMenuList',
						headers: {
							UserID: this.userId,
							Tonken: this.token,
							DeviceID: '',
							OS: this.os
						},
						data: {
				      menuId:id
				    }
					}).then((response) => {
						if(response.data.code == 0) {	//请求成功
							this.departmentLevel = response.data.data.departmentLevel;
							this.menuId = response.data.data.menuId;
							
							
							
							if(isShow == 1){	//isshow 表示菜谱开放状态，1表示开放，都能看，
			      		this.isopen=2;
			      		this.foodMenuList = response.data.data.menuList;
			      		this.menuDetails = true;
								this.have = true;
			      		//根据返回的等级，判断是否可以操作和显示数据
			      		if(this.departmentLevel == "0"){	//意思是没有操作权限，只能看
			      			this.haveTop = false;
			      		}else{	//意思是可以操作
			      			this.haveTop = true;
			      		}
			      	}else{	//2表示不开放，只有校长和部门校长能看，其他人都不能看
			      		this.isopen=1;
			      		if(this.departmentLevel == 0){	//不是负责人	//啥都没得看
			      			this.menuDetails = false;
									$('.menuDetails').hide();
									this.haves = true;
			      		}else{	//是负责人
			      			this.foodMenuList = response.data.data.menuList;
			      			this.menuDetails = true;
									this.have = true;
			      			this.haveTop = true;
			      		}
			      	}
							
						}else if(response.data.code == 1){
							
						}
					}).catch((error) => {
						console.log(error);
					});
      	}else if(lengths > 1){	//如果数量大于1，证明这是负责人的号，，啥操作权限和返回按钮都在
      		this.fanhui = true;
      		//先进行具体的详情查询，再根据
      		this.$axios({
						method: 'post',
						url: '/menu/getMenuList',
						headers: {
							UserID: this.userId,
							Tonken: this.token,
							DeviceID: '',
							OS: this.os
						},
						data: {
				      menuId:id
				    }
					}).then((response) => {
						if(response.data.code == 0) {	//请求成功
							this.departmentLevel = response.data.data.departmentLevel;
							this.foodMenuList = response.data.data.menuList;
							this.menuDetails = true;
		      		this.have = true;
		      		this.haveTop = true;
							this.menuId = response.data.data.menuId;
							console.log(response)
							if(isShow == 1){	//isshow 表示菜谱开放状态，1表示开放，都能看，
			      		this.isopen=2;
			      	}else{	//2表示不开放，只有校长和部门校长能看，其他人都不能看
			      		this.isopen=1;
			      	}
						}else if(response.data.code == 1){
							
						}
					}).catch((error) => {
						console.log(error);
					});
					
      	}
      	
      	this.menusIds = id;
			},
			//点击返回菜单列表
			returnsLists:function(){
				this.menuDetails = false;
				this.lists = true;
				this.foodMenuLists();
			},
			//改变按钮状态
			check:function (index) {
        if(index==1){
          this.isopen=2;
        }else{
          this.isopen=1;
        }
        this.$axios({
					method: 'post',
					url: '/menu/updateMenuStatus',
					headers: {
						UserID: this.userId,
						Tonken: this.token,
						DeviceID: '',
						OS: this.os
					},
					data:{
						menuStatus:index.toString(),
						menuId:this.menusIds
					}
				}).then((response) => {
					console.log(response);
					if(response.data.code == 0) {
						console.log("成功啦")
					}
				}).catch((error) => {
					console.log(error);
				});
        
      }
    },
    created(){
    	this.foodMenuLists()
    }
  }
</script>

<style lang="less" scoped>
.bgf7{
	background: #f7f7f7;
}
.menuList{
	margin-top: .12rem;
	.lists{
		margin: .12rem .1rem 0 .1rem;
		height: .6rem;
		background-color: #fff;
		line-height: .6rem;
		p{
			margin-left: .15rem;
			display: inline;
		}
		img{
			float: right;
			margin-right: .15rem;
			width: .45rem;
		}
	}
	
}
  .header{
    height: 0.93rem;
    background: #ffffff;
    p{
      color: #999999;
      font-size: 0.13rem;
    }
    .con{
      display: flex;
      justify-content: space-between;
      margin-top:0.15rem;
      .open{
        width: 0.51rem;
        height: 0.32rem;
        background: #0CC5AF;
        border-radius: 0.6rem;
        position: relative;
        .openclose{
            width: 0.28rem;
            height: 0.28rem;
            border-radius: 50%;
            background: #ffffff;
            position: absolute;
            right: 0.02rem;
            top:0.02rem
        }
      }
      .close{
        background: #E5E5EA;
        .openclose{
          left: 0.02rem;
          top:0.02rem
        }
      }
    }
  }
  .mt20{
    box-sizing: border-box;
    margin-top:0.2rem;
  }
  tbody{
    tr{
      td{
        p{
          color: #0CC5AF;
          height: 0.26rem;
          line-height:0.26rem;
        }
      }
    }
  }
  .returnStatus{
  	width: 1.5rem;
  	height:.35rem;
  	background-color: #FF9800;
  	display: block;
  	line-height: .35rem;
  	color: white;
  	border-top-right-radius: .2rem;
  	border-bottom-right-radius: .2rem;
  }
  tr td:first-child{
  	width:.5rem;
  }
</style>
