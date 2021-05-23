<template>
	<div class="topMsgBox">
		<div class="msgBoxList tLeftMsg">
			<div class="lmsgContent">
				<div class="declaration">【功能介绍及规则说明】</div>
				<div v-if="leftData && leftData.list.length > 0">
					<div class="rightIntroduce" v-for="item in leftData.list">
						<div class="rightTitle">
							{{ item.title }}
						</div>
						<div class="rightTitleTime">
							发布时间：{{ item.createTime }}
						</div>
					</div>
					<paginaTion :totalNum="leftData.total" @paginaClick="paginaClick"></paginaTion>
				</div>
				<noData v-else></noData>
			</div>
		</div>
		<div class="msgBoxList tRightMsg">
			<div class="declaration" v-if="types == 1">【待退款金额试算】</div>
			<div class="declaration" v-if="types == 2">【广告充值金额试算】</div>
			<div class="declaration" v-if="types == 3">【本土回款金额试算】</div>
			<div  v-if="types < 3">
				<div class="inputMoney">
					<span class="ltitleas">我需要转账的金额（当地货币）：</span>
					<input type="text" v-model="inputVal" maxlength="10">
				</div>
				<div class="inputMoney" style="font-size: 1.6rem;">
					<span class="ltitleas">
						我需要支付的金额（人民币）：（
						<span>{{ isNaN(Number(inputVal))?'0': inputVal}}</span>+{{ arithmetic.customerPoundage }}
						)÷{{ arithmetic.customerRate }}%+{{ arithmetic.customerServer }}=<span>{{ result }}RMB</span>
					</span>
				</div>
				<div class="explain">
					计算公式：（退款金额+银行手续费）÷ 汇率 + 服务费 = 需支付金额（人民币）
				</div>
				<div class="explain">
					系数：银行手续费{{ arithmetic.customerPoundage }}元/笔（台币） 汇率：{{ arithmetic.customerRate }}% 转账手续费：{{ arithmetic.customerServer }}元笔（人民币）
				</div>
			</div>
			<!-- 本土回款 -->
			<div  v-if="types == 3">
				<div class="inputMoney">
					<span class="ltitleas">我需要回款的店铺数量：</span>
					<input type="text" v-model="dpInput" maxlength="3">
				</div>
				<div class="inputMoney">
					<span class="ltitleas">我需要回款的预计金额（当地货币）：</span>
					<input type="text" v-model="inputVal" maxlength="7">
				</div>
				<div class="inputMoney" style="font-size: 1.6rem;">
					<span class="ltitleas">
						预计回款到账的金额（人民币）：
						<span>
						{{ isNaN(Number(inputVal))?'0': inputVal}}</span>
						×(1-{{ arithmetic.customerPoundage }}%)÷{{ arithmetic.customerRate }}+
						<span>{{ isNaN(Number(dpInput))?'0': dpInput}}</span>×{{ arithmetic.customerServer }}=<span>{{ fund }}RMB</span>
					</span>
				</div>
				<div class="explain">
					计算公式：计算公式:回款金额×(1-百分比手续费)÷汇率+店铺数量×对账手续费/店
				</div>
				<div class="explain">
					系数：百分比手续费{{ arithmetic.customerPoundage }}%    汇率：{{ arithmetic.customerRate }}    转账手续费：{{ arithmetic.customerServer }}元/笔（人民币）
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import noData from '../../../components/noData.vue'
	export default {
		props:['types'],
		components:{
			noData
		},
	    data(){
	        return{
	            inputVal: 200,
				dpInput: 10,
	            tableData: [{}],
				leftData: '',
				pageNum: 1,
				arithmetic: ''
	        }
	    },
	    computed:{
	        result(){
				if (isNaN(Number(this.inputVal))) {
					// 汉字
					return '计算错误'
				} else{
					// 数字
					const money = Number(this.inputVal) + Number(this.arithmetic.customerPoundage)
					const parities = money / (Number(this.arithmetic.customerRate) / 100)
					const data = parities + Number(this.arithmetic.customerServer)
					return data.toFixed(2)
				}
	        },
			fund(){
				if (isNaN(Number(this.inputVal)) && isNaN(Number(this.dpInput))) {
					// 汉字
					return '计算错误'
				} else{
					// 数字200×1-3%÷4+10×6
					const money = Number(this.inputVal) * ( 1 - (Number(this.arithmetic.customerPoundage) / 100) ) / Number(this.arithmetic.customerRate) + Number(this.dpInput) * Number(this.arithmetic.customerServer)
					return money.toFixed(2)
				}
	        },
			pathId(){
				return this.$route.params.id
			}
	    },
		mounted() {
			// console.log(this.types)
			this.getLeftData()
			this.getArithmetic()
		},
		watch:{
			pathId(newData){
				// 监听路由动态参数变化
				this.getArithmetic(newData)
			}
		},
	    methods:{
	        paginaClick(val){
	        	this.pageNum = val
	        	this.getLeftData()
	        },
	        getLeftData(){
	        	this.$request.postJson('/config/rule', {
	        		pageSize: 1,
	        		pageNum: this.pageNum
	        	}).then(res=>{
	        		if(res.code == 200){
	        			this.leftData = res.data
	        		}
	        	})
	        },
			getArithmetic(data){
				this.$request.get('/common/getRate', {
					orderType: this.types - 1,
					stationId: data?data:this.pathId
				}).then(res=>{
					if(res.code == 200){
						if(res.data){
							this.arithmetic = res.data
						} else {
							this.arithmetic = {
								customerPoundage: 0,
								customerRate: 0,
								customerServer: 0
							}
						}
					}
				})
			}
	    }
	}
</script>

<style scoped="scoped" lang="scss">
	.topMsgBox {
		width: 100%;
		display: flex;
		justify-content: space-between;
		white-space: nowrap;

		.msgBoxList {
			width: 72rem;
			height: 27rem;
			border-radius: 3px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			position: relative;
			padding: 2rem 3rem;
			background: #FFFFFF;
		}

		.tLeftMsg {
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				bottom: 0;
				background-image: url(../../../assets/image/login/bg2.png);
				background-position: 41rem 7rem;
				background-repeat: no-repeat;
				background-size: 25rem 18rem;
				opacity: 0.5;
				z-index: 2;
			}
		}

		.tRightMsg {
			background: #7CD0FF;

			.declaration {
				background: #FFFFFF;
				color: #383535;
				padding: 1rem;
				border-radius: 3px;
				font-size: 1.6rem;
				display: inline-block;
			}

			.inputMoney {
				margin-top: 1rem;

				.ltitleas {
					color: #F6F7F8;
					font-size: 1.8rem;

					span {
						color: #333333;
					}
				}

				input {
					border: none;
					outline: none;
					margin-left: 2rem;
					border-radius: 3px;
					padding: 0 10px;
					height: 3rem;
				}
			}

			.explain {
				color: #333333;
				font-size: 1.6rem;
				margin-top: 0.6rem;
			}
		}

		.lmsgContent {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			padding: 2rem 3rem;
			z-index: 3;

			.declaration {
				padding: 1rem;
				border-radius: 3px;
				background: rgba(30, 135, 240, 0.6);
				color: #FEFEFE;
				font-size: 1.6rem;
				display: inline-block;
			}

			.rightIntroduce {
				width: 45rem;
				margin-top: 2rem;
				margin-bottom: 3rem;

				.rightTitle {
					width: 100%;
					margin-bottom: 1.6rem;
					font-size: 1.8rem;
					height: 5rem;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					white-space: pre-wrap;
					text-overflow: ellipsis;
					line-height: 2.5rem;
					text-align: justify;
				}

				.rightTitleTime {
					color: #6B6767;
					font-size: 1.8rem;
					word-spacing: 2rem;
					width: 100%;
					text-align: left;
				}
			}
		}
	}
</style>
