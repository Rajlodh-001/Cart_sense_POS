import React from "react";
import { Phone, Globe } from "lucide-react";

interface FormPhoneProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  description?: string;
  value: string;
  onChange: (e: any) => void;
}

export const FormPhone: React.FC<FormPhoneProps> = ({ 
  label, 
  error, 
  description, 
  value,
  onChange,
  className = "", 
  ...props 
}) => {
  // 3-3-4 Formatting Logic
  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length > 3 && digits.length <= 6) {
      formatted = `${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else if (digits.length > 6) {
      formatted = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatPhone(rawValue);
    // Construct a pseudo-event for the parent
    onChange({
      ...e,
      target: {
        ...e.target,
        value: formattedValue
      }
    });
  };

  return (
    <div className="flex flex-col gap-2.5 group/field w-full animate-in slide-in-from-left-4 duration-700">
      <div className="flex items-center justify-between px-2 text-[11px] font-black uppercase tracking-widest text-gray-900 group-focus-within/field:text-purple-600 transition-colors">
        <label>
          {label} {props.required && <span className="text-purple-500 font-bold">*</span>}
        </label>
        {error && <span className="text-red-500">{error}</span>}
      </div>

      <div className="relative flex items-center">
        {/* +91 Static Protocol */}
        <div className="absolute left-6 flex items-center gap-2 pr-4 border-r border-gray-100 py-1 transition-colors group-focus-within/field:border-purple-200">
           <Globe size={14} className="text-gray-300 group-focus-within/field:text-purple-400" />
           <span className="text-[11px] font-black text-gray-500">+91</span>
        </div>

        <input
          {...props}
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={12} // 10 digits + 2 spaces
          className={`
            w-full py-4 pl-24 pr-6
            bg-white border-2 border-gray-100 rounded-2xl
            font-bold text-gray-900 placeholder:text-gray-200
            outline-none shadow-sm transition-all duration-300
            focus:border-purple-500 focus:ring-8 focus:ring-purple-500/5
            ${error ? 'border-red-200 bg-red-50/10' : ''}
            ${className}
          `}
          placeholder="000 000 0000"
        />
        
        <Phone size={18} className="absolute right-6 text-gray-200 group-focus-within/field:text-purple-600 pointer-events-none" strokeWidth={2.5} />
      </div>

      {description && (
        <p className="text-[10px] font-bold text-gray-400 px-2 leading-relaxed uppercase tracking-tighter opacity-70">
          {description}
        </p>
      )}
    </div>
  );
};

export default FormPhone;
