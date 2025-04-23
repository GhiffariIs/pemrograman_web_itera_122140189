import math_operations  # Import seluruh modul
from math_operations import square_area, square_perimeter, rectangle_area, rectangle_perimeter, circle_area, circle_perimeter, celsius_to_fahrenheit, celsius_to_kelvin  # Import fungsi spesifik

# Perhitungan Geometri
print("Perhitungan Geometri:")
sisi = 5
print(f"Luas Persegi (sisi={sisi}): {square_area(sisi)}")
print(f"Keliling Persegi (sisi={sisi}): {square_perimeter(sisi)}")

panjang, lebar = 10, 4
print(f"Luas Persegi Panjang (panjang={panjang}, lebar={lebar}): {rectangle_area(panjang, lebar)}")
print(f"Keliling Persegi Panjang (panjang={panjang}, lebar={lebar}): {rectangle_perimeter(panjang, lebar)}")

jari_jari = 7
print(f"Luas Lingkaran (jari-jari={jari_jari}): {circle_area(jari_jari)}")
print(f"Keliling Lingkaran (jari-jari={jari_jari}): {circle_perimeter(jari_jari)}")

# Konversi Suhu
print("\nKonversi Suhu:")
celsius = 25
print(f"{celsius}°C ke Fahrenheit: {celsius_to_fahrenheit(celsius)}°F")
print(f"{celsius}°C ke Kelvin: {celsius_to_kelvin(celsius)}K")
