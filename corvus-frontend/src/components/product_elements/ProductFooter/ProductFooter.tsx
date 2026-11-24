import { MdOutlineArrowForward } from "react-icons/md";
import './ProductFooter.scss';

 type ProductFooterProps = {
	// types...
	price: string;
}

const ProductFooter = ({price}: ProductFooterProps) => {
	return (
		<>
		<div className='product-footer product-footer_layout'>
 			<p className='product-price'>{price}</p>
			<div className='product-button'>
				<p className='product-text'>Ver más</p>
				<div className="product-icon"><MdOutlineArrowForward /></div>
			</div>
 		</div>
		</>
		
	);
};

export default ProductFooter;
