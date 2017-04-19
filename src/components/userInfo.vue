<template>
	<div class="user_info">
		<!-- 未登录 -->
		<div class="login_no" v-if="!loginname">
			<router-link :to="{name:'login'}">
				<i class="iconfont icon-denglu"></i>登录
			</router-link>
		</div>
		<!-- 已登录 -->
		<div v-else class="login_yes">
			<router-link :to="{name:'index',query:{tab:'all'}}">
				<img v-if="avatar_url" :src="avatar_url">
				<span class="login_name" v-text="loginname"></span>
				<span class="login_out" @click="handleLoginOut">退出</span>
			</router-link>
		</div>
	</div>
</template>
<style lang='less' scoped>
	.login_no a{
		font-size: 1.4rem;
		color: #313131;
		padding: 24px;
		display: block;
		border-bottom: 1px solid #80bd01;
		.iconfont{
			margin-right: 30px;
			color: #80bd01;
		}
	}
	.login_yes {
		padding: 20px 15px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border-bottom: 1px solid #80bd01;
		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			margin-right: 15px;
			vertical-align: middle;
		}
		.login_name{
			flex: 1;
			margin-right: 5px;
		}
		.login_out{
			color: #337ab7;
		}
	}
</style>
<script type="text/javascript">
	export default {
		data(){
			return{
				//userInfo:{}
				loginname:'',
				avatar_url:''
			}
		},
		mounted(){
			var v = this;
			//获取路由传过来的参数
			//var userInfo = v.$route.params.res;
			//v.userInfo = userInfo; 
			v.loginname = localStorage.getItem('name');
			v.avatar_url = localStorage.getItem('url');
		},
		methods:{
			handleLoginOut(){
				//刷新页面
				this.$router.go();
				//清除缓存
				localStorage.removeItem('name');
				localStorage.removeItem('url');
				localStorage.removeItem('id');
				localStorage.removeItem('accesstoken');
			}
		}
	}
</script>