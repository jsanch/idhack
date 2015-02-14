var jsonstring;
var names = [];

function initialize() {
    //alert("here")
    $.get("https://communities.socrata.com/resource/rd25-4b5p.json?$$app_token=qqWOL1eWwrOBiLADaJ0cKz1j5", function( data ) {
        jsonstring = data;
    });
}

function getAllNames() {
    for(i in jsonstring) {
        names[i] = jsonstring[i].name;
    }
}

function getSchoolObj(schoolname) {
    for (i in jsonstring) {
        if(jsonstring[i].name == schoolname){
            return jsonstring[i];
        }
    }
}

function calcDist(lat1, lat2, longe1, longe2) {
    // With help from StackOverflow question at http://bit.ly/1goDPIX

    var R = 6371; // kilometers
    var x1 = lat1-lat2;
    var dLat = toRad(x1);  
    var x2 = longe1-longe2;
    var dLon = toRad(x2);  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    d = (Math.round(d * 100) / 100);

    return d;
}