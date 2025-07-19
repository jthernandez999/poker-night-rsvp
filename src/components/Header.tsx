import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full px-6 md:px-[28px] pt-8 md:pt-12">
      <div className="w-full text-center">
        <div className="casino-sign inline-block relative w-full">
          {/* Light Bulbs Around the Border - Evenly Spaced */}
          {/* Top Row - 19 bulbs evenly spaced (avoiding corner overlaps) */}
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '2%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '7.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '13%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '18.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '24%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '29.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '35%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '40.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '46%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '51.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '57%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '62.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '68%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '73.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '79%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '84.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '90%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-top" style={{ top: '-8px', left: '95.5%', zIndex: 100 }}></div>
          
          {/* Right Column - 6 bulbs evenly spaced (avoiding corner overlaps) */}
          <div className="light-bulb light-bulb-left" style={{ right: '-8px', top: '88%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" style={{ right: '-8px', top: '72%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" style={{ right: '-8px', top: '56%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" style={{ right: '-8px', top: '40%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" style={{ right: '-8px', top: '24%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-right" style={{ right: '-8px', top: '8%', zIndex: 100 }}></div>
          
          {/* Bottom Row - 19 bulbs evenly spaced (right to left for clockwise, avoiding corner overlaps) */}
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '2%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '7.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '13%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '18.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '24%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '29.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '35%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '40.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '46%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '51.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '57%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '62.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '68%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '73.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '79%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '84.5%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '90%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-bottom" style={{ bottom: '-8px', left: '95.5%', zIndex: 100 }}></div>
          
          {/* Left Column - 6 bulbs evenly spaced (avoiding corner overlaps) */}
          <div className="light-bulb light-bulb-left" style={{ left: '-8px', top: '88%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" style={{ left: '-8px', top: '72%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" style={{ left: '-8px', top: '56%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" style={{ left: '-8px', top: '40%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" style={{ left: '-8px', top: '24%', zIndex: 100 }}></div>
          <div className="light-bulb light-bulb-left" style={{ left: '-8px', top: '8%', zIndex: 100 }}></div>
 
          
          {/* Title Inside the Sign */}
          <div className="w-full mb-2">
            <h1 className="text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] 2xl:text-[15rem] font-bold font-casino text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33] w-full text-center">
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