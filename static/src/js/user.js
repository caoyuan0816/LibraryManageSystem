$(function() {
    // 路径配置
    require.config({
        paths: {
           echarts: '/static/dist/js'
       }
   });
    // use pie
    require(
        [
        'echarts',
        'echarts/chart/pie'
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var categoryChart = ec.init(document.getElementById('pie-chart')); 
            option = {
                title : {
                    text: 'Book Category Distribution',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['Literature','Culture','Life','Economic']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true, 
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                {
                    name:'book category',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                    {value:20, name:'Literature'},
                    {value:10, name:'Culture'},
                    {value:5, name:'Life'},
                    {value:1, name:'Economic'}
                    ]
                }
                ]
            };
            // 为echarts对象加载数据 
            categoryChart.setOption(option); 
        }
    );
    // use line
    // require(
    //     [
    //     'echarts',
    //     'echarts/chart/line'
    //     ],
    //     function (ec) {
    //         // 基于准备好的dom，初始化echarts图表
    //         var tendencyChart = ec.init(document.getElementById('pie-chart')); 
    //         option = {
    //                             title : {
    //                                 text: 'borrow tendency'
    //                             },
    //                             tooltip : {
    //                                 trigger: 'axis'
    //                             },
    //                             legend: {
    //                                 data:['tendency']
    //                             },
    //                             toolbox: {
    //                                 show : true,
    //                                 feature : {
    //                                     mark : {show: true},
    //                                     dataView : {show: true, readOnly: false},
    //                                     magicType : {show: true, type: ['line', 'bar']},
    //                                     restore : {show: true},
    //                                     saveAsImage : {show: true}
    //                                 }
    //                             },
    //                             calculable : true,
    //                             xAxis : [
    //                                 {
    //                                     type : 'category',
    //                                     boundaryGap : false,
    //                                     data : ['Jan','Feb','Mar','Apr','May','Jun']
    //                                 }
    //                             ],
    //                             yAxis : [
    //                                 {
    //                                     type : 'value',
    //                                     axisLabel : {
    //                                         formatter: '{value} '
    //                                     }
    //                                 }
    //                             ],
    //                             series : [
    //                                 {
    //                                     name:'borrow tendency',
    //                                     type:'line',
    //                                     data:[1, 2, 15, 10, 12, 13],
    //                                     markPoint : {
    //                                         data : [
    //                                             {type : 'max', name: '最大值'},
    //                                             {type : 'min', name: '最小值'}
    //                                         ]
    //                                     }
    //                                 }
    //                             ]
    //                         };
    //         // 为echarts对象加载数据 
    //         tendencyChart.setOption(option); 
    //     }
    // );
});