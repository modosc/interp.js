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

