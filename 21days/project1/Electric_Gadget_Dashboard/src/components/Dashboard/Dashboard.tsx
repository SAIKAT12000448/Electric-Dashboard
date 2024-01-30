import { Link, Outlet } from "react-router-dom";
import Navigation from "../shared/Navigation";

const Dashboard = () => {
    return (
        <div>
            <Navigation></Navigation>
            <div className="grid grid-cols-4">
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
      <li><Link to='/dashboard/inventory'>Inventory</Link></li>
    </ul>
  
  </div>
</div>
<div className="col-span-3">
        <Outlet></Outlet>

        </div>
            </div>
        </div>
    );
};

export default Dashboard;