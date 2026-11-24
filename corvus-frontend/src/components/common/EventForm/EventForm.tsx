
import './EventForm.scss';
import { ButtonApp } from '../ButtonApp';
import { GuideText } from '../GuideText';
// import { eventSchema, type EventSchema } from '../../../schemas';
// import { type SubmitHandler, useForm } from 'react-hook-form';
import { IntroductionSectionTittle } from '../IntroductionSectionTittle';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type EventSchema, eventSchema } from '../../../schemas/eventSchema';

// este type no va aquí
export type EventFormValues = {
	date: string;
	place: string;
	time: string;
}

type EventFormProps = {
	onSubmit: (values: EventSchema) => Promise<void>;
	// extra class to inherit/override styles from the parent
	className?: string;
	loading?: boolean;
	errorMessage?: string;
};

const EventForm = ({
    onSubmit,
    className = '',
    loading = false,
    errorMessage
}: EventFormProps) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<EventSchema>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            location: '',
            date: '',
            startTime: '',
            endTime: ''
        }
    });

    const submitAndReset: SubmitHandler<EventSchema> = async (values) => {
        try {
            await onSubmit(values);
            reset();
        } catch {
            // El componente padre administra el mensaje de error.
        }
    };

    return (
        <>
        <div className={`event-form ${className}`.trim()}>

            <div className='event-form__heading'>
                <GuideText guideText='Nuevo evento' />
                <IntroductionSectionTittle introductionTittle='Registrar fecha' />
            </div>

            <form className='event-form__form' onSubmit={handleSubmit(submitAndReset)} noValidate>
                <div className='event-form__field'>
                    <label className='event-form__label' htmlFor='event-title'>
                        Título
                    </label>

                    <input
                        id='event-title'
                        className='event-form__input'
                        type='text'
                        placeholder='Nombre del evento'
                        aria-invalid={!!errors.title}
                        {...register('title')}
                    />

                    {errors.title && (
                        <p className='event-form__error'>
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div className='event-form__field'>
                    <label className='event-form__label' htmlFor='event-date'>Fecha</label>

                    <input
                        id='event-date'
                        className='event-form__input'
                        type='date'
                        aria-invalid={!!errors.date}
                        {...register('date')}
                    />

                    {errors.date && (
                        <p className='event-form__error'>
                            {errors.date.message}
                        </p>
                    )}
                </div>

                <div className='event-form__field'>
                    <label className='event-form__label' htmlFor='event-location'>
                        Lugar
                    </label>

                    <input
                        id='event-location'
                        className='event-form__input'
                        type='text'
                        placeholder='Lugar del evento'
                        aria-invalid={!!errors.location}
                        {...register('location')}
                    />

                    {errors.location && (
                        <p className='event-form__error'>
                            {errors.location.message}
                        </p>
                    )}
                </div>

                <div className='event-form__field'>
                    <label className='event-form__label' htmlFor='event-start-time'>
                        Hora de inicio
                    </label>

                    <input
                        id='event-start-time'
                        className='event-form__input'
                        type='time'
                        aria-invalid={!!errors.startTime}
                        {...register('startTime')}
                    />

                    {errors.startTime && (
                        <p className='event-form__error'>
                            {errors.startTime.message}
                        </p>
                    )}
                </div>

                <div className='event-form__field'>
                    <label className='event-form__label' htmlFor='event-end-time'>
                        Hora de finalización
                    </label>

                    <input
                        id='event-end-time'
                        className='event-form__input'
                        type='time'
                        aria-invalid={!!errors.endTime}
                        {...register('endTime')}
                    />

                    {errors.endTime && (
                        <p className='event-form__error'>
                            {errors.endTime.message}
                        </p>
                    )}
                </div>

                {errorMessage && (
                    <p className='event-form__error'>
                        {errorMessage}
                    </p>
                )}

                <div className='event-form__button'>
                    <ButtonApp
                        typeButton='submit'
                        buttonText={loading ? 'Registrando...' : 'Registrar evento'}
                    />
                </div>

            </form>
        </div>
        </>
    );
};

export default EventForm;


