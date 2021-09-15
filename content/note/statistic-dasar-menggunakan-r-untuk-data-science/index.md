---
title: Statistik dasar menggunakan R untuk Data Science
date: "2020-06-18"
tags: ["R", "Statistics"]
---

# Materi

## Statistik vs Statistika
**Statistika** merupakan sebuah ilmu yang mempelajari bagaimana cara pengumpulan data, menganalisis, menginterpretasikan data. Sementara **Statistik** merupakan hasil data yang disajikan baik dalam bentuk tabel, grafik dan sebagainya. 

## Mengapa Statistik itu Penting
Statistik menjadi penting karena dapat digunakan sebagai dasar pengambilan keputusan dengan cara cepat. Selain itu dalam konteks "Data Science", statistik merupakan fondasi dasar untuk memahami lebih dalam dunia "Data Science".

## Istilah dasar dalam Statistik
Terdapat 2 istilah yang perlu dipahami yaitu adalah **sampel** dan **populasi**. Populasi merupakan total dari semua elemen, sementara sampel adalah representasi dari sebagian elemen populasi. Misalnya di dalam kotak pensil terdapat 10 pensil (ini disebut dengan populasi), sementara itu akan diambil 2 pensil untuk di tes (ini disebut dengan sampel).

## Kenapa memakai sampel dibanding populasi?
- Pengambilan populasi bisa merusak hasil
- Sampel dianggap sudah dapat mewakili populasi (Sesuaikan teknik samplingnya)
- Lebih menghemat cost

## Data Kuantitatif & Data Kualitatif
**Data kuantitatif** merupakan data dalam bentuk numerik yang menunjukan hasil pengukuran (dapat diukur). Sementara itu **Data kualitatif** merupakan data yang dinyatakan dalam bentuk bukan angka dan tidak dapat diukur.

## Skala Pengukuran Data
- **Nominal** : Merupakan ukuran yang paling sederhana, dimana angka yang diberikan hanya mengantung arti sebagai label, tidak menunjukkan tingkatan apapun. **Contohnya** : 1 (Pria) dan 0 (Wanita).
- **Ordinal** : Merupakan skala yang mengandung pengertian tingkatan/level. **Contohnya** : 5 = Sering, 4 = Teratur, 3 = Kadang-kadang, 2 = Jarang, 1 = Tidak pernah.
- **Interval** : Merupakan pemberian angka kepada objek yang mempunyai sifat dan ukutan ordinal dan jarak yang sama pada pengukuran. **Contohnya** : harga paket online course, Paket A = 100, Paket B = 200, Paket C = 300, artinya paket A dan B memiliki interval 100.
- **Rasio** : Merupakan skala yang memiliki ketiga sifat sebelumnya, serta memiliki rasio antar objek yang diukur.

Data nominal & ordinal digolongkan **Data kualitatif** karena sebenarnya bukan angka, hanya label dan atau tingkatan. Data interval dan rasio merupakan **Data kuantitatif**.

## Mendapatkan estimasi karakteristik dari data
Untuk mendapatkan karakteristik dari data dapat digunakan mean, median, modus.

## Kapan menggunakan mean atau median ?
- Mean sebaiknya digunakan jika tidak ada outlier
- Jika terdapat outlier sebaiknya gunakan median

## Mendapatkan sebaran data
Selain mengetahui estimasi karakteristik, penting juga untuk mengetahui sebaran data. Ukuran sebaran data yang sering dipakai yaitu range, varians, dan simpangan baku.



# Practice
```r
# Reading csv file dataset
data <- read.csv("file_dataset.csv", sep=";")

# Knowing the data types
str(data_intro)

# Change data types of variable in dataframe
data$variableName <-as.character(data$variableName)
data$variableName <-as.factor(data$variableName)

# Get Mode from dataset
Mode(data$variableName)

# Get Median from dataset
median(data$variableName)

# Get Mean from dataset
mean(data$variableName) 

# Get range from dataset
max(data$variableName) - min(data$variableName)

# Get varians from dataset
var(data$variableName)

# Get standar deviation from dataset
sd(data$variableName) 
```

## Useful Resources
Kamu ingin mendalami bagaimana cara kerja algoritma yang terkenal? Buka video pada link youtube berikut https://www.youtube.com/user/joshstarmer/.