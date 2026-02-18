import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from  "@/app/(dashboard)/pos/posSlice";; // Import from YOUR slice

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    imgSrc: string;
    itemType: string;
  }
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: 1 // Required by your CartItem interface
    }));
  };

  return (
    <div 
      onClick={handleAddToCart}
      className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center group active:scale-95"
    >
      <div className="w-32 h-32 mb-4 relative">
        <img 
          src={product.imgSrc} 
          alt={product.name} 
          className="w-full h-full object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform" 
        />
      </div>
      <h3 className="font-bold text-gray-800 text-center mb-1 text-lg leading-tight">
        {product.name}
      </h3>
      <div className="flex justify-between items-center w-full mt-4 px-2">
        <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-1 rounded capitalize">
          {product.itemType}
        </span>
        <span className="font-bold text-gray-900 ml-auto">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;