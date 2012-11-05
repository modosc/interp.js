eval(require('fs').readFileSync('./lib/Interp.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Point.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Lin.js', 'utf8')); 

exports.LinTest =  function (test)
{
   var pointA = new Interp.Point(0,0);
   var pointB = new Interp.Point(100,100);
   var lin = new Interp.Lin(pointA, pointB);
   test.ok(lin.a.equal(pointA), "a is not defined");
   test.ok(lin.b.equal(pointB));

   test.equal(50, lin.interp(50));
   test.equal(0, lin.interp(0));
   test.equal(100, lin.interp(100));
   
   var outOfDomain = function()
   {
      lin.interp(200);
   }
   test.throws(outOfDomain, /x is out of our domain/);

   var invalidParams = function()
   {
      var invalid = new Interp.Lin(12, new String());
   }
   test.throws(invalidParams, /is required and must be an Interp.Point/);
   test.done();
}
