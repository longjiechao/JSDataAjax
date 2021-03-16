//https://datos.gob.es/es/catalogo/a05003423-suicidios-de-residentes-segun-sexos-islas-de-canarias-y-anos

consultaDades();
var categorias = {
    Años : [],
    Islas : {
        ES70 : "CANARIAS",
	ES708 : "Lanzarote",
	ES704 : "Fuerteventura",
	ES705 : "Gran Canaria",
	ES709 : "Tenerife",
	ES706 : "La Gomera",
	ES707 : "La Palma",
	ES703 : "El Hierro"
    },
    Sexos : {
        T : "Ambos sexos",
        M : "Hombres",
        F : "Mujeres"
    }
}


function consultaDades() {
    $.ajax({ url: "http://www.gobiernodecanarias.org/istac/jaxi-istac/tabla.do?accion=jsonMtd&uuidConsulta=8cb2c8db-0f85-4922-aee6-ccff24af73b3" })
    .done(function (data) {
       console.log(data.data);
    });
}


function setCategories(){
    
}