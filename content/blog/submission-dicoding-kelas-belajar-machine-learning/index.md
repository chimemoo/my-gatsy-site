---
title: Submission Dicoding kelas Belajar Machine Learning untuk Pemula
date: "2020-06-20"
description: "Halo semuanya, setelah saya berusaha untuk menyelesaikan kelas belajar machine learning pemula sambil melakukan kesibukan lain seperti bekerja dan hal lainnya. Akhirnya saya menyelesaikan submission. Submission yang ada pada kelas ini adalah mencoba menggunakan dataset gambar rock sccisors paper dimana kita harus melakukan klasifikasi dengan ketentuan yang telah diberikan."
tags: ["Python", "Submission", "Dicoding"]
---

## Pendahuluan
Halo semuanya, setelah saya berusaha untuk menyelesaikan kelas belajar machine learning pemula sambil melakukan kesibukan lain seperti bekerja dan hal lainnya. Akhirnya saya menyelesaikan submission. Submission yang ada pada kelas ini adalah mencoba menggunakan dataset gambar rock sccisors paper dimana kita harus melakukan klasifikasi dengan ketentuan yang telah diberikan. Dimana minimal akurasi yang harus didapatkan agar lulus kelas ini adalah 85%. Temen-temen yang mungkin mengambil kelas tersebut bisa mempelajari kode dibawah untuk menyelesaikannya.

Kode ini saya tulis di colabs.research.google.com, kode yang ada dibawah adalah hasil konversi ke markdown.

## Kode

```python
# Install for spliting folder
!pip install split-folders
!pip install split-folders tqdm
```

    Requirement already satisfied: split-folders in /usr/local/lib/python3.6/dist-packages (0.3.1)
    Requirement already satisfied: split-folders in /usr/local/lib/python3.6/dist-packages (0.3.1)
    Requirement already satisfied: tqdm in /usr/local/lib/python3.6/dist-packages (4.41.1)
    


```python
# Importing all need
import urllib.request
import zipfile, os
import split_folders
import pandas as pd
import numpy as np
import glob
import matplotlib.pyplot as plt
import tensorflow as tf
from google.colab import files
from keras.preprocessing import image
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.image import ImageDataGenerator
```

    Using TensorFlow backend.
    


```python
urllib.request.urlretrieve('https://dicodingacademy.blob.core.windows.net/picodiploma/ml_pemula_academy/rockpaperscissors.zip', 'rockpaperscissors.zip')
```




    ('rockpaperscissors.zip', <http.client.HTTPMessage at 0x7f85eb24f048>)




```python
# Read & extract the file dataset
local_zip = 'rockpaperscissors.zip'
zip_ref = zipfile.ZipFile(local_zip, 'r')
zip_ref.extractall('/content/')
zip_ref.close()
```


```python
# Split dataset data train and val
split_folders.ratio('/content/rockpaperscissors/rps-cv-images', output="/content/rockpaperscissors/output_result", ratio=(.8, .2))
```

    Copying files: 2188 files [00:01, 1107.79 files/s]
    


```python
# define folder location
base_dir = '/content/rockpaperscissors/output_result'
train_dir = os.path.join(base_dir, 'train')
validation_dir = os.path.join(base_dir, 'val')
```


```python
# show folder val list
os.listdir('/content/rockpaperscissors/output_result/val')
```




    ['scissors', 'rock', 'paper']




```python
# definition function for read list name of file
def read_list(directory):
  list_label = []
  list_file = []
  for label in os.listdir(directory):
    for item in os.listdir(os.path.join(directory, label)):
      list_label.append(label)
      list_file.append(os.path.join(directory, label, item))
  return pd.DataFrame({'labels': list_label, 'filepath':list_file})
```


```python
train_df = read_list(train_dir)
validation_df = read_list(validation_dir)
```


```python
pd.set_option('display.max_colwidth', -1)
train_df
```

    /usr/local/lib/python3.6/dist-packages/ipykernel_launcher.py:1: FutureWarning: Passing a negative integer is deprecated in version 1.0 and will not be supported in future version. Instead, use None to not limit the column width.
      """Entry point for launching an IPython kernel.
    



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>labels</th>
      <th>filepath</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>scissors</td>
      <td>/content/rockpaperscissors/output_result/train/scissors/1L1n6plr7jlZGirw.png</td>
    </tr>
    <tr>
      <th>1</th>
      <td>scissors</td>
      <td>/content/rockpaperscissors/output_result/train/scissors/2l1K148aIJHRR1q7.png</td>
    </tr>
    <tr>
      <th>2</th>
      <td>scissors</td>
      <td>/content/rockpaperscissors/output_result/train/scissors/ksWe2SZsjOoLAzf5.png</td>
    </tr>
    <tr>
      <th>3</th>
      <td>scissors</td>
      <td>/content/rockpaperscissors/output_result/train/scissors/DH7iguASbWIzzBnT.png</td>
    </tr>
    <tr>
      <th>4</th>
      <td>scissors</td>
      <td>/content/rockpaperscissors/output_result/train/scissors/Kzghoy329glIgfcC.png</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1744</th>
      <td>paper</td>
      <td>/content/rockpaperscissors/output_result/train/paper/em91htnBohvtnG2e.png</td>
    </tr>
    <tr>
      <th>1745</th>
      <td>paper</td>
      <td>/content/rockpaperscissors/output_result/train/paper/QKFJL22hutlivVGa.png</td>
    </tr>
    <tr>
      <th>1746</th>
      <td>paper</td>
      <td>/content/rockpaperscissors/output_result/train/paper/Gc4hUsoFAQBdulGg.png</td>
    </tr>
    <tr>
      <th>1747</th>
      <td>paper</td>
      <td>/content/rockpaperscissors/output_result/train/paper/hUDN2qXDxjoGBWqu.png</td>
    </tr>
    <tr>
      <th>1748</th>
      <td>paper</td>
      <td>/content/rockpaperscissors/output_result/train/paper/AMewmfMVCnLfbuNr.png</td>
    </tr>
  </tbody>
</table>
<p>1749 rows × 2 columns</p>
</div>



```python
# setup image data generator
data_train_img_gen = ImageDataGenerator(
    rotation_range=20,
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
  )

data_val_img_gen = ImageDataGenerator(
    rotation_range=20,
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
  )
```


```python
# Make train generator
train_generator = data_train_img_gen.flow_from_dataframe(
    train_df,
    class_mode='categorical',
    x_col='filepath',
    y_col='labels',
    target_size=(150,150),
    batch_size=4
)

val_generator = data_val_img_gen.flow_from_dataframe(
    validation_df,
    class_mode='categorical',
    x_col='filepath',
    y_col='labels',
    target_size=(150,150),
    batch_size=4
)
```

    Found 1749 validated image filenames belonging to 3 classes.
    Found 439 validated image filenames belonging to 3 classes.
    


```python
# Create model and do training
model = Sequential()

model.add(Conv2D(32, (3,3), activation='relu', input_shape=(150, 150, 3)))
model.add(MaxPooling2D(2, 2))
Conv2D(64, (3,3), activation='relu'),
model.add(MaxPooling2D(2,2))
model.add(Conv2D(64, (3,3), activation='relu'))
model.add(MaxPooling2D(2,2))
model.add(Conv2D(64, (3,3), activation='relu'))
model.add(MaxPooling2D(2,2))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(3, activation='softmax'))

model.compile(
    loss='categorical_crossentropy',
    optimizer=tf.optimizers.Adam(),
    metrics=['accuracy']
)

model.fit(
    train_generator,
    steps_per_epoch=25,
    epochs=20,
    validation_data=val_generator,
    validation_steps=5,
    verbose=2
)
```

    Epoch 1/20
    25/25 - 3s - loss: 1.1445 - accuracy: 0.3700 - val_loss: 1.1281 - val_accuracy: 0.2000
    Epoch 2/20
    25/25 - 3s - loss: 1.1044 - accuracy: 0.3000 - val_loss: 1.1003 - val_accuracy: 0.2500
    Epoch 3/20
    25/25 - 3s - loss: 1.0883 - accuracy: 0.3900 - val_loss: 1.0841 - val_accuracy: 0.3000
    Epoch 4/20
    25/25 - 3s - loss: 1.1039 - accuracy: 0.3700 - val_loss: 1.0939 - val_accuracy: 0.4000
    Epoch 5/20
    25/25 - 3s - loss: 1.0356 - accuracy: 0.5000 - val_loss: 1.0847 - val_accuracy: 0.3500
    Epoch 6/20
    25/25 - 3s - loss: 1.0018 - accuracy: 0.4700 - val_loss: 0.8752 - val_accuracy: 0.7500
    Epoch 7/20
    25/25 - 3s - loss: 0.8081 - accuracy: 0.6600 - val_loss: 0.8446 - val_accuracy: 0.5500
    Epoch 8/20
    25/25 - 3s - loss: 0.5471 - accuracy: 0.8000 - val_loss: 0.3771 - val_accuracy: 0.8500
    Epoch 9/20
    25/25 - 3s - loss: 0.7126 - accuracy: 0.7300 - val_loss: 0.8818 - val_accuracy: 0.7000
    Epoch 10/20
    25/25 - 3s - loss: 0.5534 - accuracy: 0.8300 - val_loss: 0.3515 - val_accuracy: 0.9000
    Epoch 11/20
    25/25 - 3s - loss: 0.4881 - accuracy: 0.8300 - val_loss: 0.5941 - val_accuracy: 0.8500
    Epoch 12/20
    25/25 - 3s - loss: 0.4568 - accuracy: 0.8600 - val_loss: 0.5413 - val_accuracy: 0.8500
    Epoch 13/20
    25/25 - 3s - loss: 0.2625 - accuracy: 0.9200 - val_loss: 0.3694 - val_accuracy: 0.9000
    Epoch 14/20
    25/25 - 3s - loss: 0.4571 - accuracy: 0.8400 - val_loss: 0.7890 - val_accuracy: 0.7000
    Epoch 15/20
    25/25 - 3s - loss: 0.2869 - accuracy: 0.8900 - val_loss: 0.3632 - val_accuracy: 0.8500
    Epoch 16/20
    25/25 - 3s - loss: 0.4002 - accuracy: 0.8400 - val_loss: 0.4019 - val_accuracy: 0.9500
    Epoch 17/20
    25/25 - 3s - loss: 0.4632 - accuracy: 0.8600 - val_loss: 0.3026 - val_accuracy: 0.8500
    Epoch 18/20
    25/25 - 3s - loss: 0.1978 - accuracy: 0.9300 - val_loss: 0.2208 - val_accuracy: 0.8500
    Epoch 19/20
    25/25 - 3s - loss: 0.1680 - accuracy: 0.9400 - val_loss: 0.6753 - val_accuracy: 0.8500
    Epoch 20/20
    25/25 - 3s - loss: 0.2450 - accuracy: 0.9300 - val_loss: 0.0911 - val_accuracy: 1.0000
    




    <tensorflow.python.keras.callbacks.History at 0x7f85e418ebe0>




```python
# See summary of model
model.summary()
```

    Model: "sequential"
    _________________________________________________________________
    Layer (type)                 Output Shape              Param #   
    =================================================================
    conv2d (Conv2D)              (None, 148, 148, 32)      896       
    _________________________________________________________________
    max_pooling2d (MaxPooling2D) (None, 74, 74, 32)        0         
    _________________________________________________________________
    max_pooling2d_1 (MaxPooling2 (None, 37, 37, 32)        0         
    _________________________________________________________________
    conv2d_2 (Conv2D)            (None, 35, 35, 64)        18496     
    _________________________________________________________________
    max_pooling2d_2 (MaxPooling2 (None, 17, 17, 64)        0         
    _________________________________________________________________
    conv2d_3 (Conv2D)            (None, 15, 15, 64)        36928     
    _________________________________________________________________
    max_pooling2d_3 (MaxPooling2 (None, 7, 7, 64)          0         
    _________________________________________________________________
    flatten (Flatten)            (None, 3136)              0         
    _________________________________________________________________
    dense (Dense)                (None, 128)               401536    
    _________________________________________________________________
    dense_1 (Dense)              (None, 3)                 387       
    =================================================================
    Total params: 458,243
    Trainable params: 458,243
    Non-trainable params: 0
    _________________________________________________________________
    


```python
# Make definition for check the result
def check_result(result):
  if result == 0:
    return 'sciccors'
  elif result == 1:
    return 'rock'
  elif result == 2:
    return 'paper'
```


```python
# Make function for upload file and do prediction
uploaded = files.upload()
def check_uploaded_image():
  for fn in uploaded.keys():
    img = image.load_img(fn, target_size=(150,150))
    imgplot = plt.imshow(img)
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])
    result = model.predict_classes(images)[0]
    print(check_result(int(result)))
check_uploaded_image()
```

## Hasil
![result](https://i.ibb.co/nRKMZNZ/Annotation-2020-06-20-145407.jpg)