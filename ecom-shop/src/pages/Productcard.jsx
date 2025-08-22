import React, { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, PauseOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card, Badge, Button, Rate, Tag } from "antd";

const { Meta } = Card;

const ProductCard = ({ product, isWishlisted, onWishlistToggle }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Handle auto-scroll
  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % product.image.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, product.image.length]);

  const handleCardClick = () => {
    setIsAutoScrolling(!isAutoScrolling);
    setShowControls(true);
  };

  const handleManualChange = (direction) => {
    setImageIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % product.image.length;
      } else {
        return (prev - 1 + product.image.length) % product.image.length;
      }
    });
    if (isAutoScrolling) {
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 1000);
    }
  };

  return (
    <div className="relative group">
      {/* Unique Floating Card Design */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-slate-700/50">
        
        {/* Compact Image Container */}
        <div 
          className="relative overflow-hidden aspect-[4/3] cursor-pointer"
          onClick={handleCardClick}
          onMouseEnter={() => {
            setIsHovered(true);
            setShowControls(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            if (!isAutoScrolling) setShowControls(false);
          }}
        >
          {/* Main Image with Unique Overlay */}
          <img
            src={product.image[imageIndex]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-75' : 'scale-100'
            }`}
          />
          
          {/* Animated Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`} />
          
          {/* Floating Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-20">
              <Tag 
                color={
                  product.badge === "Sale" ? "red" : 
                  product.badge === "New" ? "blue" : 
                  product.badge === "Bestseller" ? "gold" : "purple"
                }
                className="border-0 font-bold px-2 py-1 text-xs rounded-full shadow-lg backdrop-blur-sm bg-opacity-90"
              >
                {product.badge}
              </Tag>
            </div>
          )}
          
          {/* Floating Action Buttons */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 z-20 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <Button 
              shape="circle" 
              size="small"
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-0 shadow-lg"
              icon={<ShoppingCartOutlined className="text-white" />}
              onClick={(e) => {
                e.stopPropagation();
                // Add to cart logic here
              }}
            />
            <Button 
              shape="circle" 
              size="small"
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-0 shadow-lg"
              icon={
                isWishlisted ? 
                <HeartFilled className="text-red-400" /> : 
                <HeartOutlined className="text-white" />
              }
              onClick={(e) => {
                e.stopPropagation();
                onWishlistToggle(product);
              }}
            />
          </div>

          {/* Minimal Navigation Controls */}
          {(showControls || isAutoScrolling) && product.image.length > 1 && (
            <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1 z-20 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-70'
            }`}>
              <Button 
                shape="circle" 
                size="small"
                className="bg-transparent text-white border-0 hover:bg-white/20 w-6 h-6 flex items-center justify-center"
                icon={<CaretLeftOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualChange('prev');
                }}
              />
              
              <Button 
                shape="circle" 
                size="small"
                className="bg-transparent text-white border-0 hover:bg-white/20 w-6 h-6 flex items-center justify-center"
                icon={isAutoScrolling ? <PauseOutlined /> : <CaretRightOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAutoScrolling(!isAutoScrolling);
                }}
              />
              
              <Button 
                shape="circle" 
                size="small"
                className="bg-transparent text-white border-0 hover:bg-white/20 w-6 h-6 flex items-center justify-center"
                icon={<CaretRightOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualChange('next');
                }}
              />
            </div>
          )}

          {/* Sleek Image Indicators */}
          {product.image.length > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-1 z-10">
              {product.image.map((_, index) => (
                <div 
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(index);
                  }}
                  className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${
                    index === imageIndex 
                      ? 'bg-yellow-400 w-4 shadow-lg' 
                      : 'bg-white/50 w-1 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Compact Product Info */}
        <div className="p-4 space-y-3">
          {/* Title and Original Price */}
          <div className="flex justify-between items-start">
            <h3 className="text-white font-semibold text-sm leading-tight flex-1 mr-2 line-clamp-2">
              {product.name}
            </h3>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs whitespace-nowrap">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {/* Price and Rating Row */}
          <div className="flex justify-between items-center">
            <span className="text-yellow-400 text-lg font-bold">
              ${product.price}
            </span>
            
            <div className="flex items-center gap-1">
              <Rate 
                disabled 
                allowHalf 
                defaultValue={product.rating} 
                className="text-xs"
                character={<StarFilled className="text-yellow-400" />}
              />
              <span className="text-gray-400 text-xs">
                ({product.reviews})
              </span>
            </div>
          </div>
          
          {/* Colors */}
          {product.colors && (
            <div className="flex gap-1.5">
              {product.colors.map((color, index) => (
                <div 
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-500 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
          
          {/* Compact Add to Cart Button */}
          <Button 
            type="primary" 
            block 
            size="small"
            className="bg-gradient-to-r from-yellow-500 to-amber-500 border-0 font-semibold h-8 hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Unique Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-blue-500/20 to-purple-600/20 rounded-3xl blur-xl transition-opacity duration-500 -z-10 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

// Custom Icons (keeping your existing ones)
const StarFilled = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="1em" 
    height="1em" 
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const CaretLeftOutlined = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="1em" 
    height="1em" 
    fill="currentColor"
  >
    <path d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z" />
  </svg>
);

export default ProductCard;