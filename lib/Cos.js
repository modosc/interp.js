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

