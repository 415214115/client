<template>
	<div class="topMsgBox">
		<div class="msgBoxList tLeftMsg">
			<div class="lmsgContent">
				<div class="declaration">【功能介绍及规则说明】</div>
				<div class="rightIntroduce">
					<div class="rightTitle">
						跨境电子商务是基于网络发展起来的，网络空间相对于物理空间来说是一个新空间网络空间相对于物理空间来说是一个新空间网络空间相对于物理空间来说是一个新空间网络空间相对于物理空间来说是一个新空间网络空间相对于物理空间来说是一个新空间
					</div>
					<div class="rightTitleTime">
						发布时间：2021-5-11 11:34:05
					</div>
				</div>
				<paginaTion :totalNum="0" @paginaClick="paginaClick"></paginaTion>
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
					<span class="ltitleas">我需要支付的金额（人民币）：（<span>{{ isNaN(Number(inputVal))?'0': inputVal}}</span>+15)÷4+6=<span>{{ result }}RMB</span></span>
				</div>
				<div class="explain">
					计算公式：（退款金额+银行手续费）÷ 汇率+服务费=需支付金额（人民币）
				</div>
				<div class="explain">
					系数：银行手续费15元/笔（台币） 汇率：4 转账手续费：6元笔（人民币）
				</div>
			</div>
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
						<span>{{ isNaN(Number(inputVal))?'0': inputVal}}</span>×(1-3%)÷4+<span>{{ isNaN(Number(dpInput))?'0': dpInput}}</span>×6=<span>{{ fund }}RMB</span>
					</span>
				</div>
				<div class="explain">
					计算公式：计算公式:回款金额×(1-百分比手续费)÷汇率+店铺数量×对账手续费/店
				</div>
				<div class="explain">
					系数：百分比手续费3    汇率：4    转账手续费：6元/笔（人民币）
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		props:['types'],
	    data(){
	        return{
	            inputVal: 200,
				dpInput: 10,
	            tableData: [{}]
	        }
	    },
	    computed:{
	        result(){
				if (isNaN(Number(this.inputVal))) {
					// 汉字
					return '计算错误'
				} else{
					// 数字
					const money = Number(this.inputVal) + 15
					const parities = money / 4
					const data = parities + 6
					return data.toFixed(2)
				}
	        },
			fund(){
				if (isNaN(Number(this.inputVal)) && isNaN(Number(this.dpInput))) {
					// 汉字
					return '计算错误'
				} else{
					// 数字200×1-3%÷4+10×6
					const money = Number(this.inputVal) * ( 1 - 0.03 ) / 4 + Number(this.dpInput) * 6
					return money.toFixed(2)
				}
	        },
	    },
		mounted() {
			// console.log(this.types)
		},
	    methods:{
	        paginaClick(val){
	
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
