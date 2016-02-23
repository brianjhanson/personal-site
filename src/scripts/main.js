var grid = function() {
  var canvas = document.getElementById('grid');
  var ctx = canvas.getContext('2d');
  var winWidth = $(document).width();
  var winHeight = $(document).height();


  var _init = function() {
    _setSize();
    _drawGrid();
    _bind();
  }

  var _bind = function() {
    $(document).on('ready', _init);
    $(window).on('resize', _init);
  }

  var _setSize = function() {
    ctx.canvas.width = winWidth;
    ctx.canvas.height = winHeight;
    ctx.globalCompositeOperation = "multiply";
  }

  var _drawGrid = function() {
    var maxRows = 9;
    var maxCols = 9;

    var gutter = 30;
    var size = (winWidth - gutter) / maxCols - gutter;

    for (var c = 0; c < maxCols; c++) {
      for (var r = 0; r < maxRows; r++) {
        ctx.save();
        ctx.strokeStyle = "rgba(220, 220, 229, 1)";
        var x = (c * gutter) + (c * size);
        var y = (r * gutter) + (r * size);
        ctx.translate(x, y);
        ctx.strokeRect(gutter, gutter, size, size);
        ctx.restore();
      }
    }
  }

  _init();
}

grid();
