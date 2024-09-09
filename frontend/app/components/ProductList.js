
const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="bg-yellow-500 text-white py-1 px-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
