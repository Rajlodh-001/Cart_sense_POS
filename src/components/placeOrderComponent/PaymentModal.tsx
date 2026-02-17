// "use client";
// import React, { useState, useEffect } from 'react';
// import { X, CreditCard, Banknote, MapPin, Tag, Calculator, User, ArrowRight } from 'lucide-react';

// interface PaymentModalProps {
//   totalAmount: number;
//   onClose: () => void;
//   onConfirm: (paymentDetails: any) => void;
// }

// const PaymentModal: React.FC<PaymentModalProps> = ({ totalAmount, onClose, onConfirm }) => {
//   // --- STATE ---
//   const [orderType, setOrderType] = useState<'dine-in' | 'take-away'>('dine-in');
//   const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr'>('cash');
//   const [tableNo, setTableNo] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [couponCode, setCouponCode] = useState('');
  
//   // Cash Logic
//   const [cashGiven, setCashGiven] = useState<string>('');
//   const [change, setChange] = useState<number>(0);

//   // --- EFFECT: Calculate Change Automatically ---
//   useEffect(() => {
//     const cash = parseFloat(cashGiven) || 0;
//     setChange(cash - totalAmount);
//   }, [cashGiven, totalAmount]);

//   // --- HANDLER: Confirm Payment ---
//   const handleConfirm = () => {
//     onConfirm({
//       orderType,
//       tableNo: orderType === 'dine-in' ? tableNo : 'N/A',
//       paymentMethod,
//       customerName,
//       totalAmount,
//       cashGiven: paymentMethod === 'cash' ? cashGiven : null,
//       change: paymentMethod === 'cash' ? change : null,
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
//       <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
//         {/* --- LEFT SIDE: ORDER DETAILS --- */}
//         <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col gap-6 border-r border-gray-100">
//           <h2 className="text-xl font-bold text-gray-800">Order Details</h2>

//           {/* 1. Order Type Toggle */}
//           <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
//             <button
//               onClick={() => setOrderType('dine-in')}
//               className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${orderType === 'dine-in' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
//             >
//               Dine In
//             </button>
//             <button
//               onClick={() => setOrderType('take-away')}
//               className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${orderType === 'take-away' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
//             >
//               Take Away
//             </button>
//           </div>

//           {/* 2. Customer Info Inputs */}
//           <div className="space-y-4">
//              {/* Customer Name */}
//              <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex items-center gap-3">
//                <User className="text-gray-400" size={18} />
//                <input 
//                  type="text" 
//                  placeholder="Customer Name" 
//                  value={customerName}
//                  onChange={(e) => setCustomerName(e.target.value)}
//                  className="w-full outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400"
//                />
//              </div>

//              {/* Table No (Only if Dine In) */}
//              {orderType === 'dine-in' && (
//                <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex items-center gap-3 animate-in slide-in-from-top-2">
//                  <MapPin className="text-gray-400" size={18} />
//                  <input 
//                    type="text" 
//                    placeholder="Table Number (e.g., T-04)" 
//                    value={tableNo}
//                    onChange={(e) => setTableNo(e.target.value)}
//                    className="w-full outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400"
//                  />
//                </div>
//              )}

//              {/* Coupon Code */}
//              <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex items-center gap-3">
//                <Tag className="text-gray-400" size={18} />
//                <input 
//                  type="text" 
//                  placeholder="Coupon Code" 
//                  value={couponCode}
//                  onChange={(e) => setCouponCode(e.target.value)}
//                  className="w-full outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400"
//                />
//                {couponCode && <span className="text-xs font-bold text-blue-600 cursor-pointer">APPLY</span>}
//              </div>
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: PAYMENT --- */}
//         <div className="w-full md:w-1/2 p-6 flex flex-col justify-between relative">
//           <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition">
//             <X size={20} />
//           </button>

//           <div className="space-y-6 mt-2">
//             <div>
//               <h2 className="text-xl font-bold text-gray-800">Payment</h2>
//               <p className="text-sm text-gray-400">Select a payment method</p>
//             </div>

//             {/* 3. Payment Methods */}
//             <div className="grid grid-cols-3 gap-3">
//               <PaymentOption icon={<Banknote />} label="Cash" active={paymentMethod === 'cash'} onClick={() => setPaymentMethod('cash')} />
//               <PaymentOption icon={<CreditCard />} label="Card" active={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} />
//               <PaymentOption icon={<div className="font-bold text-xs border-2 border-current rounded p-0.5">QR</div>} label="QR Code" active={paymentMethod === 'qr'} onClick={() => setPaymentMethod('qr')} />
//             </div>

//             {/* 4. Cash Calculator (Only if Cash is selected) */}
//             {paymentMethod === 'cash' && (
//               <div className="bg-blue-50 p-4 rounded-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
//                 <div className="flex justify-between items-center">
//                    <span className="text-sm font-bold text-gray-600">Total Bill</span>
//                    <span className="text-lg font-bold text-gray-800">${totalAmount.toFixed(2)}</span>
//                 </div>
                
//                 {/* Cash Given Input */}
//                 <div className="bg-white rounded-xl px-3 py-2 border border-blue-200 flex items-center gap-2">
//                    <Calculator className="text-blue-400" size={18} />
//                    <input 
//                      type="number" 
//                      placeholder="Cash Received" 
//                      value={cashGiven}
//                      onChange={(e) => setCashGiven(e.target.value)}
//                      className="w-full outline-none font-bold text-gray-800 placeholder:font-normal"
//                    />
//                 </div>

//                 {/* Change Display */}
//                 <div className="flex justify-between items-center pt-2 border-t border-blue-200">
//                    <span className="text-sm font-bold text-gray-600">Change</span>
//                    <span className={`text-lg font-bold ${change < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
//                      ${change >= 0 ? change.toFixed(2) : '0.00'}
//                    </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* 5. Footer Actions */}
//           <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
//             <div className="flex flex-col">
//               <span className="text-xs text-gray-400 font-medium">Total to Pay</span>
//               <span className="text-2xl font-bold text-gray-800">${totalAmount.toFixed(2)}</span>
//             </div>
            
//             <button 
//               onClick={handleConfirm}
//               className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition flex items-center gap-2 active:scale-95"
//             >
//               Pay Now <ArrowRight size={18} />
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// // Helper Component
// const PaymentOption = ({ icon, label, active, onClick }: any) => (
//   <button 
//     onClick={onClick}
//     className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all duration-200
//       ${active 
//         ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
//         : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200 hover:text-blue-500'}
//     `}
//   >
//     {React.cloneElement(icon, { size: 20 })}
//     <span className="text-xs font-bold">{label}</span>
//   </button>
// );

// export default PaymentModal;



"use client";
import React, { useState, useEffect } from 'react';
import { X, CreditCard, Banknote, MapPin, Tag, Calculator, User, ArrowRight, RotateCcw, Coins } from 'lucide-react';

interface PaymentModalProps {
  totalAmount: number;
  onClose: () => void;
  onConfirm: (paymentDetails: any) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ totalAmount, onClose, onConfirm }) => {
  // --- STATE ---
  const [orderType, setOrderType] = useState<'dine-in' | 'take-away'>('dine-in');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr'>('cash');
  const [tableNo, setTableNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  
  // --- CASH LOGIC ---
  const [useDenominations, setUseDenominations] = useState(false); // TOGGLE STATE
  const [manualCash, setManualCash] = useState<string>('');
  
  // denomination counts: { 100: 0, 50: 0, ... }
  const [bills, setBills] = useState<Record<number, number>>({
    100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 1: 0
  });

  // Calculate total cash from bills
  const billsTotal = Object.entries(bills).reduce((acc, [value, count]) => {
    return acc + (Number(value) * count);
  }, 0);

  // Determine actual cash received based on mode
  const cashReceived = useDenominations ? billsTotal : (parseFloat(manualCash) || 0);
  const change = cashReceived - totalAmount;

  // Handler: Add Bill
  const addBill = (amount: number) => {
    setBills(prev => ({ ...prev, [amount]: prev[amount] + 1 }));
  };

  // Handler: Reset Bills
  const clearBills = () => {
    setBills({ 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 1: 0 });
  };

  const handleConfirm = () => {
    onConfirm({
      orderType,
      tableNo,
      paymentMethod,
      customerName,
      totalAmount,
      cashReceived,
      change,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto">
        
        {/* --- LEFT SIDE: ORDER DETAILS --- */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col gap-5 border-r border-gray-100 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800">Order Details</h2>

          {/* Order Type */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            {['dine-in', 'take-away'].map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type as any)}
                className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${orderType === type ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="space-y-3">
             <div className="bg-white px-3 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
               <User className="text-gray-400" size={16} />
               <input type="text" placeholder="Customer Name" className="w-full outline-none text-sm" value={customerName} onChange={e => setCustomerName(e.target.value)} />
             </div>
             
             {orderType === 'dine-in' && (
               <div className="bg-white px-3 py-2.5 rounded-xl border border-gray-200 flex items-center gap-2">
                 <MapPin className="text-gray-400" size={16} />
                 <input type="text" placeholder="Table No." className="w-full outline-none text-sm" value={tableNo} onChange={e => setTableNo(e.target.value)} />
               </div>
             )}
          </div>
        </div>

        {/* --- RIGHT SIDE: PAYMENT & CALCULATOR --- */}
        <div className="flex-1 p-6 flex flex-col relative overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition">
            <X size={20} />
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Payment</h2>
            <p className="text-sm text-gray-400">Total Due: <span className="text-blue-600 font-bold text-lg">${totalAmount.toFixed(2)}</span></p>
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <PaymentOption icon={<Banknote />} label="Cash" active={paymentMethod === 'cash'} onClick={() => setPaymentMethod('cash')} />
            <PaymentOption icon={<CreditCard />} label="Card" active={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} />
            <PaymentOption icon={<Coins />} label="Other" active={paymentMethod === 'qr'} onClick={() => setPaymentMethod('qr')} />
          </div>

          {/* --- CASH CALCULATOR SECTION --- */}
          {paymentMethod === 'cash' && (
            <div className="bg-blue-50 p-4 rounded-2xl flex-1 flex flex-col gap-4">
              
              {/* Toggle Switch */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-blue-800 flex items-center gap-2">
                  <Calculator size={16}/> Denomination Mode
                </span>
                <button 
                  onClick={() => setUseDenominations(!useDenominations)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${useDenominations ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${useDenominations ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* MODE 1: BILL SELECTION GRID */}
              {useDenominations ? (
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[100, 50, 20, 10, 5, 1].map((bill) => (
                      <button 
                        key={bill}
                        onClick={() => addBill(bill)}
                        className="bg-white border border-blue-100 py-3 rounded-xl shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all active:scale-95 flex flex-col items-center justify-center relative"
                      >
                        <span className="text-green-600 font-bold text-lg">${bill}</span>
                        {bills[bill] > 0 && (
                          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-in zoom-in">
                            {bills[bill]}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-blue-100">
                    <span className="text-gray-500 text-sm font-medium">Cash Received:</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-gray-800">${billsTotal.toFixed(2)}</span>
                      <button onClick={clearBills} className="p-1.5 bg-gray-100 rounded-lg hover:bg-red-50 hover:text-red-500 transition" title="Clear All">
                        <RotateCcw size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // MODE 2: MANUAL INPUT
                <div className="flex-1 flex flex-col justify-center">
                   <label className="text-sm font-bold text-gray-500 mb-2">Enter Cash Amount</label>
                   <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                     <input 
                       type="number" 
                       value={manualCash}
                       onChange={(e) => setManualCash(e.target.value)}
                       className="w-full text-3xl font-bold text-gray-800 bg-white p-4 pl-8 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-200 outline-none"
                       placeholder="0.00"
                       autoFocus
                     />
                   </div>
                </div>
              )}

              {/* Change Display */}
              <div className="border-t border-blue-200 pt-4 mt-auto">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-600">Change Due</span>
                    <span className={`text-2xl font-extrabold ${change < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                      ${change >= 0 ? change.toFixed(2) : '0.00'}
                    </span>
                 </div>
                 {change < 0 && (
                   <p className="text-right text-xs text-red-400 mt-1 font-medium">Insufficient amount</p>
                 )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <button 
              onClick={handleConfirm}
              disabled={paymentMethod === 'cash' && change < 0}
              className={`w-full py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all
                ${paymentMethod === 'cash' && change < 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 active:scale-95'}
              `}
            >
              Complete Payment <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper
const PaymentOption = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${active ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200'}`}>
    {React.cloneElement(icon, { size: 20 })}
    <span className="text-xs font-bold">{label}</span>
  </button>
);

export default PaymentModal;