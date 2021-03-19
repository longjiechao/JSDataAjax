      function drawChart() {
        var data = google.visualization.arrayToDataTable(getArrayInfo());
        var options = {
          chart: {
            title: titulo,
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          }
        };

        var chart = new google.charts.Bar(document.getElementById('graph'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
    
    function getArrayInfo(){
        var array = [["Años"]];
        for(i in categorias.Sexos){
            array[0].push(categorias.Sexos[i]);
        }
        for(i in info){
            var index = Object.keys(info).indexOf(i)+1;
            console.log(index);
            array[index] = [];
            array[index].push(i);
            for (y in info[i]["ES70"]){
                array[index].push(parseInt(info[i]["ES70"][y]));
            }
        }
        console.log(array);
        return array;
    }