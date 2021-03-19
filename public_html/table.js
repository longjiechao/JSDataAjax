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