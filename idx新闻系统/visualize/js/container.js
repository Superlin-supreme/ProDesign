
$.ajax({
			url: "json/idx_each_average.json", 
			dataType: "json", 
			success: function(idx_data) { 
				
							// 1. 指定图表的配置项和数据
							//-------------------------------------------------------------------------------------------------------
							//集装箱数据
							var option_container = {
								title: {
								},
								tooltip: {
									show:false,
									trigger: ' item', //触发tooltip类型，横坐标， 也可为item
									position:function(p){   //其中p为当前鼠标的位置
											return [p[0] + 10, p[1] - 10];
									}
								},
								legend: {
									data:['内贸集装箱','外贸集装箱','香港集装箱'],
									selected:{
										'校验运价指数':false
									},
											 x: 'center', // 'center' | 'left' | {number},
									 y: 'top',
								},
								 calculable : true, //是否能拖动
								xAxis : [ //x轴
									{
										type : 'category',
										data :idx_data.idx.period
									}
								],grid: {  //调整表格编距与大小
									height:150, 
									x:10,
									x2:10,
									y:50,
									y2:50,
									containLabel: true   
								},
								 yAxis : [ //y轴
										{ 
											type : 'value',
											max:1200,
											min:800,
											splitNumber : 10,
											axisLabel : {//间隔名称格式器
											formatter: '{value}'
											}
										}
									],
								series: [{
										name:'内贸集装箱',
										type:'line',
										data:idx_data.idx.container.inland
									},
									{
										name:'外贸集装箱',
										type:'line',
										data:idx_data.idx.container.foreign
									},{
										name:'香港集装箱',
										type:'line',
										data:idx_data.idx.container.hongkong
									}
								],
								dataZoom: { //图表下方横条，数据区域缩放。与toolbox.feature.dataZoom同步，仅对直角坐标系图表有效。
									show: true,
									start : 90,
									end : 100,
									 top:210,//datazoom与上级容器的距离
									 left:20,
									dataBackgroundColor:'#fff'
								}
							};
							
					
							
							// 2. 基于准备好的dom，初始化echarts实例
							var myChart = echarts.init(document.getElementById('container'),theme);
							// 3.使用刚指定的配置项和数据显示图表。
							myChart.setOption(option_container);
							
							myChart.on('click', function (params) {
								
									
									var dataIndex = params.name;
									var seriesName=params.seriesName;
									$(".pie_block").remove();//删除上一次留下的
									$("#for_pie").append('<div class="pie_block" style="width:100%;height:300px;display:none;">'+//先display：none隐藏
									'<button id="slideBack">收起</button>'+//收起控件
									'<div class="pie" id="pie"></div>'+
									'</div>');
									load_pie(seriesName,dataIndex);
									$(".pie_block").slideDown("slow");
									$("#slideBack").click(function(){
										$(".pie_block").slideUp("slow");//上滑
									});
							});

					
			}
		});