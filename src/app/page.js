import PropertyCard from "@/components/property-card";
import { properties } from "./data/properties";

export default function Home() {
  return (
    <>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "16px",
            gap: "10px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {properties
            .reduce((acc, _, index, array) => {
              if (index % 2 === 0) {
                acc.push(array.slice(index, index + 2)); // Group items in pairs of 2
              }
              return acc;
            }, [])
            .map((pair, pairIndex) => (
              <div key={pairIndex} style={{ display: "flex", gap: "10px" }}>
                {pair.map((property, index) => (
                  <PropertyCard
                    key={`${pairIndex}-${index}`}
                    date={property.date}
                    imagePath={property.imagePath}
                    isMostLiked={property.isMostLiked}
                    // name={property.name}
                    location={property.location}
                    views={property.views}
                    rating={property.rating}
                    index={property.index}
                  />
                ))}
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
