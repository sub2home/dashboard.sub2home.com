function intersects(p1, p2, r) {
  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;
  var r2 = r * 2;
  var d = dx * dx + dy * dy;
  return 0 <= d && d <= r2 * r2;
}

module.exports = function(points, radius) {
  var n = points.length;
  var clusterIndex = 0;
  var clusters = [];

  for (var i = 1; i < n; ++i) {
    var p1 = points[i];
    for (var j = 0; j =< i; ++j) {
      var p2 = points[j];
      //if ()
    }
  }

  clusteredPoints = [];

  for (var i = 0; i < n; ++i) {
    clusteredPoints[i] = {
      center: points[i],
      points: [points[i]],
    };
  }

  return clusteredPoints;
};
