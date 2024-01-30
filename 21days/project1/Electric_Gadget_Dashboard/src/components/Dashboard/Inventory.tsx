import { Link } from "react-router-dom";
import { useDeleteProductMutation, useGetProductQuery } from "../../redux/api/apiSlice";
import { IProduct } from "../../types/globalTypes";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { setCategory, setPriceRange } from "../../redux/feature/products/productSlice";
import { setReleaseDate } from "../../redux/feature/products/productSlice";
import { setBrand } from "../../redux/feature/products/productSlice";
import { setModel } from "../../redux/feature/products/productSlice";


const Inventory = () => {

  const { data: products, isLoading, isError ,refetch} = useGetProductQuery(undefined);
  const [deleteProduct, { isLoading: deleteLoading, isError: deleteError }] = useDeleteProductMutation();
  const dispatch = useDispatch();
  const {priceRange,releaseDate,brand,model,category}  = useAppSelector((state)=>state.product);
console.log(category);

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
    return meetsPriceCondition && meetsDateCondition && brandMatches && modelMatches && categoryMatches ;
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

  return (
    <div className="overflow-x-auto  m-5">
<div className="grid grid-cols-4">
 <div className="p-5">
 <label className="">Price  Range : </label>
<input
  type="range"
  min={0}
  max={1000}
  defaultValue={'50'} 
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
</div>

<div className="grid grid-cols-5">
  <div className="p-5 flex flex-col">
  <label className="mb-1 text-bold">Category:</label>
  <select name="category" id=""onChange={handleCategoryChange}>
    <option value="phone">Phone</option>
    <option value="camera">camera</option>
    <option value="laptop">Laptop</option>

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