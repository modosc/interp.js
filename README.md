# Interp.js
Interp.js is a JavaScript library of two-dimensional interpolation functions.

## Getting started
```javascript
    var a = new Interp.Point(0,0); // Point object requires x and y values
    var b = new Interp.Point(100,100);
    var lin = new Interp.Lin(a,b); // all interpolation types require at least two point objects
    var val = lin.interp(50); // 50
```
## Interp.Point
Our basic point object.

`new(x,y)` - constructor, `x` and `y` are Cartesian coordinates

`Interp.Point.prototype.equal(a)` - `a` is another `Interp.Point` object. Returns `true` if `a` is the same as our point.

`Interp.Point.prototype.between(a,b)` - `a` and `b` are `Interp.Point` objects. Returns `true` if our point is between `a` and `b` on the x axis (inclusive).


## Interp.Cos
Cosine interpolation.

`new(a,b)` - constructor, requires two `Interp.Point` objects

## Interp.Cub
Cubic interpolation

`new(z,a,b,c)` - constructor, requires four `Interp.Point` objects. `a` and `b` are the points we are interpolating between, `z` is a point preceeding `a` on the x axis and `c` is a point following `b` on the x axis. 

## Interp.Exp
Exponential interpolation, identical to logarithmic interpolation flipped across the line y=x.

`new(a,b)` - constructor, requires two `Interp.Point` objects

## Interp.Lin
Linear interpolation

`new(a,b)` - constructor, requires two `Interp.Point` objects

## Interp.Log
Logarithmic interpolation, indentical to exponential interpolation flipped across the line y=x.

`new(a,b)` - constructor, requires two `Interp.Point` objects


