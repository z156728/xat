<template>
	<div class="bgf7 margintop-overflow">
		<a href=""></a>
		<div class="main mt20" v-if="states">
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
		<div v-if="state">
			<div class="closes">
				<img src="../assets/img/menuClose.png"  class="imgsClose"/>
				<p class="textClose">菜谱已关闭</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { XTable } from 'vux'
	export default {
		name: 'foodmenu',
		components: {
			XTable
		},
		data() {
			return {
				states:false,
				state:false,
				foodMenuList: [],
				token: this.$route.params.foodMenus.split(',')[0],
				userId: this.$route.params.foodMenus.split(',')[1],
				schoolId: this.$route.params.foodMenus.split(',')[2],
				departmentId: this.$route.params.foodMenus.split(',')[3],
				os: this.$route.params.foodMenus.split(',')[4]
			}
		},
		methods: {
			foodMenuFun: function() {
				this.$axios({
					method: 'post',
					url: '/userHome/getMenu',
					headers: {
						UserID: this.userId,
						Tonken: this.token,
						DeviceID: '',
						OS: this.os
					},
					data:{
						schoolId:this.schoolId,
						departmentId:this.departmentId
					}
				}).then((response) => {
					console.log(response);
					if(response.data.code == 0) {
						if(response.data.data.menuId == '' ||response.data.data.menuId == undefined){
							this.states = false
							this.state = true
						}else{
							this.foodMenuList = response.data.data.menuContentList;
							this.states = true
							this.state = false
						}
						
						
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		created() {
			this.foodMenuFun()
		}
	}
</script>

<style lang="less" scoped>
	.mt20 {
		box-sizing: border-box;
		margin-top: 0.2rem;
	}
	.closes{
		width: 100%;
		height: 2rem;
		text-align:center;
		position: absolute;
		top: 48%;
		left: 50%;
		transform: translate(-50% , -50%);
	}
	.imgsClose{
		width:1.5rem;
		height:1.5rem;
	}
	.textClose{
		font-size: .18rem;
		color: #9d9d9d;
		margin-top: .15rem;
	}
	tbody {
		tr {
			td {
				p {
					color: #0CC5AF;
					height: 0.26rem;
					line-height: 0.26rem;
				}
			}
		}
	}
    tr td:first-child{
  	width:.5rem;
    }
</style>
