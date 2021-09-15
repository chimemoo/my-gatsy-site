---
title: Infrastruktur AWS
date: "2021-03-30"
tags: ["Cloud AWS"]
---

Ketika kita menyebut soal data center kita juga membicarakan masalah seperti terputusnya koneksi ke data center yang bisa disebabkan banyak faktor salah satunya bencana. Jika kita menjalankan sistem secara on-premise masalahnya adalah ketika bencana melanda data center tersebut, mungkin solusinya adalah membangun data center kedua. Tapi itu bukan solusi karena ada cost besar yang harus dikeluarkan. Dengan adanya Cloud kita dapat menyimpan sistem aplikasi kita di banyak data center.

## AWS Region
AWS Region yaitu merupakan kelompok besar data center yang berisi semua sumber daya yang dibutuhkan seperti komputasi, penyimpanan, jaringan dll. Setiap region terkoneksi melalui high speed fiber network yang di kontrol oleh AWS. AWS memungkinkan user dapat memilih Region mana yang ingin dijalankan, juga setiap region terisolasi dari region lainnya, yang berarti tidak ada data yang masuk atau keluar dari region tersebut kecuali secara eksplisit user mengijinkannya.

Ada 4 faktor bisnis yang menentukan pemilihan suatu region yaitu:
1. Compilance (Kepatuhan) terkait dengan regulasi
2. Proximity (Kedekatan) Memilih region yang terdekat denan basis pelanggan agar latensi semakin kecil dan pengiriman konten lebih cepat
3. Feature Availability (Kesediaan Fitur) tidak setiap region memiliki fitur lengkap
4. Pricing , terdapat beberapa region yang memiliki harga lebih mahal atau lebih murah karena bergantung dengan regulasi dimana region tersebut berada

## Availability Zone
AWS memiliki banyak data center di seluruh dunia dan setiap regio terdiri dari beberapa data center. AWS memberi nama satu/sekelompok data center dengan sebutan Availability Zone (AZ). Setipa AZ merupakan sqtu atau beberapa data center terpisah dengan daya, jaringan dan konektifivitasnya sendiri.

Setiap AWS Regions terdiri dari beberapa Availability Zone yang terisolasi dan secara fisik terpisah di dalam Region geografis. AWS memberikan jarak Availability Zone seajuh puluhan mil satu sama lain namun tetap mempertahankan single digit milisecon latency.

## Edge Location
Permasalahan yang coba dilakukan oleh edge location yaitu misalnya kita membuat aplikasi dimana disimpan di region Tokyo, namun ternyata basis pelanggan besarnya ada di jakarta, sehingga ini menimbulkan latensi cukup besar karena pelanggan harus mengakses data ke tokyo. Nah solusinya dapat dengan menempatkan salinan data secara local atau di cache di Singapura. Teknik menyimpan salinan data di edge location ini dinamakan <i>Content Delivery Network (CDN)</i> atau pada AWS dinamakan Amazon CloudFront. 

Jadi, Edge locations adalah lokasi yang digunakan 
Amazon CloudFront untuk menyimpan salinan cache dengan jarak yang dekat dengan pelanggan sehingga konten dapat terkirim lebih cepat.
AWS Edge Location tak hanya untuk CloudFront tapi juga untuk Amazon Route 53 untuk layanan DNS.
Selain itu ada AWS Outposts untuk menjalankan Region mini di data center sendiri.

## Kesimpulan
1. Region merupakan wilayah yang terisolasi secara geografis di dimana dapat  mengakses layanan yang diperlukan untuk menjalankan segala macam kebutuhan.
2. Region terdiri dari Availability Zone yang memungkinkan Anda untuk menjalankan seluruh bangunan data center yang terpisah secara fisik dengan jarak puluhan mil sambil menjaga aplikasi Anda tetap bersatu secara logis. Availability Zone membantu Anda untuk dapat mencapai high availability (ketersediaan tinggi) dan disaster recovery (pemulihan bencana) tanpa upaya apa pun dari Anda.
3. AWS Edge locations digunakan untuk menjalankan Amazon CloudFront sehingga dapat memperdekat konten kepada pelanggan Anda di mana pun mereka berada.

## Cara berinteraksi dengan sumber daya AWS
1. AWS management console : Interface berbasis antarmuka browser
2. AWS Command Line Interface : Interface berbasis CLI
3. AWS SDK : SDK memudahkan Anda untuk berinteraksi dengan sumber daya AWS melalui berbagai bahasa pemrograman.
4. AWS Elastic Beanstalk : Cukup unggah kode dan tentukan konfigurasi yang Anda inginkan, maka AWS Elastic Beanstalk pun akan mengolah informasi tersebut dan membangun lingkungan AWS-nya untuk Anda.
5. AWS CloudFormation
