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
