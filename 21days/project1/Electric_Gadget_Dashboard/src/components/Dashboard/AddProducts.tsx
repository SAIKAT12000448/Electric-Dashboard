import React, { useEffect, useState } from 'react';
import { IProduct } from '../../types/globalTypes'; // Import your IProduct interface
import { useAddProductMutation, useGetUniqueProductQuery, useUpdateProductMutation } from '../../redux/api/apiSlice';
import { useParams } from 'react-router-dom';

const AddProducts = () => {

    const {id} =useParams();
    
  const initialProductState: IProduct = {
    _id:'',
    product_name: '',
    product_quantity: '',
    product_price: 0,
    brand: '',
    category: '',
    release_date: '',
    model_number: '',
    operating_system: '',
    weight: '',
    dimensions: '',
    image:'',
    connectivity:'',
    powered:'',
    storage:'',
    screen:''
  };

  const [productData, setProductData] = useState<IProduct>(initialProductState);
  const [postProduct,{error}] = useAddProductMutation(undefined);
  const [updateProducts,{isError}] = useUpdateProductMutation(undefined);
  console.log(isError);
   const {data,isLoading} = useGetUniqueProductQuery(id?id :'');

   useEffect(() => {
    if (data) {
      setProductData(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
    
  }

 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
   
      setProductData({
        ...productData,
        [name]: name === 'product_price' ? parseFloat(value) : value,
      });

   
   
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(error);
    if(error){
        alert('product cannot be add');
    }
    else{
      if(!id){
        postProduct(productData);
        alert('Product Add successfully');
        setProductData(initialProductState);
      }
      else{
       
        updateProducts(productData);
        alert("Product updated Successfully");
        setProductData(initialProductState);

      }
        
    }
   
  };

  return (
    <div className="w-100  mt-10 p-6 bg-white rounded-md shadow-md">
      {
        id?<h2 className="text-2xl font-semibold mb-4">Update Electronics Product</h2>
        :
        <h2 className="text-2xl font-semibold mb-4">Add Electronics Product</h2>

      }
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4'>
        <div>
        <div className="mb-4">
          <label htmlFor="product_name" className="block text-gray-600 text-sm font-medium">
            Product Name:
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            contentEditable
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="product_quantity" className="block text-gray-600 text-sm font-medium">
            Product Quantity:
          </label>
          <input
            type="number"
            id="product_quantity"
            name="product_quantity"
            value={productData.product_quantity}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="product_price" className="block text-gray-600 text-sm font-medium">
            Product Price:
          </label>
          <input
            type="number"
            id="product_price"
            name="product_price"
            value={productData.product_price}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
  <label htmlFor="product_brand" className="block text-gray-600 text-sm font-medium">
    Brand:
  </label>
  <input
    type="text"
    id="product_brand"
    name="brand"
    value={productData.brand}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
    required
  />
</div>

<div className="mb-4">
  <label htmlFor="model_no" className="block text-gray-600 text-sm font-medium">
    Model:
  </label>
  <input
    type="text"
    id="model_no"
    name="model_number"
    value={productData.model_number}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
    required
  />
</div>

        {/* Repeat the above structure for other fields */}

        <div className="mb-4">
          <label htmlFor="release_date" className="block text-gray-600 text-sm font-medium">
            Release Date:
          </label>
          <input
            type="date"
            id="release_date"
            name="release_date"
            value={productData.release_date}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="operating_system" className="block text-gray-600 text-sm font-medium">
            Operating System:
          </label>
          <input
            type="text"
            id="operating_system"
            name="operating_system"
            value={productData.operating_system}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        </div>

<div>
<div className="mb-4">
          <label htmlFor="weight" className="block text-gray-600 text-sm font-medium">
          weight:
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={productData.weight}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
<div className="mb-4">
          <label htmlFor="weight" className="block text-gray-600 text-sm font-medium">
          Image Link:
          </label>
          <input
            type="img"
            id="img"
            name="image"
            value={productData.image}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
</div>



        </div>
        {/* Add more fields as needed */}

        <div className="mt-4 text-center">
            {
                id? 
                <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 w-80  rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Update product
          </button> :
          <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-80  rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Add Product
        </button>
            }
          
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
