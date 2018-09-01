function load_force(option){
	
	 require.config({
            paths : {
                echarts : 'http://echarts.baidu.com/build/dist'
            }
        });
        require([ "echarts", "echarts/chart/force"], function(ec) {
			$.ajax({
			url: "line_force/node_data2.json", 
			dataType: "json", 
			success: function(node_data) {

				//alert("ok")
				
				//--------------------
				 var myChart = ec.init(document.getElementById('other'), 'macarons');
				var option = {
					tooltip : {
						show : false
					},
					series : [ {
						type : 'force',
						name : "Force tree",
						force: {
					gravity: 0  ,//引力
					edgeLength: 100, //默认距离
					repulsion: 180 //斥力
					},
						itemStyle : {
							normal : {
								label : {show : true},
								nodeStyle : {
									brushType : 'both',
									borderColor : 'rgba(255,215,0,0.6)',
									borderWidth : 1
								},
								linkStyle: {
									type: 'curve',
									opacity : 0.5
								}

							},emphasis: {
									label: {
										show: false
										// textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
									},
									nodeStyle : {
										//r: 30
									},
									linkStyle : {}
								}
											
							},
										minRadius : 5,
										maxRadius : 15,
										gravity: 1.1,
										scaling: 1.1,
										roam: 'move',
										density: 0.01,
										attractiveness: 1.2,

							categories : [ {name : '珠江航运报价情况'}, {name : '报价期数'}, {name : '公司'}, {name : '航线'},{name : '航线'}],
							 nodes :node_data.nodes,
							links :node_data.links
					} ]
				};
				myChart.setOption(option);
				var ecConfig = require('echarts/config');
				function openOrFold(param) {
					var option = myChart.getOption();
					var nodesOption = option.series[0].nodes;
					var linksOption = option.series[0].links;
					var data = param.data;
					var linksNodes = [];

					var categoryLength = option.series[0].categories.length;

					if (data.category == (categoryLength - 1)) {
						alert(data.label);
					}

					if (data != null && data != undefined) {
						if (data.flag) {

							for ( var m in linksOption) {

								if (linksOption[m].target == data.id) {
									linksNodes.push(linksOption[m].source);
								}
							}
							if (linksNodes != null && linksNodes != undefined) {
								for ( var p in linksNodes) {
									nodesOption[linksNodes[p]].ignore = false;
									nodesOption[linksNodes[p]].flag = true;
								}
							}
							nodesOption[data.id].flag = false;
							myChart.setOption(option);
						} else {

							for ( var m in linksOption) {

								if (linksOption[m].target == data.id) {
									linksNodes.push(linksOption[m].source);
								}
								if (linksNodes != null && linksNodes != undefined) {
									for ( var n in linksNodes) {
										if (linksOption[m].target == linksNodes[n]) {
											linksNodes.push(linksOption[m].source);
										}
									}
								}
							}
							if (linksNodes != null && linksNodes != undefined) {
								for ( var p in linksNodes) {
									nodesOption[linksNodes[p]].ignore = true;
									nodesOption[linksNodes[p]].flag = true;
								}
							}
							nodesOption[data.id].flag = true;
							myChart.setOption(option);
						}
					}
				}
				myChart.on(ecConfig.EVENT.CLICK, openOrFold);
				//--------------------
			}});
           
        });
	
}
$.ajax({ 
					url: "json/idx_overall_data.json", 
					dataType: "json", 
					success: function(idx_data) { 
						
						//echarts code start
						 // 1. 指定图表的配置项和数据
							var option = {
								title: {
									 text: '航运指数',
									 x:150
								},
								tooltip: {
									show:false,
									trigger: ' item', //触发tooltip类型，横坐标， 也可为item
									position:function(p){   //其中p为当前鼠标的位置
											return [p[0] + 10, p[1] - 10];
									}
								},
								legend: {
									color:'#fff',
									data:['运价指数','集装箱指数','散货指数'],
									selected:{
										'校验运价指数':false
									},
									x: 600, // 'center' | 'left' | {number},
									 y: 'top',
								},
								calculable : true, //是否能拖动
								xAxis : [ //x轴
									{
										type : 'category',
										data :idx_data.idx.period
									}
								] ,grid: {  //调整表格编距与大小
										
									height:300, 
									width:800,
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
										color:'#fff',
										data:idx_data.idx.total
									},
									{
										name:'集装箱指数',
										type:'line',
										color:'#cdcdcd',
										data:idx_data.idx.container
									},{
										name:'散货指数',
										type:'line',
										color:'#dedede',
										data:idx_data.idx.bulkload
									}
								],
								dataZoom: { //图表下方横条，数据区域缩放。与toolbox.feature.dataZoom同步，仅对直角坐标系图表有效。
									show: true,
									start : 90,
									end : 100,
									top:380,
									left:150,
									dataBackgroundColor:'#eee'
								}
							};
							
							// 2. 基于准备好的dom，初始化echarts实例
							var myChart = echarts.init(document.getElementById('overall'));
							// 3.使用刚指定的配置项和数据显示图表。
							myChart.setOption(option);
							myChart.on('click', function (params) {
									
									var dataIndex = params.name;
									var seriesName=params.seriesName;
									//alert(dataIndex);
									$('#force_place').append('<div id="other" style="width:100%;height:100%"></div>');
									load_force(dataIndex);
									
									$('#back').click(function(){
										
										$('#other').remove();
										$('#back').remove();
									});
									
							});
							
						//echarts code end
				}});//ajax end
