"use client";
import React from "react";
import { AlertTriangle, X, Check } from "lucide-react";
import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  isLoading = false,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconBg: "bg-red-50",
          iconColor: "text-red-500",
          buttonBg: "bg-red-500 hover:bg-red-600 shadow-red-100",
        };
      case "warning":
        return {
          iconBg: "bg-amber-50",
          iconColor: "text-amber-500",
          buttonBg: "bg-amber-500 hover:bg-amber-600 shadow-amber-100",
        };
      default:
        return {
          iconBg: "bg-blue-50",
          iconColor: "text-blue-500",
          buttonBg: "bg-blue-500 hover:bg-blue-600 shadow-blue-100",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Modal show={isOpen} onClose={onClose} title={title} index={200} showCloseButton={false}>
      <div className="p-10 text-center">
        {/* Icon */}
        <div className={`w-20 h-20 ${styles.iconBg} ${styles.iconColor} rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm`}>
          <AlertTriangle size={40} />
        </div>

        {/* Text */}
        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-gray-500 font-medium text-base max-w-xs mx-auto mb-10 leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-4 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 ${styles.buttonBg}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check size={18} strokeWidth={3} />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
