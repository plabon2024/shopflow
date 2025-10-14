import React from "react";

const Sale = () => {
  return (
    <section className="container mx-auto p-10 px-0 md:p-10 md:py-32 md:px-0">
      <section className="p-5 md:p-0 xl:grid xl:grid-cols-12 xl:grid-rows-6 xl:h-[600px] md:gap-5">
        
        {/* ======= MAIN BANNER: SAMSUNG PHONE SALE ======= */}
        <section className="row-start-1 row-end-7 col-start-1 col-end-9 bg-gradient-to-br from-primary/10 via-secondary to-accent/30 rounded-lg shadow-lg border border-border">
          <article className="p-10 flex justify-between items-center h-full">
            {/* Text Content */}
            <div className="space-y-5 max-w-md">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground font-sans">
                Samsung Galaxy Sale
              </h2>
              <h3 className="text-xl text-muted-foreground">
                Save up to <span className="font-bold text-2xl text-destructive">30%</span> on the latest Samsung phones!
              </h3>
              <button className="p-3 px-8 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg font-semibold">
                Shop Now
              </button>
            </div>

            {/* Image */}
            <div className="hidden md:block">
              <img
                className="h-auto w-96 drop-shadow-2xl"
                src="/phone.png"
                alt="Samsung Phone"
              />
            </div>
          </article>
        </section>

        {/* ======= TOP RIGHT CARD: PS5 ======= */}
        <section className="row-start-1 row-end-4 col-start-9 col-end-13 bg-gradient-to-br from-card to-muted rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow">
          <article className="p-8 flex justify-between items-center h-full">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-card-foreground max-w-xs font-sans">
                Sony PlayStation 5
              </h2>
              <h3 className="text-2xl text-primary font-bold">$499</h3>
              <button className="p-2 px-6 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all shadow-sm hover:shadow-md font-semibold">
                Add to Cart
              </button>
            </div>
            <div>
              <img
                className="h-auto w-40 md:w-56 drop-shadow-xl"
                src="/playstation.png"
                alt="PlayStation 5"
              />
            </div>
          </article>
        </section>

        {/* ======= BOTTOM RIGHT CARD: ASUS ZENBOOK ======= */}
        <section className="row-start-4 row-end-7 col-start-9 col-end-13 bg-gradient-to-br from-accent/20 via-card to-secondary/30 rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow">
          <article className="p-8 flex justify-between items-center h-full">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-card-foreground max-w-xs font-sans">
                ASUS ZenBook 14
              </h2>
              <h3 className="text-2xl text-primary font-bold">$1,099</h3>
              <button className="p-2 px-6 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-all shadow-sm hover:shadow-md font-semibold">
                Add to Cart
              </button>
            </div>
            <div>
              <img
                className="h-auto w-40 md:w-56 drop-shadow-xl"
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