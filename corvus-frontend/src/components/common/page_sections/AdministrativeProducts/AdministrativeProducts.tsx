// import React;
import { useState } from 'react';
import './AdministrativeProducts.scss';
import { IoAddOutline } from "react-icons/io5";
import { ProductRow } from './ProductRow';
import { ButtonApp } from '../../ButtonApp';
import { AdminSectionHeading } from '../../AdminSectionHeading';
import { Modal } from '../../Modal';
import { ProductModal } from '../../../features/ProductModal';
import { useApi } from '../../../../hooks/useAPI';
import { getProducts } from '../../../../services/ProductService';
import getProductImage from '../../../../utils/getProductImage';
import { useModalContext } from '../../../../context/ModalContext';
import type { Product } from '../../../../models';

type AdministrativeProductsProps = Record<string, never>;

const AdministrativeProducts = ({}: AdministrativeProductsProps) => {
	const { setState } = useModalContext();
	// null = the modal is in create mode
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const { data: response, loading, error, fetch: refetchProducts } = useApi(
		getProducts,
		{ autoFetch: true }
	);

	const products = response?.data ?? [];
    console.log("imagen:   ", products[0] && getProductImage(products[0]));
	const isLoading = loading || (!response && !error);

	const openCreateModal = () => {
		setSelectedProduct(null);
		setState(true);
	};

	const openEditModal = (product: Product) => {
		setSelectedProduct(product);
		setState(true);
	};

	return (
		<>
			<AdminSectionHeading
				panelType='Productos'
				tittleAdminSection='Los productos del sistema'
			/>

			<section className='administrative-products'>
				<div className='products-header'>
					<div className='introduction-section'>
						<h3 className='introduction-section__tittle'>Lista de productos</h3>
						<p className='introduction-section__text'>
							Consulta, edita o elimina las piezas del catálogo
						</p>
					</div>

					<ButtonApp
						icon={<IoAddOutline />}
						buttonText='Nuevo producto'
						functionClick={openCreateModal}
					/>
				</div>

				{isLoading && (
					<p className='administrative-products__status'>Cargando productos...</p>
				)}

				{error && (
					<p className='administrative-products__status' role='alert'>
						No se pudieron cargar los productos
					</p>
				)}

				{!isLoading && !error && products.length === 0 && (
					<p className='administrative-products__status'>Aún no hay productos registrados</p>
				)}

				{products.length > 0 && (
					<ul className='administrative-products__products-list'>
						{products.map((product) => (
							<ProductRow
								key={product.id}
								image={getProductImage(product)}
								name={product.name}
                                category={product.categoryName ?? 'Sin categoría'}
								description={product.description}
								price={Number(product.price)}
								stock={product.stock}
								onEdit={() => openEditModal(product)}
							/>
						))}
					</ul>
				)}
			</section>

			<Modal>
				<ProductModal
					key={selectedProduct?.id ?? 'new'}
					product={selectedProduct}
					onSaved={() => void refetchProducts()}
				/>
			</Modal>
		</>
	);
};

export default AdministrativeProducts;


// type AdministrativeProductsProps = {
// 	// types...
// }
// const AdministrativeProducts = ({}: AdministrativeProductsProps) => {
//     const {setState} = useModalContext();
//     const { data: response, loading, error } = useApi(
//         getProducts,
//         { autoFetch: true }
//     );

//     const products = response?.data ?? [];
//     const isLoading = loading || (!response && !error);

//     return (
//         <>
//             <AdminSectionHeading
//                 panelType='Productos'
//                 tittleAdminSection='Los productos del sistema'
//             />

//             <section className='administrative-products'>
//                 <div className='products-header'>
//                     <div className='introduction-section'>
//                         <h3 className='introduction-section__tittle'>
//                             Lista de productos
//                         </h3>

//                         <p className='introduction-section__text'>
//                             Consulta, edita o elimina las piezas del catálogo
//                         </p>
//                     </div>

//                     <ButtonApp
//                         icon={<IoAddOutline />}
//                         buttonText='Nuevo producto'
// 						// functionClick={() => setIsProductModalOpen(true)}
//                     />
//                 </div>

//                 {isLoading && (
//                     <p className='administrative-products__status'>
//                         Cargando productos...
//                     </p>
//                 )}

//                 {error && (
//                     <p className='administrative-products__status' role='alert'>
//                         No se pudieron cargar los productos
//                     </p>
//                 )}

//                 {!isLoading && !error && products.length === 0 && (
//                     <p className='administrative-products__status'>
//                         Aún no hay productos registrados
//                     </p>
//                 )}

//                 {products.length > 0 && (
//                     <ul className='administrative-products__products-list'>
//                         {products.map((product) => (
//                             <ProductRow
//                                 key={product.id}
//                                 image={getProductImage(product)}
//                                 name={product.name}
//                                 category={product.category?.nameCategory ?? 'Sin categoría'}
//                                 description={product.description}
//                                 price={Number(product.price)}
//                                 stock={product.stock}
//                             />
//                         ))}
//                     </ul>
//                 )}
//             </section>

//         <Modal>
//             <ProductModal/>
//         </Modal>

//         </>
//     );
// };


// export default AdministrativeProducts;
