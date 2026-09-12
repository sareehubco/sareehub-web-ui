import Hero from "./hero";
import TrustBadges from "./trust-badges";
import ShopByCollection from "./shop-by-collection";
import NewArrivals from "./new-arrivals";
import PromoBanners from "./promo-banners";
import FeaturedIn from "./featured-in";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <TrustBadges />
      <ShopByCollection />
      <NewArrivals />
      <PromoBanners />
      <FeaturedIn />
    </main>
  );
};

export default HomePage;
