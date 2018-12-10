<template>
	<div class="bgf7 margintop-overflow">
		<div class="main">
			<div class="header">
				<p>{{exampName}}</p>
				<div class="time">{{dates}} 发布</div>
			</div>
			<div class="con" >
				<table cellspacing="0" >
					<tbody>
						<tr v-for="item in resultDetailList">
							<td>{{item.subjectName}}</td>
							<td>{{item.score}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'resultdetails',
		data() {
			return {
				exampName:'',
				dates:'',
				resultDetailList: [],
				token: this.$route.params.resultdetailnews.split(',')[0],
				userId: this.$route.params.resultdetailnews.split(',')[1],
				studentId: this.$route.params.resultdetailnews.split(',')[2],
				recordid: this.$route.params.resultdetailnews.split(',')[3],
				os: this.$route.params.resultdetailnews.split(',')[4]
			}
		},
		methods: {
			applyDetail: function() {
				this.$axios({
					method: 'post',
					url: '/userHome/getAchievementDetByIdNew',
					headers: {
						UserID: this.userId,
						Tonken: this.token,
						DeviceID: '',
						OS: this.os
					},
					data: {
						studentId: this.studentId,
						achievementId: this.recordid
					}
				}).then((response) => {
					console.log(response);
					if(response.data.code == 0) {
						this.resultDetailList = response.data.data.scoreList;
						this.exampName = response.data.data.examinationName;
						this.dates = response.data.data.publishTime;
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		created() {
			this.applyDetail()
		}
	}
</script>

<style lang="less" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		margin-top: 0.24rem;
		p {
			font-size: 0.17rem;
			font-weight: bold;
		}
		.time {
			font-size: 0.13rem;
			color: #999999;
		}
	}
	table{
		margin-top: .3rem;
		
	}
	tr{
		width: 3.45rem;
		height: .35rem;
		line-height: .35rem;
	}
	td{
		border: 1px solid #d0d0d0;
		width: 50%;
		text-align: center;
	}
	td:first-child{
		width: 1.8rem;
		background-color: #f6f6f6;
	}
</style>
