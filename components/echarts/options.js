
let options = [];



// 极地坐标系 堆叠柱状图(环形图)
options.annular = (data1,data2,max = 450)=>{
	return {
		polar: {
			radius: ["45%", "90%"], //文本样式
		},
		angleAxis: {
			show: false,
			type: "value",
			boundaryGap: false,
			interval: 1,
			max,
			randCap:true,
			splitLine: {
				show: false,
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false,
			},
		},
		radiusAxis: {
			show: false,
			type: "category",
			data: ["x", "y", "z"],
			splitNumber: 5,
			axisLine: {
				show: false
			},
			randCap:true,
			axisLabel: {
				show: false,
				rotate: 45
			},
		},
		dataset:datasetEcharts3(data1,data2),
		series:seriesEcharts3(["#008792"]),
	};
};
function datasetEcharts3(data1,data2){   //data1为黄色柱状值
	function toData(value,type){
		if(type == 1){
			return {source: [{name: "y",value,}]};
		}else{
			return {source: [{name: "x",value}, {name: "z",value}]};
		}	
	}
	return [toData(data1,1),toData(data2)];
}
function seriesEcharts3(color){  //color 是一个数组 传四个字符串色值
	let arr = [];
	arr.push({
		type: "bar",
		barWidth: 60,
		datasetIndex: 0,
		coordinateSystem: "polar",
		zlevel: 0,
		roundCap: true,
		itemStyle: {
			color: "#50b7c1",
			barBorderRadius: 6
		},
		stack: "a"
	},
	{ // 环形图底色						
		type: "bar",
		data: [0, 1050],
		barWidth: 60,
		datasetIndex: 0,
		coordinateSystem: "polar",
		zlevel: -1,
		roundCap: true,
		itemStyle: {
			color: "#e1e1e1",
			barBorderRadius: 6
		},
		stack: "a"
	});
	for(let a = 0;a < 4;a++){
		arr.push({
			type: "line",
			datasetIndex: (a + 1),
			coordinateSystem: "polar",
			symbol: "none",
			itemStyle: {
				color:color[a],
			}
		});
	}
	return arr;
}





// 雷达图

// indicator:[{name:v.name,max:100},{name:v.name,max:100},{name:v.name,max:100}] ##label##
// datas:[ [80,80,80], [1,2,3,4], [1,2,3,4]] ##数据##
// let datan = [[80,80,80,80,80,80]]; 一个数组代表一条线
// nunber: 4 ##线条数##     color:#f8f6f2 ##线条颜色##     rander: 50% ##图表占全局大小##
options.radar = (indicator,data,lineNum,bgcolor,radius = "60%") => {
	return {
		tooltip: {},
		radar: {
			splitNumber:lineNum,
			radius,
			name: {
				textStyle: {
					color: "#00A6AC",
					fontSize:11,
					formatter: "{value}%",
					lineHeight:15,
					fontFamily: "平方",
				},
				formatter: function (value){
					let set = value;
					if(value.length > 6){
						set = value.substr(0, 5) + "\n" + value.substr(5, value.length);
					}
					return set;
				}
			},
			indicator,
			axisLine: {
				lineStyle: {
					color: "#e4e1db",
				},
			},
			splitArea: {
				areaStyle: {
					color: "#fff"
				},
			}
		},
		series:{
			type: "radar",
			label:{
				normal:{
					fontSize:8,
					formatter: "{value}%",
					rich: {
						a: {
							color: "red",
							lineHeight: 10
						},
					}
				},
				formatter: "{value}%",
				rich: {
					a: {
						color: "red",
						lineHeight: 10
					},
				},
				fontSize:3,
			},
			data: sericesOptions5(data),
		},
	};
};

function sericesOptions5(datas){
	let arr = [];
	// datas.forEach(v=>{
		arr.push({
			value:datas,
			itemStyle: {
				normal: {
					color:'#00A6AC',
					lineStyle: {
						color: '#00A6AC',
					},
				},
			},
		});
	// });
	return arr;
}


// 饼状环形图
options.pie = (args,my)=>{
	return {
		polar: {
			radius: ["30%", "60%"],
			center: ["70%", "50%"]
		},
		angleAxis: {
			show: false,
			type: "value",
			boundaryGap: false,
			interval: 1,
			max: args.full_score,
		},
		radiusAxis: {
			show: false,
			type: "category",
			data: ["x", "y", "z"],
			axisLabel: {
				show: false,
				rotate: 100
			}
		},
		dataset: [{
			source: [{
				name: "y",
				value: 100
			}]
		}, {
			source: [{
				name: "x",
				value: args.avg_total_score
			}, {
				name: "z",
				value: args.avg_total_score
			}]
		}, {
			source: [{
				name: "x",
				value: 90
			}, {
				name: "z",
				value: 90
			}]
		}
		],
		series: [{
			type: "bar",
			data: [0, my],
			roundCap: true,
			stack: "a",
			datasetIndex: 0,
			coordinateSystem: "polar",
			zlevel: 0,
			itemStyle: {
				color: "#efb052",
				barBorderRadius: 6
			}
		},
		{
			type: "bar",
			data: [0, 150],
			barWidth: 60,
			datasetIndex: 0,
			coordinateSystem: "polar",
			zlevel: -1,
			roundCap: true,
			itemStyle: {
				color: "#efefef",
				barBorderRadius: 6
			},
			stack: "a"
		}, {
			type: "line",
			datasetIndex: 1,
			coordinateSystem: "polar",
			symbol: "circle",
			symbolSize: 2,
			itemStyle: {
				color: "#ce2378"
			}
		}, {
			type: "line",
			datasetIndex: 2,
			coordinateSystem: "polar",
			symbol: "circle",
			symbolSize: 2,
			itemStyle: {
				color: "#31afc3"
			}
		},
		{
			type: "pie",
			radius: ["40%", "60%"],
			center: ["70%", "50%"],
			startAngle: -((my / args.full_score) * 360 - 95),// 这个控制蓝条的起始位置 从顺时针100度开始 100/360   100/150*360
			labelLine: {
				show: false
			},
			data: [
				{
					value: 5,	// 这个控制蓝条的厚度
					itemStyle: {
						color: "#4091fd"
					}
				}, {
					value: 80,
					itemStyle: {
						color: "rgba(128, 128, 128, 0)"
					}
				}]
		},
		{
			type: "pie",
			radius: ["30%", "40%"],
			center: ["70%", "50%"],
			startAngle: 150,
			labelLine: {
				show: true
			},
			data: [
				{
					value: 70,
					itemStyle: {
						color: "rgba(128, 128, 128, 0)"
					},
					label: {
						show: true,
						position: "outside"
					},
				},
				{
					name: `校最高分${args.max_school_score}`,
					value: 10,
					itemStyle: {
						color: "rgba(128, 128, 128, 0)"
					},
					label: {
						show: true,
						position: "outside",
						color: "#31afc3",
						fontSize:10,
					},
					labelLine: {
						length: "15",
						length2: "15",
						lineStyle: {
							color: "#31afc3",
						}
					}
				}, {
					name: `市最高分${args.max_total_score}`,
					value: 0,
					itemStyle: {
						color: "rgba(128, 128, 128, 0)",
						fontSize:10,
					},
					label: {
						show: true,
						position: "outside",
						color: "#ce2378",
						fontSize:10,
					},
					labelLine: {
						length: "15",
						length2: "15",
						lineStyle: {
							color: "#ce2378",
						}
					}
				}]
		}]
	};
};



options.columnar = ()=>{
	return {
	        	
	
	
	            //-------------  grid区域  ----------------
	            grid:{
	            	show:false,					//---是否显示直角坐标系网格
	            	containLabel:false,			//---grid 区域是否包含坐标轴的刻度标签
	            },
	
	            //-------------   x轴   -------------------
	            xAxis: {
	            	show:true,					//---是否显示
	            	position:'bottom',			//---x轴位置
	            	offset:0,					//---x轴相对于默认位置的偏移
	            	type:'category',			//---轴类型，默认'category'
	            	name:'月份',				//---轴名称
	            	nameLocation:'end',			//---轴名称相对位置
	            	nameTextStyle:{				//---坐标轴名称样式
	            		color:"#fff",
	            		padding:[5,0,0,-5],	//---坐标轴名称相对位置
	            	},
	            	nameGap:15,					//---坐标轴名称与轴线之间的距离
	            	//nameRotate:270,			//---坐标轴名字旋转
	            	
	            	axisLine:{					//---坐标轴 轴线
	            		show:true,					//---是否显示
	            		
	            		//------------------- 箭头 -------------------------
	            		symbol:['none', 'arrow'],	//---是否显示轴线箭头
	            		symbolSize:[8, 8] ,			//---箭头大小
	            		symbolOffset:[0,7],			//---箭头位置
	            		
	            		//------------------- 线 -------------------------
	            		lineStyle:{
	            			color:'#fff',
	            			width:1,
	            			type:'solid',
	            		},
	            	},
	            	axisTick:{					//---坐标轴 刻度
	            		show:true,					//---是否显示
	            		inside:true,				//---是否朝内
	            		lengt:3,					//---长度
	            		lineStyle:{
	            			//color:'red',			//---默认取轴线的颜色
	            			width:1,
	            			type:'solid',
	            		},
	            	},
	            	axisLabel:{					//---坐标轴 标签
	            		show:true,					//---是否显示
	            		inside:false,				//---是否朝内
	            		rotate:0,					//---旋转角度	
	            		margin: 5,					//---刻度标签与轴线之间的距离
	            		//color:'red',				//---默认取轴线的颜色
	            	},
	            	splitLine:{					//---grid 区域中的分隔线
	            		show:false,					//---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
	            		lineStyle:{
	            			//color:'red',
	            			//width:1,
	            			//type:'solid',
	            		},
	            	},
	            	splitArea:{					//--网格区域
	            		show:false,					//---是否显示，默认false
	            	},           	
	                data: ["M1","M1","M1","M1","M1","M1"],//内容
	            },
	
	            //----------------------  y轴  ------------------------
	            yAxis: {
	            	show:true,					//---是否显示
	            	position:'left',			//---y轴位置
	            	offset:0,					//---y轴相对于默认位置的偏移
	            	type:'value',			//---轴类型，默认'category'
	            	name:'销量',				//---轴名称
	            	nameLocation:'end',			//---轴名称相对位置value
	            	nameTextStyle:{				//---坐标轴名称样式
	            		color:"#fff",
	            		padding:[5,0,0,5],	//---坐标轴名称相对位置
	            	},
	            	nameGap:15,					//---坐标轴名称与轴线之间的距离
	            	//nameRotate:270,			//---坐标轴名字旋转
	            	
	            	axisLine:{					//---坐标轴 轴线
	            		show:true,					//---是否显示
	            		
	            		//------------------- 箭头 -------------------------
	            		symbol:['none', 'arrow'],	//---是否显示轴线箭头
	            		symbolSize:[8, 8] ,			//---箭头大小
	            		symbolOffset:[0,7],			//---箭头位置
	            		
	            		//------------------- 线 -------------------------
	            		lineStyle:{
	            			color:'#fff',
	            			width:1,
	            			type:'solid',
	            		},
	            	},
	            	axisTick:{					//---坐标轴 刻度
	            		show:false,					//---是否显示
	            		inside:true,				//---是否朝内
	            		lengt:3,					//---长度
	            		lineStyle:{
	            			//color:'red',			//---默认取轴线的颜色
	            			width:1,
	            			type:'solid',
	            		},
	            	},
	            	axisLabel:{					//---坐标轴 标签
	            		show:true,					//---是否显示
	            		inside:false,				//---是否朝内
	            		rotate:0,					//---旋转角度	
	            		margin: 8,					//---刻度标签与轴线之间的距离
	            		//color:'red',				//---默认取轴线的颜色
	            	},
	            	splitLine:{					//---grid 区域中的分隔线
	            		show:false,					//---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
	            		lineStyle:{
	            			color:'#666',
	            			width:1,
	            			type:'dashed',			//---类型
	            		},
	            	},
	            	splitArea:{					//--网格区域
	            		show:false,					//---是否显示，默认false
	            	}                        
	            },
	
	            //------------ 内容数据  -----------------
	            series: [
		            {
		                name: '销量',				//---系列名称
		                type: 'bar',				//---类型
		                legendHoverLink:true,		//---是否启用图例 hover 时的联动高亮
		                label:{						//---图形上的文本标签
		                	show:false,
		                	position:'insideTop',	//---相对位置
		                	rotate:0,				//---旋转角度
		                	color:'#eee',
		                },
		                itemStyle:{					//---图形形状
		                	color:'blue',
		                	barBorderRadius:[18,18,0,0],
		                },
		                barWidth:'10',				//---柱形宽度
		                barCategoryGap:'20%',		//---柱形间距
		                data: [3020, 4800, 3600, 6050, 4320, 6200]
		            }
	            ]
	        }
}











export default options;
