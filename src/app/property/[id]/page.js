"use client"
import Image from "next/image"
import { properties } from "@/app/data/properties"
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

export default function PropertyPage() {
    const suffixisizeNumber = (num) => {
        if (num >= 10000000) { // Crore
            return (num / 10000000).toFixed(1) + " Cr";
        } else if (num >= 100000) { // Lakh
            return (num / 100000).toFixed(1) + " L";
        } else if (num >= 1000) { // Thousand
            return (num / 1000).toFixed(1) + " k";
        } else {
            return num.toString(); // If less than 1000, return as is
        }
    }

    const pathname = usePathname();
    const property = properties[parseInt(pathname.split("/")[2])];

    return <div style={{
        display: "flex",
        flexDirection: "column",
        width: "full",
        padding: "1rem 1rem",
        gap: "8px"
    }}>
        <div
            style={{
                position: "relative",
                width: "100%", // Takes full width of the parent
                maxWidth: "600px", // Ensures it doesn't grow too large
                aspectRatio: "3 / 4", // Maintains a consistent aspect ratio
                overflow: "hidden",
            }}
        >
            {property.isMostLiked && (
                <span
                    style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        backgroundColor: "rgba(237, 237, 237, 0.8)", // Slight transparency for better UI
                        color: "black",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        zIndex: "2",
                    }}
                >
                    Most Liked
                </span>
            )}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Image
                    alt="Property Image"
                    fill
                    style={{
                        borderRadius: "16px",
                        objectFit: "cover",
                        width: "100%", // Makes it adapt to the parent container
                        height: "100%", // Maintains aspect ratio dynamically
                    }}
                    src={property.imagePath}
                />
            </div>
        </div>


        <div style={{ display: "flex", justifyContent: "space-between", width: "full", marginTop: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {property.name}
                </p>
                <span style={{ fontSize: "10px" }}>
                    📍 {property.location}
                </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {suffixisizeNumber(property.price)}
                </p>
                <span style={{ fontSize: "10px" }}>
                    {property.isEmiAvailable ? "EMI Available" : "EMI Unavailable"}
                </span>
            </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "12px" }}>
            <h2 style={{ fontSize: "16px" }}>Location</h2>
            <div style={{ display: "flex", gap: "16px", alignItems: "center", width: "full", marginTop: "12px" }}>
                <img alt="location-symbol" src="/location-round.svg" />
                <p style={{ fontSize: "12px" }}>{property.fullLocation}</p>
            </div>
            {/* Google Maps Section */}
            <div style={{
                marginTop: "16px",
                width: "100%",
                height: "300px",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative"
            }}>
                {property.mapsIframe}
                <div style={{ color: "orange", textAlign: "center", padding: "2px", fontWeight: "bold", fontSize: "12px", width: "105%", backgroundColor: "rgb(252, 230, 188)", borderRadius: "16px", position: "absolute", bottom: "0px" }}>
                    View Full Location
                </div>
            </div>
        </div>
    </div >
}