import { CountUp } from "./node_modules/countup.js/dist/countUp.min.js";
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.covid19india.org/data.json");
xhr.send();
var total_val, recov, dea, act;
xhr.onreadystatechange = function () {
  if (xhr.status == 200 && xhr.readyState == 4) {
    //   alert(`Loaded: ${xhr.status} ${xhr.response}`);
    var json = xhr.responseText;
    //console.log(json);
    var parsed = JSON.parse(json);
    // var total = document.getElementById("total-value");
    total_val = parsed.statewise[3].confirmed;

    recov = parsed.statewise[3].recovered;

    dea = parsed.statewise[3].deaths;
    // var recovered = document.getElementById("recovered-value");
    // recovered.innerHTML = parsed.recovered.value;

    act = parsed.statewise[3].active;
    var delta_tot = document.getElementById("delta-total1");
    delta_tot.innerHTML = "+ " + parsed.statewise[3].deltaconfirmed;
    //delta_tot = document.getElementById("delta-total2");
    //delta_tot.innerHTML = "+ " + parsed.statewise[3].deltaconfirmed;
    var delta_rec = document.getElementById("delta-recoverd");
    delta_rec.innerHTML = "+ " + parsed.statewise[3].deltarecovered;
    var delta_death = document.getElementById("delta-deaths");
    delta_death.innerHTML = "+ " + parsed.statewise[3].deltadeaths;
    //   parsed.confirmed.value - parsed.recovered.value - parsed.deaths.value;
    var last = document.getElementById("last");
    // var last_up = JSON.stringify(parsed.lastUpdate);
    // //   console.log(last_up.split("T")[0]);
    // var date = last_up.split("T")[0].replace(`"`, " ");
    // var time = last_up.split("T")[1].replace(`"`, " ").replace(".000Z", "");
    // // console.log(date + "\n" + time);
    last.innerHTML = `Last Updated on ` + parsed.statewise[3].lastupdatedtime;

    //daily cases:
  }
};
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
var target = document.getElementById("total-value");
var recovered = document.getElementById("recovered-value");
var deaths = document.getElementById("deaths-value");
var active = document.getElementById("active-value");
window.onload = function () {
  var countUp = new CountUp(target, total_val);
  countUp.start();
  var countup2 = new CountUp(recovered, recov);
  countup2.start();
  var countup3 = new CountUp(deaths, dea);
  countup3.start();
  var countup4 = new CountUp(active, act);
  countup4.start();
};
