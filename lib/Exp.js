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

