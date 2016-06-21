var exports = module.exports = {};

exports.triangleArea = function(base, height){
	if (base <= 0 || height <=0)
	{
		throw "Base and Height can not be negative.";
	}
	else if( isNaN(base) || isNaN(height))
	{
		throw "Must input numbers.";
	}
	else
	{
		var tri_area = 0;
		tri_area = 0.5 * base * height;
	}
	return tri_area;
}

exports.perimeterOfTriangle = function(side1, side2, side3){
	if (side1 <= 0 || side2 <=0 || side3 <=0)
	{
		throw "Sides of the triangle can not be negative.";
	}
	else if( isNaN(side1) || isNaN(side2) || isNaN(side3))
	{
		throw "Must input numbers.";
	}
	else
	{
		var tri_perimeter = 0;
		tri_perimeter = side1 + side2 + side3;
	}
	return tri_perimeter;
}

 exports.areaOfSquare = function(side){
	if (side <= 0)
	{
		throw "Side of the square can not be negative.";
	}
	else if( isNaN(side))
	{
		throw "Must input number.";
	}
	else
	{
		var sq_area = 0;
		sq_area = side * side;
	}
	return sq_area; 
 }

  exports.perimeterOfSquare = function(side){
	if (side <= 0)
	{
		throw "Side of the square can not be negative.";
	}
	else if( isNaN(side))
	{
		throw "Must input number.";
	}
	else
	{
		var sq_perimeter = 0;
		sq_perimeter = 4 * side;
	}
	return sq_perimeter;   
  }
	
exports.areaOfCube = function(side){
	if (side <= 0)
	{
		throw "Side of the cube can not be negative.";
	}
	else if( isNaN(side))
	{
		 throw "Must input number.";
	}
	else
	{
		var cu_area = 0;
		cu_area = side * side * side;
	}
	return cu_area; 
}
	
exports.surfaceAreaOfCube = function(side){
	if (side <= 0)
	{
		throw "Side of the cube can not be negative.";
	}
	else if( isNaN(side))
	{
		throw "Must input number.";
	}
	else
	{
		var cu_surface_area = 0;
		cu_surface_area = 6 * side * side;
	}
	return cu_surface_area; 
}

exports.perimeterOfCube = function(side){
	if (side <= 0)
	{
		throw "Side of the cube can not be negative.";
	}
	else if( isNaN(side))
	{
		throw "Must input number.";
	}
	else
	{
		var cu_perimeter = 0;
		cu_perimeter = 12 * side;
	}
	return cu_perimeter;
}

exports.circumferenceOfCircle = function(radius){
	if (radius <= 0)
	{
		throw "Radius can not be negative.";
	}
	else if( isNaN(radius))
	{
		throw "Must input number.";
	}
	else
	{
		var pi = 3.14;
		var circumference = 0;
		circumference = 2 * pi * radius;
	}
	return circumference;
}

exports.areaOfCircle = function(radius){
	if (radius <= 0)
	{
		throw "Radius can not be negative.";
	}
	else if( isNaN(radius))
	{
		throw "Must input number.";
	}
	else
	{
		var pi = 3.14;
		var circle_area = 0;
		circle_area = pi * radius * radius;
	}
	return circle_area;
}

