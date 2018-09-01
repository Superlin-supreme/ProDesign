function load_world_cloud(suffix="",id='cloud'){
		var chart = echarts.init(document.getElementById(id));

		var option = {
				tooltip: {},
				series: [ {
					type: 'wordCloud',
					gridSize: 5,
					sizeRange: [12, 50],
					rotationRange: [-45, 45],
					shape: 'smooth',
					width: 1000,
					height: 600,
					drawOutOfBound: true,
					textStyle: {
						normal: {
							color: function () {
								return 'rgb(' + [
									Math.round(Math.random() * 160),
									Math.round(Math.random() * 160),
									Math.round(Math.random() * 160)
								].join(',') + ')';
							}
						},
						emphasis: {
							shadowBlur: 10,
							shadowColor: '#333'
						}
					},
					data: []
				} ]
				};

				chart.setOption(option);

				$(function(){
					
					$.ajax({
						//请求方式为get
						type:"GET",
						//json文件位置
						url:"json/cloud/cloud"+suffix+".json",
						//返回数据格式为json
						dataType: "json",
						//请求成功完成后要执行的方法
						success: function(data){
							//alert(data);
							chart.setOption({
								series:[{
									data:data.list
								}]
							});
						}
					});
				});


		window.onresize = chart.resize;
}

function cloud_slide_down(suffix){
		$('.word_cloud_block').append('<div class="word_cloud_sub_block" style="width:100%;height:300px;display:none;">'+//先display：none隐藏
									'<button id="slideBack2">返回</button>'+//切换与收起控件
									'<div class="cloud" id="sub_cloud">'+
									'</div>');
		load_world_cloud(suffix,"sub_cloud");//加载标签后将词云数据填入框框
		$("#cloud").slideUp('slow');//收起初始词云
		$(".word_cloud_sub_block").slideDown("slow");
		$("#slideBack2").click(function(){
						$(".word_cloud_sub_block").slideUp("slow");//上滑
						$(".word_cloud_sub_block").remove();
						$("#cloud").slideDown('slow');//返回初始词云
					});
		
}
