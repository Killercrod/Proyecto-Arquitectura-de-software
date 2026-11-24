import './ProductForm.scss';
import { IoClose } from 'react-icons/io5';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonApp } from '../ButtonApp';
import { GuideText } from '../GuideText';
import { MainTittle } from '../MainTittle';
import { useApi } from '../../../hooks';
import { getCategories } from '../../../services/CategoryService';
import type { Product } from '../../../models';
import {
	createProductSchema,
	editProductSchema,
	MAX_PRODUCT_IMAGES,
	type ProductSchema,
} from '../../../schemas/productSchema';
import { buildProductFormData } from '../../../utils/buildProductFormData';

type ProductFormMode = 'create' | 'edit';

type ProductFormProps = {
	mode: ProductFormMode;
	// required in edit mode: its current values are shown as placeholders
	product?: Product;
	// receives the ready FormData; must reject when the request fails
	onSubmit: (data: FormData) => Promise<void>;
	onClose?: () => void;
	loading?: boolean;
	errorMessage?: string | null;
	className?: string;
};

const FORM_CONTENT = {
	create: {
		guideText: 'Nuevo producto',
		title: 'Añadir al universo',
		button: 'Registrar producto',
		loadingButton: 'Registrando...',
	},
	edit: {
		guideText: 'Editar producto',
		title: 'Actualizar producto',
		button: 'Guardar cambios',
		loadingButton: 'Guardando...',
	},
} as const;

const ProductForm = ({
	mode,
	product,
	onSubmit,
	onClose,
	loading = false,
	errorMessage = null,
	className = '',
}: ProductFormProps) => {
	const isEdit = mode === 'edit';
	const content = FORM_CONTENT[mode];
	const current = isEdit ? product : undefined;

	const {
		data: categoriesResponse,
		loading: loadingCategories,
		error: categoriesError,
	} = useApi(getCategories, { autoFetch: true });

	const categories = categoriesResponse?.data ?? [];

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm<ProductSchema>({
		resolver: zodResolver(isEdit ? editProductSchema : createProductSchema),
		defaultValues: { name: '', categoryId: '', price: '', stock: '', description: '' },
	});

	const submit: SubmitHandler<ProductSchema> = async (values) => {
		if (loading) return;

		const formData = buildProductFormData(values);

		if (isEdit && Array.from(formData.keys()).length === 0) {
			setError('root', { message: 'Modifica al menos un campo para guardar los cambios' });
			return;
		}

		try {
			await onSubmit(formData);
			reset();
		} catch {
			// the parent shows the error through errorMessage; keep the typed values
		}
	};

	return (
		<div className={`product-form ${className}`.trim()}>
			{onClose && (
				<button type='button' className='product-form__close' onClick={onClose} aria-label='Cerrar'>
					<IoClose />
				</button>
			)}

			<div className='product-form__heading'>
				<GuideText guideText={content.guideText} />
				<MainTittle tittle={content.title} />
			</div>

			<form className='product-form__form' onSubmit={handleSubmit(submit)} noValidate>
				<div className='product-form__field'>
					<label className='product-form__label' htmlFor={`${mode}-product-name`}>Nombre</label>
					<input
						id={`${mode}-product-name`}
						className='product-form__input'
						type='text'
						placeholder={current?.name ?? 'Nombre del producto'}
						aria-invalid={!!errors.name}
						{...register('name')}
					/>
					{errors.name && <p className='product-form__error'>{errors.name.message}</p>}
				</div>

				<div className='product-form__field'>
					<label className='product-form__label' htmlFor={`${mode}-product-category`}>Categoría</label>
					<select
						id={`${mode}-product-category`}
						className='product-form__input'
						aria-invalid={!!errors.categoryId}
						{...register('categoryId')}
					>
						{/* categories */}
						<option value=''>
							{loadingCategories
								? 'Cargando categorías...'
								: current?.category?.name
									? `Actual: ${current.category.name}`
									: isEdit
										? 'Sin cambios'
										: 'Selecciona una categoría'}
						</option>
						{categories.map(({ id, name }) => (
							<option key={id} value={id}>{name}</option>
						))}
					</select>
					{errors.categoryId && <p className='product-form__error'>{errors.categoryId.message}</p>}
					{categoriesError && <p className='product-form__error'>No se pudieron cargar las categorías</p>}
				</div>

				<div className='product-form__field'>
					<label className='product-form__label' htmlFor={`${mode}-product-price`}>Precio</label>
					<input
						id={`${mode}-product-price`}
						className='product-form__input'
						type='number'
						min={0}
						step='any'
						placeholder={current ? String(current.price) : '0.00'}
						aria-invalid={!!errors.price}
						{...register('price')}
					/>
					{errors.price && <p className='product-form__error'>{errors.price.message}</p>}
				</div>

				<div className='product-form__field'>
					<label className='product-form__label' htmlFor={`${mode}-product-stock`}>Cantidad disponible</label>
					<input
						id={`${mode}-product-stock`}
						className='product-form__input'
						type='number'
						min={0}
						step={1}
						placeholder={current ? String(current.stock) : '0'}
						aria-invalid={!!errors.stock}
						{...register('stock')}
					/>
					{errors.stock && <p className='product-form__error'>{errors.stock.message}</p>}
				</div>

				<div className='product-form__field product-form__field--full'>
					<label className='product-form__label' htmlFor={`${mode}-product-description`}>Descripción</label>
					<textarea
						id={`${mode}-product-description`}
						className='product-form__input product-form__textarea'
						placeholder={current?.description ?? 'Describe el producto'}
						aria-invalid={!!errors.description}
						{...register('description')}
					/>
					{errors.description && <p className='product-form__error'>{errors.description.message}</p>}
				</div>

				<div className='product-form__field product-form__field--full'>
					<label className='product-form__label' htmlFor={`${mode}-product-images`}>Imágenes</label>
					<input
						id={`${mode}-product-images`}
						className='product-form__input product-form__file'
						type='file'
						accept='image/*'
						multiple
						aria-invalid={!!errors.images}
						{...register('images')}
					/>
					<p className='product-form__hint'>
						{current
							? `Opcional. Imágenes actuales: ${current.images.length}. Máximo ${MAX_PRODUCT_IMAGES}.`
							: `Puedes seleccionar hasta ${MAX_PRODUCT_IMAGES} imágenes`}
					</p>
					{errors.images && <p className='product-form__error'>{errors.images.message}</p>}
				</div>

				{(errorMessage || errors.root) && (
					<p className='product-form__error product-form__field--full' role='alert'>
						{errorMessage ?? errors.root?.message}
					</p>
				)}

				<div className='product-form__button product-form__field--full'>
					<ButtonApp
						typeButton='submit'
						buttonText={loading ? content.loadingButton : content.button}
					/>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;