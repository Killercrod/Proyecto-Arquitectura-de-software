// pages/admin/AdminProducts.tsx
import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useMutation } from "../../hooks/useMutation";
import { getProducts, deleteProduct } from "../../services/ProductService";
import { ConfirmModal } from "../../components/ConfirmModal";
import type { Product } from "../../models";

export default function AdminProducts() {
  const { data, loading, error, fetch } = useApi<Product[], void>(getProducts, {
    autoFetch: true,
    params: undefined,
  });
  const { mutate: remove } = useMutation(deleteProduct);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  const confirmDelete = async () => {
    if (!toDelete) return;
    await remove(toDelete.id);
    setToDelete(null);
    fetch(); // recarga la lista
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>No se pudieron cargar los productos</p>;

  return (
    <section>
      <h1>Productos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th><th>Categoría</th><th>Precio</th>
            <th>Disponibles</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category_id}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button>Editar</button>
                <button aria-label="Eliminar" onClick={() => setToDelete(p)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        open={!!toDelete}
        message={`¿Eliminar "${toDelete?.name}"?`}
        onConfirm={confirmDelete}
        onClose={() => setToDelete(null)}
      />
    </section>
  );
}