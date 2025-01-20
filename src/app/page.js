import PropertyCard from "@/components/property-card";
import { properties } from "./data/properties";

export default function Home() {
  return (
    <>
      <main style={{
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "16px",
          gap: "10px",
          paddingLeft: "16px",
          paddingRight: "16px"
        }}>
          {properties.map(()=>{})}
          <PropertyCard
            date={properties[0].date}
            imagePath={properties[0].imagePath}
            isMostLiked={properties[0].isMostLiked}
            location={properties[0].location}
            views={properties[0].views}
            rating={properties[0].rating}
            key={0}
            index={properties[0].index}
            carouselImages={properties[0].carouselImages}
          />
          <PropertyCard
            date={properties[1].date}
            imagePath={properties[1].imagePath}
            isMostLiked={properties[1].isMostLiked}
            views={properties[1].views}
            rating={properties[1].rating}
            location={properties[1].location}
            key={1}
            index={properties[1].index}
            carouselImages={properties[0].carouselImages}
          />
        </div>
      </main>
    </>
  );
}
