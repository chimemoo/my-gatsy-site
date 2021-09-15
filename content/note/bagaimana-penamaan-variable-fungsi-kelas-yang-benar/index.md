---
title: Bagaimanah penamaan Variabel, fungsi, Kelas yang benar?
date: "2020-07-28T22:40:32.169Z"
tags: ["Clean code"]
---

Dalam memberikan nama pada variabel, fungsi dan kelas kadang kita sebagai programer mengabaikan pentingnya hal tersebut. Berikut adalah beberapa panduan yang dapat diikuti untuk penamaan hal tersebut.

# Deskriptif
Dalam memberikan nama baik itu variabel atau fungsi ada baiknya menggunakan nama yang deskriptif dan tersirat. Contohnya untuk sebuah output bertipe data boolean, kamu dapat menggunakan kata is atau has diawal nama, baru di ikuti dengan informasi yang disampaikan. Misalnya kamu membuat sebuah fungsi untuk mengecek apakah user online atau tidak, kamu dapat menggunakan nama isOnline dimana outputnya berupa jawaban yaitu true atau false.

# Konsisten namun tetap berbeda
Ketika menulis kode beberapa dari kita mungkin asal memberikan nama variabel atau fungsi dan sering sekali tidak konsisten. Misalnya untuk menampilkan daftar user dan daftar produk kita menggunakan list_user untuk daftar user namun menggunakan produk_list untuk daftar produk. Hal tersebut tidaklah konsisten dan nantinya akan memperlambat ketika kamu aka melakukan perbaikan pada kode. Walaupun harus konsisten kamu harus memberi nama pada variabel/fungsi/kelas dengan jelas. Contohnya product_list dan product lebih mudah dibedakan dibandingkan dengan products dan product.

# Hindari singkatan
Ketika kamu menulis penamaan variabel, fungsi atau kelas usahakan menghindari penggunaan singkatan. Karena akan menyulitkan ketika kamu perlu melakukan refactor pada kode tersebut.

# Panjang tidak sama dengan Deskriptif
Walaupun kamu harus menulis nama variabel, fungsi, atau kelas secara deskriptif dan tanpa singkatan yang bisa saja menjadikan lebih panjang bukan berarti hal tersebut deskriptif. Kamu hanya harus memberikan nama yang relevan tanpa menyertakan detail tentang implementasi atau penggunaan yang sangat spesifik. Contohnya <b>checkIfUserIsOnline</b> lebih baik ditulis <b>isUserOnline</b>.