---
title: Dasar Komputasi Cloud dengan AWS
date: "2021-03-17"
tags: ["Cloud AWS"]
---
## Tentang Cloud dan Amazon EC2
Layanan yang dapat digunakan untuk mendapatkan akses ke server virtual pada AWS disebut dengan Amazon EC2.

Dengan menggunakan layanan EC2, pengguna dapat memiliki kapasitas komputas yang fleksibel, hemat biaya dan cepat dibandingkan dengan menggunakan server sendiri di data center on-premise

Dengan menggunakan cloud kita tidak perlu lagi memikirkan soal hardware apa yang akan digunakan, bagaimana menginstal/menyiapkan hardware tersebut, kemudian juga soal ketika melakukan scaling pada hardware.

Dengan cloud kita hanya butuh beberapa menit untuk menyiapkan mesin yang dapat digunakan untuk menjalankan program yang kita buat. Selain itu, dengan sistem pembayaran Pay-for-what-you-use biaya akan lebih murah dibanding dengan menggunakan on-premise.

Amazon EC2 berjalan diatas host(mesin fisik) yang dikelola oleh AWS menggunakan teknologi virtualisasi. Program yang bertanggung jawab untuk membagi sumber daya fisik antara mesin virtual disebut Hypervisor.

Amazon EC2 memiliki banyak fleksibilitas dan kontrol. Kita dapat memilih sistem operasi yang di inginkan baik windows/linux, juga aplikasi yang ingin dijalankan pada EC2. Selain itu instance EC2 dapat diubah ubah ukurannya.

Ketika aplikasi yang dijalankan membutuhkan lebih banyak memori dan CPU disebut dengan <b>Vertical Scaling</b> 

## Cara Kerja Amazon EC2
1. Luncurkan : Mulai dengan memilih template
2. Hubungkan
3. Gunakan

## Tipe Instance Amazon EC2
Setiap tipe instance dikelompokkan dalam satu instance family dan dioptimalkan untuk tugas tertentu, diantaranya:
- General purpose instances : Instance untuk tujuan umum untuk berbagai beban kerja beragam dari aplikasi yang di pasang.
- Compute optimized instances : Instances ideal untuk komputasi yang berpusat pada processor dengan performa tinggi, atau bisa juga pda beban kerja batch processing
- Memory optimized instances : type yang ideal untuk beban kerja yang memproses data besar pada memory
- Accelerated computing instances : tipe yang menggunakan perangkat keras akselerator untuk menjalankan fungsi tertentu secara efisien
- Storage optimized instance : Khusus untuk beban kerja yang berkaitan dengan read dan write data yang tinggi

## Model Harga EC2 Instances
- On-Demand adalah yang paling fleksibel dan tidak memiliki kontrak.
- Spot Instances memungkinkan Anda untuk menggunakan kapasitas yang tak terpakai dengan tarif diskon.
- Reserved Instances dapat memberikan diskon ketika Anda berkomitmen pada tingkat penggunaan tertentu.
- Savings Plans juga akan memberikan Anda diskon saat berkomitmen pada tingkat penggunaan tertentu dan dapat diterapkan untuk EC2 instance, AWS Lambda dan AWS Fargate.

## Penyesuaian Kapasitas di AWS
Dengan adanya cloud kita menjadi lebih mudah me manage resource jika terdapat peningkatan permintaan, selain itu ketika aplikasih ingin di jalankan kita tidak perlu menebak-nebak berapa kira kira resources yang dibutuhkan seperti pada on premise.

Ketika sistem yang kita buat di cloud berjalan, kemudian ternyata terjadi peningkatan request sehingga instances tidak mampu menangani permintaan yang ada, kita dapat menambahkan instances baru sehingga permintaan yang baru akan tetap di response oleh instances yang baru ini, sehingga aplikasi akan terus available, dan pengguna tetap dapat menggunakan layanan yang kita buat.

## Amazon EC2 Auto Scaling
Dengan amazon auto scaling kita dapat otomatis menambah dan menghapus amazon EC2 instances sesuai dengan kebutuhan. Amazon EC2 Auto Scaling memilii dua pendekatan yaitu :
- Dynamic Scaling : meresponse terhadap perubahan request
- Predictive Scaling : menjadwalkan jumlah instances yang tepet berdasarkan prediksi request yang akan terjadi

## Scaling
Untuk menangani permintaan yang berubah ubah terdapat dua pemahaman yaitu scaling up/down atau scaling in/out
- Scaling Up/Down : Yaitu menambah atau mengurangi daya komputasi pada instances
- Scaling Out/In : Yaitu menambah/mengurangi jumlah instances

## Auto Scaling Group
PAda cloud komputasi merupakan sumber daya yang terprogram sehingga kita dapat mengambil pendekatan yang lebih fleksibel untuk masalah scaling.

Untuk melakukan scaling kita perlu mengkonfigurasi mulai dari minimum capacity, desired capacity dan maximum capacity.

## Elastic Load Balancing
AWS memiliki layanan load balancer berkinerja tinggi yang fungsinya untuk mendistribusikan traffic aplikasi yang masuk ke berbagai sumber daya seperti Amazon EC2 instance. Contoh penggunaan ELB adalah misalnya pada pagi hari lalu lintas traffic normal namun pada siang hari lalu lintas meningkat secara besar-besaran karena ada promo. Saat traffic mulai meningkat EC2 instance akan melakukan scalling out dan ketika instance siap Amazon EC2 Auto Scalling akan memberithu ELB bahwa instance baru sudah siap untuk menangani traffic, kemudian traffic berlebih akan di distribusikan ke instance baru, begitu juga ketika melakukan scalling in.

## Messaging dan Queueing
Amazon Simple Queue Service (Amazon SQS) memungkinkan untuk mengirim, menyimpan dan menerima pesan antar aplikasi tanpa perlu kehilangan pesan tersebut, data yang terkandong (payload) akan dilindungi hingga terkirim. Contoh aplikasi A mengirim sebuah pesan ke dalam queue lalu aplikasi B akan mengambilnya, memprosesnya dan kemudian menghapusnya dari antrean.

Amazon Simple Notification Service (Amazon SNS) digunakan untuk mengirimkan pesan ke layanan. Menggunakan model publish/subscribe pub/sub. Amazon SNS dapat menyebarkan notifikasi kepada pelanggan menggunakan push notif.

## Layanan komputasi tambahan
- Komputasi serverless : layanan dimana kita hanya perlu memikirkan soal kode tidak memikirkan soal pengelolaan, pemeliharaan, availability, scaling, karena dasarnya sudah di kelola oleh AWS. Layanannya yaitu AWS Lambda dapat diskalakan secara otomatis, AWS lambda dirancang untuk menjalankan kode dibawah 15 menit. Cara kerjanya yaitu dengan ungga kode, konfigurasi trigger/http endpoint.

- Container : Jika belum siap menggunakan serverless, namun tetap menginginkan efisiensi dapat menggunakan container seperti Amazon Container Service (Amazon ECS) dan Amazon Elastic Kubernetes Service (Amazon EKS). Container bekerja diatas EC2 Instance dan berjalan terpisah satu sama lain.

- Amazon ECS : Merupakan sistem manajemen container, Amazon ECS mendukung Docker container aik CE dan EE.

- Amazon EKS : Merupakan sistem layanan yang memungkinkan menjalankan kubernetes di AWS

- Amazon Fargate : Merupakan platform komputasi serverless untuk amazon ECS dan Amazon EKS. Digunakan ketika kita tak ingin sibuk mengurusi EC2


## Pilihan Layanan sesuai dengan kebutuhan
- Jika ingin akses penuh ke sistem operasi seperti linux/windows dapat menggunakan Amazon EC2
- Juka ingin menjalankan fungsi yang singkat, berbasis trigger/kejadian namun tidak ingin mengelola infrastruktur dapat menggunakan AWS Lambda
- Jika ingin menjalankan beban kerja berbasis docker container di AWS :
  - Menentukan layanan orkestrasinya yaitu ECS atau EKS
  - kemudian memilih alat orkestrasinya, jika ingin mengelola diatas OS dapat menggunakan EC2 Instances atau dilingkunan serverless dapat menggunakan AWS Fargate