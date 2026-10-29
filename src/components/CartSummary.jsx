import Button from "./Button";

const imageUrl = (imageId) => `https://images.unsplash.com/photo-${imageId}`;

export default function CartSummary({ cart, totals, onRemove }) {
  return (
    <aside className="w-80 shrink-0">
      <div className="mb-4 flex justify-between">
        <h2 className="font-bold">Shopping cart</h2>
        <p className="font-bold">{totals.itemCount} items</p>
      </div>
      {cart.length === 0 ? <p className="text-gray-500">Your cart is empty.</p> : <ul>{cart.map((item) => <li className="mb-2 flex gap-4 border-b border-gray-400/55 pb-2" key={item.id}><img src={imageUrl(item.imgUrl)} alt="" className="size-20 rounded-md object-cover" /><div className="flex grow flex-col"><div className="flex justify-between gap-2 font-medium"><h3>{item.name}</h3><span>${item.price * item.quantity}</span></div><p className="text-gray-500">${item.price} × {item.quantity}</p><Button className="mt-auto ml-auto text-sm" onClick={() => onRemove(item.id)}>Remove</Button></div></li>)}</ul>}
      <div className="mt-4 flex justify-between font-bold"><span>Total</span><span>${totals.price}</span></div>
    </aside>
  );
}
