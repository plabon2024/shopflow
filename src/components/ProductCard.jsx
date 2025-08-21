import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
} from "react-icons/fa";

export default function ProductCard({
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
    <div className=" rounded-xl overflow-hidden  hover:shadow-lg transition shadow-md w-80">
      {/* Image + Category */}
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <span className="absolute top-2 right-2 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-1">{name}</h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <div className="flex">{renderStars()}</div>
          <span>({rating})</span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4">{description}</p>

        {/* Price + Stock */}
        <div className="flex justify-between items-center mb-3">
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
  );
}
