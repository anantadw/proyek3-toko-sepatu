
$(document).ready(function(){
    var $data = $('#product-info');
    var $name = $('#name');
    var $stock = $('#stock');
    var $price = $('#price');

    $.ajax({
        dataType: 'JSON',
        type: 'GET',
        url: 'http://localhost:3000/api/get-products',
        success:function(data){
           var result = " ";
            data.products.forEach(item =>{
                
                result += `<div class="col-md-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Price: ${item.price}</p>
                    <p class="card-text">Stock: ${item.stock}</p>
                    <button onclick="deleteProduct(` + item._id + `)" class="btn btn-danger" id="delete-product">Remove</button>  
                  </div>
                </div>
                </div>`})
                $('#product-info').append(result);

            }
        })

        function deleteProduct(id){
            console.log(id)
            console.log('masuk fungsi')
            $.ajax({
                dataType: 'JSON',
                url: 'http://localhost:3000/api/delete-product/'+id,
                type:'DELETE',
                success: function(response){
                    alert('Product has been deleted');
                    console.log(response)
                },
                error: function(error){
                    alert(error);
                }
            })
            console.log('fungsi selesai')
        }
/*         
        $.ajax({
            url: 'http://localhost:3000/api/delete-product/632f1b8f97e82563f4889ee1',
            type:'DELETE',
            success: function(){
                alert('Product has been deleted');
            },
            error: function(error){
                alert(error);
            }
        })
     */
    $('#add-product').on('click', function(){
        var add = {
            name: $name.val(),
            price: $price.val(),
            stock: $stock.val()
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/add-product',
            data: add,
            success:function(data){
                var result = " ";
                result += `<div class="col-md-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${data.products.name}</h5>
                    <p class="card-text">Price: ${data.products.price}</p>
                    <p class="card-text">Stock: ${data.products.stock}</p>
                  </div>
                </div>
                </div>`
                $('#product-info').append(result);
                console.log(data)
            }
        })
    })


})

