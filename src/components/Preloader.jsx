import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Preloader() {
  return (
    <div id="preloader" className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#1e1915]">
      <div className="w-[200px] h-[200px]" style={{ filter: 'brightness(0) saturate(100%) invert(53%) sepia(8%) saturate(500%) hue-rotate(340deg) brightness(92%) contrast(87%)' }}>
        <DotLottieReact
          src="/images/icons/Bunny Hop.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p className="-mt-12 text-xs tracking-[0.3em] uppercase text-[#8a8078] font-jost">Loading</p>
    </div>
  )
}
