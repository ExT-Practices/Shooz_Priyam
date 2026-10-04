import React from 'react';
import NewsletterModal from '../components/NewsletterModal';
import Hero from '../components/Hero';
import CollectionGrid from '../components/CollectionGrid';
import ProductSection from '../components/ProductSection';
import PromoBanner from '../components/PromoBanner';
import CategorySlider from '../components/CategorySlider';
import FiveColBanner from '../components/FiveColBanner';
import DiscountSection from '../components/DiscountSection';
import PopularStyles from '../components/PopularStyles';
import CustomerFeedback from '../components/CustomerFeedback';
import BlogSection from '../components/BlogSection';
import Newsletter from '../components/Newsletter';
import GoToTop from '../components/GoToTop';

function Home() {
  return (
    <>
      <NewsletterModal />
      <Hero />
      <CollectionGrid />
      <ProductSection />
      <PromoBanner />
      <CategorySlider />
      <FiveColBanner />
      <DiscountSection />
      <PopularStyles />
      <CustomerFeedback />
      <BlogSection />
      <Newsletter />
      <GoToTop />
    </>
  );
}

export default Home;
