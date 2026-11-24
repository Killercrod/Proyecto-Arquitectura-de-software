import React, { useState } from 'react';
import axios from 'axios';
import './ProductModal.scss';
import { ProductForm } from '../../common/ProductForm';
import { useModalContext } from '../../../context/ModalContext';
import { createProduct, updateProduct } from '../../../services/ProductService';
import type { Product } from '../../../models';

export type ProductModalProps = {
	// null or undefined = create mode, a product = edit mode
	product?: Product | null;
	// called after a successful save (the parent refreshes the list)
	onSaved: () => void;
};

const getProductErrorMessage = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		return error.response?.data?.message ?? 'No se pudo guardar el producto';
	}
	return 'Ocurrió un error inesperado';
};

const ProductModal = ({ product = null, onSaved }: ProductModalProps) => {
	const { setState } = useModalContext();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleSubmit = async (data: FormData) => {
		setLoading(true);
		setErrorMessage(null);
		try {
			const { call } = product
				? updateProduct({ id: product.id, data })
				: createProduct(data);
			await call;
			setState(false);
			onSaved();
		} catch (error) {
			setErrorMessage(getProductErrorMessage(error));
			throw error; // ProductForm keeps the typed values when this rejects
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='product-modal'>
			<ProductForm
				mode={product ? 'edit' : 'create'}
				product={product ?? undefined}
				onSubmit={handleSubmit}
				onClose={() => setState(false)}
				loading={loading}
				errorMessage={errorMessage}
			/>
		</div>
	);
};

export default ProductModal;