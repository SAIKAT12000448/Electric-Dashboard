import { Link } from "react-router-dom";
import { useDeleteProductMutation, useGetProductQuery } from "../../redux/api/apiSlice";
import { IProduct } from "../../types/globalTypes";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { setCategory, setConnectivity, setOperating, setPowered, setPriceRange, setScreenSize, setStorage } from "../../redux/feature/products/productSlice";
import { setReleaseDate } from "../../redux/feature/products/productSlice";
import { setBrand } from "../../redux/feature/products/productSlice";
import { setModel } from "../../redux/feature/products/productSlice";


const Inventory = () => {

  const { data: products, isLoading, isError ,refetch} = useGetProductQuery(undefined);
  const [deleteProduct, { isLoading: deleteLoading, isError: deleteError }] = useDeleteProductMutation();
  const dispatch = useDispatch();
  const {priceRange,releaseDate,brand,model,category,operating,connectivity,powered,storage,screen}  = useAppSelector((state)=>state.product);
console.log(connectivity);

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
 <label className="">Price  Range : </label>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;