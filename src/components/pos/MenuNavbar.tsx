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
    <div className="w-full mb-3 flex flex-col gap-2 group select-none">
      {/* ─── HEADER LINE ─── */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Menu Categories
        </h2>

        <div className="flex items-center gap-3">
          {/* Single/Multi Select Switcher */}
          <div className="flex items-center bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => onToggleMultiSelect(false)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold rounded-lg transition-all ${!isMultiSelect ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50 bg-transparent"}`}
            >
              Single
            </button>
            <button
              onClick={() => onToggleMultiSelect(true)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold rounded-lg transition-all ${isMultiSelect ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50 bg-transparent"}`}
            >
              Multi
            </button>
          </div>

          {/* Chevron Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => smoothScroll("left")}
              disabled={!showLeftArrow}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                showLeftArrow
                  ? "bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 active:scale-95"
                  : "bg-gray-50 border border-transparent text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={20} className="pr-0.5" />
            </button>
            <button
              onClick={() => smoothScroll("right")}
              disabled={!showRightArrow}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                showRightArrow
                  ? "bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 active:scale-95"
                  : "bg-gray-50 border border-transparent text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={20} className="pl-0.5" />
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
          className={`flex items-stretch gap-3 overflow-x-auto pt-1 px-1 scrollbar-hide transition-all ${
            isDragging
              ? "cursor-grabbing"
              : "cursor-grab active:cursor-grabbing"
          }`}
        >
          {/* "All Menu" Card */}
          <button
            onClick={() => handleCategoryClick("all")}
            className={`group flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-300 flex-shrink-0 border min-w-[110px]
              ${
                isAllActive
                  ? "bg-white border-blue-200 shadow-lg shadow-blue-100/60"
                  : "bg-white border-gray-100 hover:border-blue-100 hover:shadow-md shadow-sm"
              }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                ${
                  isAllActive
                    ? "bg-blue-100 text-blue-500"
                    : "bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-400"
                }`}
            >
              <UtensilsCrossed size={22} />
            </div>
            <span
              className={`text-sm font-semibold whitespace-nowrap transition-colors duration-300
                ${isAllActive ? "text-gray-800" : "text-gray-500 group-hover:text-gray-700"}`}
            >
              All Menu
            </span>
            <span
              className={`text-xs font-medium transition-colors duration-300
                ${isAllActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"}`}
            >
              {totalItems} Items
            </span>
          </button>

          {/* Individual Category Cards */}
          {safeCategories?.map((item: Category) => {
            const isActive = activeCategoryIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleCategoryClick(item.id)}
                className={`group flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-300 flex-shrink-0 border min-w-[110px]
                  ${
                    isActive
                      ? "bg-white border-blue-200 shadow-lg shadow-blue-100/60"
                      : "bg-white border-gray-100 hover:border-blue-100 hover:shadow-md shadow-sm"
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-400"
                    }`}
                >
                  {item.image && item.image !== "asd" ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover p-1"
                      draggable="false"
                    />
                  ) : (
                    <UtensilsCrossed size={22} />
                  )}
                </div>
                <span
                  className={`text-sm font-semibold whitespace-nowrap transition-colors duration-300
                    ${isActive ? "text-gray-800" : "text-gray-500 group-hover:text-gray-700"}`}
                >
                  {item.name}
                </span>
                <span
                  className={`text-xs font-medium transition-colors duration-300
                    ${isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"}`}
                >
                  {item._count?.products || 0} Items
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuNavbar;
