eval(require('fs').readFileSync('./lib/Interp.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Point.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Cub.js', 'utf8')); 

exports.CubTest = function (test)
{
   var pointZ = new Interp.Point(0, 0);
   var pointA = new Interp.Point(100, 100);
   var pointB = new Interp.Point(200, 0);
   var pointC = new Interp.Point(300, 100);
   var cub = new Interp.Cub(pointZ, pointA, pointB, pointC);
   test.ok(cub.z.equal(pointZ));
   test.ok(cub.a.equal(pointA));
   test.ok(cub.b.equal(pointB));
   test.ok(cub.c.equal(pointC));
   
   // i happen to know this value is right but it's not a useful test -js
   test.equal(cub.interp(150), 50);

   var outOfDomain = function()
   {
      cub.interp(300);
   }
   test.throws(outOfDomain, /x is out of our domain/);
   test.done();
}

