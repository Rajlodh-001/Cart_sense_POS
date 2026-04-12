import React, { useState, useRef, useEffect } from "react";
import { UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@/hooks/useCategories";

interface MenuNavbarProps {
  categories: Category[];
  activeCategoryIds: (number | string)[];
  onToggleCategory: (id: number | string) => void;
  isMultiSelect: boolean;
  onToggleMultiSelect: (multi: boolean) => void;
}

const MenuNavbar: React.FC<MenuNavbarProps> = ({
  categories,
  activeCategoryIds,
  onToggleCategory,
  isMultiSelect,
  onToggleMultiSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragged, setIsDragged] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const safeCategories = Array.isArray(categories)
    ? categories
    : (categories as any)?.categories || [];

  const totalItems = safeCategories.reduce(
    (sum: number, c: Category) => sum + (c._count?.products || 0),
    0,
  );
  const isAllActive = activeCategoryIds.length === 0;

  // --- Scroll & Drag Logic ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setIsDragged(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier

    // Threshold to differentiate between a click and a drag
    if (Math.abs(walk) > 5) {
      setIsDragged(true);
    }

    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const checkArrows = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    // Use a 2px threshold to avoid rounding errors
    setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
  };

  // Re-check arrows on resize or categories update
  useEffect(() => {
    checkArrows();
    window.addEventListener("resize", checkArrows);
    return () => window.removeEventListener("resize", checkArrows);
  }, [safeCategories]);

  const smoothScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 350; // Pixels to scroll on button click
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (id: string | number) => {
    if (!isDragged) {
      onToggleCategory(id);
    }
  };

  return (
    <div className="w-full mb-6 flex flex-col gap-4 group select-none font-sans">
      {/* ─── HEADER LINE ─── */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-black text-gray-900 tracking-tight">
          Categories
        </h2>

        <div className="flex items-center gap-4">
          {/* Single/Multi Select Switcher */}
          <div className="flex items-center bg-gray-50 border border-gray-100 p-1 rounded-full shadow-inner">
            <button
              onClick={() => onToggleMultiSelect(false)}
              className={`px-5 py-2 text-[10px] uppercase tracking-widest font-black rounded-full transition-all ${!isMultiSelect ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600 bg-transparent"}`}
            >
              Single
            </button>
            <button
              onClick={() => onToggleMultiSelect(true)}
              className={`px-5 py-2 text-[10px] uppercase tracking-widest font-black rounded-full transition-all ${isMultiSelect ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600 bg-transparent"}`}
            >
              Multi
            </button>
          </div>

          {/* Chevron Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => smoothScroll("left")}
              disabled={!showLeftArrow}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                showLeftArrow
                  ? "bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-primary hover:border-primary active:scale-95"
                  : "bg-gray-50 border border-transparent text-gray-200 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} strokeWidth={3} />
            </button>
            <button
              onClick={() => smoothScroll("right")}
              disabled={!showRightArrow}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                showRightArrow
                  ? "bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-primary hover:border-primary active:scale-95"
                  : "bg-gray-50 border border-transparent text-gray-200 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── SCROLL CONTAINER ─── */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={checkArrows}
          className={`flex items-stretch gap-3 overflow-x-auto pt-2 pb-4 px-2 scrollbar-hide transition-all ${
            isDragging
              ? "cursor-grabbing"
              : "cursor-grab active:cursor-grabbing"
          }`}
        >
          {/* "All Menu" Card */}
          <button
            onClick={() => handleCategoryClick("all")}
            className={`group flex flex-col items-start justify-between p-4 rounded-[1.25rem] transition-all duration-200 flex-shrink-0 min-w-[110px] h-[120px]
              ${
                isAllActive
                  ? "bg-blue-50/30 border border-blue-500 shadow-sm"
                  : "bg-white border border-transparent shadow-sm hover:shadow-md"
              }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200
                ${
                  isAllActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 text-gray-500 group-hover:bg-gray-100"
                }`}
            >
              <UtensilsCrossed size={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col items-start">
              <span
                className={`text-[15px] font-medium whitespace-nowrap transition-colors duration-200
                  ${isAllActive ? "text-blue-600" : "text-gray-800 group-hover:text-blue-600"}`}
              >
                All Menu
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {totalItems} Items
              </span>
            </div>
          </button>

          {/* Individual Category Cards */}
          {safeCategories?.map((item: Category) => {
            const isActive = activeCategoryIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleCategoryClick(item.id)}
                className={`group flex flex-col items-start justify-between p-4 rounded-[1.25rem] transition-all duration-200 flex-shrink-0 min-w-[110px] h-[120px]
                  ${
                    isActive
                      ? "bg-blue-50/30 border border-blue-500 shadow-sm"
                      : "bg-white border border-transparent shadow-sm hover:shadow-md"
                  }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-500 group-hover:bg-gray-100"
                    }`}
                >
                  {item.image && item.image !== "asd" ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover p-2"
                      draggable="false"
                    />
                  ) : (
                    <UtensilsCrossed size={20} strokeWidth={2} />
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span
                    className={`text-[15px] font-medium whitespace-nowrap transition-colors duration-200
                      ${isActive ? "text-blue-600" : "text-gray-800 group-hover:text-blue-600"}`}
                  >
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {item._count?.products || 0} Items
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuNavbar;
