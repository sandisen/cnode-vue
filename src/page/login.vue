<template>
	<div>
		<nv-head title="登录"></nv-head>
		<section class="login">
			<div class="login_token">
				<input type="text" name="accesstoken" placeholder="Access Token" v-model="accesstoken" maxlength="36">
				<button class="btn btn_login" @click="handleLogin">登录</button>
			</div>
		</section>
	</div>
</template>

<style type="text/css" lang="less">
	@import '../style/login.less';
</style>

<script type="text/javascript">
	import $ from 'webpack-zepto'
	import nvHead from '../components/header'
	export default{
		data(){
			return {
				accesstoken:'',
				loginname:''
			}
		},
		methods:{
			handleLogin(){
				var v = this;
				$.ajax({
					url: 'https://cnodejs.org/api/v1/accesstoken',
					type: 'POST',
					dataType: 'json',
					data: {accesstoken:v.accesstoken},
					success:function (res){
						console.log(res);
      				v.loginname = res.loginname;
						//指定路由的跳转(可包含参数)，replace是替换当前路由，不会记录在history栈中
						v.$router.replace({name:'index'});
						//本地存储
						if(typeof localStorage === 'object'){
							try {
						       localStorage.setItem('localStorage', 1);
						       localStorage.removeItem('localStorage');
						   } catch (e) {
						       Storage.prototype._setItem = Storage.prototype.setItem;
						       Storage.prototype.setItem = function() {};
						       alert('您处于无痕浏览模式，请先关闭无痕浏览');
						   }
						}
						window.localStorage.setItem('name', res.loginname);
						window.localStorage.setItem('id', res.id);
						window.localStorage.setItem('url', res.avatar_url);
						window.localStorage.setItem('accesstoken', v.accesstoken);
					},
					error:function(err){
						console.log(err);
						alert('请检查您的accesstoken是否正确！');
					}
				})
				
			}
		},
		components:{
			nvHead
		}
	}
</script>
