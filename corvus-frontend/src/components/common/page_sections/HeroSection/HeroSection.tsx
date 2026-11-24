import { MainTittle } from '../../MainTittle';
import { GuideText } from '../../GuideText';
import { ButtonApp } from '../../ButtonApp';
import { FaArrowRight } from 'react-icons/fa';

import './HeroSection.scss';

type HeroSectionProps = {
  // types...
};

const HeroSection = ({}: HeroSectionProps) => {
  return (
    <>
      <section className='hero-section hero-section_layout'>
        <article className='hero-section--content'>
          <div className='section-identity'>
            <GuideText guideText='Edición 01 · Para fans de otros mundos' />

            {/* <div className='hero-section--heading'> */}
            <MainTittle tittle='Colecciona tus ' emphasizeText='universos favoritos.' />
            {/* </div> */}

            <p className='hero-identity-text'>
              Figuras de anime, manga, libros de fantasía y tesoros geek
              para llevar las historias que amas más allá de la pantalla.
            </p>

            <div className='hero-section--action'>
              <ButtonApp
                buttonText='Explorar el catálogo'
                icon={<FaArrowRight />}
              />
            </div>
          </div>
        </article>

        <div className='hero-section--visual' aria-hidden='true'>
          <div className='hero-section--glow' />

          {/* Órbitas exteriores */}
          <div className='hero-section--orbit hero-section--orbit_one'>
            <span className='hero-section--moon' />
          </div>

          <div className='hero-section--orbit hero-section--orbit_two'>
            <span className='hero-section--moon' />
          </div>

          <div className='hero-section--orbit hero-section--orbit_three'>
            <span className='hero-section--moon' />
          </div>

          {/* Planeta */}
          <div className='hero-section--planet'>
            <span className='hero-section--crater' />
            <span className='hero-section--crater hero-section--crater_two' />
            <span className='hero-section--crater hero-section--crater_three' />
          </div>

          {/* Anillo */}
          <div className='hero-section--ring' />

          {/* Etiquetas */}
          <span className='hero-section--orbit-label'>
            <span className='hero-section--status-dot' />
            ÓRBITA 24/7
          </span>

          <span className='hero-section--universe-label'>
            UNIVERSO #01
          </span>

          {/* Partículas decorativas */}
          <span className='hero-section--star hero-section--star_one' />
          <span className='hero-section--star hero-section--star_two' />
          <span className='hero-section--star hero-section--star_three' />
          <span className='hero-section--star hero-section--star_four' />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
