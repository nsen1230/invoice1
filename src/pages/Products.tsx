import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Package, Plus, Pencil, Trash2 } from 'lucide-react';
import { Product, TAX_TYPES } from '../types';
import ProductForm from '../components/ProductForm';

const Products: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: Product) => {
    addProduct(product);
    setShowForm(false);
  };

  const handleUpdateProduct = (product: Product) => {
    updateProduct(product);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const getLastProductCode = (): string | undefined => {
    if (products.length === 0) return undefined;
    return [...products]
      .sort((a, b) => b.code.localeCompare(a.code))[0]
      .code;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Package className="w-6 h-6 mr-2 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Rate
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {product.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {TAX_TYPES[product.taxType]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {product.taxRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No products added yet.</p>
        )}
      </div>

      {(showForm || editingProduct) && (
        <ProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          initialData={editingProduct || undefined}
          lastProductCode={getLastProductCode()}
        />
      )}
    </div>
  );
};

export default Products;