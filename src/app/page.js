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
            // name={properties[0].name}
            location={properties[0].location}
            views={properties[0].views}
            rating={properties[0].rating}
            key={0}
            index={properties[0].index}
          />
          <PropertyCard
            date={properties[1].date}
            imagePath={properties[1].imagePath}
            isMostLiked={properties[1].isMostLiked}
            // name={properties[1].name}
            views={properties[1].views}
            rating={properties[1].rating}
            location={properties[1].location}
            key={1}
            index={properties[1].index}
          />
        </div>
      </main>
    </>
  );
}
