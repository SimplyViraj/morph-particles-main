export default function PlayButton() {
  return (
    <div>
      <button
        id="play-button"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-1000 text-base px-5 py-2.5 border-none bg-neutral-600 text-white cursor-pointer z-[100000] flex items-center justify-center rounded-full shadow-md uppercase tracking-wider hover:bg-neutral-700 hover:shadow-lg hover:-translate-y-[2%]"
      >
        <i id="play-icon" className="fa fa-play mr-1.5" />
        Play
      </button>
    </div>
  )
}
