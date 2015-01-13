function intersects(p1, p2, r) {
  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;
  var r2 = r * 2;
  return dx * dx + dy * dy <= r2 * r2;
}

function mean(points) {
  var mX = points.reduce((a, p) => a + p.x, 0);
  var mY = points.reduce((a, p) => a + p.y, 0);
  return {
    x: mX / points.length,
    y: mY / points.length,
  };
}

module.exports = function(points, radius) {
  if (points.length === 0) return [];

  var n = points.length;
  var clusterIndex = 0;
  var clusters = [];

  clusters[0] = clusterIndex;
  clusterIndex++;

  for (var i = 1; i < n; ++i) {
    var p1 = points[i];
    var intersectionFound = false;
    for (var j = 0; j < i; ++j) {
      var p2 = points[j];
      if (intersects(p1, p2, radius)) {
        clusters[i] = clusters[j];
        intersectionFound = true;
        break;
      }
    }
    if (!intersectionFound) {
      clusters[i] = clusterIndex;
      clusterIndex++;
    }
  }

  var clusteredPoints = [];
  for (var i = 0; i < clusterIndex; ++i) {
    clusteredPoints[i] = points.filter((p, j) => clusters[j] === i);
  }

  return clusteredPoints.map(c => ({ center: mean(c), points: c }));
};
