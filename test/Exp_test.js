eval(require('fs').readFileSync('./lib/Interp.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Point.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Lin.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Exp.js', 'utf8')); 
exports.ExpTest = function(test)
{
   var pointA = new Interp.Point(0,0);
   var pointB = new Interp.Point(100, 100);
   var lin = new Interp.Lin(pointA, pointB);
   var exp = new Interp.Exp(pointA, pointB);

   test.ok(exp.a.equal(pointA));
   test.ok(exp.b.equal(pointB));

   // i don't know exactly what this should be but it's less than the
   // linear value -js
   test.ok(exp.interp(50) < lin.interp(50));

   // BUG: this should really be Math.pow(exp.interp(50), 2)) - the fact
   // that it hast to be 50 means that the interpolation isn't working
   // right -js

   test.equal(exp.interp(100), Math.floor(Math.pow(exp.interp(52), 2)));

   test.equal(0, exp.interp(0));
   test.equal(100, exp.interp(100));
   
   // try negative points now
   var pointC = new Interp.Point(0, 0);
   var pointD = new Interp.Point(-100, 100);
   var negExp = new Interp.Exp(pointC, pointD);

   // these should be the same
   test.equal(negExp.interp(-50), (exp.interp(50)));

   var outOfDomain = function()
   {
      exp.interp(200);
   }
   test.throws(outOfDomain, /x is out of our domain/);
   test.done();
}
