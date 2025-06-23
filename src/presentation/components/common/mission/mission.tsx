'use client'

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import styles from './mission.module.scss';

import { IMAGE } from 'src/presentation/assets';

const articles = [
    {
        image: IMAGE.MISSAO.src,
        title: 'Missão',
        description: 'Oferecer soluções financeiras inteligentes e acessíveis, empoderando pessoas e transformando vidas.',
    },
    {
        image: IMAGE.VISAO.src,
        title: 'Visão',
        description: 'Ser o banco digital que mais transforma vidas no Brasil, conectando inovação com propósito.',
    },
    {
        image: IMAGE.DESTINO.src,
        title: 'Transformação como destino',
        description: 'Cada produto, atendimento e tecnologia tem um único foco: melhorar a vida de quem confia em nós.'
    },
    {
        image: IMAGE.FE.src,
        title: 'Fé em tudo o que fazemos',
        description: 'Nossos passos são guiados por princípios cristãos e a certeza de que estamos a serviço de algo maior.'
    },
    {
        image: IMAGE.CONFIANCA.src,
        title: 'Confiança e transparência',
        description: 'Atuamos com verdade, responsabilidade e integridade em todas as relações.'
    },
    {
        image: IMAGE.SIMPLICIDADE.src,
        title: 'Simplicidade com excelência',
        description: 'O melhor serviço é o que qualquer pessoa entende e consegue usar com facilidade.'
    },
    {
        image: IMAGE.MERITOCRACIA.src,
        title: 'Meritocracia e valorização humana',
        description: 'Reconhecemos o esforço e celebramos a superação de cada pessoa que cresce com a gente.'
    },
    {
        image: IMAGE.INOVACAO.src,
        title: 'Inovação com coração',
        description: 'Tecnologia, sim. Mas com alma, propósito e foco em quem mais precisa de apoio.'
    },
];

export default function Mission() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false,
        slidesToScroll: 1,
        dragFree: false,
        containScroll: 'trimSnaps',
        breakpoints: {
            '(max-width: 767px)': { slidesToScroll: 1 },
            '(min-width: 768px) and (max-width: 1023px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 },
        },
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className={styles.section}>
            <div className={styles.contentWrapper}>
                <div className={styles.headerColumn}>
                    <h2 className={styles.title}>Missão, visão e valores HotInvest</h2>
                    <div className={styles.controls}>
                        <button
                            className={styles.prevBtn}
                            aria-label="Anterior"
                            onClick={() => emblaApi && emblaApi.scrollPrev()}
                            disabled={!canScrollPrev}
                        >
                            <IconChevronLeft size={26} />
                        </button>
                        <button
                            className={styles.nextBtn}
                            aria-label="Próximo"
                            onClick={() => emblaApi && emblaApi.scrollNext()}
                            disabled={!canScrollNext}
                        >
                            <IconChevronRight size={26} />
                        </button>
                    </div>
                </div>
                <div className={styles.carouselWrapper}>
                    <div className={styles.carousel} ref={emblaRef}>
                        <div className={styles.track}>
                            {articles.map((article, idx) => (
                                <div className={styles.slide} key={idx}>
                                    <div className={styles.card}>
                                        <div className={styles.cardImage}>
                                            <img src={article.image} alt={article.title} />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <div className={styles.cardTitle}>{article.description}</div>
                                            <div className={styles.cardDescription}>{article.title}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
