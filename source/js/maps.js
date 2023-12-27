const map = () => {
    let myMap
    const init = () => {
        myMap = new ymaps.Map("map", {
            center: [59.938631, 30.323037],
            zoom: 17,
            controls: [],
        });

        var coords = [[59.938631, 30.323037]],
            myCollection = new ymaps.GeoObjectCollection({}, {
                draggable: false,
                iconLayout: 'default#image',
                iconImageHref: "./img/map-pin.svg",
                iconImageSize: [46, 57],
                iconImageOffset: [-26, -52]
            });

        for (var i = 0; i < coords.length; i++) {
            myCollection.add(new ymaps.Placemark(coords[i]));
        }

        myMap.geoObjects.add(myCollection);

        myMap.behaviors.disable('scrollZoom');
    }

    ymaps.ready(init);
}
map()
