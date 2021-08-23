import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import React from "react";
import Header from "../components/Header";
import Order from "../components/Order";
import db from "../firebase";

const Orders = ({ orders }) => {
  const [session] = useSession();

  return (
    <div>
      <Header />
      <main className="p-10 mx-auto max-w-sceen-lg">
        <h1 className="mb-2 text-3xl border-b border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length}</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export const getServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //Get the users logged in credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // Firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
};
