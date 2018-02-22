const mapsAPI = new APIMaps("http://localhost:3000");
// const handlerAPI = new APIHandler("http://localhost:3000");

function startMap() {
  let modal =$('#modal-map').val();
  if(modal===""){
    // alert("jola");
    mapsAPI.startMap(true);
  }else{
    // alert("Adios");
    mapsAPI.startMap(false);
    
  }  
}

$(document).ready(() => {
  //de la vista search
  $('#form-search').on('submit', (event) => {
    event.preventDefault();
    // debugger
    let arriveHour = new Date($('#initHour').val());
    let leftHour = new Date($('#endHour').val());
    const travelMode = $('#travelMode').val().toUpperCase();

    if (travelMode === "DRIVING") {
      arriveHour.setHours(arriveHour.getHours() + 1);
      leftHour.setHours(leftHour.getHours() - 1);

    } else if (travelMode === "BICYCLING") {
      arriveHour.setHours(arriveHour.getHours() + 2);
      leftHour.setHours(leftHour.getHours() - 2);

    } else if (travelMode === "TRANSIT") {
      arriveHour.setHours(arriveHour.getHours() + 2);
      leftHour.setHours(leftHour.getHours() - 2);

    } else if (travelMode === "WALKING") {
      arriveHour.setHours(arriveHour.getHours() + 4);
      leftHour.setHours(leftHour.getHours() - 4);
    }
    if (arriveHour > leftHour) {
      alert("You dont have enough time to use that travel mode");
    } else {
      mapsAPI.getDoSearch(arriveHour, leftHour);
    }


  });

  $('#show-plans').on('click', '.btn-select-plan', (event) => {
    event.preventDefault();
    let div = event.target.parentElement;
    let lat = Number($(div).children().children('.lat')[0].defaultValue);
    let lng = Number($(div).children().children('.lng')[0].defaultValue);
    let startTime = Number($(div).children().children('.startTime')[0].defaultValue);
    let endTime = Number($(div).children().children('.endTime')[0].defaultValue);
    let duration = endTime - startTime;
    let arriveHour = new Date($('#initHour').val());
    const numTerminal = $('#start').val();
    const destination = {
      lat,
      lng
    };
    const waypoint = [{
      location: {
        lat: lat,
        lng: lng
      },
      stopover: true
    }];
    const selectDay = $('#initHour').val();
    const travelMode = $('#travelMode').val().toUpperCase();
    if (travelMode !== "DRIVING") {
      mapsAPI.myRoute(terminalCoordinates(numTerminal), destination, travelMode, Date.parse(selectDay));
      setTimeout(() => {
        mapsAPI.myRoute(destination, terminalCoordinates(numTerminal), travelMode, Date.parse(selectDay));
      }, 200);
      setTimeout(() => {
        mapsAPI.myRoute(terminalCoordinates(numTerminal), terminalCoordinates(numTerminal), "DRIVING", Date.parse(selectDay), waypoint,duration);
      }, 600);
    } else {
      mapsAPI.myRoute(terminalCoordinates(numTerminal), terminalCoordinates(numTerminal), "DRIVING", Date.parse(selectDay), waypoint, duration,true);
    }
    var rect = div.getBoundingClientRect();
    var i = rect.bottom;
    var int = setInterval(function () {
      window.scrollTo(0, i);
      i -= 10;
      if (i <= 0) clearInterval(int);
    }, 20);

  });

  $("#search-btn").click(function (event) {
    event.preventDefault();
    alert("hola");
  });
});

function terminalCoordinates(numTerminal) {
  const terminalCoordinates = {
    terminal1: {
      lat: 40.462832,
      lng: -3.571883
    },
    terminal2: {
      lat: 40.466766,
      lng: -3.572055
    },
    terminal3: {
      lat: 40.468686,
      lng: -3.569172
    },
    terminal4: {
      lat: 40.491820,
      lng: -3.593276
    },
  };
  return terminalCoordinates[numTerminal];
}