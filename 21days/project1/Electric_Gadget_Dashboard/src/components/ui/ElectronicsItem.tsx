

import { Link } from 'react-router-dom';
import { useGetProductQuery } from '../../redux/api/apiSlice';
// import quirkyPoint from '../../../images/Quirkypoint.svg'
// import './electro.css'
// ... (your imports)
interface Product {
    _id: string;
    image: string;
    discountPercentage: number;
    product_name:string;
    product_price:BigInteger;

    // add other properties as needed
  }

const ElectronicsItem = () => {
    // const [electronics, setElectronics] = useState([]);
    const { data: products, isLoading, isError} = useGetProductQuery(undefined);
console.log(isLoading,isError,);

    return (
        <div className='container mx-auto my-5 mt-8'>
            <div className='flex justify-between mx-10'>
                <h1 className="text-left text-4xl antialiased font-bold my-4">Products</h1>
                <h1><Link to=''><p className='text-right text-xl px-5'>view more</p></Link></h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 card-normal mx-10">
                {products?.data?.map((item: Product) => (
                    <div className="card bg-base-100 shadow-xl" key={item._id}>
                        <Link to=''>
                            <div style={{ height: '130px', position: 'relative', width: '160px',margin:'auto' }} className="image-container">
                                <img
                                    style={{ width: '100%', height: '100%',maxWidth:'',objectFit: 'contain' ,objectPosition: 'center'}}
                                    src={item.image}
                                    alt=""
                                    className='zoom-out-image'
                                />
                              
                            </div>
                            {/* <span
                                    className='ms-2 border rounded-full p-2'
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        backgroundColor: 'rgb(251, 189, 10)',
                                        color: 'white',
                                        fontWeight: '700'
                                    }}
                                >
                                    {10}%
                                </span> */}
                        </Link>
                        <div className="card-body">
      <h2 className="card-title">{item.product_name}</h2>
      <p className="text-xl font-bold">${item.product_price}</p>
    </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ElectronicsItem;
