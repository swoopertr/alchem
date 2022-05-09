
console.log('technician_page.js');
userPageType = 3;
check_exlogin();

(function() {
    if( $('#flotPie').get(0) ) {
        var plot = $.plot('#flotPie', pie_chart_data, {
            series: {
                pie: {
                    show: true,
                    combine: {
                        color: '#999',
                        threshold: 0.1
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        });
    }

})();
