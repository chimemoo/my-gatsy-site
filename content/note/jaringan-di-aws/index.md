---
title: Jaringan di AWS
date: "2021-04-18"
tags: ["Cloud AWS"]
---

## Konektivitas ke AWS
- Amazon VPC merupakan jaringan pribadi di AWS dimana kita dapat mengatur sumberdaya mana yang dapat diakses melalui internet atau tidak

- Internet Gateway Untuk mengizinkan traffic dari internet publik mengalir masuk dan keluar dari VPC, Anda harus melampirkan apa yang disebut dengan Internet Gateway (IGW). 

- Virtual Private Gateway, Gateway privat ini disebut juga dengan virtual private gateway. Ia memudahkan Anda untuk membuat koneksi VPN (virtual private network) terenkripsi antara jaringan privat--seperti data center on-premise atau jaringan perusahaan internal--ke VPC Anda.

-AWS Direct Connect, Intinya, jika Anda menginginkan koneksi privat, koneksi terdedikasi, jumlah latensi yang rendah, dan tingkat keamanan yang tinggi, maka Anda bisa mewujudkannya di AWS dengan menggunakan AWS Direct Connect.

## Subnet 
Subnet adalah sebuah bagian dari VPC di mana Anda dapat mengelompokkan sumber daya berdasarkan keamanan atau kebutuhan operasional. Subnet bisa menjadi publik maupun privat.


## Network ACL
Paket masuk ke VPC melalui Internet Gateway. Sebelum paket dapat masuk atau keluar dari subnet, ia akan diperiksa terkait perizinannya. Komponen VPC yang memeriksa izin paket untuk subnet adalah network access control list alias network ACL. Network ACL adalah firewall virtual yang mengontrol traffic masuk dan keluar di tingkat subnet. Tentu ini berbeda dengan Internet Gateway yang cakupannya di tingkat VPC.

## Security Group
Boleh jadi Anda memiliki beberapa EC2 instance di subnet yang sama. Namun pada praktiknya, mungkin tiap-tiapnya akan memiliki aturan yang berbeda tentang
siapa yang dapat mengiriminya pesan; atau
port mana yang diizinkan untuk menerima pesan.

## Amazon Route 53
Amazon Route 53 adalah layanan domain name system (DNS) atau sistem nama domain di AWS yang highly available (sangat tersedia) dan scalable (dapat diskalakan). Layanan ini dapat memberikan Anda cara yang andal untuk merutekan pelanggan ke aplikasi internet yang berjalan di AWS.

Jika kita melangkah lebih jauh, Amazon Route 53 itu dapat pula mengarahkan traffic ke endpoints (titik akhir) yang berbeda menggunakan beberapa routing policies (kebijakan perutean) yang berbeda, seperti:

Latency-based routing (Perutean berbasis latensi)
Geolocation DNS
Geoproximity routing
Weighted round robin


