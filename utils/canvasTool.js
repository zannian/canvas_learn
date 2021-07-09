// 还可以封装一个画虚线的方法
function drawLine(ctx, fromX, FromY, toX, toY, color, width) {
  ctx.beginPath()
  ctx.moveTo(fromX, FromY)
  ctx.lineTo(toX, toY)
  ctx.closePath()
  ctx.strokeStyle = color || 'black';
  ctx.lineWidth = width || 1;
  ctx.stroke()
}

function drawArc(ctx, x, y, r, startAngle, endAngle, anticlockwise, color, width, inset, fillColor) {
  ctx.beginPath();
  ctx.arc(x, y, r, startAngle, endAngle, anticlockwise)
  ctx.lineWidth = width
  ctx.strokeStyle = color
  ctx.stroke()
  ctx.closePath()
  ctx.fillStyle = fillColor || '#000'
  if (inset == 'inset') ctx.fill()
}


module.exports = {
  drawLine,
  drawArc
}