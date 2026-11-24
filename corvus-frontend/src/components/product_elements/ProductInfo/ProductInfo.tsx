"use client";
import React from 'react';
import './ProductInfo.scss';

 type ProductInfoProps = {
	// types...
	category: string;
	productName: string;
}

const ProductInfo = ({category, productName}: ProductInfoProps) => {
	return (
		<div className='product-info product-info_layout'>
 			<p className='product-category'>{category}</p>
			<p className='product-name'>{productName}</p>
 		</div>
	);
};

export default ProductInfo;
