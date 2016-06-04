exports.upcomingDatesOfWeek = function () {

  var now = new Date();

  // Get next Sunday
  var sunday = new Date(now);
  // set time to some convenient value
  sunday.setHours(23,59,59,59);
  sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

  return [Math.round(now.getTime()/1000), Math.round(sunday.getTime()/1000)];
}