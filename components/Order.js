import moment from "moment";
import React from "react";
import Currency from "react-currency-formatter";

const Order = ({ id, amount, amountShipping, items, timestamp, images }) => {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center p-5 space-x-10 text-sm text-gray-600 bg-gray-100">
        <div>
          <p className="text-xs font-bold">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="CAD" /> - Next Day Delivery{" "}
            <Currency quantity={amountShipping} currency="CAD" />
          </p>
        </div>

        <p className="self-end flex-1 text-sm text-right whitespace-nowrap sm:text-xl text-blue">
          {items.length} items
        </p>

        <p className="absolute w-40 text-xs truncate top-2 right-2 lg:w-72 whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm-p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image) => (
            <img src={image} className="object-contain h-20 sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
