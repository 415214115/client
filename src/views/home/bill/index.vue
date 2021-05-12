<template>
	<div class="pageHome">
        <userInfo></userInfo>
        <div class="billTabel">
            <div class="billTitle">【账单记录】</div>
            <div class="selectorBox">
                <span class="titles">起止时间：</span>
                <el-date-picker
                    size="mini"
                    v-model="selector.date"
                    type="daterange"
                    range-separator="-"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="selectorBox">
                <span class="titles">账单类型：</span>
                <div class="btnsList selectBtns">全部</div>
                <div class="btnsList">充值</div>
                <div class="btnsList">提现</div>
                <div class="btnsList">代退账</div>
                <div class="btnsList">广告充值</div>
                <div class="btnsList">本土回款</div>
                <div class="btnsList">返现</div>
            </div>
            <div class="selectorBox">
                <span class="titles">收支类型：</span>
                <div class="btnsList selectBtns">全部</div>
                <div class="btnsList">收入</div>
                <div class="btnsList">支出</div>
            </div>
            <div class="selectorBox">
                <span class="titles">账单状态：</span>
                <div class="btnsList selectBtns">全部</div>
                <div class="btnsList">已到账</div>
                <div class="btnsList">审核中</div>
            </div>
            <div class="tabels">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="date" label="账单类型"></el-table-column>
                    <el-table-column prop="date" label="账单单号"></el-table-column>
                    <el-table-column prop="date" label="金额"></el-table-column>
                    <el-table-column prop="date" label="返现"></el-table-column>
                    <el-table-column prop="date" label="交易方式"></el-table-column>
                    <el-table-column prop="date" label="钱包余额"></el-table-column>
                    <el-table-column prop="date" label="提交时间"></el-table-column>
                </el-table>

		        <paginaTion :totalNum="0" @paginaClick="paginaClick"></paginaTion>

            </div>
        </div>
		<!-- <card>
            <template slot="content">
                123123
            </template>
        </card> -->
	</div>

</template>

<script>
	import userInfo from '../components/userInfo.vue'
	// import introduce from './components/introduce.vue'
	// import news from './components/news.vue'
	export default {
		components: {
			userInfo,
			// introduce,
			// news
		},
		data() {
			return {
                selector:{
                    date: []
                },
                tableData: []
			}
		},
		mounted() {
            this.$store.getters.getBreadcrumb.push('收支账单')

		},
		watch: {},
		methods: {
			queryFunc() {
				this.getBannerData()
			},
			paginaClick(val) {
				console.log(val)
			},
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.pageHome {
		width: 100%;
        .billTabel{
            width: 100%;
            padding: 2rem 4rem;
            background: #46b2ec70;
            border-radius: 10px;
            .billTitle{
                color: #383535;
                font-size: 1.8rem;
                font-weight: bold;
            }
            .selectorBox{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                white-space: nowrap;
                align-items: center;
                margin-top: 1.5rem;
                .titles{
                    font-size: 1.8rem;
                    color: #F6F7F8;
                    padding-left: 1rem;
                }
                .btnsList{
                    padding: 0.2rem 1rem;
                    text-align: center;
                    color: #F6F7F8;
                    border: 1px solid #F6F7F8;
                    font-size: 1.8rem;
                    border-radius: 5px;
                    margin-left: 1.5rem;
                    cursor: pointer;
                }
                .selectBtns{
                    background: #FFB30F;
                    border: 1px solid #FFB30F;
                }
            }
            .tabels{
                margin-top: 2rem;
            }
        }
	}

	
</style>
