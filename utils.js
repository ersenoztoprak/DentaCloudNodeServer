exports.upcomingDatesOfWeek = function () {

  var now = new Date();

  // set time to some convenient value
  now.setHours(0,0,0,0);

  // Get next Sunday
  var sunday = new Date(now);
  sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

  return [Math.round(now.getTime()/1000), Math.round(sunday.getTime()/1000)];
}