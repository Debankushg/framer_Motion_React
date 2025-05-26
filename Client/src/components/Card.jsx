import React from "react";
import * as motion from "motion/react-client";

const Card = () => {
  const cards = [
    {
      img: "https://m.media-amazon.com/images/I/81PayM6cuOL._AC_UF350,350_QL80_.jpg",
      title: "Macaw",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSINTCnLVPVdYoVvm9u-i6RXjfLjrOGtKhT9Q&s",
      title: "Cappuccino",
    },
    {
      img: "https://static.vecteezy.com/system/resources/thumbnails/025/282/026/small/stock-of-mix-a-cup-coffee-latte-more-motive-top-view-foodgraphy-generative-ai-photo.jpg",
      title: "Green Forest",
    },
  ];
  return (
    <div className="flex items-center justify-center h-screen z-10">
      <motion.div
        className="p-2 shadow-lg flex gap-4 items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, delayChildren: 1, staggerChildren: 1 }}
      >
        {cards.map((img, i) => (
          <motion.div
            key={i}
            className="w-full flex flex-col items-center gap-2 p-6 bg-[#303030] rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.5 }}
          >
            <div className="w-40 h-40 overflow-hidden rounded-xl border-4 border-gray-200">
              <img
                src={img?.img}
                alt="Macaw"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-center text-amber-500 ">
              {img?.title}
            </h1>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Card;
