<template>
	<div>
		<el-card :body-style="bodyStyle">
			<div slot="header" class="clearfix" v-if="title">
				<i class="leftIcon" v-if="leftIcon" :class="leftIcon?leftIcon:'el-icon-s-data'" :style="{color: iconColor,transform: `rotate(${iconDeg}deg)`}"></i>
			    <span>{{ title }}</span>
			    <i class="rightIcon" v-if="rightIcon" :class="rightIcon?rightIcon:'el-icon-more'" :style="{color: iconColor,transform: `rotate(${iconDeg}deg)`}"></i>
			  </div>
			<!-- <slot name="hraders"></slot> -->
			<slot name="content"></slot>
			<slot name="footer"></slot>
		</el-card>
	</div>
	
</template>

<script>
	export default{
		props:['title','leftIcon','rightIcon','iconDeg','iconColor','bodyStyle'],
		data(){
			return {
				
			}
		},
		mounted() {
			// console.log(this.bodyStyle)
		}
	}
</script>

<style scoped="scoped">
	.leftIcon{
		margin-right: 15px;
	}
	.rightIcon{
		float: right;
		cursor: pointer;
	}
</style>
