'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/products');
    setProducts(response.data);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (currentProduct.id) {
      // Update product
      await axios.put(`/api/products/${currentProduct.id}`, values);
    } else {
      // Add new product
      await axios.post('/api/products', values);
    }
    fetchProducts();
    resetForm();
    setCurrentProduct({ id: null, name: '', description: '', price: '' });
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`);
    fetchProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ProductForm
        onSubmit={handleSubmit}
        initialValues={currentProduct}
      />

      <ProductList
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
