"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  selectSingleItem,
  incrementQuantity,
  decrementQuantity,
  editItemQuantity,
  setItemNote,
  setItemModifiers,
} from "@/app/(dashboard)/pos/posSlice";
import Image from "next/image";
import { Trash2, X, Minus, Plus, NotebookPen } from "lucide-react";

interface ItemDetailModalProps {
  itemId: string | number;
  onClose: () => void;
}

// Quick modifiers are now dynamic and come from the item object

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  itemId,
  onClose,
}) => {
  const item = useSelector(selectSingleItem(itemId));
  const dispatch = useDispatch();
  const [note, setNote] = useState(item?.note || "");
  const [activeModifiers, setActiveModifiers] = useState<string[]>(item?.modifiers || []);

  // Sync note and modifiers from Redux when modal opens for a (possibly different) item
  useEffect(() => {
    if (item?.note !== undefined) {
      setNote(item.note);
    }
    if (item?.modifiers !== undefined) {
      setActiveModifiers(item.modifiers);
    }
  }, [itemId, item?.note, item?.modifiers]);

  if (!item) return null;

  const handleDelete = () => {
    dispatch(removeFromCart(item.id));
    onClose();
  };

  const handleClose = () => {
    // Save note and modifiers to Redux before closing
    dispatch(setItemNote({ id: item.id, note }));
    dispatch(setItemModifiers({ id: item.id, modifiers: activeModifiers }));
    onClose();
  };

  const toggleModifier = (mod: string) => {
    setActiveModifiers((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod],
    );
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-white rounded-2xl overflow-hidden">
      {/* ─── HEADER ─── */}
      <div className="relative flex items-center justify-center px-5 py-4 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-800 tracking-tight">
          Item Details
        </h3>
        <button
          onClick={handleClose}
          className="absolute right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors"
        >
          <X className="w-4 h-4 text-red-500" />
        </button>
      </div>

      {/* ─── SCROLLABLE BODY ─── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 max-h-[65vh] scrollbar-hide">
        {/* ─── HERO: Image + Product Info ─── */}
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="w-28 h-28 flex-shrink-0 relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src={item.imgSrc}
              alt={item.name}
              fill
              className="object-contain p-3"
              draggable="false"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <span className="inline-flex w-fit px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 rounded-full mb-1.5 tracking-wide uppercase">
              {item.itemType || "Item"}
            </span>
            <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">
              {item.name}
            </h2>
            <p className="text-xl font-bold text-blue-600 mt-1">
              ${item.price.toFixed(2)}
              <span className="text-xs font-normal text-gray-400 ml-1">
                per unit
              </span>
            </p>
          </div>
        </div>

        {/* ─── QUANTITY + TOTAL ROW ─── */}
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(decrementQuantity(item.id))}
              disabled={item.quantity < 2}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity === 0 ? "" : item.quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 0) {
                  dispatch(editItemQuantity({ id: item.id, quantity: val }));
                } else if (e.target.value === "") {
                  dispatch(editItemQuantity({ id: item.id, quantity: 0 }));
                }
              }}
              onBlur={() => {
                if (item.quantity < 1) {
                  dispatch(editItemQuantity({ id: item.id, quantity: 1 }));
                }
              }}
              className="w-12 text-center text-lg font-bold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none tabular-nums"
            />
            <button
              onClick={() => dispatch(incrementQuantity(item.id))}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all active:scale-90 shadow-sm"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
              Total
            </p>
            <p className="text-xl font-bold text-gray-900 tabular-nums">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* ─── ORDER NOTES ─── */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 px-4 pt-3 pb-1">
            <NotebookPen size={14} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Order Note
            </span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note for this item..."
            className="w-full bg-transparent text-sm outline-none resize-none px-4 pb-3 pt-1 text-gray-700 placeholder-gray-300 h-16"
          />
        </div>

        {/* ─── QUICK MODIFIERS ─── */}
        {item.availableModifiers && item.availableModifiers.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
              Quick Add
            </p>
            <div className="flex flex-wrap gap-2">
              {item.availableModifiers.map((mod) => {
                const isActive = activeModifiers.includes(mod);
                return (
                  <button
                    key={mod}
                    onClick={() => toggleModifier(mod)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 border ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {mod}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ─── FOOTER ACTIONS ─── */}
      <div className="px-5 py-4 bg-white border-t border-gray-100 flex items-center gap-3">
        {/* Remove Button */}
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-red-50 text-red-500 font-semibold text-sm hover:bg-red-100 transition-colors border border-red-100 active:scale-95"
        >
          <Trash2 size={16} />
          <span>Remove</span>
        </button>

        {/* Update Cart Button */}
        <button
          onClick={handleClose}
          className="flex-1 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
        >
          Update Cart · ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default ItemDetailModal;
