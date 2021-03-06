//console.log(clusterMap);
function chooseCompDropdown()
{
var FirstSelection=$($("input[type='checkbox']:checked")[0]).attr("class");
var SecondSelection=$($("input[type='checkbox']:checked")[1]).attr("class");
var data=clusterMap[FirstSelection];
var data1=clusterMap[SecondSelection];
var isExceptionChart1=false;
var isExceptionChart2=false;
var selectedDropdownValue=document.getElementById("selectComp").value;
var CompareChart1=null;
var CompareChart2=null;
var isCategoryChart1=false;
var isCategoryChart2=false;
if(data["catList"].includes(selectedDropdownValue)) isExceptionChart1=true;
if(data["expList"].includes(selectedDropdownValue)) isCategoryChart1=true;
if(data1["catList"].includes(selectedDropdownValue)) isExceptionChart2=true;
if(data1["expList"].includes(selectedDropdownValue)) isCategoryChart2=true;

CompareChart1=Highcharts.chart('1CompChart', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    credits:{
        enabled:false
    },
    title: {
        text: selectedDropdownValue+' Values for Cluster 1'
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{

        colorByPoint: true,
        data: []
    }]
});
CompareChart2=Highcharts.chart('2CompChart', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    credits:{
        enabled:false
    },
    title: {
        text: selectedDropdownValue+' Values for Cluster 2'
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{

        colorByPoint: true,
        data: []
    }]
});

if(isCategoryChart1){
var newData=data["catSum"][selectedDropdownValue];
var newDataToUse=[];

newDataToUse.push({'name':'Non-'+selectedDropdownValue,'y':newData['Non-'+selectedDropdownValue]});
newDataToUse.push({'name':selectedDropdownValue,'y':newData[selectedDropdownValue]});
CompareChart1.series[0].setData(newDataToUse);
// Build the chart
}

else if(isExceptionChart1)
{
    var newData=data["expSum"];
    var dataForCharts;
    newData.forEach(e=>{
     if(e[selectedDropdownValue])
     dataForCharts=e[selectedDropdownValue];
    });
    var newDataCategories=[],newDataToUse=[];
    newDataCategories.push(Object.keys(dataForCharts));
    for(var i=0;i<newDataCategories[0].length;i++){
    newDataToUse.push({'name':newDataCategories[0][i],'y':dataForCharts[newDataCategories[0][i]]});
    }
    CompareChart1.series[0].setData(newDataToUse);
}
else
{
    var newData=data["contSum"][selectedDropdownValue];
    var newDataToUse=[],catToShow=[];
    var cat=[],len=Object.keys(newData).length;
    for(var i=0;i<len;i++)
     cat.push(Object.keys(newData)[i]);
     cat.sort();
   for(var i=0;i<len;i++)
       newDataToUse.push(newData[cat[i]]);

   cat.forEach((element,i)=>{
    if((Number(element))%1!=0) cat[i]=Number(element).toFixed(3);
    if (i>0) catToShow.push(cat[i-1]+"-"+cat[i]); else catToShow.push("0-"+cat[0]);
    });
CompareChart1=Highcharts.chart('1CompChart', {
    chart: {
        type: 'column'
    },
    credits:{
        enabled:false
    },
    title: {
        text: selectedDropdownValue+' Values for Cluster 1'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: selectedDropdownValue
        }
    },
    tooltip: {
        formatter:function(){
            return ('<b>'+this.x+'</b>:'+this.y);
        },
        shared: true,
        useHTML: true
    },
    plotOptions: {
        series:{
            borderColor: '#303030'
        },
        column: {
            pointPadding: 0.2,
        }
    },
    series: [{
        name: selectedDropdownValue,
        //data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
});
CompareChart1.series[0].setData(newDataToUse);
CompareChart1.xAxis[0].setCategories(catToShow);
}

if(isCategoryChart2){
var newData1=data1["catSum"][selectedDropdownValue];
var newDataToUse1=[];
newDataToUse1.push({'name':'Non-'+selectedDropdownValue,'y':newData1['Non-'+selectedDropdownValue]});
newDataToUse1.push({'name':selectedDropdownValue,'y':newData1[selectedDropdownValue]});
CompareChart2.series[0].setData(newDataToUse1);
}
else if(isExceptionChart2){
    var newData1=data1["expSum"];
    var dataForCharts1;
    newData1.forEach(e=>{
     if(e[selectedDropdownValue])
     dataForCharts1=e[selectedDropdownValue];
    });
    var newDataCategories1=[],newDataToUse1=[];
    newDataCategories1.push(Object.keys(dataForCharts1));
    for(var i=0;i<newDataCategories1[0].length;i++){
    newDataToUse1.push({'name':newDataCategories1[0][i],'y':dataForCharts1[newDataCategories1[0][i]]});
    }
    CompareChart2.series[0].setData(newDataToUse1);
}
else{

    var newData1=data1["contSum"][selectedDropdownValue];
    var newDataToUse1=[],catToShow1=[];
    var cat1=[],len=Object.keys(newData1).length;
    for(var i=0;i<len;i++)
     cat1.push(Object.keys(newData1)[i]);
     cat1.sort();
    for(var i=0;i<len;i++)
       newDataToUse1.push(newData1[cat1[i]]);
           
     cat1.forEach((element,i)=>{
     if((Number(element))%1!=0) cat1[i]=Number(element).toFixed(3);
     if (i>0) catToShow1.push(cat1[i-1]+"-"+cat1[i]); else catToShow1.push("0-"+cat1[0]);
     });
    
    CompareChart2=Highcharts.chart('2CompChart', {
    chart: {
        type: 'column'
    },
    credits:{
        enabled:false
    },
    title: {
        text: selectedDropdownValue+' Values for Cluster 2'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: selectedDropdownValue
        }
    },
    tooltip: {
        formatter:function(){
            return ('<b>'+this.x+'</b>:'+this.y);
        },
        shared: true,
        useHTML: true
    },
    plotOptions: {
        series:{
            borderColor: '#303030'
        },
        column: {
            pointPadding: 0.2,
        }
    },
    series: [{
        name: selectedDropdownValue,
        //data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
    });
    CompareChart2.series[0].setData(newDataToUse1);
    CompareChart2.xAxis[0].setCategories(catToShow1);
    
}
}

function chooseClusterDropdown(){
//console.log(data);
data=clusterMap["A"];
var selectedDropdownValue=document.getElementById("selectCluster").value;
var ClusterChart;
var isCategory=false;
var isException=false;

ClusterChart=Highcharts.chart('ClusterChart', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    credits:{
        enabled:false
    },
    title: {
        text:  selectedDropdownValue+' Values'
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        series:{
            borderColor: '#303030'
        },
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{

        colorByPoint: true,
        data: []
    }]
});

if(ExceptionClustersList.includes(selectedDropdownValue)) isException=true;
else if(categorialList.includes(selectedDropdownValue)) isCategory=true;
if(isCategory)
{
    var newData=data["catSum"][selectedDropdownValue];
    var newDataToUse=[];
    newDataToUse.push({'name':'Non-'+selectedDropdownValue,'y':newData['Non-'+selectedDropdownValue]});
    newDataToUse.push({'name':selectedDropdownValue,'y':newData[selectedDropdownValue]});
    ClusterChart.series[0].setData(newDataToUse);
}

else if(isException)
{
    var newData=data["expSum"];
    var dataForCharts;
    newData.forEach(e=>{
     if(e[selectedDropdownValue])
     dataForCharts=e[selectedDropdownValue];
    });
    var newDataCategories=[],newDataToUse=[];
    newDataCategories.push(Object.keys(dataForCharts));
    for(var i=0;i<newDataCategories[0].length;i++){
    newDataToUse.push({'name':newDataCategories[0][i],'y':dataForCharts[newDataCategories[0][i]]});
    }
    ClusterChart.series[0].setData(newDataToUse);
}
else{
    var newData=data["contSum"][selectedDropdownValue];
    var newDataToUse=[],catToShow=[];
    var cat=[],len=Object.keys(newData).length;
    for(var i=0;i<len;i++)
     cat.push(Object.keys(newData)[i]);
    cat.sort();
   for(var i=0;i<len;i++)
     newDataToUse.push(newData[cat[i]]);

   cat.forEach((element,i)=>{
    if(Number(element)%1!=0) cat[i]=Number(element).toFixed(3);
    if (i>0) catToShow.push(cat[i-1]+"-"+cat[i]); else catToShow.push("0-"+cat[0]);
    });

ClusterChart=Highcharts.chart('ClusterChart', {
    chart: {
        type: 'column'
    },
    title: {
        text: selectedDropdownValue+' Values'
    },
    credits:{
        enabled:false
    },
    subtitle: {
        text:''
    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: selectedDropdownValue
        }
    },
    tooltip: {
        formatter:function(){
            return ('<b>'+this.x+'</b>:'+this.y);
        },
        shared: true,
        useHTML: true
    },
    plotOptions: {
        series:{
            borderColor: '#303030'
        },
        column: {
            pointPadding: 0.2,
        }
        
    },
    series: [{
        name: selectedDropdownValue,
        //data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
});
//console.log(newDataToUse);
ClusterChart.series[0].setData(newDataToUse);
ClusterChart.xAxis[0].setCategories(catToShow);
}
}

var chart=null;
chart = new Highcharts.Chart({
  chart: {
      renderTo: 'left-bars',
      animation: true,
      height:400,
      width:400
  },
  credits:{
    enabled:false
},
  title: {
      text: 'X-Axis attributes weights'
  },

  xAxis: {
      categories: []
  },
  yAxis: {
    softMax: 1
},

  plotOptions: {
      series: {
        borderColor: '#303030',
          point: {
              events: {

                  drag: function (e) {
                    
                  },
                  drop: function () {
                    var V={},data=chart.series[0].data;
                    for(var i=0;i<data.length;i++)
                    {
                         V[data[i].category]=data[i].y;
                    }
                    changed="X";
                    GlobalV.push(V);
                    scatterPlot.updategraph("X",[],[],V);
                    }
              }
          },
          stickyTracking: false,
          dragDrop: {
            draggableY: true,
            dragMaxY:1,
            dragMinY:-1
        }
      },
      bar: {
          stacking: 'normal', minPointLength: 2
      },
      line: {
          cursor: 'ns-resize'
      }
  },

  tooltip: {
      yDecimals: 2,
      formatter:function(){
          return this.x + ":" +this.y;
      }
  },
  legend: {
    enabled: false
},  
  series: [{
      type: 'bar',
      negativeColor: '#FF0000'
  }]

});
var chartRight=null;
chartRight = new Highcharts.Chart({
    chart: {
        renderTo: 'right-bars',
        animation: false,
        height:400,
        width:400
    },
    credits:{
        enabled:false
    },
    title: {
        text: 'Y-Axis attributes weights'
    },
    legend: {
        enabled: false
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        Max: 1
    },
    
    plotOptions: {
        series: {
            borderColor: '#303030',
            point: {
                events: {
                    drag: function (e) {
                      
                    },
                    drop: function () {
                        var V={},data=chartRight.series[0].data;
                        for(var i=0;i<data.length;i++)
                        {
                             V[data[i].category]=data[i].y;
                        }
                        
                        GlobalV.push(V);
                        scatterPlot.updategraph("Y",[],[],V);
                        changed="Y";
                    }
                }
            },
            dragDrop: {
                draggableY: true,
                dragMaxY:1,
                dragMinY:-1
            },
            stickyTracking: false
        },
        bar: {
            stacking: 'normal',
            //cursor: 'ns-resize'
        },
        line: {
            cursor: 'ns-resize'
        }
    },
  
    tooltip: {
        yDecimals: 2,
        formatter:function(){
            return this.x + ":" +this.y;
        }
    },
  
    series: [{  
        //draggableX: true,
        type: 'bar',
        width:300,
        height:500,
        minPointLength: 2,        
        negativeColor: '#FF0000'
    }]
  
  });


