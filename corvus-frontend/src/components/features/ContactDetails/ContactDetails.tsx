
import './ContactDetails.scss';

 type ContactDetailsProps = {
	// types...
	headingSocialMedia: string;
	headingContactOption: string;


	// metods
	instragramLink?: string;
	facebookLink?: string;
	tiktokLink?: string;

	mail: string;
	phone: string;
	schedule: string;
}

const ContactDetails = ({headingContactOption, headingSocialMedia,
	instragramLink, facebookLink, tiktokLink, mail, phone, schedule
}: ContactDetailsProps) => {
	return (
		<>
		<article className='contact-details contact-details_layout'>
 			<div className='social-media'>
				<p className='heading'>{headingSocialMedia}</p>

				<div className='contact-options contact_container'>
					<a className='contact-type social-media--link' href={instragramLink}>Instagram</a>
					<a className='contact-type social-media--link' href={tiktokLink}>TikTok</a>
					<a className='contact-type social-media--link' href={facebookLink}>Facebook</a>
				</div>
			</div>

			<div className='contact-forms'>
				<p className='heading'>{headingContactOption}</p>

				<div className='contact-options contact_container'>
					<p className='contact-type mail'>{mail}</p>
					<p className='contact-type phone'>{phone}</p>
					<p className='contact-type schedule'>{schedule}</p>
				</div>
			</div>
 		</article>
		</>
		
	);
};

export default ContactDetails;
