<template>
	<div v-show="show" class="mask">
		<div class="loading">
			<i class="iconfont icon-loading"></i>
		</div>
	</div>
</template>

<style type="text/css" lang="less" scoped>
	@import "../style/loading.less";
</style>

<script type="text/javascript">
export default {
	props:{
		show:{
			type:Boolean,
			default:false
		}
	}
}
</script>