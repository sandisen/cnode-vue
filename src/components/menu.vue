<template>
	<nav class="menu_bar" :class="{'show':show}">
		<user-info></user-info>
		<ul class="menu_list">
			<li class="menu_item">
				<router-link :to="{name:'index',query:{tab:'all'}}">
					<i class="iconfont icon-quanbu"></i>全部
				</router-link>
			</li>
			<li class="menu_item">
				<router-link :to="{name:'index',query:{tab:'good'}}">
					<i class="iconfont icon-jinghua"></i>精华
				</router-link>
			</li>
			<li class="menu_item">
				<router-link :to="{name:'index',query:{tab:'share'}}">
					<i class="iconfont icon-share"></i>分享
				</router-link>
			</li>
			<li class="menu_item">
				<router-link :to="{name:'index',query:{tab:'ask'}}">
					<i class="iconfont icon-wenda"></i>问答
				</router-link>
			</li>
			<li class="menu_item">
				<router-link :to="{name:'index',query:{tab:'job'}}">
					<i class="iconfont icon-zhaopin"></i>招聘
				</router-link>
			</li>
			<li class="menu_item">
				<router-link :to="{name:'message'}">
					<i class="iconfont icon-xiaoxi"></i>消息
					<span class="message_count" ></span>
				</router-link>
			</li>
		</ul>
	</nav>
</template>
<style lang="less">
	@import '../style/menu.less';
</style>
<script type="text/javascript">
	//import {mapState} from 'vuex';
	import UserInfo from './userInfo';
	//import {messageCount} from '../apis/publicApi';
	export default {
		data(){
			return{
				//messageCount:0
			}
		},
		mounted(){
			//this.getMessageCount();
		},
		methods:{
			/*getMessageCount(){
				if(this.userInfo.loginname){
					messageCount({accesstoken:this.userInfo.accesstoken}).then((res) => {
						if(res.success){
							this.messageCount = res.data;
						}
					})
				}
			}*/
		},
		props:{
			show:Boolean
		},
		computed:{
			//...mapState(['userInfo'])
		},
		components:{
			UserInfo
		}
	}
</script>