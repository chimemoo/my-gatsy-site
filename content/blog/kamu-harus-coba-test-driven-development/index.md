---
title: Kamu harus coba Test Driven Development!
date: "2020-06-14"
description: "Apakah kamu seorang programmer/developer? Ketika kamu membuat sebuah program apakah kamu melakukan testing terlebih dahulu sebelum kode tersebut digunakan? Pentingnya testing dalam tahap pengembangan program akan menjauhkan kita (programmer) dari hal yang tidak kita inginkan ketika program tersebut sudah berjalan di production."
tags: ["Testing", "Programming", "Python"]
---

## Intro
Apakah kamu seorang programmer/developer? Ketika kamu membuat sebuah program apakah kamu melakukan testing terlebih dahulu sebelum kode tersebut digunakan? Jika tidak, **segera bertobatlah**, __just kidding__ :). Pentingnya testing dalam tahap pengembangan program akan menjauhkan kita (programmer) dari hal yang tidak kita inginkan ketika program tersebut sudah berjalan di production. Oleh karena itu dalam setiap metode pengembangan software tahapan ini selalu ada.

Namun melakukan testing pada program yang dibuat adalah hal yang cukup mahal (bisa jadi memakan waktu atau membutuhkan banyak resource) jika dilakukan manual, oleh karena itu muncul lah tool automated testing yang membantu tahapan ini. Dengan adanya tool tersebut proses testing jadi lebih cepat.

## Apa itu Test Driven Development (TDD)?
Jika biasanya kamu hanya tahu bahwa testing berada di akhir proses pengembangan. Pada TDD, proses tersebut dibalik, dimana diawal penulisan kode, programmer menulis banyak sekali `test case`, kemudian berdasarkan `test case` tersebut kemudian programmer berusaha menulis kode yang bertujuan menyelesaikan test tersebut. Artinya kode yang dibuat harus lolos dalam uji coba yang ditentukan sebelumnya. Ketika kode yang dibuat berhasil melewati proses test, tahapan selanjutnya adalah refactor.

## Mengapa Menulis Testing kode dilakukan diawal?
Hal ini dilakukan karena misalnya ketika kita menulis fungsi untuk mengecek apakah email valid atau tidak. Setelah menulis kode tersebut kita menulis `test case` nya. Namun yang terjadi misalnya, ternyata kode yang dibuat tidak bisa menyelesaikan salah satu `test case`, akibatnya kita harus merubah kembali fungsi yang dibuat sebelumnya dan kemudian melakukan test lagi. Hal tersebut bukanlah hal yang baik dilakukan, karena prosesnya menjadi lebih lambat dan tidak efisien. Oleh karena itulah TDD muncul untuk menyelesaikan masalah tersebut.

## Studi Kasus
Saya seorang programmer diperintahkan oleh senior saya untuk membuat sebuah program untuk menghitung penjumlahan angka pada array. Yang pertama saya lakukan adalah menulis `test case` terlebih dahulu. Karena saya menggunakan `pytest` secara default nama file test harus diberi awalan nama `test_` sehingga nama file nya menjadi `test_sum_array.py`.
```python
from sum_array import sum_of_array

def test_5_component():
    assert(sum_of_array([1,2,3,4,5]) == 15)
    
def test_4_component():
    assert(sum_of_array([1,2,3,4]) == 10)
    
def test_5_with_decimal():
    assert(sum_of_array([1,2,3,4,5.5]) == 15.5)
```
Kemudian setelah menulis `test case` saya menulis fungsi untuk memecahkan masalah tersebut. Berikut `sum_array.py`
```python
def sum_of_array(ar):
    total = 0
    for i in ar:
        total = total+i
    return total
```
Kemudian saya menjalankan kode test tersebut. Hasilnya adalah sebagai berikut :
```console
root@c18a26593cfe:/home/workspace# pytest
=================================================== test session starts ====================================================
platform linux -- Python 3.6.3, pytest-5.4.3, py-1.8.1, pluggy-0.13.1
rootdir: /home/workspace
plugins: requests-mock-1.5.2
collected 3 items                                                                                                          

test_sum_array.py ...                                                                                                [100%]

==================================================== 3 passed in 0.03s =====================================================
```
Berdasarkan hasil diatas, kode yang saya buat berhasil menyelesaikan `test case`.

## Konklusi
Dengan adanya Test Driven Development ini proses pengembangan software menjadi lebih menarik, dan menurut saya seperti sebuah game dimana kita sebagai programmer harus bisa menyelesaikan kasus yang kita buat.

Sekian.