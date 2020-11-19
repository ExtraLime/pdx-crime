function newGeo (geo, updates) {
// create a new object with each hood:count
    const hoodCount = {}
    const hoodNames = []
//extract info from query
    for (let i=0;i<updates.length;i++){
        hoodCount[updates[i]['location'].toString()] = updates[i]['count'];
        hoodNames.push(updates[i]['location'].toString())
    }
//update the original geojson

    for (let i=0; i<geo['features'].length; i++){
        const mapLabel = geo['features'][i]['properties']['MAPLABEL'];
        //I don't know how to check for array membership or get object keys 
        if(hoodNames.includes(mapLabel)) {
            geo['features'][i]['properties']['count'] = hoodCount[mapLabel];
        }else {
            geo['features'][i]['properties']['count']= 0}
    }
    return geo
};

module.exports = {
  newGeo
}