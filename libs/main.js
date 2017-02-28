     var map = L.map('map', {
         center: [45.3126, 34.4147],
         zoom: 9
     })

     var hash = new L.Hash(map);

     var layerOSM = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     });

     var layerMapSurfer = new L.tileLayer("http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", {
         attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     });

     var layerMapboxImagery = new L.tileLayer('http://{s}.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q', {
         maxNativeZoom: 17,
         maxZoom: 18,
         attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
     });

     var BingLayer = L.TileLayer.extend({
         getTileUrl: function (tilePoint) {
             this._adjustTilePoint(tilePoint);
             return L.Util.template(this._url, {
                 s: this._getSubdomain(tilePoint),
                 q: this._quadKey(tilePoint.x, tilePoint.y, this._getZoomForUrl())
             });
         },
         _quadKey: function (x, y, z) {
             var quadKey = [];
             for (var i = z; i > 0; i--) {
                 var digit = '0';
                 var mask = 1 << (i - 1);
                 if ((x & mask) != 0) {
                     digit++;
                 }
                 if ((y & mask) != 0) {
                     digit++;
                     digit++;
                 }
                 quadKey.push(digit);
             }
             return quadKey.join('');
         }
     });

     var layerBingAerial = new BingLayer('http://t{s}.tiles.virtualearth.net/tiles/a{q}.jpeg?g=2732', {
         subdomains: ['0', '1', '2', '3', '4'],
         attribution: '&copy; <a href="http://bing.com/maps">Bing Maps</a>'
     });


     var layerUAOrtho = new L.tileLayer('http://map.land.gov.ua/map/ortho10k_all/{z}/{x}/{y}.jpg', {
         tms: true,
         maxNativeZoom: 16,
         maxZoom: 18,
         attribution: 'Image tiles: &copy <a href="https://land.gov.ua/">StateGeoCadastre of Ukraine</a>'
     });


     var layerUACadastre = new L.TileLayer.WMS('http://map.land.gov.ua/geowebcache/service/wms?', {
         layers: 'kadastr',
         format: 'image/png',
         transparent: true,
         maxNativeZoom: 16,
         maxZoom: 18,
         attribution: 'Image tiles: &copy <a href="https://land.gov.ua/">StateGeoCadastre of Ukraine</a>'
     });


     var layerRosreestr = new L.TileLayer.EsriRest("https://pkk5.rosreestr.ru/arcgis/rest/services/Cadastre/Cadastre/MapServer", {
         layers: '0,1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,29,30,31,32,33,34,35,38,39',
         transparent: true
     });


     var baseLayers = {
         "OpenStreetMap": layerOSM,
         "MapSurfer": layerMapSurfer,
         "Mapbox Imagery": layerMapboxImagery,
         "Bing Aerial": layerBingAerial,
         "Orthophoto": layerUAOrtho
     };

     var overlayLayers = {
         "Ukraine cadastre": layerUACadastre,
         "Russia cadastre": layerRosreestr
     };


     L.control.layers(baseLayers, overlayLayers, {
         collapsed: false
     }).addTo(map);


     layerMapSurfer.addTo(map);
     layerUACadastre.addTo(map);
     layerRosreestr.addTo(map);