berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (cm): "))
tinggi = tinggi / 100  # Mengubah tinggi dari cm ke m

bmi = berat / (tinggi * tinggi)
print(f"Berat badan anda adalah {berat} kg")
print(f"Tinggi badan anda adalah {tinggi} m")

if bmi < 18.5:
    print(f"Skor BMI Anda {bmi}, Anda termasuk kategori kekurangan berat badan")
elif 18.5 <= bmi < 24.9:
    print(f"Skor BMI Anda {bmi}, Anda termasuk kategori berat badan normal")
elif 25 <= bmi < 29.9:
    print(f"Skor BMI Anda {bmi}, Anda termasuk kategori kelebihan berat badan")
elif bmi >= 30:
    print(f"Skor BMI Anda {bmi}, Anda termasuk kategori obesitas tingkat 1 (sedang)")