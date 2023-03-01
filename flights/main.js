(function(){//IIFE(Immediatley Invoked Function Expression)
    
   
    var map = L.map('theMap').setView([42, -60], 4); // 4 is for zoom and the [numbers in here are to put a center to the map]

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {// loads in little pieces to the map and what flavour of map you want. what style you like
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map); 

    let geoJsonLayer = L.geoJSON(null).addTo(map);
    //if(geoJsonLayer === geoJsonLayer.clearLayers)// not working, please help ha maybe an if statement
        //geoJsonLayer.addData(geoJsonLayer);//https://gis.stackexchange.com/questions/218935/how-to-remove-features-from-a-leaflet-geojson-layer
    
    function timeOut() { // I need to creat a function with the fetch data to be able use the setTimeout to work
       
        //Fetch the data
    fetch('https://opensky-network.org/api/states/all')// calling API to get the json data
    .then(response => response.json())
    .then(rawJsonData => {

        console.log(rawJsonData);// returning raw json data as an array

       let canadianOrigin =  rawJsonData.states.filter(states => { // shorthand version of function // this is an array of an array
            return states[2].includes('Canada') // instead of using origin_country use the index number on the open sky netwerok site which is [2] 

        }) .map(plane =>{ // creating a new onject for each plane converting it into the new object
            return{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [plane[6],plane[5]] 
                },
                "properties": {
                  "true_track": plane[10] // set rotation angle
                }
              }
            }); 
            
        console.log(canadianOrigin); // returning Canada (flights) // logging GeoJson


            // this displays the marker on the map. copies from https://leafletjs.com/SlavaUkraini/examples/quick-start/ But, only shows one marker based on info entered
            //  var circle = L.circle([51.508, -0.11], {
            //     color: 'red',
            //     fillColor: '#f03',
            //     fillOpacity: 0.5,
            //     radius: 500
            // }).addTo(map);
    
         canadianOrigin.forEach(plane =>{       // use a foreach loop to go through each array of each candian flight to show all markers on map
                                                // using function(plane) to access each index of the array
        
        if (plane.geometry.coordinates[0] != null || plane.geometry.coordinates[1] != null) // if not equal to null return 
                        
         L.marker([plane.geometry.coordinates[0], plane.geometry.coordinates[1]], { // Im gettig an error of latlong null, so its not showing all the flights, 
                                                                                    //I think i will need to do an if statement
            icon: planeIcon,                                            //to figure it out. if long != null and lat is !=null return plane
            }).setRotationAngle(plane.properties.true_track).addTo(map);//filtering through geoJson data (properties)made from Json data
                                                                 // I have to use the index of plane just like I used in the L.marker[6][5] from OpenSky REST API
        });                                                   // https://developer.apple.com/documentation/quartz/ikimageview/1503535-setrotationangle?language=objc
                                                             // https://www.tabnine.com/code/java/methods/com.sudoplay.joise.module.ModuleBasisFunction/setRotationAngle
                                                            //https://www.npmjs.com/package/leaflet-marker-rotation
        });
        setTimeout(timeOut,7000); //https://stackoverflow.com/questions/54234262/how-to-move-markers-on-openstreetmap-using-leaflet   // setting refresh time
    
         }                                                       
            // copied and pasted from  https://leafletjs.com/SlavaUkraini/examples/custom-icons/ // switches the circles to plane icons
    let planeIcon = L.icon({
        iconUrl: 'plane.png', // from the png files you gave us for the assignment
        iconSize: [30, 60], // size of the icon
         });

         timeOut(); //calling function for the setTimeout to work
         

})()
