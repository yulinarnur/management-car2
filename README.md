# Management Car with Express js, Mysql dan Ejs
Aplikasi ini merupakan pengelolahan mobil dengan sistem authentikasi dan juga dapat melakukan inputan, edit dan delete data 

## Entity Relation Diagram
Relasi yang dihasilkan yaitu One-to-Many. Dimana satu pengguna (user) dapat melakukan banyak pengelohan data mobil.
- Users.hasMany(Cars);
- Cars.belongsTo(Users, { foreignKey: "userId" });

![image](https://github.com/yulinarnur/management-car2/assets/71864701/bb4334af-0900-438c-83f1-0f1c4d308d7a)

## API Endpoint Users
### 1. Create / Register User

**Deskripsi:** Register akun baru

**URL:** `localhost:5000/users`

**Method:** `POST`

**Contoh Request Body:** 

```json
{
  "name": "Yulinar Nur",
  "email": "admin@gmail.com",
  "password": "123456",
  "confPassword": "123456",
  "role": "admin"
}
```
**Contoh Response Body:** 
```json
{
  "msg": "Register Berhasil"
}
```

### 2. Login
**Deskripsi:** Login ke akun untuk mendapatkan hak akses. Pada aplikasi ini terdapat 2 role yaitu admin dan user.

**URL:** `http://localhost:5000/login`

**Method:** `POST`

**Contoh Request Body:** 

```json
{
    "email": "admin@gmail.com",
    "password": "123456"
}
```
**Contoh Response Body:** 
```json
{
  "uuid": "08e1d273-ab7c-4108-a8c9-1117bca786c5",
  "name": "Yulinar Nur",
  "email": "admin@gmail.com",
  "role": "admin"
}
```

### 3. Get All Data Users
**Deskripsi:** Melihat semua data pada tabel user

**URL:** `http://localhost:5000/users`

**Method:** `GET`

**Contoh Request Body:** 

```json
{}
```
**Contoh Response Body:** 
```json
[
  {
    "uuid": "82c44bab-b9b7-4efd-b9d8-aafc5da72f64",
    "name": "Rahmawati",
    "email": "rahmawati@gmail.com",
    "role": "user"
  },
  {
    "uuid": "08e1d273-ab7c-4108-a8c9-1117bca786c5",
    "name": "Yulinar Nur",
    "email": "admin@gmail.com",
    "role": "admin"
  },
  {
    "uuid": "af876112-11b9-4317-9e5b-ef872542605f",
    "name": "Yulinar Nur 2",
    "email": "admin1@gmail.com",
    "role": "admin"
  }
]
```
### 3. Get Single Data Users
**Deskripsi:** Melihat satu data pada tabel user berdasarkan dengan uuid users

**URL:** `http://localhost:5000/users/:uuid` / `http://localhost:5000/users/af876112-11b9-4317-9e5b-ef872542605f`

**Method:** `GET`

**Contoh Request Body:** 

```json
{}
```
**Contoh Response Body:** 
```json
{
 "uuid": "af876112-11b9-4317-9e5b-ef872542605f",
 "name": "Yulinar Nur 2",
 "email": "admin1@gmail.com",
 "role": "admin"
}
```
### 3. Update Data Users
**Deskripsi:** Mengubah data users dengan tidak mengubah passwordnya

**URL:** `http://localhost:5000/users/:uuid` / `http://localhost:5000/users/af876112-11b9-4317-9e5b-ef872542605f`

**Method:** `PATCH`

**Contoh Request Body:** 

```json
{
    "name": "Yulinar Nur 2 Update",
    "email": "admin1@gmail.com",
    "password": "",
    "confPassword": "",
    "role": "admin"
}
```
**Contoh Response Body:** 
```json
{
  "msg": "User Updated"
}
```

### 3. Delete Data Users
**Deskripsi:** Mengubah data users dengan tidak mengubah passwordnya

**URL:** `http://localhost:5000/users/:uuid` / `http://localhost:5000/users/af876112-11b9-4317-9e5b-ef872542605f`

**Method:** `DELETE`

**Contoh Response Body:** 
```json
{
  "msg": "User Deleted"
}
```

## API Endpoint Cars
### 1. Add Data Cars
**Deskripsi:** Menambah data mobil

**URL:** `http://localhost:5000/cars`

**Method:** `POST`

**Content-Type:** multipart/form-data

**Contoh Request Body:** 

```json
{
    "model": "MKZ",
    "rentPerDay": "932000",
    "images": "" (upload file img)
}
```

**Contoh Response Body:** 
```json
{
    "msg": "Car Created Successfully"
}
```

### 2. Read All Data Cars
**Deskripsi:** Melihat semua data mobil

**URL:** `http://localhost:5000/cars`

**Method:** `GET`

**Content-Type:** multipart/form-data

**Contoh Response Body:** 
```json
{
   [
    {
        "id": 7,
        "uuid": "3d4f36fd-d5ae-4c80-b8ab-93c3a8aaf5f1",
        "model": "MKZ editaa",
        "rentPerDay": 900000,
        "images": "public\\uploads\\car12.min.jpg",
        "createdAt": "2024-05-16T04:32:30.000Z",
        "updatedAt": "2024-05-16T12:27:07.000Z",
        "user": {
            "id": 3,
            "uuid": "08e1d273-ab7c-4108-a8c9-1117bca786c5",
            "name": "Yulinar Nur",
            "email": "admin@gmail.com",
            "role": "admin",
            "createdAt": "2024-05-12T13:41:09.000Z",
            "updatedAt": "2024-05-12T13:41:09.000Z"
        }
    },
    {
        "id": 8,
        "uuid": "e311a019-c0dc-4044-9090-a06e3560d351",
        "model": "RTX21",
        "rentPerDay": 300000,
        "images": "public\\uploads\\car14.min.jpg",
        "createdAt": "2024-05-16T04:54:58.000Z",
        "updatedAt": "2024-05-16T12:15:13.000Z",
        "user": {
            "id": 3,
            "uuid": "08e1d273-ab7c-4108-a8c9-1117bca786c5",
            "name": "Yulinar Nur",
            "email": "admin@gmail.com",
            "role": "admin",
            "createdAt": "2024-05-12T13:41:09.000Z",
            "updatedAt": "2024-05-12T13:41:09.000Z"
        }
    },
    {
        "id": 10,
        "uuid": "38ba3aa3-f5b0-484f-b967-6705a8434207",
        "model": "MKZ",
        "rentPerDay": 900000,
        "images": "public\\uploads\\car09.min.jpg",
        "createdAt": "2024-05-17T08:26:21.000Z",
        "updatedAt": "2024-05-17T08:26:21.000Z",
        "user": {
            "id": 3,
            "uuid": "08e1d273-ab7c-4108-a8c9-1117bca786c5",
            "name": "Yulinar Nur",
            "email": "admin@gmail.com",
            "role": "admin",
            "createdAt": "2024-05-12T13:41:09.000Z",
            "updatedAt": "2024-05-12T13:41:09.000Z"
        }
    }
]
}
```

### 3. Edit Data Cars
**Deskripsi:** Edit data mobil

**URL:** `http://localhost:5000/cars/:uuid` / `http://localhost:5000/cars/38ba3aa3-f5b0-484f-b967-6705a8434207` 

**Method:** `PATCH`

**Content-Type:** multipart/form-data

**Contoh Request Body:** 

```json
{
    "model": "Mobil update",
    "rentPerDay": "350000",
    "images": "" (upload file img jika ingin di edit)
}
```

**Contoh Response Body:** 
```json
{
    "msg": "Car updated successfuly"
}
```

### 4. Delete Data Cars
**Deskripsi:** Menghapus data mobil

**URL:** `http://localhost:5000/cars/:uuid` / `http://localhost:5000/cars/38ba3aa3-f5b0-484f-b967-6705a8434207` 

**Method:** `DELETE`

**Contoh Response Body:** 
```json
{
    "msg": "Car deleted successfuly"
}
```
