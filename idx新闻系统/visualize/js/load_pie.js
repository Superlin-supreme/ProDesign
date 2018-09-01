function load_pie(cargo,period){
				$.ajax({
						url:"json/idx_each_period.json",
						dataType:"json",
						success:function(pie_data){
									alert("第"+period+"期"+cargo+"指数分布");
									cargo2idx={"煤炭":0,"钢铁":1,"沙石":2,"粮食":3,"矿石":4,"内贸集装箱":5,"香港集装箱":6,"外贸集装箱":7}
									period=period-1;
									//alert(pie_data[cargo2idx[cargo]][period]);
									data=pie_data[cargo2idx[cargo]][period]
									//alert(data)
									
									pie_option = {
											tooltip: {
												trigger: 'item',
												formatter: "{a} <br/>{b}: {c} ({d}%)"
											},
											legend: {
												
											},
											series: [
												{
													name:'访问来源',
													type:'pie',
													radius: ['50%', '70%'],
													avoidLabelOverlap: false,
													label: {
														normal: {
															show: false,
															position: 'center'
														},
														emphasis: {
															show: true,
															textStyle: {
																fontSize: '30',
																fontWeight: 'bold'
															}
														}
													},
													labelLine: {
														normal: {
															show: false
														}
													},
													data:data
												}
											]
										};
										
										var pieChart=echarts.init(document.getElementById('pie'),theme);
										pieChart.setOption(pie_option);
						
						}
				});
			}
