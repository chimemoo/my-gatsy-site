---
title: Pentingnya Optimasi dalam Kode
date: "2020-06-13"
description: "Ketika kita mencoba memecahkan masalah dengan menggunakan kode, banyak sekali cara yang dapat digunakan agar masalah tersebut terpecahkan. Mulai dari cara yang umum hingga tidak umum. Ketika kita dihadapkan dengan penggunaan kode tersebut dalam skala besar, misalnya kode tersebut akan digunakan secara terus menerus dalam rentang waktu bersamaan."
tags: ["Clean code", "Programming", "Python"]
---
## Pendahuluan
Ketika kita mencoba memecahkan masalah dengan menggunakan kode, banyak sekali cara yang dapat digunakan agar masalah tersebut terpecahkan. Mulai dari cara yang umum hingga tidak umum. Ketika kita dihadapkan dengan penggunaan kode tersebut dalam skala besar, misalnya kode tersebut akan digunakan secara terus menerus dalam rentang waktu bersamaan. Kita perlu memikirkan apakah kode yang kita tulis sudah optimal atau belum? Maksud optimal disini adalah resource yang digunakan sedikit dan waktu yang dibutuhkan untuk komputasi sebentar. Proses untuk mengoptimalkan kode sehingga lebih efisien dalam penggunaan resource dan penggunaan waktu lebih cepat disebut dengan Optimasi.

## Studi kasus
Studi kasus disini saya dapat dari Udacity. Pada soalnya diberikan dua file `books_published_last_two_years.txt` dan `all_coding_books.txt` yang berisi **ids** buku. Tugasnya adalah untuk menghitung berapa buku Coding yang muncul dua tahun terakhir.

Sampel isi file `books_published_last_two_years.txt`
```text
1262771
9011996
2007022
9389522
8181760
9203790
```

Sampel isi file `all_coding_books.txt`
```text
4140074
3058732
4181244
8709089
9097893
2606750
```

Kemudian import semua library yang dibutuhkan
```python
import time
import pandas as pd
import numpy as np
```
Lalu read file dan simpan kedalam list `recent_books` dan `coding_books`
```python
with open('books_published_last_two_years.txt') as f:
    recent_books = f.read().split('\n')
    
with open('all_coding_books.txt') as f:
    coding_books = f.read().split('\n')
```

Ketika membaca soal tersebut mungkin ide yang muncul adalah kita dapat melakukan looping pada `recent_books` lalu jika buku tersebut ada di `coding_books` kemudian simpan kedalam `recent_coding_books`
```python
start = time.time()
recent_coding_books = []

for book in recent_books:
    if book in coding_books:
        recent_coding_books.append(book)

print(len(recent_coding_books))
print('Duration: {} seconds'.format(time.time() - start))
```
Hasil perhitungan dan waktu dari komputasinya didapatkan 
```text
96
Duration: 17.40716576576233 seconds
```
Artinya dibutuhkan 17 detik untuk mendapatkan total 96 buku koding 2 tahun terbaru pada file. Kita dapat melakukan peningkatan pada kecepatan komputasinya, jika kita berpikir lebih jauh, masalah diatas merupakan masalah irisan. Kita ditugaskan untuk mencari irisan antara dua data.

Sebelumnya kita sudah mengimport numpy. Pada numpy terdapat sebuah fungsi `intersect1d` dimana fungsi tersebut berfungsi untuk mencari irisan data.
```python
start = time.time()
recent_coding_books = np.intersect1d(recent_books, coding_books)
print(len(recent_coding_books))
print('Duration: {} seconds'.format(time.time() - start))
```
Waktu yang dibutuhkan untuk komputasi proses diatas yaitu :
```text
96
Duration: 0.04141545295715332 seconds
```
Bagaimana? lebih cepat bukan? kita hanya membutuhkan 0.04 sekon dari yang sebelumnya 17 sekon.

Sekarang kita coba untuk meningkatkan lagi kecepatannya yaitu berdasarkan jawaban dari stackoverflow ini [What makes set faster than lists](https://stackoverflow.com/questions/8929284/what-makes-sets-faster-than-lists/8929445#8929445) terdapat sebuah jawaban menarik yang menjelaskan bahwa sets lebih cepat dari lists. Seperti yang kita tau sebelumnya, bahwa kita menyimpan data `coding_books` dan `recent_books` dalam bentuk lists, oleh karena itu kita akan coba mengkonversikannya dalam bentuk sets.
```python
start = time.time()
recent_coding_books =  set(recent_books).intersection(set(coding_books))
print(len(recent_coding_books))
print('Duration: {} seconds'.format(time.time() - start))
```
Waktu yang dibutuhkan untuk komputasinya yaitu

```text
96
Duration: 0.01536870002746582 seconds
```

Bagaimana lebih cepat bukan? Hal yang dapat diambil dari studi kasus ini adalah pemahaman soal tipe data akan membantu kita menuliskan kode lebih baik, lebih cepat dan lebih solid.