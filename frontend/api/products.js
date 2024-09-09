let products = [];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(products);
      break;
    case 'POST':
      const newProduct = { id: Date.now(), ...req.body };
      products.push(newProduct);
      res.status(201).json(newProduct);
      break;
    case 'PUT':
      const { id } = req.query;
      products = products.map((product) =>
        product.id === parseInt(id) ? { ...product, ...req.body } : product
      );
      res.status(200).json({ message: 'Product updated' });
      break;
    case 'DELETE':
      const deleteId = req.query.id;
      products = products.filter((product) => product.id !== parseInt(deleteId));
      res.status(200).json({ message: 'Product deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
