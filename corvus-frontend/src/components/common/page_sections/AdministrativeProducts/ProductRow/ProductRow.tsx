"use client";
import React from 'react';
import './ProductRow.scss';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

type ProductRowProps = {
	
	image: string;
	name: string;
	category: string;
	description: string;
	price: number;
	stock: number;
	onEdit?: () => void;
	onDelete?: () => void;
	// clase extra para heredar/sobrescribir estilos desde el padre
	className?: string;
}

const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

const ProductRow = ({image,	name, category,	description, price,	stock, onEdit, onDelete, className = ''}: ProductRowProps) => {
	return (
		<li className={`product-row ${className}`.trim()}>
			<div className='product-row__info'>
				<img className='product-row__image' src={image} alt={name} />

				<div className='product-row__text'>
					<h3 className='product-row__name'>{name}</h3>
					<p className='product-row__category'>{category}</p>
					<p className='product-row__description'>{description}</p>
				</div>
			</div>

			<p className='product-row__price'>{priceFormatter.format(price)}</p>

			<p className='product-row__stock'>
				{stock} {stock === 1 ? 'unidad' : 'unidades'}
			</p>

			<div className='product-row__actions'>
				<button type='button' className='product-row__btn product-row__btn--edit' onClick={onEdit} aria-label={`Editar ${name}`}>
					<FaEdit />
					Editar
				</button>

				<button type='button' className='product-row__btn product-row__btn--delete'
					onClick={onDelete}
					aria-label={`Eliminar ${name}`}>

					<FaTrashAlt/>				
				</button>
			</div>
		</li>
	);
};

export default ProductRow;
