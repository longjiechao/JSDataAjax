//https://datos.gob.es/es/catalogo/a05003423-suicidios-de-residentes-segun-sexos-islas-de-canarias-y-anos
//https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=tasa-enfermos-acumulados-por-areas-de-salud&q=&sort=fecha&facet=fecha&facet=nombregerencia&facet=zbs_geo&facet=tipo_centro&facet=municipio

window.onload = function(){
    consultaDades();
    consultaMapa();
};

var categorias = {};
var info = {};
var infoMap = [];
var titulo;

function consultaDades() {
    $.ajax({ url: "http://www.gobiernodecanarias.org/istac/jaxi-istac/tabla.do?accion=jsonMtd&uuidConsulta=8cb2c8db-0f85-4922-aee6-ccff24af73b3" })
    .done(function (data) {
        allFunctions(data);
    });
}

function allFunctions(data){
    setTitle(data);
    
    console.log(data);
    setCategories(data.categories);
    //console.log(categorias);
    createInfo();
    setInfo(data.data);
    console.log(info);
    crearTable();
    
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);
}

function setTitle(data){
    titulo = data.title;
    var h1 = document.getElementById("title");
    var text = document.createTextNode(titulo);
    $(h1).append(text);
}

function setCategories(categories){
    for(i = 0; i < categories.length; i++){
        if(categories[i].variable == "Años"){
            var años = [];
            for(y = 0; y < categories[i].labels.length; y++){
                años.push(categories[i].labels[y]);
            }
            categorias[categories[i].variable] = años;
        }else{
            categorias[categories[i].variable] = {};
            for(y = 0; y < categories[i].labels.length; y++){
                categorias[categories[i].variable][categories[i].codes[y]] = categories[i].labels[y];
            }
        }
    }
}

function createInfo(){
    for(year = 0; year < categorias.Años.length; year++){
        info[categorias.Años[year]] = {};
        for(isla in categorias.Islas){
            info[categorias.Años[year]][isla] = {};
            for(sexo in categorias.Sexos){
                info[categorias.Años[year]][isla][sexo] = 0;
            }
        }
    }
}

function setInfo(data){
    for(i = 0; i < data.length; i++){
        info[data[i].dimCodes[0]][data[i].dimCodes[1]][data[i].dimCodes[2]] = data[i].Valor;
    }
}

function consultaMapa(){
    $.ajax({ url: "https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=tasa-enfermos-acumulados-por-areas-de-salud&q=&sort=fecha&facet=fecha&facet=nombregerencia&facet=zbs_geo&facet=tipo_centro&facet=municipio"})
    .done(function (data) {
        allFunctionsMap(data);
    });
}

function allFunctionsMap(data){
    setInfoMap(data.records);
    setMap();
}

function setInfoMap(data){
    for (i = 0; i < data.length; i++){
        infoMap[i] = [data[i].fields.y_geo, data[i].fields.x_geo, (data[i].fields.provincia +": "+ data[i].fields.centro)];
    }
    console.log(infoMap);
    console.log(data);
}