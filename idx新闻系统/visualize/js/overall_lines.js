$.ajax({ 
	url: "json/idx_overall_data.json", 
					dataType: "json", 
					success: function(idx_data) { 
						
						//echarts code start
						 // 1. 指定图表的配置项和数据
							var option = {
								title: {
									 text: '航运指数',
									 x:50
								},
								tooltip: {
									show:false,
									trigger: ' item', //触发tooltip类型，横坐标， 也可为item
									position:function(p){   //其中p为当前鼠标的位置
											return [p[0] + 10, p[1] - 10];
									}
								},
								legend: {
									data:['运价指数','集装箱指数','散货指数'],
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
								] ,grid: {  //调整表格编距与大小
										
									// height:600, 
									// width:1000,
									x:50,
									x2:50,
									y:50,
									y2:50,
									containLabel: true  
								} ,
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
										name:'运价指数',
										type:'line',
										data:idx_data.idx.total
									},
									// {
									// 	name:'集装箱指数',
									// 	type:'line',
									// 	data:idx_data.idx.container
									// },{
									// 	name:'散货指数',
									// 	type:'line',
									// 	data:idx_data.idx.bulkload
									// }
								],
								dataZoom: { //图表下方横条，数据区域缩放。与toolbox.feature.dataZoom同步，仅对直角坐标系图表有效。
									show: true,
									start : 90,
									end : 100,
									// top:360,
									// left:80,
									dataBackgroundColor:'#eee'
								}
							};
							
							// 2. 基于准备好的dom，初始化echarts实例
							var myChart = echarts.init(document.getElementById('overall'),'shine');
							// 3.使用刚指定的配置项和数据显示图表。
							myChart.setOption(option);
							myChart.on('click', function (params) {
									
									var dataIndex = params.name;
									var seriesName=params.seriesName;
									console.log(dataIndex, seriesName);

									$.ajax({
										type: "POST",
										url: "count_type.php",
										data: {
											dx: dataIndex
										},
										dataType: "json",
										success: function(data) {
											if (data.success) {
												var t = 'type'; 
												alert(data.typeNum);
												alert(eval('data.' + t));
												console.log(data);	
												hehe();											
											} else {
												alert("出现错误：" + data.msg);
											}  
										},
										error: function(jqXHR){     
											alert("发生错误：" + jqXHR.status);  
											console.log("返回信息：" + jqXHR.responseText);  
										},  
									});
							});
							
						//echarts code end
				}});//ajax end
