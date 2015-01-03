var _ = require('lodash');
var lunr = require('lunr');

function extract(object, property) {
  var obj = object,
  parts = property.split('.'),
  part = parts.shift();

  while(part && obj) {
    obj = obj[part];
    part = parts.shift();
  }

  return obj;
}

module.exports = {

  forKeys: function(keys, elements, searchValue) {
    var index = new lunr.Index;

    keys.forEach(k => index.field(k));

    elements.forEach(function(element) {
      var flatElement = { id: element.id };
      keys.forEach(k => flatElement[k] = extract(element, k));
      index.add(flatElement);
    });

    var idMap = _.zipObject(elements.map(e => e.id), elements);
    var results = index.search(searchValue);
    var filteredElements = results.map(r => idMap[r.ref]);

    return filteredElements;
  },

};
