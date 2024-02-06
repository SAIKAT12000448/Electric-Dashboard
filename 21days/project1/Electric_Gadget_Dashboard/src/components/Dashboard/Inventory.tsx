import { Link } from "react-router-dom";
import { useAddSellMutation, useDeleteProductMutation, useGetProductQuery } from "../../redux/api/apiSlice";
import { IProduct } from "../../types/globalTypes";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { setCategory, setConnectivity, setOperating, setPowered, setPriceRange, setScreenSize, setStorage } from "../../redux/feature/products/productSlice";
import { setReleaseDate } from "../../redux/feature/products/productSlice";
import { setBrand } from "../../redux/feature/products/productSlice";
import { setModel } from "../../redux/feature/products/productSlice";
import { useState } from "react";


const Inventory = () => {

  const { data: products, isLoading, isError ,refetch} = useGetProductQuery(undefined);
  const [deleteProduct, { isLoading: deleteLoading, isError: deleteError }] = useDeleteProductMutation();
  const [sales, { isLoading: salesLoading, isError: salesError }] = useAddSellMutation();
  const dispatch = useDispatch();
  const {priceRange,releaseDate,brand,model,category,operating,connectivity,powered,storage,screen}  = useAppSelector((state)=>state.product);
  const today = new Date().toISOString().split('T')[0];

  const [quantity, setQuantity] = useState(1);
  const [itemQuantity,setItemQuantity] = useState(0);
  const[id,setId] = useState('');
  console.log(id);
  const [buyerData,setBuyerData] = useState({
    buyer:'',
    quantity,
    id,
    
    
  })
  console.log(buyerData);
  
  if (isLoading) {
    return <div>Loading...</div>;
    
  }

  if (isError) {
    return <div>Error fetching products!</div>;
  }

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

const handleDelete=async (productID:string)=>{
        console.log(productID);
    try {
        await deleteProduct( productID );
        alert('Product deleted successfully');

        refetch();
      } catch (err) {
        alert('Error deleting product');
        console.log(deleteError);
      }
}
let  productsFilter;

if (priceRange > 0 || releaseDate) {
  productsFilter = products?.data?.filter((item: IProduct) => {
    const meetsPriceCondition = item.product_price <= priceRange || priceRange <= 0;
    const meetsDateCondition = item.release_date <= releaseDate || !releaseDate;
    const  brandMatches = brand ? item.brand.toLowerCase().startsWith(brand.toLowerCase().slice(0, 2)) : true ;
    const  modelMatches = model ? item.model_number.toLowerCase().startsWith(model.toLowerCase().slice(0, 1)) : true ;
    const  categoryMatches = category ? item.category.toLowerCase()  === category.toLowerCase() : true ;
    const operatingMatches = operating ? item.operating_system.toLowerCase()===operating.toLowerCase() : true;
    const connectivityMatches = connectivity ? item.connectivity.toLowerCase()===connectivity.toLowerCase():true;
    const poweredMatches = powered ? item.powered===powered:true;
    const storageMatches = storage ? item.storage ===storage : true;
    const screenMatches = screen ? item.screen ===screen : true;
    return meetsPriceCondition && meetsDateCondition && brandMatches && modelMatches && categoryMatches && operatingMatches && connectivityMatches && poweredMatches && storageMatches && screenMatches;
  });
}

const handleSell = (quan:number,product: IProduct) => {
  setId(product._id);
  setItemQuantity(quan);
  setQuantity(1);
  setBuyerData({
    buyer: '',
    quantity: 1,
    id: product._id,
  });
};
const handleIncrement = () => {
  if(itemQuantity<=quantity){
    alert('can not exceed more than availed quantity');
  }
  else{
    setQuantity(quantity + 1);
    setBuyerData((prevData) => ({ ...prevData, quantity: quantity + 1 }));
  }
};

const handleDecrement = () => {
  if (quantity > 0) {
    setQuantity(quantity - 1);
    setBuyerData((prevData) => ({ ...prevData, quantity: quantity - 1 }));
  }
};
const handleChange=( e: React.ChangeEvent<HTMLInputElement>)=>{
  const { name, value } = e.target;
  setBuyerData({
    ...buyerData, 
     [name]: value
  });
}
const handleDialogue=(e: React.ChangeEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(salesError){
    alert('can not be sold');
    console.log(salesError);
  }
  else{
    sales(buyerData);
    alert('Sold Successfully');
    (document.getElementById('my_modal_1') as HTMLDialogElement).close();
    setBuyerData({
      buyer: '',
      quantity: 1,
    });

  }


}

const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setReleaseDate(e.target.value));
};

const handleBrandSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
  dispatch(setBrand(e.target.value));
}
const handleModelSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
  dispatch(setModel(e.target.value));
}
const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  dispatch(setCategory(e.target.value));
}
const handleOperatingChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  dispatch(setOperating(e.target.value));
}
const handleConnectivityChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  dispatch(setConnectivity(e.target.value));
}
const handlePowerChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  dispatch(setPowered(e.target.value));
}
const handleStorageChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  dispatch(setStorage(e.target.value));
}
const handleScreenChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  dispatch(setScreenSize(e.target.value));
}

  return (
    <div className="overflow-x-auto  m-5">
<div  className="grid grid-cols-5 bg-base-200">
 <div className="p-5">
 <label className="">Price  Range: </label>
<input
  type="range"
  min={0}
  max={1000}
  defaultValue={'400'} 
  onChange={(event) => handleSlider([parseInt(event.target.value, 10)])}
  className="range range-info mt-2"
/>
 </div>

 <div className="p-5">
      <label >Release Date:</label>
      <input
        type="date"
        id="calendarInput"
        name="calendarInput"
        value={releaseDate}
        onChange={handleDateChange}
      />
    </div>

    <div className="p-5">
    <label>Brand:</label>
    <input
      type="search"
      placeholder="Search by brand"
      onChange={handleBrandSearch}
      className="border rounded p-1"
    />
    </div>

    <div className="p-5">
    <label>Model No:</label>
    <input
      type="search"
      placeholder="Search by model"
      onChange={handleModelSearch}
      className="border rounded p-1"
    />
    </div>
    <div className="p-5 flex flex-col">
  <label className="mb-1 text-bold">Category:</label>
  <select name="category" id=""onChange={handleCategoryChange}>
    <option value="phone">Phone</option>
    <option value="camera">camera</option>
    <option value="laptop">Laptop</option>

  </select>
  </div>
</div>

<div  className="grid grid-cols-5 bg-base-200">


  <div className="p-5 flex flex-col">
  <label className="mb-1 text-bold">Operating System:</label>
  <select name="operating" id=""onChange={handleOperatingChange}>
    <option value="ios">iOS</option>
    <option value="andriod">Andriod</option>
    <option value="windows">Windows</option>

  </select>
  </div>

  <div className="p-5 flex flex-col">
  <label className="mb-1 text-bold">Connectivity:</label>
  <select name="connectivity" id=""onChange={handleConnectivityChange}>
    <option value="Bluetooth">Bluetooth</option>
    <option value="Wi-Fi">Wi-Fi</option>
    <option value="USB-C">USB-C</option>

  </select>
  </div>

  <div className="p-5 flex flex-col">
  <label className="mb-1 text-bold">Power:</label>
  <select name="powered" id=""onChange={handlePowerChange}>
    <option value="battery-powered">battery-powered</option>
    <option value="plug-in">plug-in</option>

  </select>
  </div>

  <div className="p-5 flex flex-col">
  <label className="mb-1 text-bold">Storage:</label>
  <select name="storage" id=""onChange={handleStorageChange}>
    <option value="4gb">4gb</option>
    <option value="8gb">8gb</option>
    <option value="16gb">16gb</option>
    <option value="32gb">32gb</option>

  </select>
  </div>

  <div className="p-5 flex flex-col">
  <label className="mb-1 text-bold">Screen Size:</label>
  <select name="storage" id=""onChange={handleScreenChange}>
    <option value="15:6">15:6</option>
    <option value="14:6">14:6</option>
    <option value="4.7:9.7">4.7:9.7</option>

  </select>
  </div>
</div>

 



      <table className="table">
     
        <thead>
          <tr>
            <th></th>
            <th>Product name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Release</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
    
          {productsFilter?.map((product:IProduct) => (
            <tr key={product._id}> 
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{product?.product_name}</div>
                    <div className="text-sm opacity-50">{product?.brand}</div>
                  </div>
                </div>
              </td>
              <td>{product?.product_quantity}</td>
              <td>$ {product?.product_price}</td>
              <td> {product?.release_date}</td>
              <th>
               <Link to={`/dashboard/addproduct/${product?._id}`} ><button  className="btn  btn-neutral btn-xs">Update</button></Link>
               
              </th>
              <th>
              <button onClick={() => handleDelete(product?._id)} className="btn btn-error btn-xs">
              {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
              </th>

              <th>
              <button
  className="btn btn-success btn-xs px-5"
  onClick={() => {
    const quantityNumber = Number(product?.product_quantity);

    handleSell(quantityNumber,product);
    setQuantity(1);
    (document.getElementById('my_modal_1') as HTMLDialogElement).showModal();
  }}
>
  Sell
</button>

<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Sell Product</h3>
    <form onSubmit={handleDialogue} className="max-w-md mx-auto mt-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Buyer Name:
        </label>
        <input
          type="text"
          placeholder="Enter Buyer Name"
          className="input input-bordered w-full"
          name="buyer"
          value={buyerData.buyer}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center mt-4">
        <label className="block text-gray-700 text-sm font-bold mr-4">
          Quantity:
        </label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleDecrement}
            className="btn btn-outline btn-sm"
          >
            -
          </button>
         <p className="mx-3"> {quantity}</p>
         <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={()=>handleIncrement()}
                >
                  +
                </button>
        </div>
        

      </div>
      <div className="my-5">
        <label>Date of sell:</label>
        <input
          type="date"
          className="border"
          id="calendarInput"
          name="calendarInput"
          value={today}  
          onChange={handleChange}
        />
      </div>

      <div className="modal-action">
    
        <button  type="submit" className="btn btn-success">Submit</button>

    </div>
   
    </form>

    <div className="modal-action">
      <form method="dialog">
        <button  className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;