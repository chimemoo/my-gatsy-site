---
title: Memulai project .NET?
date: "2021-03-14"
tags: [".NET"]
---

# Instalasi .NET
- Download .NET Core https://dotnet.microsoft.com/download
- Download VS Code
- C# Extension

# Memulai Project
1. Buat sebuah folder baru, kemudian buka dalam VSCode
2. Buka terminal jalankan perintah 
   ```bash
   dotnet new console
   ```
3. Perintah diaas akan membuat sebuah project awal dengan basic hello world
4. Kemudian untuk menjalankan program, ketikkan perintah
   ```bash
   dotnet run
   ```
5. Akan muncul tulisan "Hello World!"

# Menambahkan NuGet package menggunakan .NET Core tool
1. Pada contoh ini kita akan menambahkan library Humanizer, ketikan perintah berikut di terminal
   ```bash
   dotnet add package Humanizer --version 2.7.9
   ```
   Dotnet akan mendownload library tersebut dari NuGet
2. Setelah selesai buka file DotNetDepedencies.csproj, lalu temukan section ItemGroup, kemudian seharusnya library Humanizer sudah muncul seperti berikut
   ```xml
    <ItemGroup>
        <PackageReference Include="Humanizer" Version="2.7.9" />
    </ItemGrou>
   ```
3. Setelah itu buka file Program.cs, import Humanizer pada bagian atas Program.cs
   ```c#
   using Humanizer;
   ```
4. Kemudian pada bagian di dalam kelas program, dibawah method main tambahkan kode berikut untuk menampilkan penggunaan library Humanize
   ```c#
   static void HumanizeQuantities()
   {
        Console.WriteLine("case".ToQuantity(0));
        Console.WriteLine("case".ToQuantity(1));
        Console.WriteLine("case".ToQuantity(5));
   }

   static void HumanizeDates()
    {
        Console.WriteLine(DateTime.UtcNow.AddHours(-24).Humanize());
        Console.WriteLine(DateTime.UtcNow.AddHours(-2).Humanize());
        Console.WriteLine(TimeSpan.FromDays(1).Humanize());
        Console.WriteLine(TimeSpan.FromDays(16).Humanize());
    }
   ```
5. Kemudian pada Main method panggil fungsi yang sudah kita buat sebelumnya
   ```c#
   static void Main(string[] args)
    {   
        Console.WriteLine("Quantities:");
        HumanizeQuantities();

        Console.WriteLine("\nDate/Time Manipulation:");
        HumanizeDates();
    }
   ```
6. Setelah itu jalankan kembali program menggunakan dotnet run. Hasilnya seperti berikut
   ```text
   Quantities:
   0 cases
   1 case
   5 cases

   Date/Time Manipulation:
   yesterday
   2 hours ago
   1 day
   2 weeks 
   ```



   