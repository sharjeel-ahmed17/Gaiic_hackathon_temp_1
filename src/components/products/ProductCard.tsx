import { Star, StarHalf } from "lucide-react";
import Image from "next/image";

export const ProductCard = () => {
  return (
    <div className="w-[295px] rounded-2xl shadow-lg p-4 bg-white">
      {/* Image Container */}
      <div className="relative w-full h-[298px] rounded-2xl overflow-hidden">
        <Image
          src="/images/dummy.png"
          fill
          alt="dummy data"
          className="rounded-2xl object-cover"
        />
        {/* New Badge */}
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          New
        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mt-3">T-SHIRT WITH TAPE DETAILS</h2>

      {/* Ratings */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex gap-1 text-yellow-400">
          <Star fill="currentColor" stroke="none" />
          <Star fill="currentColor" stroke="none" />
          <Star fill="currentColor" stroke="none" />
          <Star fill="currentColor" stroke="none" />
          <StarHalf fill="currentColor" stroke="none" />
        </div>
        <span className="text-gray-600 text-sm">(3.5/5)</span>
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-2 mt-2">
        <p className="text-lg font-bold text-black">$120</p>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <p className="line-through">$260</p>
          <span className="text-red-500 font-semibold">-20%</span>
        </div>
      </div>
    </div>
  );
};
