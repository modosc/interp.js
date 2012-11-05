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
