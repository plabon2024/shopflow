import React from "react";

const Sale = () => {
  return (
<section className="container mx-auto p-10 px-0 md:p-10 md:py-32 md:px-0">
  <section className="p-5 md:p-0 xl:grid xl:grid-cols-12 xl:grid-rows-6 xl:h-[600px] md:gap-5">
    
    {/* ======= MAIN BANNER: SAMSUNG PHONE SALE ======= */}
    <section className="row-start-1 row-end-7 col-start-1 col-end-9 bg-gradient-to-r from-blue-100 via-blue-50 to-white rounded-lg shadow-md">
      <article className="p-10 flex justify-between items-center h-full">
        {/* Text Content */}
        <div className="space-y-5 max-w-md">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Samsung Galaxy Sale
          </h2>
          <h3 className="text-xl text-gray-700">
            Save up to <span className="font-bold text-2xl text-red-600">30%</span> on the latest Samsung phones!
          </h3>
          <button className="p-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="hidden md:block">
          <img
            className="h-auto w-96 drop-shadow-lg"
            src="/phone.png"
            alt="Samsung Phone"
          />
        </div>
      </article>
    </section>

    {/* ======= TOP RIGHT CARD: PS5 ======= */}
    <section className="row-start-1 row-end-4 col-start-9 col-end-13 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-md">
      <article className="p-8 flex justify-between items-center h-full">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 max-w-xs">Sony PlayStation 5</h2>
          <h3 className="text-xl text-gray-700 font-semibold">$499</h3>
          <button className="p-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
        <div>
          <img
            className="h-auto w-40 md:w-56 drop-shadow-lg"
            src="/playstation.png"
            alt="PlayStation 5"
          />
        </div>
      </article>
    </section>

    {/* ======= BOTTOM RIGHT CARD: ASUS ZENBOOK ======= */}
    <section className="row-start-4 row-end-7 col-start-9 col-end-13 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-md">
      <article className="p-8 flex justify-between items-center h-full">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 max-w-xs">ASUS ZenBook 14</h2>
          <h3 className="text-xl text-gray-700 font-semibold">$1,099</h3>
          <button className="p-2 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
            Add to Cart
          </button>
        </div>
        <div>
          <img
            className="h-auto w-40 md:w-56 drop-shadow-lg"
            src="/laptop.png"
            alt="ASUS ZenBook 14"
          />
        </div>
      </article>
    </section>

  </section>
</section>

  );
};

export default Sale;
