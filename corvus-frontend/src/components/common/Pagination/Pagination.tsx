// components/common/Pagination/Pagination.tsx
import './Pagination.scss';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

type PaginationProps = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
};

type PageItem = number | 'ellipsis';

// first, last and the current page with its neighbors; gaps become an ellipsis
const getPageItems = (page: number, totalPages: number): PageItem[] => {
	const visible = [...new Set([1, page - 1, page, page + 1, totalPages])]
		.filter((value) => value >= 1 && value <= totalPages)
		.sort((a, b) => a - b);

	return visible.flatMap((value, index): PageItem[] =>
		index > 0 && value - visible[index - 1] > 1 ? ['ellipsis', value] : [value]
	);
};

const Pagination = ({ page, totalPages, onPageChange, className = '' }: PaginationProps) => {
	if (totalPages <= 1) return null;

	return (
		<nav className={`pagination ${className}`.trim()} aria-label='Paginación'>
			<button
				type='button'
				className='pagination__btn'
				onClick={() => onPageChange(page - 1)}
				disabled={page <= 1}
				aria-label='Página anterior'
			>
				<IoChevronBack />
			</button>

			{getPageItems(page, totalPages).map((item, index) =>
				item === 'ellipsis' ? (
					<span key={`ellipsis-${index}`} className='pagination__ellipsis'>…</span>
				) : (
					<button
						key={item}
						type='button'
						className={`pagination__btn${item === page ? ' pagination__btn--active' : ''}`}
						onClick={() => onPageChange(item)}
						aria-label={`Página ${item}`}
						aria-current={item === page ? 'page' : undefined}
					>
						{item}
					</button>
				)
			)}

			<button
				type='button'
				className='pagination__btn'
				onClick={() => onPageChange(page + 1)}
				disabled={page >= totalPages}
				aria-label='Página siguiente'
			>
				<IoChevronForward />
			</button>
		</nav>
	);
};

export default Pagination;