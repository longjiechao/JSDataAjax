//https://datos.gob.es/es/catalogo/a05003423-suicidios-de-residentes-segun-sexos-islas-de-canarias-y-anos

consultaDades();
var categorias = {};
var info = {};


function consultaDades() {
    $.ajax({ url: "http://www.gobiernodecanarias.org/istac/jaxi-istac/tabla.do?accion=jsonMtd&uuidConsulta=8cb2c8db-0f85-4922-aee6-ccff24af73b3" })
    .done(function (data) {
        allFunctions(data);
    });
}

function allFunctions(data){
    console.log(data);
    setCategories(data.categories);
    console.log(categorias);
    createInfo();
    setInfo(data.data);
    console.log(info);
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

function crearTable(){
    var mainDiv = $("#table");
    var table = document.createElement("table");
    
    crearTableTitle(table);
    createTableContent(table);
    
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
        if(i != "Sexos"){
            $(th).attr("rowspan", 2);
        }else{
             $(th).attr("colspan", 3);
        }
        
        text = document.createTextNode(i);
        $(th).append(text);
        $(tr).append(th);
    }
    $(div).append(tr);
    
    //segunda tr
    tr = document.createElement("tr");
    
    for(i in categorias["Sexos"]){
        th = document.createElement("th");
        text = document.createTextNode(categorias["Sexos"][i]);
        $(th).append(text);
        $(tr).append(th);
    }
    $(div).append(tr);
    
    $(table).append(div);
}

function createTableContent(table){
    for(i = 0; i<categorias["Años"].length; i++){
        var div = document.createElement("div");
        var tr, th, td, text;

        //el resto
        for(j in categorias["Islas"]){
            if(Object.keys(categorias["Islas"]).indexOf(j) == 0){
                
                //años
                tr = document.createElement("tr");
                th = document.createElement("th");
                $(th).attr("rowspan", Object.keys(categorias["Islas"]).length);
                text = document.createTextNode(categorias["Años"][i]);
                $(th).append(text);
                $(tr).append(th);
                
                //crear poner el primer isla
                td = document.createElement("td");
                text = document.createTextNode(categorias["Islas"][j]);
                $(td).append(text);
                $(tr).append(td);
                
                for(s in categorias.Sexos){
                    td = document.createElement("td");
                    console.log(info[categorias["Años"][i]]);
                    text = document.createTextNode(info[categorias["Años"][i]][j][s]);
                    $(td).append(text);
                    $(tr).append(td);
                }
                
                $(div).append(tr);
            }else{
                //islas
                tr = document.createElement("tr");
                td = document.createElement("td");
                text = document.createTextNode(categorias["Islas"][j]);
                $(td).append(text);
                $(tr).append(td);
                for(s in categorias.Sexos){
                    td = document.createElement("td");
                    text = document.createTextNode(info[categorias["Años"][i]][j][s]);
                    $(td).append(text);
                    $(tr).append(td);
                }
                $(div).append(tr);
            }
            
        }
        $(table).append(div);
    }
}