<template>
	<div>
		<nv-head title="用户信息"></nv-head>
		<section class="user_page">
			<div class="info">
				<img :src="userInfo.avatar_url" alt="头像">
				<span class="name" v-text="userInfo.loginname"></span>
				<div class="bottom">
					<span class="time">{{userInfo.create_at}}</span>
					<span class="score">积分：{{userInfo.score}}</span>
				</div>
			</div>
			<div class="user_active">
					<ul class="tab">
						<li class="tab_item" :class="{active:activeItem === 1}" @click="handleTabChange(1)">最近参与</li>
						<li class="tab_item" :class="{active:activeItem === 2}" @click="handleTabChange(2)">最新发布</li>
					</ul>
					<div class="active_content" v-for="item of currentData">
						<router-link class="head" :to="{name:'user',params:{loginname:item.author.loginname}}">
							<img :src="item.author.avatar_url" alt="">
						</router-link>
						<router-link class="right" :to="{name:'topic',params:{id:item.id}}">
							<span class="topic_title">{{item.title}}</span>
							<span class="topic_bottom">
								<span class="name" v-text="item.author.loginname"></span>
								<span class="time">{{item.last_reply_at}}</span>
							</span>
						</router-link>
					</div>
					<div class="no_data" v-show="noData">
						<i class="iconfont icon-empty"></i>暂无数据！
					</div>
				</div>
		</section>
		<nv-top></nv-top>
		<!-- <nv-load :show="showLoad"></nv-load> -->
	</div>
</template>

<style type="text/css" lang="less" scoped>
	@import '../style/user.less';
</style>

<script type="text/javascript">
	import nvHead from '../components/header'
	import nvTop from '../components/backTop'
	import nvLoad from '../components/loading'
	export default {
		data() {
			return {
				loginname:'',
				currentData:[],
				activeItem:1,
				noData:false,
				userInfo:{}
			}
		},
		mounted(){
			var loginname = this.$route.params.loginname;
			this.loginname = loginname;
			this.getUserInfo();
		},
		watch:{
			'$route'(to,from){
				if(to.params.loginname !== from.params.loginname){
					this.getUserInfo();
				}
			}
		},
		methods:{
			handleTabChange(index){
				this.activeItem = index;
				this.currentData = index === 1 ? this.userInfo.recent_replies : this.userInfo.recent_topics;
				this.noData = this.currentData.length === 0;
			},
			getUserInfo(){
				var v =this;
				$.ajax({
					url:'https://cnodejs.org/api/v1/user/'+v.loginname,
				   type:'GET',
				   dataType:'json',
				   success:function(res){
				   	console.log(res.data);
				   	res.data.create_at = v.$filter.getDateDiff(new Date(res.data.create_at));
				   	res.data.recent_replies.map(function(item){
				   		item.create_at = v.$filter.getDateDiff(new Date(item.create_at));
				   		item.last_reply_at = v.$filter.getDateDiff(new Date(item.create_at));
				   	});
				   	res.data.recent_topics.map(function(item){
				   		item.create_at = v.$filter.getDateDiff(new Date(item.create_at));
				   		item.last_reply_at = v.$filter.getDateDiff(new Date(item.create_at));
				   	});
				   	v.userInfo = res.data;
				   	if(res){
				   		if(res.data.recent_replies.length){
					   		v.currentData = res.data.recent_replies;
					   	}else{
					   		v.currentData = res.data.recent_topics;
					   		v.activeItem = 2;
					   	}
					   	v.noData = v.currentData.length === 0;
				   	}else{
				   		v.noData = true;
				   	}
				   	
				   },
				   error:function(err){
				   	console.log(err);
				   }
				})
			}
		},
		components:{
			nvHead,
			nvLoad,
			nvTop
		}
	}
</script>