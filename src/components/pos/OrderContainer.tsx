"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  incrementQuantity,
  decrementQuantity,
  selectTotalPrice,
  cartHasItems,
  selectOrderInfo,
  setOrderType as setReduxOrderType,
  setTableId as setReduxTableId,
  clearCart,
  setCoupon,
  setDiscountAmount,
} from "@/app/(dashboard)/pos/posSlice";
import type { OrderType } from "@/app/(dashboard)/pos/posSlice";
import { useCreateOrder, CreateOrderPayload } from "@/hooks/useOrders";
import { useTables } from "@/hooks/useTables";
import { useVerifyCoupon } from "@/hooks/useCoupons";

import {
  FileText,
  Edit2,
  Minus,
  Plus,
  Percent,
  ChevronDown,
  UtensilsCrossed,
  MapPin,
  BadgePercent,
} from "lucide-react";
import CustomDropdown from "@/components/shared/CustomDropdown";
import Modal from "@/components/shared/Modal";
import CreateCustomerModal from "./CreateCustomerModal";
import {
  useLocationSettings,
  useOrganizationSettings,
} from "@/hooks/useSettings";
import ItemDetailModal from "./ItemDetailModal";
import PaymentModal from "@/components/activity/PaymentModal";
import toast from "react-hot-toast";

// Dropdown options
const orderTypeOptions = [
  { id: 1, label: "Dine In" },
  { id: 2, label: "Takeaway" },
  { id: 3, label: "Timed Order" },
];

const OrderContainer = () => {
  const dispatch = useDispatch();

  // Redux state
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const hasItems = useSelector(cartHasItems);
  const orderInfo = useSelector(selectOrderInfo);
  const user = useSelector((state: RootState) => state.user);

  // Queries & Mutations
  const createOrderMutation = useCreateOrder();
  const { data: tablesRaw, isLoading: tablesLoading } = useTables();
  const verifyCouponMutation = useVerifyCoupon();

  // Map Redux OrderType to dropdown ID
  const orderTypeToId: Record<OrderType, number> = {
    "dine-in": 1,
    "take-away": 2,
    "timed-order": 3,
  };
  const idToOrderType: Record<number, OrderType> = {
    1: "dine-in",
    2: "take-away",
    3: "timed-order",
  };
  const selectedOrderType = orderTypeToId[orderInfo.orderType];

  // Prepare table options from API
  const tableOptions = useMemo(
    () =>
      tablesRaw?.map((t) => ({
        id: t.id,
        label: ` ${t.name} - ${t.zone?.name || "N/A"} (${t.capacity})`,
      })) || [],
    [tablesRaw],
  );

  const selectedTableId = orderInfo.tableId;

  // Local state
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Hooks
  const { data: locationSettings } = useLocationSettings();
  const { data: orgSettings } = useOrganizationSettings();

  // Calculations
  const discount = orderInfo.discountAmount || 0;
  const taxableAmount = Math.max(0, totalPrice - discount);

  // Implement Location/Global Tax Architecture
  const taxRate = Number(locationSettings?.taxRate || 0);
  const isTaxInclusive = orgSettings?.taxType === "INCLUSIVE";

  const tax = isTaxInclusive
    ? taxableAmount - taxableAmount / (1 + taxRate / 100)
    : taxableAmount * (taxRate / 100);

  const finalTotal = isTaxInclusive ? taxableAmount : taxableAmount + tax;

  // Auto-select first table if Dine-In is selected and no table is set
  useEffect(() => {
    if (
      orderInfo.orderType === "dine-in" &&
      !orderInfo.tableId &&
      tableOptions.length > 0
    ) {
      dispatch(setReduxTableId(tableOptions[0].id));
    }
  }, [orderInfo.orderType, orderInfo.tableId, tableOptions, dispatch]);

  // Handlers
  const openModal = (id: number) => {
    setIsModalOpen(true);
    setSelectedItem(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handlePaymentProcess = () => {
    if (hasItems) {
      if (!user.isAuthenticated || !user.id) {
        toast.error("You must be logged in to place an order.");
        // alert("You must be logged in to place an order.");
        return;
      }
      setShowPaymentModal(true);
    }
  };

  const handlePaymentComplete = async (details: any) => {
    try {
      if (!user.id) throw new Error("User ID is missing.");

      // Map local orderType to DB ENUM type
      const dbTypeMap: Record<string, CreateOrderPayload["type"]> = {
        "dine-in": "DINE_IN",
        "take-away": "TAKEAWAY",
        "timed-order": "TAKEAWAY", // Assuming timed-order resolves as takeaway for now
      };

      const payload: CreateOrderPayload = {
        orderNo: Math.floor(Math.random() * 10000), // temp fallback structure
        userId: user.id,
        deviceId: user.deviceId || undefined,
        customerId: details.customerId || undefined,
        tableId: details.tableId || orderInfo.tableId || undefined,
        seatCount: details.seatCount || undefined,
        subTotal: totalPrice, // As requested
        totalAmt: finalTotal,
        type: dbTypeMap[details.orderType] || "DINE_IN",
        paymentMethod: details.paymentMethod,
        cashReceived: details.cashReceived,
        changeReturned: details.changeReturned,
        notes: details.orderNote,
        discount: details.discount || discount,
        tax: Number(tax.toFixed(2)),
        coupon: details.coupon || orderInfo.coupon || undefined,
        items: cartItems.map((item) => {
          const combinedNote = [
            item.note
              ? item.modifiers && item.modifiers.length > 0
                ? `Notes: ${item.note}`
                : item.note
              : "",
            item.modifiers?.length
              ? `Modifiers: ${item.modifiers.join(", ")}`
              : "",
          ]
            .filter(Boolean)
            .join(" | ");

          return {
            productId: typeof item.id === "string" ? item.id : String(item.id),
            name: item.name,
            quantity: item.quantity,
            price: Number(item.price),
            total: Number(item.price) * item.quantity,
            note: combinedNote,
          };
        }),
      };

      await toast.promise(createOrderMutation.mutateAsync(payload), {
        loading: "Processing payment...",
        success: "Order placed successfully!",
        error: (err: any) =>
          err?.response?.data?.message ||
          err.message ||
          "Failed to place order. Please try again.",
      });

      dispatch(clearCart());
      setShowPaymentModal(false);
    } catch (error: any) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="w-full bg-white h-full max-h-full shadow-2xl flex flex-col border-l border-gray-100 font-sans overflow-hidden">
      {/* ─── HEADER ─── */}

      <div className="p-5 pb-3">
        <div className="flex justify-between items-start mb-5">
          {/* Receipt Icon */}
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors">
            <FileText size={18} />
          </button>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-900">
              Raj&apos;s Order
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">Order Number: #0001</p>
          </div>

          {/* Edit Icon */}
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors">
            <Edit2 size={18} />
          </button>
        </div>

        {/* Selectors (Order Type / Table) */}
        <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row space-y-3 sm:space-y-0 md:space-y-3 xl:space-y-0 sm:space-x-3 md:space-x-0 xl:space-x-3">
          <CustomDropdown
            options={orderTypeOptions}
            value={selectedOrderType}
            onChange={(id) => dispatch(setReduxOrderType(idToOrderType[id]))}
            icon={UtensilsCrossed}
          />
          {orderInfo.orderType === "dine-in" && (
            <CustomDropdown
              options={tableOptions}
              value={selectedTableId}
              onChange={(id) => dispatch(setReduxTableId(id))}
              icon={MapPin}
            />
          )}
        </div>
      </div>

      {/* ─── CART ITEMS LIST ─── */}
      <div className="flex-1 overflow-y-auto px-5 py-2 custom-scrollbar">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <FileText size={28} className="opacity-20" />
            </div>
            <p className="text-sm font-medium">No items yet</p>
            <p className="text-xs text-gray-300">
              Add items from the menu to get started
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div key={item.id} className="group">
                <div className="flex items-start">
                  {/* Product Image */}
                  <div className="w-24 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0 mr-3 border border-gray-100">
                    <img
                      src={item.imgSrc}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate pr-2">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-sm mt-0.5">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    {(item.note ||
                      (item.modifiers && item.modifiers.length > 0)) && (
                      <p className="text-blue-400 text-[11px] mt-0.5 truncate max-w-[140px] italic">
                        {[
                          item.note
                            ? item.modifiers && item.modifiers.length > 0
                              ? `Notes : ${item.note}`
                              : item.note
                            : "",
                          item.modifiers?.length
                            ? `Modifiers: ${item.modifiers.join(", ")}`
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" | ")}
                      </p>
                    )}

                    {/* Edit Button */}
                    <button
                      onClick={() => openModal(item.id as number)}
                      className="mt-1.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 size={10} />
                    </button>
                  </div>

                  {/* Quantity Controls (Capsule Style) */}
                  <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 space-x-2.5 mt-1">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-gray-800 w-4 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-90"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Dashed Separator */}
                <div className="border-b border-dashed border-gray-200 mt-5 group-last:hidden" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── FOOTER (Totals & Buttons) ─── */}
      <div className="px-5 pb-5 pt-2 bg-white flex-none">
        {/* Dashed Divider */}
        <div className="border-t-2 border-dashed border-gray-200 mb-4" />

        {/* Financial Breakdown */}
        <div className="space-y-2.5 mb-5 text-sm">
          <div className="flex justify-between items-center text-gray-500">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-500">
            <span>Tax (10%)</span>
            <span className="font-semibold text-gray-900">
              ${tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-green-500">
            <span>Discount</span>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <span className="font-bold text-lg text-gray-900">TOTAL</span>
            <span className="font-bold text-lg text-gray-900">
              ${finalTotal > 0 ? finalTotal.toFixed(2) : "0.00"}
            </span>
          </div>
        </div>

        {/* Action Buttons: Promo & QRIS */}
        <div className="flex space-x-3 mb-3">
          {!showPromoInput ? (
            <button
              onClick={() => setShowPromoInput(true)}
              className="flex-1 flex items-center justify-between px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              <span className="text-sm">Promo</span>
              <div className="w-7 h-7 rounded-full bg-green-200 flex items-center justify-center">
                <BadgePercent size={16} className="text-green-700" />
              </div>
            </button>
          ) : (
            <div className="flex-1 flex items-center bg-green-50 border border-green-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-green-400 transition-shadow">
              <input
                type="text"
                placeholder="Enter Promo"
                value={orderInfo.coupon || ""}
                onChange={(e) =>
                  dispatch(setCoupon(e.target.value.toUpperCase()))
                }
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowPromoInput(false);
                }}
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-green-800 font-bold placeholder-green-400 focus:outline-none uppercase w-full min-w-0"
                autoFocus
              />
              <button
                disabled={verifyCouponMutation.isPending}
                onClick={async () => {
                  if (!orderInfo.coupon) setShowPromoInput(false);
                  else {
                    toast.loading("Verifying...", { id: "verify-coupon" });
                    try {
                      const res = await verifyCouponMutation.mutateAsync({
                        code: orderInfo.coupon,
                        subTotal: totalPrice,
                      });
                      if (res.valid) {
                        toast.success(
                          `Discount ${res.discountAmount} applied!`,
                          { id: "verify-coupon" },
                        );
                        dispatch(setDiscountAmount(res.discountAmount));
                      }
                    } catch (err: any) {
                      toast.error(
                        err.response?.data?.message || "Invalid coupon",
                        { id: "verify-coupon" },
                      );
                      dispatch(setCoupon(null));
                      dispatch(setDiscountAmount(0));
                    }
                  }
                }}
                className="px-3 bg-green-600 text-white font-bold text-xs h-full min-h-[44px] hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          )}

          <button className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white border-2 border-blue-100 rounded-xl text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors">
            QRIS
          </button>
        </div>

        {/* Main CTA: Place Order */}
        <button
          onClick={handlePaymentProcess}
          disabled={!hasItems}
          className={`w-full py-3.5 rounded-xl font-bold text-base shadow-lg transition-all flex justify-center items-center ${
            hasItems
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Place Order
        </button>
      </div>

      {/* ─── MODALS ─── */}
      {/* Item Detail Modal */}
      <Modal
        show={isModalOpen}
        onClose={closeModal}
        title=""
        index={selectedItem ?? 0}
        showCloseButton={false}
        closeOnOverlayClick={false}
        className="md:max-w-md w-full"
      >
        {selectedItem !== null && (
          <ItemDetailModal
            itemId={selectedItem as number}
            onClose={closeModal}
          />
        )}
      </Modal>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          totalAmount={finalTotal > 0 ? finalTotal : 0}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePaymentComplete}
        />
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default OrderContainer;
