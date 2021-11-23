import React from 'react';
import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css'


function anuncios() {
    return (
        <div className='slider'>
            <Carousel>
                <Carousel.Item interval={2500}>
                    <img
                        className="d-block w-100"
                        src="https://i.blogs.es/2d7f2e/counter-strike-global-offensive/1366_2000.jpg"
                        alt="First"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2500}>
                    <img
                        className="d-block w-100"
                        src="https://miracomosehace.com/wp-content/uploads/2020/07/counter-strike-personajes-del-juego-1.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cgamta.files.wordpress.com/2016/01/343223_c1d37e81-009d-40b0-956e-d2852b707d6e.png"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default anuncios