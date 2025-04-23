data_mahasiswa = [
    {
        "nama": "Muhammad Ghiffari",
        "nim": "122140189",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "Sarah Amalia",
        "nim": "122140190",
        "nilai_uts": 78,
        "nilai_uas": 85,
        "nilai_tugas": 90
    },
    {
        "nama": "Budi Santoso",
        "nim": "122140191",
        "nilai_uts": 92,
        "nilai_uas": 88,
        "nilai_tugas": 85
    },
    {
        "nama": "Anisa Putri",
        "nim": "122140192",
        "nilai_uts": 95,
        "nilai_uas": 92,
        "nilai_tugas": 94
    },
    {
        "nama": "Rizki Pratama",
        "nim": "122140193",
        "nilai_uts": 82,
        "nilai_uas": 86,
        "nilai_tugas": 89
    }
]

# Calculate final grades
nilai_akhir = []
for mahasiswa in data_mahasiswa:
    nilai_akhir_mahasiswa = (mahasiswa["nilai_uts"] * 0.3) + (mahasiswa["nilai_uas"] * 0.4) + (mahasiswa["nilai_tugas"] * 0.3)
    
    # Determine grade
    if nilai_akhir_mahasiswa >= 80:
        grade = "A (Lulus)"
    elif 70 <= nilai_akhir_mahasiswa < 80:
        grade = "B (Remedial)"
    elif 60 <= nilai_akhir_mahasiswa < 70:
        grade = "C (Remedial)"
    elif 50 <= nilai_akhir_mahasiswa < 60:
        grade = "D (Remedial)"
    else:
        grade = "E (Tidak Lulus)"
    
    nilai_akhir.append({
        "nama": mahasiswa["nama"],
        "nim": mahasiswa["nim"],
        "nilai_uts": mahasiswa["nilai_uts"],
        "nilai_uas": mahasiswa["nilai_uas"],
        "nilai_tugas": mahasiswa["nilai_tugas"],
        "nilai_akhir": round(nilai_akhir_mahasiswa, 2),
        "grade": grade
    })

# Print tabel header
print("\nDATA NILAI MAHASISWA")
print("-" * 100)
print(f"{'Nama':<20} {'NIM':<12} {'UTS':<6} {'UAS':<6} {'Tugas':<6} {'Nilai Akhir':<12} {'Grade':<15}")
print("-" * 100)

# Print tabel data
for data in nilai_akhir:
    print(f"{data['nama']:<20} {data['nim']:<12} {data['nilai_uts']:<6} {data['nilai_uas']:<6} "
          f"{data['nilai_tugas']:<6} {data['nilai_akhir']:<12} {data['grade']:<15}")
print("-" * 100)

# Menampilkan nilai tertinggi dan terendah
highest = max(nilai_akhir, key=lambda x: x['nilai_akhir'])
lowest = min(nilai_akhir, key=lambda x: x['nilai_akhir'])

print("\nNilai Tertinggi:")
print(f"Nama: {highest['nama']}")
print(f"NIM: {highest['nim']}")
print(f"Nilai Akhir: {highest['nilai_akhir']}")
print(f"Grade: {highest['grade']}")

print("\nNilai Terendah:")
print(f"Nama: {lowest['nama']}")
print(f"NIM: {lowest['nim']}")
print(f"Nilai Akhir: {lowest['nilai_akhir']}")
print(f"Grade: {lowest['grade']}")