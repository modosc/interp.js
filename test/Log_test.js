eval(require('fs').readFileSync('./lib/Interp.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Point.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Log.js', 'utf8')) ;
eval(require('fs').readFileSync('./lib/Exp.js', 'utf8')); 
exports.LogTest = function (test)
{
   var pointA = new Interp.Point(0,0);
   var pointB = new Interp.Point(100, 100);
   var log = new Interp.Log(pointA, pointB);
   var exp = new Interp.Exp(pointA, pointB);
   test.ok(log.a.equal(pointA));
   test.ok(log.b.equal(pointB));

   for (var i = 0; i <= 100; i++)
   {
      // log interpolation is epx interpolation mirrored acros y=x so 
      // test and verify that here
      // TODO - so many tests?
      var a = exp.interp(i);
      var b = log.interp(a);
      test.equal(Math.round(b), i);
   }

   var pointC = new Interp.Point(-100, -100);
   log = new Interp.Log(pointC, pointB);
   var exp = new Interp.Exp(pointC, pointB);

   for (var i = -100; i <= 100; i++)
   {
      // log interpolation is epx interpolation mirrored acros y=x so 
      // test and verify that here
      // TODO - so many tests? maybe some random points?
      var a = exp.interp(i);
      var b = log.interp(a);
      test.equal(Math.round(b), i);
   }

   var outOfDomain = function()
   {
      log.interp(200);
   }
   test.throws(outOfDomain, /x is out of our domain/);
   test.done();
}
