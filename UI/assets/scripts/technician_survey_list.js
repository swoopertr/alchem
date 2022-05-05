
console.log('technician_survey_list.js');
userPageType = 3;
check_exlogin();
var plot;
(function() {
    var links = util.selectDom('.survey_links');
    for(var i =  0; i < links.length; i++){
        var expDate = links[i].getAttribute('data-expired');
        if(new Date().getTime()> expDate ){
            links[i].style.display = 'none';
        }
    }

    if( $('#flotBars').get(0) ) {
        plot = $.plot('#flotBars', [chart_data], {
            colors: ['#8CC9E8'],
            series: {
                bars: {
                    show: true,
                    barWidth: 0.8,
                    align: 'center'
                }
            },
            xaxis: {
                mode: 'categories',
                tickLength: 0
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1,
                labelMargin: 15,
                backgroundColor: 'transparent'
            },
            tooltip: true,
            tooltipOpts: {
                content: '%y',
                shifts: {
                    x: -10,
                    y: 20
                },
                defaultTheme: false
            }
        });
    }



})();
