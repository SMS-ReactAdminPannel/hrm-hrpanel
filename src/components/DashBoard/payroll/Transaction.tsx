import React from "react";

const Transaction: React.FC = () => {
  const transactions = [
    {
      name: "Arlene McCoy",
      company: "The Walt Disney Company",
      date: "Mar 1, 2022",
      time: "08:00 AM",
      amount: "₹1,546.12",
      img: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Savannah Nguyen",
      company: "Pizza Hut",
      date: "Mar 2, 2022",
      time: "09:30 AM",
      amount: "₹2,120.00",
      img: "https://i.pravatar.cc/40?img=2",
    },
    {
      name: "Kristin Watson",
      company: "Nintendo",
      date: "Mar 3, 2022",
      time: "10:45 AM",
      amount: "₹980.00",
      img: "https://i.pravatar.cc/40?img=3",
    },
    {
      name: "Jane Cooper",
      company: "eBay",
      date: "Mar 4, 2022",
      time: "02:15 PM",
      amount: "₹3,640.00",
      img: "https://i.pravatar.cc/40?img=4",
    },
    {
      name: "Devon Lane",
      company: "Netflix",
      date: "Mar 5, 2022",
      time: "11:00 AM",
      amount: "₹4,200.00",
      img: "https://i.pravatar.cc/40?img=5",
    },
    {
      name: "Jane Cooper",
      company: "eBay",
      date: "Mar 4, 2022",
      time: "02:15 PM",
      amount: "₹3,640.00",
      img: "https://i.pravatar.cc/40?img=4",
    },
    {
      name: "Devon Lane",
      company: "Netflix",
      date: "Mar 5, 2022",
      time: "11:00 AM",
      amount: "₹4,200.00",
      img: "https://i.pravatar.cc/40?img=5",
    },
    {
      name: "Jane Cooper",
      company: "eBay",
      date: "Mar 4, 2022",
      time: "02:15 PM",
      amount: "₹3,640.00",
      img: "https://i.pravatar.cc/40?img=4",
    },
    {
      name: "Devon Lane",
      company: "Netflix",
      date: "Mar 5, 2022",
      time: "11:00 AM",
      amount: "₹4,200.00",
      img: "https://i.pravatar.cc/40?img=5",
    },
  ];

  return (
    <div className= "p-2  ">
      <div className="col-span-6 ">
        <h2 className="text-xl font-semibold text-gary-900 mb-4">
          Transaction History
        </h2>

        {/* Table Headers */}
        <div className="grid grid-cols-4 font-semibold text-sm text-black-800 border-b pb-2 mb-2 ">
          <div>Name</div>
          <div>Date - Time</div>
          <div>Amount</div>
          <div>Action</div>
        </div>

        {/* Rows */}
        <div className="overflow-y-scroll scrollbar-hide max-h-[280px]">
            {transactions.map((txn, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center text-sm text-gray-800 border-b py-2 last:border-b-0 "
          >
            {/* Name + Avatar */}
            <div className="flex items-center space-x-3">
              <img
                src={txn.img}
                alt={txn.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className=" font-bold ">{txn.name}</p>
                <p className="text-xs font-bold text-gray-900">{txn.company}</p>
              </div>
            </div>

            {/* Date-Time */}
            <div>
              <p className="text-xs font-bold text-gray-900">{txn.date}</p>
              <p className="text-xs font-bold text-gray-900">{txn.time}</p>
            </div>

            {/* Amount */}
            <div>
              <p className="font-bold">{txn.amount}</p>
            </div>

            {/* Action */}
            <div className="text-left">
              <button className="text-xs font-bold bg-gray-300 px-6 py-1 rounded-md">
                Send Invoice
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
