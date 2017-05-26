<template>
		<section class="reply">
			<textarea id="content" rows="5" class="text" v-model="content" placeholder="回复支持Markdown语法,请注意标记代码" ></textarea>
			<button class="btn btn_reply btn_reply_confirm" @click="handleReply">确定</button>
		</section>
</template>
<style type="text/css" lang="less" scoped>
	.reply{
		margin:10px;
		textarea{
			width:100%;
			box-sizing: border-box;
			background-color: #fff;
			font-size: 14px;
			padding:15px;
			color:#313131;
			border:1px solid #d5dbdb;
			border-radius: 3px;
		}
		.btn_reply{
			border-bottom: 2px solid #3aa373;
			background-color: #4fc08d;
			font-size: 1.6rem;
			margin:15px 0;
			color:#fff;
			padding:10px;
			width:100%;
			border-radius: 3px;
		}
	}
</style>
<script type="text/javascript">
	export default {
		data() {
			return {
				content:""
			}
		},
		props:['replyId','replyTo','topicId'],
		mounted(){
			if(this.replyTo) {
				this.content = '@'+this.replyTo;
			}
		},
		methods:{
			handleReply(){
				var v = this;
				var data = {
					accesstoken:localStorage.getItem('accesstoken'),
					content:v.content + '<br/><br/><a class="form" href="https://github.com/sandisen/cnode-vue">vue-cnode</a>',
					reply_id:v.replyId
				};
				//发表评论
				$.ajax({
					type:'POST',
					url:'https://cnodejs.org/api/v1/topic/' + v.topicId +'/replies',
					data:data,
					dataType:'json',
					success:function(res){
						console.log(res);
						v.content = '';
						//隐藏回复框
						v.$emit('onReply');
						v.$emit('getTopic');
						v.$router.go(0);
					},
					error:function(err){
						console.log(err);
					}
				})
			}
		},
	}
</script>