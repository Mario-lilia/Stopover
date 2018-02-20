class APIMaps {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.map;
    this.currentMarker;
    this.directionsService;
    this.directionsDisplay;
    this.time = [];
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.labelIndex = 0;
    this.markers = [];
  }
  startMap() {
    this.map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 11,
        center: {
          lat: 40.39254,
          lng: -3.698624
        }
      }
    );
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
  }

  getDoSearch(arriveHour, leftHour) {
    const self = this;
    let idUser = $('#user-id').val();
    this.deleteMarkers();
    this.directionsDisplay.setMap(null);
    $('#info-map').empty();
    axios.post(this.BASE_URL + `/users/${idUser}/plans/doSearch`, {
        arriveHour,
        leftHour
      })
      .then(function (response) {
        $('#show-plans').empty();
        if (response.data.plans) {
          console.log(response.data.plans);
          let i = 0;
          response.data.plans.forEach(plan => {
            self.showMarkerInMap(plan.latPosition, plan.lngPosition, plan.title);
            self.showPlan(plan, i);
            i++;
          });
        } else {
          alert(response.data.error);
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showMarkerInMap(lat, lng, title) {
    let marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      map: this.map,
      title: title,
      //label: this.labels[this.labelIndex++ % this.labels.length],
    });
    this.markers.push(marker);
    return marker;
  }
  deleteMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  myRoute(origin, destination, travelMode, selectDay, waypoints) {
    this.deleteMarkers()
    if (waypoints) {
      var directionRequest = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: travelMode,
        transitOptions: {
          departureTime: new Date(selectDay)
        }
      };
    } else {
      var directionRequest = {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        transitOptions: {
          departureTime: new Date(selectDay)
        }
      };
    }

    this.directionsService.route(
      directionRequest,
      (response, status) => {
        if (status === 'OK') {
          // everything is ok
          this.directionsDisplay.setDirections(response);
          this.showTimeAndDistance(response);
          console.log(response);
          if (travelMode !== "DRIVING") {
            (this.time.length) > 1 ? this.time = [] : "";
            this.time.push(response.routes[0].legs[0].duration.text);
          } else {
            if ((this.time.length) == 0) {
              this.time.push(response.routes[0].legs[0].duration.text);
              this.time.push(response.routes[0].legs[1].duration.text);
            }
            this.showInfoTravelInMap(travelMode);
            this.directionsDisplay.setMap(this.map);
          }
        } else {
          // something went wrong
          window.alert('Directions request failed due to ' + status);
        }
      } //.bind(this)
    );
  }

  showPlan(plan, i) {
    let days = "";
    plan.days.forEach(element => {
      days = days + " | " + element;
    });
    $('#show-plans').append(`
    <form class="form-horizontal" id="form-plans">
      <div class="form-group">
        <h4><strong>${plan.title}<strong></h4>
        <p>${plan.description}</p>
      </div>
      <div class="form-group">
        <label class="col-sm-1 control-label">Start:</label>
        <div class="col-sm-2">
          <input type="text" class="form-control startTime" value="${plan.startTime}" readonly>
        </div>
        <label class="col-sm-1 control-label">End:</label>
        <div class="col-sm-2">
          <input type="text" class="form-control endTime" value="${plan.endTime}" readonly>
        </div>
        <label class="col-sm-1 control-label">Lat:</label>
        <div class="col-sm-2">
          <input type="text" class="form-control lat" value="${plan.latPosition}" readonly>
        </div>
        <label class="col-sm-1 control-label">Lng:</label>
        <div class="col-sm-2">
          <input type="text" class="form-control lng" value="${plan.lngPosition}" readonly>
        </div>
        <button class="btn btn-success btn-select-plan">Select plan</button>
        <!-- Large modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg${i}">Info Plan</button>
        
      </div>
      <div class="modal fade bs-example-modal-lg${i}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel"><strong>${plan.title}<strong></h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-12"><p>${plan.description}</p></div>
              </div>
              <div class="row">
                <div class="col-sm-5">
                  <img src="${plan.imgUrl}" width="100%" alt="">
                </div>
                <div class="col-sm-5">
                  <p>TIMETABLE</p>
                  <p>Days:</p>
                  <p>${days}</p>
                  <p>Open Hours:</p>
                  <p>${plan.startTime} - ${plan.endTime}</p>      
                  <p>PRICE: ${plan.price}€</p>            
                </div>
              </div>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  `);
  }

  showInfoTravelInMap(travelMode) {
    $('#info-map').remove();
    $('#art-map').append(`
    <div id="info-map">
    <strong>PLAN INFO:</strong>
    Outward Journey: ${this.time[0]}
    Return Journey: ${this.time[1]}
    </div>`);
  }

  showTimeAndDistance(response) {
    $('#show-Time-Duration').empty();
    $('#show-Time-Duration').append(`
    <label for="destination" class="col-sm-2 control-label">Distance</label>
    <div class="col-sm-4">
      <input type="text" class="form-control" id="destination" value="${response.routes[0].legs[0].distance.text}" readonly>
    </div>
    <label for="destination" class="col-sm-2 control-label">Duration</label>
    <div class="col-sm-4">
      <input type="text" class="form-control" id="destination" value="${response.routes[0].legs[0].duration.text}" readonly>
    </div>`);
  }




  // getPosition(map, currentMarker) {
  //   google.maps.event.addListener(map, "click", function (e) {
  //     currentMarker.setMap(null);
  //     currentMarker = new google.maps.Marker({
  //       position: e.latLng,
  //       map: map,
  //       title: "I'm here"
  //     });
  //     $('#lat').val(e.latLng.lat);
  //     $('#lng').val(e.latLng.lng);
  //   });
  // }

}