<template>
	<view class="box">
		<view class="header">
			<view></view>
		</view>
		<view class="top">
			<view class="logo">
				<image src="../../static/images/background/Img314235964.jpg" alt="">
			</view>
			<view class="introduce">
				<view>
					<view class="label">姓名：</view>
					<view class="trans">范继增（Fun Jizeng）</view>
				</view>
				<view>
					<view class="label">年龄：</view>
					<view>21岁</view>
				</view>
				<view>
					<view class="label">职业：</view>
					<view>Java开发工程师</view>
				</view>
				<view>
					<view class="label">手机号：</view>
					<view @tap="callMe()" class="callme">12345678911
						<!-- <view v-if="loading == 0" class="callmetip">点击号码联系我</view> -->
					</view>
				</view>
			</view>
		</view>
		
		<view class="oneself">
			<view class="tit">
				<text>自我介绍</text>
			</view>
			<view class="content">
				我叫范继增，我是一名有一年开发经验的Java工程师，我曾在一家公司参与开发过一个大型的移动端商城类App。为人乐观向上积极进取，擅长团队合作开发。
			</view>
		</view>
		<view class="skill">
			<view class="skilltit">
				<image src="../../static/images/icon/medal.png" /><text>技能池</text>
			</view>
			<view class="skillct">
				<swiper :indicator-dots="false" :autoplay="true" :interval="4000"  :circular="true" :duration="500" @change="changecurr($event)">
					<swiper-item class="ctsitem" v-for="(v,i) in skills" :key="i">
						<view class="ctsitem_inner">
							<view class="cts_echarts">
								<echarts :id="`echartsa${i}`" v-if="i == curridx" :options="v.annular" />
								<view class="cts_echarts_center">{{v.score}}</view>
							</view>
							<view class="cts_tent">
								<view class="cts_name">技术栈：<b>{{v.name}}</b></view>
								<view class="cts_score">能力：{{v.score}}</view>
								<view class="cts_txt">介绍:{{v.detail}}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="skilltip">点击技能栈查看详情</view>
		</view>
		
		<view class="ability">
			<view class="abilitytit">
				<image src="../../static/images/icon/ability.png" /> 个人能力
			</view>
			<view class="abilityct" :style="abltystyle" @touchmove="moveBox($event)" @touchstart="moveBoxStart($event)" @touchend="moveBoxEnd()" v-show="btnAct != 2">
				<view :class="['ablty',transFlag && btnAct == 0 ? 'ablty_act' : '', btnAct == 1 ? 'ablty_act1' : '']" v-for="(v,i) in abilitys">
					<view>{{v.name}}</view>
					<view>{{v.score}}</view>
				</view>
			</view>
			<view class="columnar">
				<echarts :id="'echartsr2'" v-if="randerCol" :options="columnar" />
			</view>
			<view class="abilityct1" v-if="btnAct == 2">
				<view class="abilityct1_inner">
					<echarts :id="'echartsr1'" :options="radar" />
				</view>
			</view>
			<view class="buttons" :style="{'margin':btnAct == 1 ? ' 100px auto 0 auto' : ''}">
				<view :class="['btn',btnAct == 0 ? 'btn_act' : '']" @click="tabBtn(0)">表格</view>
				<view :class="['btn',btnAct == 1 ? 'btn_act' : '']" @click="tabBtn(1)">立体</view>
				<view :class="['btn',btnAct == 2 ? 'btn_act' : '']" @click="tabBtn(2)">图表</view>
			</view>
		</view>
		
		<!-- 核心素养 -->
		<view class="accomplishment">
			<view class="accomplishmenttit">
				<image src="../../static/images/icon/accomplishment.png" /> 核心素养
			</view>
			<view class="accomplishmentct">
				<view class="acc-item" :style="sph1"></view>
			</view>
		</view>
		
		
		<!-- 教育经历 -->
		<view class="education">
			教育经历
		</view>
		
		
		<!-- 个人成就 -->
		<view class="achievement">
			个人成就
		</view>
		
		<!-- 工作经历 -->
		<view class="work">
			工作经历
		</view>
		
		<!-- 谈谈我对Java的想法 -->
		<view class="ithink">
			谈谈我对Java的想法
		</view>
		
		<!-- 联系我 -->
		<view class="connect">
			<view >
				<text>请联系我</text>
			</view>
			<view class="connects">
				您可以加我的QQ
				<view class="cnn">qq</view>
				或者微信
				<view class="cnn">qq</view>
				也可以向我的邮箱发送面试邀请
				<view class="cnn">邮箱</view>
				或者在当前页面留言给我
				<view class="cnn">留言</view>
			</view>
		</view>
		
		<!-- 弹出层 -->
		<view class="mark" v-if="loading">
			<view class="item">
				<view class="ldx ldx-squeeze"></view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	export default {
		data(){
			return{
				loading:0,
				skills:[{
					id:0,
					name:"Java",
					score:93,
					annular:{},
					detail:"学习Java两年半，从事Java开发一年，熟练使用Java框架，能够处理各种程序问题"
				},{
					id:1,
					name:"MySQL",
					score:88,
					annular:{},
					detail:"学习Java两年半，从事Java开发一年，熟练使用Java框架，能够处理各种程序问题"
				},{
					id:2,
					name:"虚拟机",
					score:76,
					annular:{},
					detail:"学习Java两年半，从事Java开发一年，熟练使用Java框架，能够处理各种程序问题"
				},{
					id:3,
					name:"Radis",
					score:83,
					annular:{},
					detail:"学习Java两年半，从事Java开发一年，熟练使用Java框架，能够处理各种程序问题"
				},{
					id:4,
					name:"Linux",
					score:94,
					annular:{},
					detail:"学习Java两年半，从事Java开发一年，熟练使用Java框架，能够处理各种程序问题"
				}],
				abilitys:[{
					name:"程序开发",
					score:87
				},{
					name:"程序维护",
					score:85
				},{
					name:"技术学习",
					score:79
				},{
					name:"团队合作",
					score:75
				},{
					name:"资源整合",
					score:79
				},{
					name:"项目协调",
					score:91
				}],
				transFlag:0,//滚动变换
				btnAct:0, //切换模式
				transX:0,//自动旋转角度
				transY:0,
				radar:{},//雷达图
				tapX:0, //手动旋转角度
				tapY:0,
				timer1:null,//定时器
				curridx:0,
				columnar:{},//柱状图参数
				randerCol:0,//柱状图渲染
				movetimer:null,	//小球活动定时器
				pos:{
					x:0,
					y:0
				},
				sph1:null,//小球
			}
		},
		onLoad(){
			let that = this;
			// setTimeout(function(){
			// 	that.loading = 0;
			// },2000)
			this.skills.forEach((v,i)=>{
				v.annular = app.globalData.options.annular(v.score,60,100)
			})
			this.columnar =  app.globalData.options.columnar();
			
			this.timer1 = setInterval(function(){
				that.transY ++;
			},30)
			
			// 小圆球初始定位
			// this.createdPos();
			let osph1 = new Sphere().create();
			Object.defineProperty(Sphere,'sty',{
			get:function() {
				console.log(sty);
				return sty;
			},
			set: function(value) {
				console.log(value); //value是 data改变后的值
			}
			})
			this.sph1 = osph1.sty;
			console.log(osph1,this.sph1);
			
			
			// 订阅者模式
			let smallob = new Observer();
			let gos = ()=>{
				console.log('君乎？');
			};
			let bes = (a,b)=>{
				console.log(a,b);
			};
			smallob.subscribe('a',bes).subscribe('a',gos);
			smallob.release('a','傻','逼');
			smallob.delete('a',gos);
			smallob.release('a','草','你妈');
		},
		onPageScroll(e){
			if(e.scrollTop > 200 && e.scrollTop < 1100){
				this.transFlag = 1;
				this.randerCol = 1;
			}else{
				this.transFlag = 0;
				this.randerCol = 0;
			}
			
		},
		computed:{
			abltystyle(){
				if(this.btnAct == 1){
					return {width:`75px`,height:'75px','transform':`rotateY(${this.transY}deg) rotateX(45deg) rotateZ(45deg)`,'transform-origin':'100rpx 100rpx 200rpx'};
				}else{
					return {};
				}
			}
		},
		methods:{
			callMe(){
				uni.makePhoneCall({
				    phoneNumber: '17763240940' //仅为示例
				});
			},
			tabBtn(i){ //切换状态
				this.btnAct = i;
				let ops = {labels:[],datas:[],num: 4,color:'#00A6AC',rad:'50%'};
				if(this.btnAct == 2){
					this.abilitys.forEach((v,i)=>{
						ops.labels.push({name:v.name,max:100});
						ops.datas.push(v.score);
					});
					// 
					this.radar = app.globalData.options.radar(ops.labels,ops.datas,ops.num,ops.color,ops.rad);
				}
			},
			moveBoxStart(e){
				this.tapX = e.touches[0].pageX;
				this.tapY = e.touches[0].pageY;
			},
			moveBox(e){
				// console.log(e.touches[0].pageX,e.touches[0].pageY);
				// console.log(this.tapX,e.touches[0].pageX);
				let [disX,disY] = [0,0];
				// disX = e.touches[0].pageX - this.tapX;
				disY = (e.touches[0].pageX - this.tapX)/15;
				clearInterval(this.timer1);
				this.transY += disY;
			},
			moveBoxEnd(){
				let that = this;
				clearInterval(this.timer1);
				this.timer1 = setInterval(function(){
					that.transY ++;
				},30)
			},
			changecurr(e) {
				this.curridx = e.detail.current;
			},
			createdPos(){
				this.pos.x = Math.random()*370;
				this.pos.y = Math.random()*240;
				this.movely();
			},
			movely(){
				let that = this;
				let speed = Math.random()*10 > 5 ? 1 : -1;
				let speed2 =  Math.random()*10 > 5 ? 1 : -1;
				console.log('这个小球的速度',speed);
				this.movetimer = setInterval(function(){
					
					if(that.pos.x<0){
						that.pos.x = 0;
						speed = -speed;
					}
					else if(that.pos.x > 370){
						that.pos.x = 370;
						speed = -speed;
					}
					else{
						that.pos.x += speed;
					}
					
					if(that.pos.y<0){
						that.pos.y = 0;
						speed2 = -speed2;
					}
					else if(that.pos.y > 240){
						that.pos.y = 240;
						speed2 = -speed2;
					}
					else{
						that.pos.y += speed2;
					}
				},30);
			},
			sphere(){
				
			}
		}
	}
	
	
// 面向对象写球体移动
class Sphere{
	
	constructor() {
		this.x = 0;
		this.y = 0;
		this.speed1 = 0;
		this.speed2 = 0;
		this.sty = { left :'0px', top : '0px'};
	}
	create(){
		this.x = parseInt(Math.random()*370);
		this.y = parseInt(Math.random()*240);
		this.speed1 = Math.random()*10 > 5 ? 1 : -1;
		this.speed2 = Math.random()*10 > 5 ? 1 : -1;
		return this.move();
	}
	move(){
		let that = this;
		this.movetimer = setInterval(function(){
			if(that.x<0){
				that.x = 0;
				that.speed1 = -that.speed1;
			}
			else if(that.x > 370){
				that.x = 370;
				that.speed1 = -that.speed1;
			}
			else{
				that.x += that.speed1;
			}
			
			if(that.y<0){
				that.y = 0;
				that.speed2 = -that.speed2;
			}
			else if(that.y > 240){
				that.y = 240;
				that.speed2 = -that.speed2;
			}
			else{
				that.y += that.speed2;
			}
			that.sty = { left : that.x + 'px', top : that.y + 'px'};
		},30);
		return this;
	}
}



// 面向对象的观察者模式

class Observer{
	constructor(){
		this.eventList = {};
	}
	subscribe(type,event){
		if(!this.eventList.hasOwnProperty(type)){
			this.eventList[type] = [];
		}
		if(typeof event == 'function'){
			this.eventList[type].push(event);
		}else{
			console.log("缺少回调函数");
		}
		return this;
	}
	release(type,...args){
		if(this.eventList.hasOwnProperty(type)){
			this.eventList[type].forEach((item,index,arr)=>{
				item.apply(null,args);
			})
		}else{
			console.log("请先注册监听");
		}
		return this;
	}
	delete(type,event){
		if(this.eventList.hasOwnProperty(type)){
			if(typeof event== 'function'){
				this.eventList[type].forEach((item,index,arr)=>{
					if(item == event){
						arr.splice(index,1);
					}
				})
			}else{
				console.log('缺少回调函数');
			}
		}else{
			console.log("事件未注册");
		}
		return this;
	}
}



</script>

<style>
@import url("./index.css");

</style>
