import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full px-6 md:px-[28px] pt-8 md:pt-12">
      <div className="w-full text-center">
        <div className="casino-sign inline-block relative w-full">
          {/* Light Bulbs Around the Border - Evenly Spaced */}
          {/* Top Row - 19 bulbs evenly spaced (left to right for clockwise) */}
          <div className="light-bulb light-bulb-top" data-pulse-delay="0" style={{ top: '-8px', left: '2%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.04" style={{ top: '-8px', left: '7.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.08" style={{ top: '-8px', left: '13%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.12" style={{ top: '-8px', left: '18.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.16" style={{ top: '-8px', left: '24%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.2" style={{ top: '-8px', left: '29.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.24" style={{ top: '-8px', left: '35%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.28" style={{ top: '-8px', left: '40.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.32" style={{ top: '-8px', left: '46%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.36" style={{ top: '-8px', left: '51.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.4" style={{ top: '-8px', left: '57%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.44" style={{ top: '-8px', left: '62.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.48" style={{ top: '-8px', left: '68%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.52" style={{ top: '-8px', left: '73.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.56" style={{ top: '-8px', left: '79%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.6" style={{ top: '-8px', left: '84.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.64" style={{ top: '-8px', left: '90%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" data-pulse-delay="0.68" style={{ top: '-8px', left: '95.5%', zIndex: 100 }}></div>
          
          {/* Right Column - 6 bulbs evenly spaced (top to bottom for clockwise) */}
          <div className="light-bulb light-bulb-right" data-pulse-delay="0.72" style={{ right: '-8px', top: '8%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" data-pulse-delay="0.76" style={{ right: '-8px', top: '24%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" data-pulse-delay="0.8" style={{ right: '-8px', top: '40%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" data-pulse-delay="0.84" style={{ right: '-8px', top: '56%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" data-pulse-delay="0.88" style={{ right: '-8px', top: '72%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" data-pulse-delay="0.92" style={{ right: '-8px', top: '88%', zIndex: 100 }}></div>
          
          {/* Bottom Row - 19 bulbs evenly spaced (right to left for clockwise) */}
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="0.96" style={{ bottom: '-8px', left: '95.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1" style={{ bottom: '-8px', left: '90%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.04" style={{ bottom: '-8px', left: '84.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.08" style={{ bottom: '-8px', left: '79%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.12" style={{ bottom: '-8px', left: '73.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.16" style={{ bottom: '-8px', left: '68%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.2" style={{ bottom: '-8px', left: '62.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.24" style={{ bottom: '-8px', left: '57%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.28" style={{ bottom: '-8px', left: '51.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.32" style={{ bottom: '-8px', left: '46%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.36" style={{ bottom: '-8px', left: '40.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.4" style={{ bottom: '-8px', left: '35%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.44" style={{ bottom: '-8px', left: '29.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.48" style={{ bottom: '-8px', left: '24%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.52" style={{ bottom: '-8px', left: '18.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.56" style={{ bottom: '-8px', left: '13%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.6" style={{ bottom: '-8px', left: '7.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" data-pulse-delay="1.64" style={{ bottom: '-8px', left: '2%', zIndex: 100 }}></div>
          
          {/* Left Column - 6 bulbs evenly spaced (bottom to top for clockwise) */}
          <div className="light-bulb light-bulb-left" data-pulse-delay="1.68" style={{ left: '-8px', top: '88%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" data-pulse-delay="1.72" style={{ left: '-8px', top: '72%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" data-pulse-delay="1.76" style={{ left: '-8px', top: '56%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" data-pulse-delay="1.8" style={{ left: '-8px', top: '40%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" data-pulse-delay="1.84" style={{ left: '-8px', top: '24%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" data-pulse-delay="1.88" style={{ left: '-8px', top: '8%', zIndex: 100 }}></div>
 
          
          {/* Title Inside the Sign */}
          <div className="w-full mb-2">
            <h1 className="text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] 2xl:text-[15rem] font-bold font-handwriting text-white w-full text-center neon-text">
              <div className="w-full">Hernandez</div>
              <div className="w-full">Casino</div>
            </h1>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Image
            src="/headerLine.svg"
            alt="Header Line"
            width={200}
            height={20}
            className="h-8 w-auto"
          />
        </div>
      </div>
    </div>
  );
} 