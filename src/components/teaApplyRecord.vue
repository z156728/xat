<template>
	<div class="bgf7">
		<div class="tablist">
			<div v-bind:class="{active:0==isactive}" @click="apply(0)">申请中</div>
			<div v-bind:class="{active:1==isactive}" @click="apply(1)">已办理</div>
		</div>

		<div class="list" v-show="have" v-for="item in applyRecordLists">
			<div class="con">
				<div style="margin-bottom:0.09rem;">
					<span v-if="item.headImg != '' && item.headImg.indexOf('http') == -1">
						<img :src="'http://xatzht.sxxat.com/files/'+item.headImg" alt="">
					</span>
					<span v-else-if="item.headImg != '' && item.headImg.indexOf('http') != -1">
						<img :src="item.headImg" alt="">
					</span>
					<span v-else>
						<img src="../assets/img/children.png" alt="">
					</span>
					<span>{{item.studentName}}</span>
				</div>
				<div class="mt">
					<span>申请时间：</span>{{item.applyTime}}
				</div>
				<div class="mt">
					<span>支付方式：</span>
					<span v-if="item.payType== '1'">微信</span>
					<span v-else-if="item.payType== '2'">支付宝</span>
				</div>
				<div class="mt">
					<span>支付金额：</span>{{item.payAmount}}
				</div>
			</div>
		</div>
		<!--缺省-->
		<div class="quesheng" v-show="haves">
			<div>
				<img src="../assets/img/notApply.png" />
				<p>暂无申请</p>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'applyrecord',
		data() {
			return {
				have: false,
				haves: false,
				isactive: 0,
				applyRecordLists: [],
				token: this.$route.params.teaApplyRecords.split(',')[0],
				userId: this.$route.params.teaApplyRecords.split(',')[1],
				os: this.$route.params.teaApplyRecords.split(',')[3]
			}
		},
		methods: {
			apply: function(index) {
				this.isactive = index.toString()
				
				this.$axios({
					method: 'post',
					url: '/student/getStudentApplyListNew',
					headers: {
						UserID: this.userId,
						Tonken: this.token,
						DeviceID: '',
						OS: this.os
					},
					data: {
						applyStatus: this.isactive
					}
				}).then((response) => {
					console.log(response);
					if(response.data.code == 0) {
						this.applyRecordLists = response.data.data;
						if(this.applyRecordLists.length == 0) {
							this.have = false
							this.haves = true
						} else {
							this.have = true
							this.haves = false
						}

					}
				}).catch((error) => {
					console.log(error);
				});

			},
		},

		created() {
			this.apply("0");
		}
	}
</script>

<style lang="less" scoped>
	.tablist {
		font-size: 0.17rem;
		color: #999999;
		background: #ffffff;
		display: flex;
		height: 0.44rem;
		justify-content: space-around;
		div {
			box-sizing: border-box;
			height: 0.44rem;
			line-height: 0.44rem;
		}
		.active {
			border-bottom: 2px solid #0CC5AF;
			color: #0CC5AF;
		}
	}
	
	.list {
		box-sizing: border-box;
		width: 3.53rem;
		height: 1.42rem;
		background: #ffffff;
		margin: 0 auto;
		border: 1px solid #F1F1F1;
		margin-top: 0.12rem;
		.con {
			width: 3.25rem;
			margin: 0 auto;
			margin-top: 0.14rem;
			img {
				width: 0.35rem;
				height: 0.35rem;
				border-radius: 50%;
				margin-right: 0.05rem;
			}
			.mt {
				margin-top: 0.04rem;
				span {
					color: #999999;
					margin-right: 0.1rem;
				}
			}
		}
	}
	.bgf7{
		background-color: #f7f7f7;
	}
</style>