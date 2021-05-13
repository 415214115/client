<template>
   <div class="unluckily">
	   <topMsg types="3"></topMsg>
       <div class="cardTabel">
           <el-card>
               <div slot="header">
                   <span class="issueTitle">发布中心</span>
                   <el-button type="warning" size="mini" class="issueBtn">发布需求</el-button>
               </div>
               <div class="handleBox">
				   <div class="handleList" v-for="(item, index) in navList" :key="index" :class="navIndex==index?'selects':''" @click="selectorNav(index)">{{ item }}</div>
               </div>
              <orderTabel v-if="navIndex == 0"></orderTabel>
			  <proceedTabel v-if="navIndex == 1"></proceedTabel>
			  <statementTabel v-if="navIndex == 2"></statementTabel>
			  <disputeTabel v-if="navIndex == 3"></disputeTabel>
			  <endTabel v-if="navIndex == 4"></endTabel>
           </el-card>
       </div>
   </div>
</template>
<script>
	import topMsg from '../components/topMsg.vue'
	import orderTabel from './components/orderTabel.vue'
	import proceedTabel from './components/proceedTabel.vue'
	import statementTabel from './components/statementTabel.vue'
	import disputeTabel from './components/disputeTabel.vue'
	import endTabel from './components/endTabel.vue'
export default {
	components:{
		topMsg,
		orderTabel,
		proceedTabel,
		statementTabel,
		disputeTabel,
		endTabel
	},
    data(){
        return{
            inputVal: 200,
            tableData: [{}],
			navList:['回款订单','进行中', '待结算', '争议中', '已完结'],
			navIndex: 0
        }
    },
	computed:{
		pathId(){
			return this.$route.params.id
		}
	},
	watch:{
		pathId(newData){
			// 监听路由动态参数变化
			console.log(newData)
		}
	},
	mounted() {
		// 获取路由动态参数
		console.log(this.pathId)
	},
    methods:{
        paginaClick(val){

        },
		selectorNav(i){
			this.navIndex = i
		}
    }
}
</script>
<style lang="scss" scoped>
    .unluckily{
        width: 100%;
  //       .topMsgBox{
  //           width: 100%;
  //           display: flex;
  //           justify-content: space-between;
  //           white-space: nowrap;
  //           .msgBoxList{
  //               width: 72rem;
  //               height: 27rem;
  //               border-radius: 3px;
  //               box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  //               position: relative;
  //               padding: 2rem 3rem;
  //               background: #FFFFFF;
  //           }
  //           .tLeftMsg{
  //               &::after{
  //                   content: '';
  //                   position: absolute;
  //                   width: 100%;
  //                   height: 100%;
  //                   top: 0;
  //                   bottom: 0;
  //                   background-image: url(../../../assets/image/login/bg2.png);
  //                   background-position: 41rem 7rem;
  //                   background-repeat: no-repeat;
  //                   background-size: 25rem 18rem;
  //                   opacity: 0.5;
  //                   z-index: 2;
  //               }
  //           }
  //           .tRightMsg{
  //               background: #7CD0FF;
  //               .declaration{
  //                   background: #FFFFFF;
  //                   color: #383535;
  //                   padding: 1rem;
  //                   border-radius: 3px;
  //                   font-size: 1.6rem;
  //                   display: inline-block;
  //               }
  //               .inputMoney{
  //                   margin-top: 2rem;

  //                   .ltitleas{
  //                       color: #F6F7F8;
  //                       font-size: 1.8rem;
  //                       span{
  //                           color: #333333;
  //                       }
  //                   }
  //                   input{
  //                       border: none;
  //                       outline: none;
  //                       margin-left: 2rem;
  //                       border-radius: 3px;
  //                       padding: 0 10px;
  //                       height: 3rem;
  //                   }
  //               }
  //               .explain{
  //                   color: #333333;
  //                   font-size: 1.6rem;
  //                   margin-top: 2rem;
  //               }
  //           }
  //           .lmsgContent{
  //               width: 100%;
  //               height: 100%;
  //               position: absolute;
  //               left: 0;
  //               right: 0;
  //               top: 0;
  //               bottom: 0;
  //               margin: auto;
  //               padding: 2rem 3rem;
  //               z-index: 3;
  //               .declaration{
  //                   padding: 1rem;
  //                   border-radius: 3px;
  //                   background: rgba(30,135,240,0.6);
  //                   color: #FEFEFE;
  //                   font-size: 1.6rem;
  //                   display: inline-block;
  //               }
  //               .rightIntroduce{
		// 	width: 45rem;
  //           margin-top: 2rem;
  //           margin-bottom: 3rem;
		// 	.rightTitle{
		// 		width: 100%;
		// 		margin-bottom: 1.6rem;
		// 		font-size: 1.8rem;
		// 		height: 5rem;
		// 		word-break: break-all;
		// 		      display: -webkit-box;
		// 		      -webkit-box-orient: vertical;
		// 		      -webkit-line-clamp: 2;
		// 		      overflow: hidden;
		// 		      white-space: pre-wrap;
		// 		      text-overflow: ellipsis;
		// 			  line-height: 2.5rem;
		// 			  text-align: justify;
		// 	}
		// 	.rightTitleTime{
		// 		color: #6B6767;
		// 		font-size: 1.8rem;
		// 		word-spacing: 2rem;
		// 		width: 100%;
		// 		text-align: left;
		// 	}
		// }
  //           }
  //       }
        .cardTabel{
            width: 100%;
            margin-top: 2rem;
            .issueTitle{
                color: #3E3E3E;
                font-size: 1.7rem;
                font-weight: bold;
            }
            .issueBtn{
                float: right;
                margin-top: -.5rem;
            }
            .handleBox{
                display: flex;
                justify-content: flex-start;
                white-space: nowrap;
                .handleList{
                    position: relative;
                    color: #999999;
                    font-size: 1.7rem;
                    padding: 1rem 0;
                    margin-right: 6rem;
                    cursor: pointer;
                }
                .selects{
                    &::after{
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 0.2rem;
                        background: #E60012;
                        left: 0;
                        bottom: 0;
                    }
                }
            }
        }
    }
</style>