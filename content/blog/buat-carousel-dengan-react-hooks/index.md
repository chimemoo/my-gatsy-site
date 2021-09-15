---
title: Buat Carousel auto slide menggunakan React Hooks
date: "2020-06-15"
description: "Halo semua! Untuk tutorial ini saya akan menggunakan snack.expo.io untuk mempercepat proses, sehingga fokus pada proses dan hasilnya saja nanti. Komponen yang akan kita buat pada artikel ini adalah Carousel yang dapat di ganti dengan swipe manual ataupun otomatis."
tags: ["React Native", "React", "Javascript", "Tutorial"]
---

## Pendahuluan
Halo semua! Untuk tutorial ini saya akan menggunakan snack.expo.io untuk mempercepat proses, sehingga fokus pada proses dan hasilnya saja nanti. Komponen yang akan kita buat pada artikel ini adalah Carousel yang dapat di ganti dengan swipe manual ataupun otomatis. Kita akan menggunakna React Hooks diantaranya `useState`, `useRef`,`useEffect`, untuk membuat swipe otomatis.

## Mulai
Kita tidak membutuhkan library atau komponen eksternal, kita akan menggunakan komponen dan fungsi yang sudah ada pada React dan React Native.
Pertama, sebelum kita mengedit file `index.js` buat file `styles.js` terlebih dahulu untuk styling komponennya. Berikut isi file nya
```jsx
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
  bannerImage: {
    width: screenWidth,
    height: 250,
    alignItems: 'center',
  },
  bannerPageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  bannerSliderIcon: {
    backgroundColor: '#fff',
    width: 35,
    height: 5,
    borderRadius: 0,
    marginHorizontal: 5,
  },
});
```
Kemudian pada file `index.js` / `App.js`, kita akan import beberapa komponen dan file,  seperti dibawah.
```jsx
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import Constants from 'expo-constants';
import styles from './style';
```
Untuk gambar, kita akan gunakan beberapa gambar dari **unsplash**.
```jsx
const images = [
  'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
];
```
Pada komponen Carousel yang akan kita buat ini, kita tidak akan menggunakan FlatList, kita hanya akan menggunakan ScrollView saja, kemudian gambar akan di loop menggunakan `map` di dalam ScrollView. Karena kita ingin membuat gambar di scroll secara horizontal maka tambahkan props `horizontal`, `ref` digunakan untuk mentrack posisi koordinat pada gambar yang sedang aktif.
```jsx
<View style={styles.bannerImage}>
    <ScrollView
        horizontal
        pagingEnabled
        ref={autoPlayRef}
        onScroll={changePage}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={changePage}
    >
        {images.map((image) => (
        <Image key={image} source={{ uri: image }} style={styles.bannerImage} />
        ))}
    </ScrollView>
    <View style={styles.bannerPageContainer}>
        {images.map((image, i) => (
        <View
            key={image}
            style={[styles.bannerSliderIcon, { backgroundColor: i === activePage ? '#fff' : 'rgba(255,255,255,0.5)' }]}
        />
        ))}
    </View>
</View>
```
Kemudian kita tambahkan fungsi di sebelum `return` sebagai berikut
```jsx
const [activePage, setActivePage] = useState(0);
const autoPlayRef = useRef();
const prevCountRef = useRef();

prevCountRef.current = { activePage, setActivePage };

const changePage = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffset / viewSize);
    setActivePage(index);
};

function move(next) {
    if (autoPlayRef.current != null) {
        autoPlayRef.current.scrollTo({
        y: 0,
        x: screenWidth * next,
        animated: true,
        });
    }
}

useEffect(() => {
setInterval(() => {
        const next = prevCountRef.current.activePage < images.length - 1 ? prevCountRef.current.activePage + 1 : 0;
        move(next);
    }, 5000);
}, []);
```
`activePage` berfungsi untuk menyimpan state gambar yang aktif. Fungsi `move` adalah fungsi untuk melakukan Scroll ke posisi sumbu x yang diambil dari `next` dikali dengan lebar layar. `next` diperoleh dari indeks gambar yang aktif, jika `index` bernilai 0 maka jika dikalikan dengan lebar layar hasilnya akan 0, maka gambar yang akan tampil/aktif adalah gambar pertama. Nah untuk melakukan perpindahan gambarnya, kita akan menggunakan `useEffect` dimana didalamnya kita gunakan interval setaip 5000ms, fungsi `move` akan dijalankan.

## Recap
<div data-snack-id="@chimemoo/carousel" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#fafafa;border:1px solid rgba(0,0,0,.08);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.io/embed.js"></script>

## Penutup
Nah sekian untuk tutorial singkatnya, teman-teman dapat langsung coba snack.expo.io diatas. Sekian Terimakasih!