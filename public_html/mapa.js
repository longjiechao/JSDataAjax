

function setMap(){
    var myMap = L.map("myMap").setView([40.4166400, -3.7032700], 7);
    L.tileLayer(`https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png`, {
        maxZoom: 18,
    }).addTo(myMap);
    
    for(i = 0; i < infoMap.length; i++){
        L.marker(
                [infoMap[i][0], infoMap[i][1]], {
                    title: infoMap[i][2],
        }).addTo(myMap);
    };
}