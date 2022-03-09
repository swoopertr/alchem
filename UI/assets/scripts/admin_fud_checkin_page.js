console.log('admin_fud_checkin_page.js');
userPageType = 2;
check_login();

(function() {
   
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    console.log(position.coords.latitude+ ", " + position.coords.longitude);
    document.getElementById('coordinate').value =  position.coords.latitude+ ", " + position.coords.longitude;
}

getLocation();



})();
