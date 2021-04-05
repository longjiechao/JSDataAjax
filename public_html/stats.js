function mostrarGrafica(){
    resetAll();
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChartBar);
    
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChartPie);

}

function drawChartBar() {
    var data = google.visualization.arrayToDataTable(getArrayInfoBar());
    var options = {
      chart: {
        title: titulo
      }
    };

    var chart = new google.charts.Bar(document.getElementById('graphBar'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawChartPie(){
    var data = google.visualization.arrayToDataTable(getArrayInfoPie());

        var options = {
          title: titulo + "Todos los años",
          'width':800,
          'height':400
        };

        var chart = new google.visualization.PieChart(document.getElementById('graphPie'));

        chart.draw(data, options);

}

function getArrayInfoBar(){
    var array = [["Años"]];
    for(i in categorias.Sexos){
        array[0].push(categorias.Sexos[i]);
    }
    for(i in info){
        var index = Object.keys(info).indexOf(i)+1;
        console.log(index);
        array[index] = [];
        array[index].push(i);
        var hombre = 0;
        var mujer = 0;
        var ambos = 0;
        for (c in info[i]){
            for (y in info[i][c]){
                if(y == "M"){
                    hombre += parseInt(info[i][c][y]);
                }else if(y == "F"){
                    mujer += parseInt(info[i][c][y]);
                }else{
                    ambos += parseInt(info[i][c][y]);
                }
            }
        }
        array[index].push(hombre);
        array[index].push(mujer);
        array[index].push(ambos);

    }
    console.log(array);
    return array;
}

function getArrayInfoPie(){
    var array = [['Sexo', 'Suicidios']];
    var hombre = 0;
    var mujer = 0;
    var ambos = 0;
    
    for(i in categorias.Sexos){
        var index = Object.keys(categorias.Sexos).indexOf(i)+1;
        console.log(index);
        
        if(i == "M"){
            for(y in info){
                for(c in info[y]){
                    hombre += parseInt(info[y][c][i]);
                }
            }
            array[index] = [categorias.Sexos[i], hombre];
        }
        else if(index == "F"){
            for(y in info){
                for(c in info[y]){
                    mujer += parseInt(info[y][c][i]);
                }
            }
            array[index] = [categorias.Sexos[i], hombre];
        }
        else{
            for(y in info){
                for(c in info[y]){
                    ambos += parseInt(info[y][c][i]);
                }
            }
            array[index] = [categorias.Sexos[i], ambos];
        }
    }
    console.log(array);
    return array;
}