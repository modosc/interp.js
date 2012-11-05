var Interp = Interp || {};

Interp.Point = function(x,y)
{

   // if an x and y param aren't passed in, throw an error
   if (!(x !== undefined && typeof(x) === 'number'))
   {
      throw new Error("x is required and must be numeric");
   }
   
   if (!(y !== undefined && typeof(y) === 'number'))
   {
      throw new Error("y is required and must be numeric");
   }

   this.x = x;
   this.y = y;
   return this;
};

Interp.Point.prototype.equal = function(a)
{
   // are two points actually the same point?
   if (!(a && (a instanceof Interp.Point)))
   {
      throw new Error("a is required and must be an Interp.Point");
   }
   return (this.x === a.x && this.y === a.y);
};

Interp.Point.prototype.between = function(a,b)
{
   // does our point lie in between the two points a and b (inclusive) on the x plane?

   Interp.isPoint(a, "a");
   Interp.isPoint(b, "b");

   if (a.x < b.x)
   {
     return ((a.x <= this.x) && (b.x >= this.x));
   }
   else
   {
     return ((b.x <= this.x) && (a.x >= this.x));
   }
};

