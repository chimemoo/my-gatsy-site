---
title: Belajar Tipe Data di Kotlin
date: "2021-03-17"
tags: ["Kotlin"]
---

## Apa saja tipe data pada kotlin?
Character, String, Array, Numbers, Boolean

### Bagaimana menginisialisasi variabel pada kotlin?
Dengan menggunakan keyword var atau val
```kotlin
// Struktur inisialisasi
var identifier: Type = initialization

// Contoh inisialisasi variabel
var city: String = "Purwakarta"
```

### Bedanya var dan val?
var dapat di reassign, sedangkan val tidak

### Lebih lanjut?
Tipe data menentukan operasi apa yang bisa dilakukan pada data tersebut

## Tipe Data Characters
Terdapat dua tipe data yang bisa kita gunakan, yaitu Characters dan String. Untuke mendefinisikan nilainya dapat ditaru di dalam kutip tunggak ''
```kotlin
val character = 'A'
```

```kotlin
val character: Char = 'ABC' // Will be error because Char only have 1 character
```

Kita dapat melakukan operasi increment (++) dan decrement (--) pada tipe data char

```kotlin
fun main() {
    var vocal = 'A'

    println("Vocal " + vocal++)
    println("Vocal " + vocal++)
    println("Vocal " + vocal++)
    println("Vocal " + vocal--)
    println("Vocal " + vocal--)
}

/*

Output :
A
B
C
D
C

*/
```

## Tipe Data String
Pada dasarnya String merupakan sekumpulan karakter berbentuk array sehingga kita dapat mendapatkan karakter tunggal dengan mudah dengan memanfaatkan indexing
```kotlin
fun main() {
    val text = "Test"
    val firstChar = text[0]

    print("Krakter pertama dari $text yaitu $firstChar")
}
/*
    output: Karakter pertama dari test yaitu T
*/
```
Selain itu kita juga dapat melakukan iterasi pada char dalam string menggunakan for loop.

## Tipe Data Array
Array memungkinkan kita menyimpan beberapa data dalam sebuah variabel. Array pada kotlin dapat didefinisikan dengan cara berikut
```kotlin
// Dapat memasukkan data yang memiliki tipe data sama
val array = arrayOf(1, 3, 5, 7)

// Dapat juga menambahkan tipe data berbeda
val mixArray = arrayOf(1, 2, 3, 4, "Chimemoo", false)
```

Selain itu juga dapat membuat array dengan tipe data primitif yaitu: 
- intArrayOf() : IntArray
- booleanArrayOf() : BooleanArray
- charArrayOf() : CharArray
- longArrayOf() : LongArray
- shortArrayOf() : ShortArray
- byteArrayOf() : ByteArray

Selain menggunakan fungsi arrayOf kita (juga dapat menggunakan kelas Array
```kotlin
val intArray = Array(4, { i -> i * i }) // [0, 1, 4, 9]
```
Pada kode di atas kita menentukan angka 4 sebagai size Array. Fungsi lambda di atas ada dua. Pertama, untuk mengambil indeks Array yang akan digunakan sebagai argumen.

## Tipe Data Numbers
Pada kotlin terdapat beberapa tipe bawaan yang merepresentasikan tipe data Number yaitu Double, Long, Int, Short, Byte. Setiap data memiliki satuan bit berbeda-beda.
- Int (32 Bit) : menyimpan data dari range -2^31 sampai +s^31-1 
- Long (64 Bit): range -2^63 sampai +2^63-1
- Short (16 Bit)
- Double (64 Bit)

```kotlin
fun main() {
    val byteNumber: Byte = 0b11010010
    val intNumber = 100
    val longNumber: Long = 100
    val longNumber2 = 100L
    val shortNumber: Short = 10
    val doubleNumber = 1.3
}
```

Melakukan konversi
```kotlin
fun main() {
    val byteNumber: Byte = 1
    val intNumber: Int = byteNumber.toInt()
}
```

Menuliskan readable numerik
```kotlin
fun main() {
    val readableNumber = 1_000_000
    print(readableNumber) // output 1000000
}
```

## Nullable Types
Dengan menggunakan Kotlin kita bisa dimudahkan utuk menghindari terjadinya NullPointerException yang sering terjadi ada java.
```kotlin
// Contoh eror
val text: String = null // compile time error

// Contoh untuk mengatasi nilai null
val text: String? = null
```
Dengan menambahkan tanda tanya setelah tipe data yang ditentukan, kotlin akan memahami bahwa variabel tersebut bertipe data string tapi bisa juga null.

## Safe Calls Operator (?)
Seperti javascript, kotlin memiliki Safe calls operator untuk menghindari aplikasi error karena data yang tersimpan bernilai null, contoh
```kotlin
val text: String? = null
text?.length
```
Kompiler kotlin akan langsung melewatkan baris text?.length jika nilainya null

## Elvis Operator (?:)
Kita dapat menetapkan default number jika variabel bernilai null
```kotlin
val text: String? = null
val textLength = text?.length ?: 7
```