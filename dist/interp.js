/*! interp.js - v0.1.0 - 2012-11-04
* https://github.com/modosc/interp.js
* Copyright (c) 2012 Jonathan Schatz; Licensed MIT */

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


var Interp = Interp || {};
Interp.isPoint = function (obj, name)
{
   if (!(obj && (obj instanceof Interp.Point)))
   {
      throw new Error(name + " is required and must be an Interp.Point");
   }
};

Interp.isDiff = function (a, b, aname, bname)
{
   if (a === b)
   {
      throw new Error(aname + " and " + bname + " must have different values");   }
};

Interp.isReqNum = function (obj, name)
{
   if (!(obj !== undefined && typeof(obj) === 'number'))
   {
      throw new Error(name + " is required and must be numeric");
   }
};

Interp.inDomain = function (x,a,b)
{
   if ((a.x < b.x && (x < a.x || x > b.x)) ||
       (b.x < a.x && (x < b.x || x > a.x))
      )
   {
      throw new Error("x is out of our domain");
   }
};

var Interp = Interp || {};
Interp.Lin = function (a,b)
{
   Interp.isPoint(a, "a");
   Interp.isPoint(b, "b");
   Interp.isDiff(a.x, b.x, "a.x", "b.x");

   this.a = a;
   this.b = b;

   this.interp = function(x)
   {
      Interp.isReqNum(x, "x");
      Interp.inDomain(x, a, b);
      return a.y + (x - a.x) * (b.y - a.y) / (b.x - a.x);
   };
};

var Interp = Interp || {};
Interp.Exp = function (a,b)
{
   Interp.isPoint(a, "a");
   Interp.isPoint(b, "b");
   Interp.isDiff(a.x, b.x, "a.x", "b.x");
   Interp.isDiff(a.y, b.y, "a.y", "b.y");

   this.a = a;
   this.b = b;

   this.shiftCheck = false;
   this.shiftY = 0;

   this.interp = function(x)
   {
      Interp.isReqNum(x, "x");
      Interp.inDomain(x, a, b);

      // local copies of these values
      var ay = a.y, by = b.y;

      // ok, the formula requires all of the following to be true:
      //
      //   1) a.y, b.y, and (b.x - a.x) need to all be non-zero
      //   2) by/ay must be positive
      //

      if(!this.shiftCheck)
      {
         while (ay <= 0 || by <= 0)
         {
            ay++;
            by++;
            this.shiftY++;
         }
         this.shiftCheck = true;
      }
      else
      {
         ay += this.shiftY;
         by += this.shiftY;
      }
      
      var result =  ay * (Math.pow(by/ay, (x-a.x)/(b.x-a.x)));
      result -= this.shiftY;
      return result;
   };
};


var Interp = Interp || {};
Interp.Log = function (a,b)
{
   Interp.isPoint(a, "a");
   Interp.isPoint(b, "b");
   Interp.isDiff(a.x, b.x, "a.x", "b.x");
   Interp.isDiff(a.y, b.y, "a.y", "b.y");

   this.a = a;
   this.b = b;

   this.shiftCheck = false;
   this.shiftX = 0;

   this.interp = function(x)
   {
      Interp.isReqNum(x, "x");
      Interp.inDomain(x, a, b);

      // ok, the formula requires all of the following to be true:
      //
      //   1) a.x, b.x, and x need to all be greater than 0

      // local copies of these values
      var ax = a.x, bx = b.x, _x = x;

      if(!this.shiftCheck)
      {
         while (ax <= 0 || bx <= 0)
         {
            ax++;
            bx++;
            _x++;
            this.shiftX++;
         }

         this.shiftCheck = true;
      }
      else
      {
         ax += this.shiftX;
         bx += this.shiftX;
         _x += this.shiftX;
      }

      var result =  a.y + (Math.log(_x) - Math.log(ax)) * (b.y - a.y) / (Math.log(bx) - Math.log(ax));

      return result;
   };
};


var Interp = Interp || {};
Interp.Cos = function (a,b)
{
   if (!(a && (a instanceof Interp.Point)))
   {
      throw new Error("a is required and must be an Interp.Point");
   }

   if (!(b && (b instanceof Interp.Point)))
   {
      throw new Error("b is required and must be an Interp.Point");
   }

   if (a.x === b.x)
   {
      throw new Error("a and b must have different x coordinates");
   }

   if (a.x === b.x)
   {
      throw new Error("a and b must have different y coordinates");
   }

   this.a = a;
   this.b = b;

   this.shiftCheck = false;
   this.shiftX = 0;

   this.interp = function(x)
   {
      if (!(x !== undefined && typeof(x) === 'number'))
      {
         throw new Error("x is required and must be numeric");
      }

      if ((a.x < b.x && (x < a.x || x > b.x)) ||
          (b.x < a.x && (x < b.x || x > a.x))
         )
      {
         throw new Error("x is out of our domain");
      }

      // ok, the formula requires all of the following to be true:
      //
      //   1) a.x, b.x, and x need to all be greater than 0

      // local copies of these values
      var ax = a.x, bx = b.x, _x = x;

      if(!this.shiftCheck)
      {
         while (ax <= 0 || bx <= 0)
         {
            ax++;
            bx++;
            _x++;
            this.shiftX++;
         }

         this.shiftCheck = true;
      }
      else
      {
         ax += this.shiftX;
         bx += this.shiftX;
         _x += this.shiftX;
      }

      var mu = (_x - ax) / (bx - ax);
      var mu2 = (1 - Math.cos(mu * Math.PI)) / 2;
      var result = (a.y * (1 - mu2) + b.y * mu2);
      return result;
   };
};


var Interp = Interp || {};
Interp.Cub = function (z,a,b,c)
{
   Interp.isPoint(z, "z");
   Interp.isPoint(a, "a");
   Interp.isPoint(b, "b");
   Interp.isPoint(c, "c");

   Interp.isDiff(a.x, b.x, "a.x", "b.x");
   Interp.isDiff(a.y, b.y, "a.y", "b.y");
   
   if (!a.between(z,b))
   {
      throw new Error("a must be between z and b");
   }
   if (!b.between(a,c))
   {
      throw new Error("b must be between a and c");
   }

   this.a = a;
   this.b = b;
   this.c = c;
   this.z = z;

   this.shiftCheck = false;
   this.shiftX = 0;

   this.interp = function(x)
   {
      Interp.isReqNum(x, "x");
      Interp.inDomain(x, a, b);

      // local copies of these values
      var ax = a.x, bx = b.x, _x = x;

      if(!this.shiftCheck)
      {
         while (ax <= 0 || bx <= 0)
         {
            ax++;
            bx++;
            _x++;
            this.shiftX++;
         }

         this.shiftCheck = true;
      }
      else
      {
         ax += this.shiftX;
         bx += this.shiftX;
         _x += this.shiftX;
      }
      var mu = (_x - ax) / (bx - ax);
      var mu2 = mu * mu;
      var a0 = c.y - b.y - z.y + a.y;
      var a1 = z.y - a.y - a0;
      var a2 = b.y - z.y;
      var a3 = a.y;
      var result = (a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3);
      return result;
   };
};

