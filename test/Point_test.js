eval(require('fs').readFileSync('./lib/Interp.js', 'utf8')); 
eval(require('fs').readFileSync('./lib/Point.js', 'utf8')); 
exports.PointTest = function (test)
{
   var pointA = new Interp.Point(1,2);
   test.equal(1, pointA.x);
   test.equal(2, pointA.y);

   var pointNoArgs = function()
   {
      new Interp.Point();
   };
   test.throws(pointNoArgs, /is required and must be numeric/);


   var pointNonNumeric = function()
   {
      new Interp.Point('asdf',1);
   }
   test.throws(pointNonNumeric, /x is required and must be numeric/);

   var pointNoX = function()
   {
      new Interp.Point(undefined, 1);
   };
   test.throws(pointNoX, /x is required and must be numeric/);

   var pointNoY = function()
   {
      new Interp.Point(1);
   };
   test.throws(pointNoY, /y is required and must be numeric/);
   test.done();
}

exports.PointMethods = function(test)
{
   // new
   var pointA = new Interp.Point(1,2);
   test.equal(1, pointA.x);
   test.equal(2, pointA.y);

   // equality
   var pointB = new Interp.Point(0,0);
   var pointC = new Interp.Point(0,0);
   test.ok(! pointA.equal(pointB));
   test.ok(pointB.equal(pointC));
   test.done();
};
