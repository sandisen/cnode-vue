<template>
	<div class="iconfont icon-uptop" v-show="show" @click="handleBackTop"></div>
</template>

<style type="text/css" lang='less' scoped>
	.iconfont.icon-uptop{
		position: fixed;
		right:10px;
		bottom: 50px;
		font-size: 4rem;
		color: #80bd01;
		z-index: 100;
		cursor: pointer;
	}
</style>
<script type="text/javascript">
import $ from 'webpack-zepto'
	export default{
		data(){
			return {
				show:false,
				timer:null
			}
		},
		mounted(){
			$(document).on("scroll",this.handleToggle,false);
		},
		beforeDestory(){
			$(document).off("scroll",this.handleToggle);
		},
		methods:{
			handleToggle(){
				const y = $(document.body).scrollTop() || $(document.documentElement).scrollTop();
				if(y > 100){
					this.show = true;
				}else{
					this.show = false;
				}
			},
			handleBackTop(){
				clearInterval(this.timer);
                this.timer = setInterval(function() {
                    const now = document.body.scrollTop || document.documentElement.scrollTop;
                    if (now === 0 ) {
                        clearInterval(this.timer);
                        return;
                    }
                    const speed = Math.floor(-now / 10);

                    document.body.scrollTop = document.documentElement.scrollTop = now + speed;
                }.bind(this), 15)
			}
		}
	}
</script>