// components/common/page_sections/CatalogSection/CatalogSection.tsx
"use client";
import { useRef, useState } from 'react';
import './CatalogSection.scss';
import { SearchBar } from '../../SearchBar';
import { Pagination } from '../../Pagination';
import { Product } from '../../../features';
import useCatalogProducts from '../../../../hooks/useCatalogProducts';
import getProductImage from '../../../../utils/getProductImage';

type CatalogSectionProps = {
	className?: string;
};

const PAGE_SIZE = 12;

const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

const CatalogSection = ({ className = '' }: CatalogSectionProps) => {
	const sectionRef = useRef<HTMLElement>(null);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');

	const { products, pagination, loading, error } = useCatalogProducts({
		page,
		limit: PAGE_SIZE,
		search,
	});

	const handleSearch = (term: string) => {
		setSearch(term);
		setPage(1);
	};

	const handlePageChange = (nextPage: number) => {
		setPage(nextPage);
		sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<>
		<section ref={sectionRef} className={`catalog-section ${className}`.trim()}>
			{/*
				HEADER: yours goes here ("01 / CATÁLOGO", "Todo el universo", "25 productos").
				The product total is pagination?.total.
			*/}

			<SearchBar className='catalog-section__search' onSearch={handleSearch} />

			{loading && products.length === 0 && (
				<p className='catalog-section__status'>Cargando productos...</p>
			)}

			{error && (
				<p className='catalog-section__status' role='alert'>
					No se pudieron cargar los productos
				</p>
			)}

			{!loading && !error && products.length === 0 && (
				<p className='catalog-section__status'>
					{search
						? `No encontramos productos para "${search}"`
						: 'Aún no hay productos en el catálogo'}
				</p>
			)}

			{products.length > 0 && (
				<ul
					className={`catalog-section__grid${loading ? ' catalog-section__grid--loading' : ''}`}
					aria-busy={loading}
				>
					{products.map((product, index) => (
						<li key={product.id}>
							<Product
								image={getProductImage(product)}
								// order={(page - 1) * PAGE_SIZE + index + 1}
								productName={product.name}
								category={product.categoryName}
								price={priceFormatter.format(product.price)}
							/>
						</li>
					))}
				</ul>
			)}

			<Pagination
				className='catalog-section__pagination'
				page={page}
				totalPages={pagination?.totalPages ?? 1}
				onPageChange={handlePageChange}
			/>
		</section>
		</>
	);
};

export default CatalogSection;
