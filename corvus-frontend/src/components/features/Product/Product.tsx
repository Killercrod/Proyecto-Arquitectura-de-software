"use client";
import React from 'react';
import './Product.scss';
import { ProductFooter, ProductInfo } from '../../product_elements';
import { MdHeight, MdOutlineArrowForward } from 'react-icons/md';
 type ProductProps = {
	// types...
	image?: string;
	price: string;
	productName: string;
	category: string;

}

const Product= ({productName, image, category, price}: ProductProps) => {
	return (
		<>
		<article className='product-catalog'>
 			<div className='product-image'>
				{image && (
					<img className='product-image__img' src={image} alt={productName} loading='lazy' />
				)}
				
			</div>

			<div className='product-characteristics'>
				<div className='product-info product-info_layout'>
					<p className='product-category'>{category}</p>
					<p className='product-name'>{productName}</p>
				</div>
				
				<div className='product-footer product-footer_layout'>
					<p className='product-price'>{price}</p>
					<div className='product-button'>
						<p className='product-text'>Ver más</p>
						<div className="product-icon"><MdOutlineArrowForward /></div>
					</div>
				</div>
			</div>
			
 		</article>
		</>
		
	);
};

export default Product;
