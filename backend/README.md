# API Documentation :page_with_curl:
Dokumentasi penggunaan API pada aplikasi Backend.

## #1 Get All Products
  Mengambil semua data produk.

* **URL**
  `http://{ip-address | localhost}:3000/api/get-products`

* **Method**
  `GET`
  
* **URL Params**
  None

* **Data Params (Form Data)**
  None

* **Success Response :white_check_mark:**
  * **Status Code :** `200 OK`
  * **Content**
    ```
    {
        "message": "Success",
        "products": [
            {
                "_id": "632b1cbfd34245f669134d08",
                "name": "Nike Air Jordan 1 High",
                "price": 3599990,
                "stock": 31,
                "createdAt": "2022-09-21T14:16:31.427Z",
                "updatedAt": "2022-09-21T14:18:24.383Z",
                "__v": 0,
                "detail": "Brand New In Box, Color : Black White Red"
            },
            ...
        ]
    }
    ```
    Berhasil mendapatkan data produk dan mengirim respon "products" berupa array of object dari produk dengan semua atributnya.
 
* **Error Response :x:**
  * **Status Code :** `500 Internal Server Error`
  * **Content**
    ```
    {
        "message" : "Failed: (error message)"
    }
    ```
    Terjadi karena kesalahan dari server.

## #2 Add New Product
  Menambah produk baru.

* **URL**
  `http://{ip-address | localhost}:3000/api/add-product`

* **Method**
  `POST`
  
* **URL Params**
  None

* **Data Params (Form Data)**
  ```
  name : String (required)
  price : Numeric/Float (required)
  stock : Numeric/Integer (required)
  detail : String (optional)
  ```

* **Success Response :white_check_mark:**
  * **Status Code :** `201 Created`
  * **Content**
    ```
    {
        "message": "Product added successfully"
    }
    ```
    Lolos validasi dan produk berhasil ditambahkan.
 
* **Error Response :x:**
  * **Status Code :** `400 Bad Request`
  * **Content**
    ```
    {
        "message": "Failed"
        "errors": [
            {
                "value": "",
                "msg": "Name is required",
                "param": "name",
                "location": "body"
            },
            ...
        ]
    }
    ```
    Terjadi ketika proses validasi ada kesalahan pada inputan (form data), contoh di atas adalah ketika **_name_** kosong. Mengirim respon "errors" berupa array of object dari field yang mengalami error.
  
  OR

  * **Status Code :** `500 Internal Server Error`
  * **Content**
    ```
    {
        "message": "Failed to add product: (error message)"
    }
    ```
    Terjadi karena kesalahan dari server.

## #3 Show Product Detail
  Menampilkan detail sebuah produk berdasarkan `_id`.

* **URL**
  `http://{ip-address | localhost}:3000/api/show-product/:productId`

* **Method**
  `GET`
  
* **URL Params**
  ```
  :productId = ObjectID (_id)
  ```

* **Data Params (Form Data)**
  None

* **Success Response :white_check_mark:**
  * **Status Code :** `200 OK`
  * **Content**
    ```
    {
        "message": "Success",
        "product": {
            "_id": "632c528ced3a354386aab4c0",
            "name": "Adidas Yeeze X0Z",
            "price": 1999000,
            "stock": 42,
            "createdAt": "2022-09-22T12:18:20.957Z",
            "updatedAt": "2022-09-22T12:32:14.699Z",
            "__v": 0,
            "detail": "Brand New In Box"
        }
    }
    ```
    Mengirim respon "product" dan data produk yang dicari.
 
* **Error Response :x:**
  * **Status Code :** `404 Not Found`
  * **Content**
    ```
    {
        "message": "No data with given id"
        "product": null
    }
    ```
    Terjadi ketika tidak ada data produk dengan `_id` yang dikirimkan. Mengirim respon "product" dengan data null.
  
  OR

  * **Status Code :** `500 Internal Server Error`
  * **Content**
    ```
    {
        "message": "Failed: (error message)"
    }
    ```
    Terjadi karena kesalahan dari server.

## #4 Update Product
  Memperbarui sebuah data produk berdasarkan `_id`.

* **URL**
  `http://{ip-address | localhost}:3000/api/update-product/:productId`

* **Method**
  `PATCH`
  
* **URL Params**
  ```
  :productId = ObjectID (_id)
  ```

* **Data Params (Form Data)**
  ```
  name : String (required)
  price : Numeric/Float (required)
  stock : Numeric/Integer (required)
  detail : String (optional)
  ```

* **Success Response :white_check_mark:**
  * **Status Code :** `200 OK`
  * **Content**
    ```
    {
        "message": "Product updated successfully",
    }
    ```
    Lolos validasi dan data produk berhasil diperbarui.
 
* **Error Response :x:**
  * **Status Code :** `400 Bad Request`
  * **Content**
    ```
    {
        "message": "Failed"
        "errors": [
            {
                "value": "",
                "msg": "Price is required",
                "param": "name",
                "location": "body"
            },
            ...
        ]
    }
    ```
    Terjadi ketika proses validasi ada kesalahan pada inputan (form data), contoh di atas adalah ketika **_price_** kosong. Mengirim respon "errors" berupa array of object dari field yang mengalami error.
  
  OR

  * **Status Code :** `404 Not Found`
  * **Content**
    ```
    {
        "message": "No data with given id"
    }
    ```
    Terjadi ketika tidak ada data produk dengan _id yang dikirimkan. Proses memperbarui gagal.

  OR

  * **Status Code :** `500 Internal Server Error`
  * **Content**
    ```
    {
        "message": "Failed to update product: (error message)"
    }
    ```
    Terjadi karena kesalahan dari server.

## #5 Delete Product
  Menghapus sebuah data sebuah produk berdasarkan `_id`.

* **URL**
  `http://{ip-address | localhost}:3000/api/delete-product/:productId`

* **Method**
  `DELETE`
  
* **URL Params**
  ```
  :productId = ObjectID (_id)
  ```

* **Data Params (Form Data)**
  None

* **Success Response :white_check_mark:**
  * **Status Code :** `200 OK`
  * **Content**
    ```
    {
        "message": "Product deleted successfully"
    }
    ```
    Produk ditemukan dan berhasil dihapus.
 
* **Error Response :x:**
  * **Status Code :** `404 Not Found`
  * **Content**
    ```
    {
        "message": "No data with given id"
    }
    ```
    Terjadi ketika tidak ada data produk dengan _id yang dikirimkan. Proses menghapus gagal.

  OR

  * **Status Code :** `500 Internal Server Error`
  * **Content**
    ```
    {
        "message": "Failed to delete product: (error message)"
    }
    ```
    Terjadi karena kesalahan dari server.
