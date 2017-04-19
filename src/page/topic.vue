<template>
	<div>
		 <nv-head></nv-head>
		 <div class="topic_detail" v-if="topic.title">
		 	<h2 class="topic_title" v-text="topic.title"></h2>
		 	<section class="author_info">
		 		<router-link :to="{name:'user',params:{loginname:topic.author.loginname}}">
					<img :src="topic.author.avatar_url" class="avatar">
		 		</router-link>
		 		<div class="center">
		 			<span class="author" v-text="topic.author.loginname"></span>
		 			<time class="info">发布于：{{topic.create_at}}</time>
		 		</div>
		 		<div class="right">
		 			<span  v-if="topic.top == true" class="tag">置顶</span>
					<span  v-else-if="topic.tab == 'good'" class="tag">精华</span>
					<span  v-else-if="topic.tab == 'share'" class="tag">分享</span>
					<span  v-else-if="topic.tab == 'ask'" class="tag">问答</span>
					<span  v-else-if="topic.tab == 'job'" class="tag">招聘</span>
					<span class="name">{{topic.visit_count}}次浏览</span>
		 		</div>
		 	</section>
			<section class="markdown-body topic_content" v-html="topic.content"></section>
			<section class="topic_reply">
				<h3 class="topic_total">
					<strong>{{topic.reply_count}}</strong>条回复
				</h3>
				<ul class="reply_list">
					<li v-for="item in topic.replies">
						<section class="user">
							<router-link :to="{name:'user',params:{loginname:item.author.loginname}}">
								<img :src="item.author.avatar_url" class="head">
							</router-link>
							<div class="info">
								<div class="left">
									<p class="name" v-text="item.author.loginname"></p>
									<p class="name">发布于:{{item.create_at}}</p>
								</div>
								<span class="right">
									<span style="margin-right:5px;" class="iconfont icon-dianzan"
									:class="{'uped':isUps(item.ups)}" @click="handleUpReply(item)"></span>
									<span style="margin-right:5px;color: #80bd01;">{{item.ups.length}}</span>
									<span class="iconfont icon-hf" @click="addReply(item.id)"></span>
								</span>
							</div>
						</section>
						<div class="reply_content markdown-body" v-html="item.content"></div>
						<nv-reply v-if="loginname && replyId === item.id" 
						:reply-to="item.author.loginname" 
						:reply-id="item.id" 
						:topic-id="topicId"
						@getTopic="getTopic"
						@onReply="handleReply"></nv-reply>
					</li>
				</ul>
			</section>
			<nv-reply v-if="loginname" :topic-id="topicId"></nv-reply>
		 </div>
		 <nv-top></nv-top>
	</div>
</template>
<style type="text/css" lang="less" scoped>
	@import "../style/topic.less";
	@import '../../node_modules/github-markdown-css/github-markdown.css';
</style>
<script type="text/javascript">
	import $ from 'webpack-zepto'
	import nvHead from '../components/header'
	import nvTop from '../components/backTop'
	import nvReply from '../components/reply'
	export default {
		data(){
			return{
				loginname:'',
				id:'',
				replyId:'',
				topicId:'',
				topic:{}
			}
		},
		mounted(){
			var v = this;
			var loginname = localStorage.getItem('name');
			var id = localStorage.getItem('id');
			v.loginname = loginname;
			v.id = id;
			this.getTopic();
		},
		methods:{
			getTopic:function(){
				var v = this;
				v.topicId = this.$route.params.id;
				//获取话题列表
				$.ajax({
					url:'https://cnodejs.org/api/v1/topic/'+v.topicId,
					type:'GET',
					dataType:'json',
					success:function(res){
						console.log(res.data);
						var data = res.data;
						data.replies.map(function(item){
							item.create_at = v.$filter.getDateDiff(new Date(item.create_at));
						})
						data.create_at = v.$filter.getDateDiff(new Date(data.create_at));
						data.last_reply_at = v.$filter.getDateDiff(new Date(data.last_reply_at));
						v.topic = res.data;
					},
					error:function(err){
						console.log(err);
					}
				})
			},
			addReply(id){
				if(!this.loginname) {
					this.$router.push({
						name:'login',
						query:{redirect:encodeURIComponent(this.$route.name)}
					})
				}
				this.replyId = id;
			},
			handleReply(){
				this.replyId = '';
			},
			isUps(ups) {
				return ups.indexOf(this.id) > -1
			},
			handleUpReply(item){
				var v = this;
				if(!v.loginname){
					v.$router.push({
						name:'login',
						query:{redirect:encodeURIComponent(v.$route.name)}
					});
					return;
				}
				//点赞点踩
				$.ajax({
					type:'POST',
					url:'https://cnodejs.org/api/v1/reply/' + item.id + '/ups',
					data:{accesstoken:localStorage.getItem('accesstoken')},
					dataType:'json',
					success:function(res){
						console.log(res);
						if(res.success){
							if(res.action === 'down'){
								const index = item.ups.indexOf(v.id);
								if(index > -1) {
									item.ups.splice(index,1);
								}
							}else {
								item.ups.push(v.id);
							}
						}
					},
					error:function(err){
						console.log(err);
					}
				})
			},
		},
		components:{
			nvHead,
			nvTop,
			nvReply
		}
	}
</script>