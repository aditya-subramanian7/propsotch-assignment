"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function PropertyCard({ views, location, date, rating, isMostLiked, index,carouselImages }) {
    const [isLiked, setIsLiked] = useState(false);
    const [currImgIndex, setCurrImgIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState('none');

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const router = useRouter();

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const changeImage = (direction) => {
        if (direction === 'left' && currImgIndex === carouselImages.length - 1) return;
        if (direction === 'right' && currImgIndex === 0) return;

        setSlideDirection(direction);
        if (direction === 'left') {
            setCurrImgIndex(prev => prev + 1);
        } else {
            setCurrImgIndex(prev => prev - 1);
        }

        setTimeout(() => {
            setSlideDirection('none');
        }, 300);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                if (currImgIndex < carouselImages.length - 1) {
                    changeImage('left');
                }
            } else {
                if (currImgIndex > 0) {
                    changeImage('right');
                }
            }
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    const handleDotClick = (index) => {
        if (index === currImgIndex) return;

        const direction = index > currImgIndex ? 'left' : 'right';
        setSlideDirection(direction);
        setCurrImgIndex(index);

        setTimeout(() => {
            setSlideDirection('none');
        }, 300);
    };

    const getRatingColor = (rating) => {
        if (rating >= 0 && rating < 3) {
            return "red";
        } else if (rating >= 3 && rating < 4) {
            return "orange";
        } else {
            return "green"
        }
    }

    const formatIndianNumber = (number) => {
        return new Intl.NumberFormat('en-IN').format(number);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "100%",
            maxWidth: "320px",
            cursor: "pointer"
        }} onClick={() => router.push(`/property/${index}`)}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "137.5%",
                    overflow: "hidden",
                    borderRadius: "16px"
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {isMostLiked && (
                    <span style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        backgroundColor: "rgb(237, 237, 237)",
                        color: "black",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        zIndex: "2"
                    }}>
                        Most Liked
                    </span>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsLiked(!isLiked);
                    }}
                    style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "24px",
                        color: isLiked ? "red" : "white",
                        zIndex: "2"
                    }}
                >
                    ♥
                </button>
                <div style={{
                    display: "flex",
                    gap: "8px",
                    position: "absolute",
                    bottom: "4px",
                    width: "100%",
                    justifyContent: "center",
                    zIndex: "2"
                }}>
                    {carouselImages.map((_, index) => (
                        <span
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDotClick(index);
                            }}
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "white",
                                opacity: currImgIndex === index ? "1" : "0.5",
                                cursor: "pointer",
                                userSelect: "none"
                            }}
                        >
                            .
                        </span>
                    ))}
                </div>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: slideDirection === 'left' ? 'translateX(-100%)' :
                        slideDirection === 'right' ? 'translateX(100%)' : 'translateX(0)',
                    transition: slideDirection !== 'none' ? 'transform 0.3s ease-in-out' : 'none'
                }}>
                    <Image
                        alt="Property Image"
                        src={carouselImages[currImgIndex] || "/placeholder.svg"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                            objectFit: "cover"
                        }}
                    />
                </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                padding: "2px 8px",
                alignItems:"center"
            }}>
                <div>
                    <p>👁️‍🗨️ {formatIndianNumber(views)}</p>
                </div>
                <div style={{ color: getRatingColor(rating) }}>
                    <p>{rating.toFixed(2)} ★</p>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "14px",
                gap: "4px",
                padding: "0px 8px"
            }}>
                <p style={{ fontWeight: "bold" }}>{location}</p>
                <span style={{ fontSize: "10px" }}>{date}</span>
            </div>
        </div>
    );
}

