//https://datos.gob.es/es/catalogo/a05003423-suicidios-de-residentes-segun-sexos-islas-de-canarias-y-anos

consultaDades();
var categorias = {};


function consultaDades() {
    $.ajax({ url: "http://www.gobiernodecanarias.org/istac/jaxi-istac/tabla.do?accion=jsonMtd&uuidConsulta=8cb2c8db-0f85-4922-aee6-ccff24af73b3" })
    .done(function (data) {
        allFunctions(data);
    });
}

function allFunctions(data){
    console.log(data.categories);
    setCategories(data.categories);
    crearTable();
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
    console.log(categorias);
}

function crearTable(){
    var mainDiv = $("#table");
    var table = document.createElement("table");
    
    crearTableTitle(table);

    
    $(table).attr("border", 2);
    $(mainDiv).append(table);
}

function crearTableTitle(table){
    var div = document.createElement("div");
    var tr, th, text;
    
    //primera tr
    tr = document.createElement("tr");
    for(i in categorias){
        th = document.createElement("th");
        text = document.createTextNode(i);
        if(i == "Sexos"){
            $(th).attr("colspan", 3);
        }
        $(th).append(text);
        $(tr).append(th);
    }
    $(div).append(tr);
    
    //segunda tr
    tr = document.createElement("tr");
    
    //cuadro vacio
    th = document.createElement("th");
    $(th).attr("colspan", 2);
    $(tr).append(th);
    
    for(i in categorias["Sexos"]){
        th = document.createElement("th");
        text = document.createTextNode(categorias["Sexos"][i]);
        $(th).append(text);
        $(tr).append(th);
    }
    $(div).append(tr);
    
    $(table).append(div);
}