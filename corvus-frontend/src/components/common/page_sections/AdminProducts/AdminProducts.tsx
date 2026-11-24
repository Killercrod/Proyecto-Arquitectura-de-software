// pages/AdminProducts/AdminProducts.tsx
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useMutation } from '../../hooks/useMutation';
import { useModalContext } from '../../context/ModalContext';
import { getProducts, deleteProduct } from '../../services/ProductService';
import ProductsTable from '../../components/admin/ProductsTable/ProductsTable';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal/ConfirmDeleteModal';
import type { Product } from '../../models';

const AdminProducts = () => {
	const { data, loading, error, fetch } = useApi<Product[], void>(getProducts, {
		autoFetch: true,
		params: undefined,
	});
	const { mutate: remove } = useMutation(deleteProduct);
	const { setState: setModalOpen } = useModalContext();

	const [toDelete, setToDelete] = useState<Product | null>(null);
	const [deleteError, setDeleteError] = useState('');

	const handleAskDelete = (product: Product) => {
		setDeleteError('');
		setToDelete(product);
		setModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!toDelete) return;
		try {
			await remove(toDelete.id);
			setModalOpen(false);
			setToDelete(null);
			fetch(); // recarga la tabla
		} catch {
			setModalOpen(false);
			setDeleteError('No se pudo eliminar el producto');
		}
	};

	const handleEdit = (_product: Product) => {
		// siguiente paso: abrir el formulario de edición
	};

	if (loading) return <p>Cargando productos...</p>;
	if (error) return <p>No se pudieron cargar los productos</p>;

	return (
		<section className='admin-products'>
			<h1>Productos</h1>
			{deleteError && <p className='admin-products-error'>{deleteError}</p>}

			<ProductsTable
				products={data ?? []}
				onEdit={handleEdit}
				onDelete={handleAskDelete}
			/>

			<ConfirmDeleteModal
				productName={toDelete?.name}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
};

export default AdminProducts;