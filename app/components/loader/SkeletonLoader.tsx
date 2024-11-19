const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg p-4 flex flex-col items-center animate-pulse"
        >
          {/* Skeleton for Image */}
          <div className="w-full h-[300px] bg-gray-700 rounded-lg"></div>

          {/* Skeleton for Title */}
          <div className="w-4/5 h-6 bg-gray-700 rounded mt-4"></div>

          {/* Skeleton for Release Date */}
          <div className="w-3/5 h-4 bg-gray-700 rounded mt-2"></div>

          {/* Skeleton for Average Rating */}
          <div className="w-2/5 h-4 bg-gray-700 rounded mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
