<template>
	<div>
		<nv-head title="消息"></nv-head>
		<section class="message">
			<ul class="tab">
				<li class="tab_item" :class="{active:this.activeItem === 1}" @click="handleTabChange(1)">已读信息</li>
				<li class="tab_item" :class="{active:this.activeItem === 2}" @click="handleTabChange(2)">未读信息</li>
			</ul>
			<div class="message_content" v-for="item of currentData">
				<section class="author_info">
					<img class="head" :src="item.author.avatar_url">
					<div class="info">
						<span class="left">
							<span class="name">{{item.author.loginname}}</span>
							<span class="name" v-if="item.type === 'at'">在回复中@了您</span>
							<span class="name" v-if="item.type === 'reply'">回复了您的话题</span>
						</span>
						<span class="right">
							<span class="name">{{item.reply.create_at}}</span>
						</span>
					</div>
				</section>
				<div class="reply_content markdown-body" v-html="item.reply.content">
					<router-link :to="{name:'topic',params:{id:item.topic.id}}">
						<div class="topic_title">话题：{{item.topic.title}}</div>
					</router-link>
				</div>
			</div>
			<div class="no_data" v-show="noData">
				<i class="iconfont icon-empty"></i>暂无数据！
			</div>
		</section>
		<!-- <nv-load :show="showLoad"></nv-load> -->
	</div>
</template>

<style type="text/css" lang="less" scoped>
	@import '../style/message.less';
</style>

<script type="text/javascript">
	import nvHead from '../components/header.vue'
	export default {
		data(){
			return{
				activeItem:1,
				messagesData:{},
				currentData:{},
				noData:false
			}
		},
		mounted(){
			var loginname = localStorage.getItem('name');
			var accesstoken = localStorage.getItem('accesstoken');
			var v = this;
			if(loginname){
				$.ajax({
					url: 'https://cnodejs.org/api/v1/messages' + '?accesstoken=' + accesstoken,
					type: 'GET',
					dataType: 'json',
					success:function(res){
						console.log(res.data);
						if(res.success){
							res.data.has_read_messages.map(function(item){
								//设定时间格式
								item.create_at = v.$filter.getDateDiff(new Date(item.create_at));
								item.last_reply_at = v.$filter.getDateDiff(new Date(item.last_reply_at));
							});
							res.data.hasnot_read_messages.map(function(item){
								//设定时间格式
								item.create_at = v.$filter.getDateDiff(new Date(item.create_at));
								item.last_reply_at = v.$filter.getDateDiff(new Date(item.last_reply_at));
							});
							v.messagesData = res.data;
							if(res.data.hasnot_read_messages.length){
								v.currentData = res.data.hasnot_read_messages;
								v.activeItem = 2;
							}else {
								v.currentData = res.data.has_read_messages;
							}
							v.noData = v.currentData.length === 0;
						}else {
							this.noData = true;
						}
					},
					error:function(err){
						console.log(err);
					}
				})
			}
		},
		methods:{
			handleTabChange(index){
				this.activeItem = index;
				this.currentData = index === 1 ? this.messagesData.has_read_messages : this.messagesData.hasnot_read_messages;
				this.noData = this.currentData.length === 0;
			}
		},
		components:{
			nvHead
		}
	}
</script>