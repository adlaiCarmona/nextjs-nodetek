import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselItem = ({ item }) => {
    return (
        <Link href={item.link}>
            <div className="product">
                <Image
                    src={item.img}
                    width={300}
                    height={300}
                    quality={100}
                />
                <div>
                    <h1>{item.name}</h1>
                    <h3>$ {item.price}</h3>
                </div>
            </div>
        </Link>
    );
};

export default function Home() {
    const items = [
        {
            name: 'Arduino Uno',
            img: '/arduinoUno.jpg',
            price: 350,
            link: '/products/6281237a2799a031378aeaef'
        },
        {
            name: 'Arduino Mega',
            img: '/arduinoMega.jpg',
            price: 20,
            link: '/products/6281237a2799a031378aeaef'
        },
        {
            name: 'Arduino Nano',
            img: '/arduinoNano.png',
            price: 15,
            link: '/products/6281237a2799a031378aeaef'
        },
        {
            name: 'Raspberry Pi 4',
            img: '/raspberryPi4.jpg',
            price: 50,
            link: '/products/627efc79d3d7d85f5f62aa7e'
        },
    ]
    return (
        <div id="root">
            <Head>
                <title>NodeTek</title>
                <link rel="icon" href="/nodetek.ico" />
            </Head>

            <main className="section">
                <div className="container">
                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop={true}
                    >
                        {items.map(item => <CarouselItem item={item} />)}
                    </Carousel>
                </div>
            </main>

            <style jsx>{`
                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }

                .section {
                    min-height: 90vh;
                    display: flex;
                    justify-content: center;
                    background-color: #d8d8d8;
                    padding: 1.5rem 4rem;
                }

                .container {
                    display: flex;
                    justify-content: center;
                    max-width: fit-content;
                    gap: 20px;
                    background-color: #ffffff;
                    border-radius: 20px;
                    padding: 2rem;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                        0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
