# Mathematical constant
PI = 3.14159

# Geometry Functions
def square_area(side):
    return side * side

def square_perimeter(side):
    return 4 * side

def rectangle_area(length, width):
    return length * width

def rectangle_perimeter(length, width):
    return 2 * (length + width)

def circle_area(radius):
    return PI * radius * radius

def circle_perimeter(radius):
    return 2 * PI * radius

# Temperature Conversion Functions
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def celsius_to_kelvin(celsius):
    return celsius + 273.15