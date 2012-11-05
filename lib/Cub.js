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

