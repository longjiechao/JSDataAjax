function setMap(){
    resetAll();
    var myMap = L.map("myMap").setView([41.4166400, -3.7032700], 7);
    L.tileLayer(`https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png`, {
        maxZoom: 18,
    }).addTo(myMap);
    console.log(infoMap);
    
    for(i = 0; i < infoMap.length; i++){
        L.marker(
                [infoMap[i][0], infoMap[i][1]], {
                    title: infoMap[i][2],
        }).addTo(myMap);
    };
    setInterval(function () {
        myMap.invalidateSize();
    }, 100);
}

function showMap(){
    resetAll();
    var mapa = document.getElementById("myMap");
    mapa.style.display = "block";
}