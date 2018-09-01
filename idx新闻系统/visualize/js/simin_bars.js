
function load_sim(){
	company_name=$('#search').val()
	$.ajax({ 
					url: "json/sim/sim"+company_name+".json", 
					dataType: "json", 
					success: function(idx_data) { 
						
						//echarts code start
						 // 1. 指定图表的配置项和数据
							var option = {
								title: {
									 text: '公司相似度',
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
									data:['公司兴趣相似度'],
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
										data :['广州港船务有限公司', '五洲航运有限公司', '清远建航船务有限公司', '广州近洋物流有限公司', '广西贵港市宝丰航运有限责任公司', '广东顺信物流有限公司', '广州景盛国际货运代理有限公司', '广西兴桂物流有限公司', '广州航讯船务', '广州港船务有限公司穿梭巴士营运中心', '广东驳运公司', '梧州市汇祥船务有限公司', '马乐滨', '中国广州外轮代理公司南沙有限公司', '朱伟良', '广西润桂船运有限责任公司', '广运船务有限公司（中外运）', '嘟嘟打船', '祥源船务有限公司', '广州中远物流有限公司', '广州珠江电力燃料有限公司', '广州金洋货运代理有限公司', '广州顺风船务有限公司', '黄俊波', '庄建彪', '珠海市翔海船务有限公司', '广州鑫运国际货运代理有限公司', '广州启帆国际货运代理有限公司']

									}
								],
								 yAxis : [ //y轴
										{ 
											type : 'value',
											max:20,
											min:0,
											splitNumber : 10,
											axisLabel : {//间隔名称格式器
											formatter: '{value}'
											}
										}
									],
								series: [
									{
										name:'相似度',
										type:'bar',
										data:idx_data.sim
									}
								],
								dataZoom: { //图表下方横条，数据区域缩放。与toolbox.feature.dataZoom同步，仅对直角坐标系图表有效。
									show: true,
									start : 95,
									end : 100,
									top:100,
									dataBackgroundColor:'#eee'
								}
							};
							
							// 2. 基于准备好的dom，初始化echarts实例
							var myChart = echarts.init(document.getElementById('overall'),theme);
							// 3.使用刚指定的配置项和数据显示图表。
							myChart.setOption(option);
							
							myChart.on('click', function (params) {
									
									var dataIndex = params.name;
									var seriesName=params.seriesName;
									alert(dataIndex);
							});
							
							$('#result').append('<p>最大相似度： '+idx_data.max_val+'</p><p>公司名： '+idx_data.max_com+'</p>');
						//echarts code end
				}});//ajax end

}

