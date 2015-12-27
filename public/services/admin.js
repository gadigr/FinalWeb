angular.module('AdminService', []).factory('Geocoder', function ($q, $timeout) {

    return {
        latLngForAddress : function (address, callback) {
            var geocoder = new google.maps.Geocoder();

            var latLng = {
                lat: "",
                lng: ""
            }

            geocoder.geocode({address: address}, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK) {

                    latLng.lat = result[0].geometry.location.lat(),
                    latLng.lng = result[0].geometry.location.lng()


                } else {
                    console.log(status);
                }
                callback.apply(null,[latLng]);
            });
        }
    };

});
