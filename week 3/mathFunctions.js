module.exports = {
  sum: function(a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    return String(a + b);
  },

  times: function(a, b){
    return a * b;
  },

  diff: function(a, b){
    return a - b;
  }
}
