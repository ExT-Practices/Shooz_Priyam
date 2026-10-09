import React from 'react';
import blog1 from '../assets/images/blog-1.png';
import blog2 from '../assets/images/blog-2.png';
import blog5 from '../assets/images/blog-5.png';
import blog6 from '../assets/images/blog-6.png';

const BlogSection = () => {
  const rightPosts = [
    { img: blog1, title: 'Eco-Friendly Footwear: Sustainable Style', date: 'Oct 28 2024' },
    { img: blog6, title: 'The Ultimate Guide to Sneaker Care', date: 'Oct 17 2024' },
    { img: blog5, title: 'How to Style Your Favorite Sneakers', date: 'Oct 17 2024' }
  ];

  const commentIcon = (
    <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
    </svg>
  );

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto pb-10 px-8 md:px-8">
        
        
        <div className="mb-12">
          <p className="text-gray-500 t text-sm font-bold tracking-[0.2em] uppercase mb-6.5">
            FROM THE BLOG
          </p>
          <h2 className="text-[25px] md:text-[45px] font-semibold text-gray-900 mb-6.5">
            Recently Our Posts
          </h2>
          <p className="text-gray-500 text-2xl md:text-base max-w-md">
            Sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[500px]">
          
          
          <div className="relative overflow-hidden group cursor-pointer h-[300px] lg:h-full">
            <img 
              src={blog2} 
              alt="The Future Of Footwear: A Look Ahead" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 p-6 md:p-10 w-[75%] z-10">
              <div className="flex items-center gap-8 md:gap-9 text-white/90 text-lg md:text-lg mb-3 md:mb-8">
                <span>Oct 28 2024</span>
                <div className="flex items-center gap-1.5">
                  {commentIcon}
                  <span>0 comments</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white transition-colors duration-300 ">
                The Future Of Footwear: A Look Ahead
              </h3>
            </div>
          </div>

          
          <div className="flex flex-col gap-6 h-full justify-between lg:ml-9 mt-8 lg:mt-0">
            {rightPosts.map((post, idx) => (
              <div key={idx} className="group flex flex-row gap-4 sm:gap-6 cursor-pointer h-auto sm:h-[150px] lg:h-[150px] items-center sm:items-stretch">
                <div className="overflow-hidden w-[120px] h-[90px] sm:w-[220px] xl:w-[240px] sm:h-full shrink-0">
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="flex flex-col justify-center py-1 sm:py-2 flex-1">
                  <div className="flex items-center gap-8 sm:gap-9 text-gray-500 text-lg sm:text-lg mb-1 sm:mb-2">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {commentIcon}
                      <span>0 comments</span>
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#ac4252] leading-tight sm:leading-normal">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
