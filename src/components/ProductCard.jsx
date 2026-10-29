import { memo } from "react";
import Button from "./Button";

const imageUrl = (imageId) => `https://images.unsplash.com/photo-${imageId}`;

const ProductCard = memo(function ProductCard({ product, onAddToCart, qty }) {
  return (
    <article className="overflow-hidden rounded-md shadow-lg">
      <img src={imageUrl(product.imgUrl)} alt={product.name} className="aspect-square w-full object-cover" />
      <div className="p-3">
        <div className="flex items-start gap-2"><h2 className="font-medium">{product.name}</h2><span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-sm">{product.category}</span></div>
        <p className="mb-4 text-gray-500">${product.price}</p>
        <div className="flex items-center gap-5"><Button className="w-full" onClick={() => onAddToCart(product.id)}>Add to cart</Button><span className="flex size-6 items-center justify-center rounded-full bg-gray-500 text-xs text-white" aria-label={`${qty} in cart`}>{qty}</span></div>
      </div>
    </article>
  );
});

export default ProductCard;
