import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';


const ToolDetails = () => {
    const { toolId } = useParams()
    const [tool, settool] = useState({})
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        const url = `https://infinite-falls-58428.herokuapp.com/tool/${toolId}`
        fetch(url)
            .then(res => res.json())
            .then(data => settool(data))
    }, [])



    const handleOrdersSubmit = event => {
        event.preventDefault();
        const order = {
            toolId: tool._id,
            toolName: tool.name,
            price: tool.price,
            quantity: event.target.quantity.value,
            address: event.target.address.value,
            phone: event.target.number.value,
            email: user.email,

        }

        fetch('https://infinite-falls-58428.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast('Your Order is Confirmed')

            })


    }

    return (
        <div>
            <div class="card lg:card-side bg-base-300 shadow-xl my-20">
                <figure><img className='w-96' src={tool.img} alt="Album" /></figure>
                <div class="card-body">
                    <h2 class="card-title text-3xl font-bold">{tool.name}</h2>
                    <p>{tool.description}</p>
                    <h2 className='text-xl '>Available Quantity- {tool.availableQuantity}</h2>
                    <h2 className='text-xl '>Minimum Order Quantity- {tool.minOrderQuantity}</h2>
                    <h1 className='text-4xl font-bold'>Price- ${tool.price}</h1>
                </div>
            </div>
            <div className='flex justify-center'>
                <div class="card w-96 bg-base-300 shadow-xl mb-20">
                    <div class="card-body items-center text-center">
                        <h2 class="card-title py-3">{tool.name}</h2>
                        <form className='' onSubmit={handleOrdersSubmit}>
                            <input type="text" disabled value={user?.displayName || ''} placeholder="Type here" class="input w-full input-bordered max-w-xs my-3" />
                            <input type="text" disabled value={user?.email || ''} placeholder="Type here" class="input w-full input-bordered max-w-xs my-3" />
                            <input type="number" name='quantity' placeholder="Quantity" class="input w-full input-bordered max-w-xs my-3" />
                            <input type="text" name='address' placeholder="Address" class="input w-full input-bordered max-w-xs my-3" />
                            <input type="number" name='number' placeholder="Phone Number" class="input w-full input-bordered max-w-xs" />
                            <input type="submit" value='Place order' class="btn btn-info w-full  max-w-xs my-3" />
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolDetails;