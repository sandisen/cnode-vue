<template>
	<div>
		<nv-head title="主题"></nv-head>
		<div class="topic_create">
			<div class="category">
				<span>选择版块：</span>
				<select v-model="topic.tab">
					<option value="share">分享</option>
					<option value="ask">问答</option>
					<option value="job">招聘</option>
				</select>
			</div>
			<div class="title">
				<input type="text" name="" v-model.trim="topic.title" placeholder="标题，字数10字以上" maxlength="100">
			</div>
			<div class="content">
				<textarea v-model.trim="topic.content" rows="15" placeholder="支持Markdown语法，请注意标记代码"></textarea>
			</div>
			<button @click="handleSubmit">提交</button>
		</div>
	</div>
</template>

<style type="text/css" lang="less" scoped>
	@import '../style/publishTopic.less';
</style>

<script type="text/javascript">
	import nvHead from '../components/header'
	export default {
		data(){
			return {
				topic:{
					tab:'share',
					title:'',
					content:''
				}
			}
		},
		methods:{
			handleSubmit(){
				var v = this;
				const {title,content} = this.topic;
				const accesstoken = localStorage.getItem('accesstoken');
				if(!title || title.length < 10){
					return;
				}
				if(!content){
					return;
				}
				var data = {
					...this.topic,
					accesstoken
				}
				$.ajax({
					type:'POST',
					url:'https://cnodejs.org/api/v1/topics',
					data:data,
					dataType:'json',
					success:function(res){
						console.log(res);
						v.$router.push({name:'index'});
					},
					error:function(err){
						console.log(err);
					}
				})
			}
		},
		components:{
			nvHead
		}
	}

</script>