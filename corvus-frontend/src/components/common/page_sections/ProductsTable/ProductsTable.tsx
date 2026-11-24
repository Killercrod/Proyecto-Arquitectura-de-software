// ProductsTable/ProductsTable.tsx
import './ProductsTable.scss';
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import type { Product } from '../../../models';

type ProductsTableProps = {
	products: Product[];
	onEdit: (product: Product) => void;
	onDelete: (product: Product) => void;
};

const ProductsTable = ({ products, onEdit, onDelete }: ProductsTableProps) => {
	return (
		<div className='products-table-container'>
			<table className='products-table'>
				<thead>
					<tr>
						<th>Imagen</th>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Categoría</th>
						<th>Precio</th>
						<th>Disponibles</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{products.length === 0 && (
						<tr>
							<td className='products-table-empty' colSpan={7}>
								No hay productos registrados
							</td>
						</tr>
					)}

					{products.map((product) => (
						<tr key={product.id}>
							<td>
								{product.images?.[0] && (
									<img className='product-thumb' src={product.images[0]} alt={product.name} />
								)}
							</td>
							<td>{product.name}</td>
							<td>{product.description}</td>
							<td>{product.category_id}</td>
							<td>${Number(product.price).toFixed(2)}</td>
							<td>{product.stock}</td>
							<td>
								<div className='products-table-actions'>
									<button className='btn-edit-product' onClick={() => onEdit(product)}>
										<IoCreateOutline /> Editar
									</button>
									<button
										className='btn-delete-product'
										aria-label={`Eliminar ${product.name}`}
										onClick={() => onDelete(product)}
									>
										<IoTrashOutline />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductsTable;