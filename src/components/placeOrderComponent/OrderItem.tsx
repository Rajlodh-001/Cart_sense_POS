
const OrderItem = ({ name, id, table, date, price, status }: any) => (
  // The outer container: a clickable row with hover effect
  <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
    
    {/* LEFT COLUMN: Info */}
    <div className="flex flex-col gap-1">
      {/* Customer Name */}
      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
      
      {/* Order Details */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>Order Number: <strong className="text-gray-700">{id}</strong></span>
        <span>Table: <strong className="text-gray-700">{table}</strong></span>
      </div>
      
      {/* Date */}
      <p className="text-xs text-gray-400 mt-1 italic">{date}</p>
    </div>

    {/* RIGHT COLUMN: Price & Status */}
    <div className="text-right">
      <p className="text-xl font-bold text-gray-800 mb-2">${price}</p>
      
      {/* Conditional Logic: Changes color based on 'status' prop */}
      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
        status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-500'
      }`}>
        {status}
      </span>
    </div>
  </div>
);
export default OrderItem;