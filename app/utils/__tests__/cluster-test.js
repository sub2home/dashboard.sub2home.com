jest.dontMock('../cluster');
var cluster = require('../cluster');
var radius = 2;

describe('cluster', function() {

  it('should return the same points', function() {
    var points = [{ x: 2, y: 2 }, { x: 4, y: 4 }];
    var expected = [{
      center: { x: 2, y: 2 },
      points: [{ x: 2, y: 2 }]
    }, {
      center: { x: 4, y: 4 },
      points: [{ x: 4, y: 4 }]
    }];
    expect(cluster(points, radius)).toEqual(expected);
  });

  it('should work for no points', function() {
    expect(cluster([], radius)).toEqual([]);
  });

  it('should merge two points', function() {
    var points = [{ x: 2, y: 2 }, { x: 3, y: 3 }];
    var expected = [{
      center: { x: 2.5, y: 2.5 },
      points: points,
    }];
    expect(cluster(points, radius)).toEqual(expected);
  });

});
