import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
} from "react-icons/fa";

export default function ProductCard({
  id,
  image,
  name,
  category,
  rating,
  description,
  price,
  stock,
}) {
  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    while (stars.length < 5) {
      stars.push(
        <FaRegStar key={`empty-${stars.length}`} className="text-yellow-500" />
      );
    }
    return stars;
  };

  return (
    <Link href={`/products/${id}`} key={id}>
      <div className="my-2 mx-auto md:mx-2  rounded-xl  transition hover:shadow-[4px_4px_22px_5px] shadow-[0px_0px_9px_3px] shadow-primary/20 w-full max-w-xs flex flex-col">
        {/* Image + Category */}
        <div className="relative">
          <Image
            width={500}
            height={500}
            src={image}
            alt={name}
            className="w-full h-56 object-contain"
          />
          <span className="absolute top-2 right-2 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full ">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-semibold mb-1 truncate">{name}</h2>

          <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
            <div className="flex">{renderStars()}</div>
            <span>({rating})</span>
          </div>

          <p className=" text-sm mb-4 flex-1 line-clamp-2">{description}</p>

          {/* Price + Stock always at bottom */}
          <div className="flex justify-between items-center mt-auto mb-3">
            <p className="text-xl font-bold">${price.toFixed(2)}</p>
            {stock ? (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                In Stock
              </span>
            ) : (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
