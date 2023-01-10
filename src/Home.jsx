import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from 'axios';
import plan1 from './assets/plan1.png'
import plan2 from './assets/plan2.png'

const Home = () => {


const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

    const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
        amount
    })

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Stackoverflow",
        description: "Subscription Plan",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
            name: "Aranya Kawale",
            email: "aranya.kawale@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();

}    
    return (
        <Box>

           <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>

             <Card amount={5000} img={plan1} checkoutHandler={checkoutHandler} />
             <Card amount={3000} img={plan2} checkoutHandler={checkoutHandler} />

           </Stack>
        </Box>
    )
}

export default Home