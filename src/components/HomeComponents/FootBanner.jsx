export default function FootBanner() {
  return (
    // <div className="relative bg-[url(/footerBG.png)] bg-no-repeat bg-top bg-cover">
    //     <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
    //       <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
    //         Your next role is
    //         <br />
    //         already looking for you
    //       </h2>
    //       <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
    //         Build a profile in three minutes. The matches start arriving tomorrow morning.
    //       </p>
    //       <div className="flex items-center justify-center gap-3">
    //         <button className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-md hover:bg-gray-200 transition">
    //           Create a free account
    //         </button>
    //         <button className="bg-transparent border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-white/10 transition">
    //           View pricing
    //         </button>
    //       </div>
    //     </div>
    //   </div>

     <div className="relative bg-[url(/footerBG.png)] bg-[#0a0a0a] w-full bg-no-repeat bg-top bg-cover">
        {/* Blue glow effect */}
        <div
          aria-hidden="true"
          className="pointer-events-none w-full absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 h-[600px] rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.55) 0%, rgba(59,130,246,0.35) 30%, rgba(37,99,235,0.15) 55%, ttranparent 75%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-2xl opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(147,197,253,0.5) 0%, rgba(59,130,246,0.25) 50%, transparent 80%)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
            Your next role is
            <br />
            already looking for you
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-md hover:bg-gray-200 transition">
              Create a free account
            </button>
            <button className="bg-transparent border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-white/10 transition">
              View pricing
            </button>
          </div>
        </div>
      </div>
  );
}