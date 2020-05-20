<template>
	<view class="content" @swipeRight="move1()" @touchmove="fnMoveEvent($event)" @touchend="fnEndEvent($event)" @touchstart="fnStartEvent($event)">
		<view class="space">
			<view class="stars">
				<view class="star"></view>
				<view class="star pink"></view>
				<view class="star blue"></view>
				<view class="star yellow"></view>
			</view>
		</view>
		<image class="logoImg" src="../../static/images/icon/personal_icon_act.png" :style="{opacity:flag}"></image>
		<view class="name" :style="{opacity:flag}">范&nbsp;继&nbsp;增</view>
		 <!-- v-if="act <=0" :style="{opacity:(act + 1),top:act == 0 ? '370px' : '570px'}" -->
		<view class="headt" v-if="act <= 0">
			<view class="motto">进步，永不止步</view>
		</view>
		<view class="items" v-if="act>0">
			<view v-if="act == 1">
				<view class="inner">
					我是一名Java开发工程师，主要从事后端开发工作
				</view>
			</view>
			<view v-if="act == 2">
				<view class="inner">
					目前还没有毕业，但是有从事工作和实际开发项目的经验
				</view>
			</view>
			<view v-if="act == 3">
				<view class="inner">
					如果您想了解我的能力，请开启这扇门
				</view>
			</view>
			<view v-if="act == 4">
				<view class="goto1">
					<img class="gointo" src="../../static/images/icon/gointo.png" alt="" @tap="goto1()">
					<view :class="['fu1',actTo ? 'fu_act' :'']"></view>
					<view :class="['fu2',actTo ? 'fu_act' :'']"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<!-- 
	
	引导页就一个个人头像框 然后三个连续的上划方框介绍自己 最后一个进入按钮 进入简历页
	
 -->
<script>
	
	export default {
		data() {
			return {
				name:'',
				address:'',
				thisY:0,
				distance:0,
				flag:0,
				act:-1,
				actTo:0
			}
		},
		onLoad() {
			let that = this;
			setTimeout(function(){
				that.flag = 1;
				that.act ++ ;
			},200);
		},
		methods: {
			fnStartEvent(e){
				this.thisY = e.touches[0].pageY;
				return false;
			},
			fnMoveEvent(e){
				
				// this.thisY = e.touches[0].pageY;
				// console.log(this.thisY);	
				return false;
			},
			fnEndEvent(e){
				this.distance = e.changedTouches[0].pageY - this.thisY;
				if(this.distance < 0){
					this.act ++;
					if(this.act>4){
						this.act = 4;
					}
				}else if(this.distance > 0){
					this.act --;
					if(this.act < 0){
						this.act = 0;
					}
				}
				return false;
			},
			goto1(){
				console.log('show all');
				let that = this;
				this.actTo = 1;
				setTimeout(function(){
					uni.navigateTo({
					    url: '../fan/index'
					});
					that.act = -1;
					that.actTo = 0;
				},1700);
			},
		}
	}
</script>

<style>
@import url("./index.css");
</style>
