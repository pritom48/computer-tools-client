import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">
                <Outlet></Outlet>


            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>My Orders</Link></li>
                    <li><Link to='/dashboard/profile'>My Profile</Link></li>
                    <li><Link to='/dashboard/reviews'>Give Reviews</Link></li>
                    {admin && <li><Link to='/dashboard/users'>All User</Link></li>}
                    {admin && <li><Link to='/dashboard/addproducts'>Add Products</Link></li>}
                    {admin && <li><Link to='/dashboard/manage'>Manage Products</Link></li>}
                    {admin && <li><Link to='/dashboard/manageorder'>Manage All Order</Link></li>}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;