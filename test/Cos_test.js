eval(require('fs').readFileSync('./lib/Interp.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Point.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Cos.js', 'utf8')); 
exports.CosTest = function (test)
{
   var pointA = new Interp.Point(0, 0);
   var pointB = new Interp.Point(100, 100);
   var cos = new Interp.Cos(pointA, pointB);
   test.ok(cos.a.equal(pointA));
   test.ok(cos.b.equal(pointB));

   test.equal(Math.round(cos.interp(50)), 50);

   var pointC = new Interp.Point(-100, -100);
   cos = new Interp.Cos(pointA, pointC);
   test.ok(cos.a.equal(pointA));
   test.ok(cos.b.equal(pointC));

   var outOfDomain = function()
   {
      cos.interp(200);
   }
   test.throws(outOfDomain, /x is out of our domain/);
   test.done();
}
