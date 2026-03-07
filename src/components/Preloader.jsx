export default function Preloader() {
  return (
    <div id="preloader" className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
      <div className="equalizer flex items-center justify-center w-[300px] h-[300px]">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="bar" />
        ))}
      </div>
    </div>
  )
}
