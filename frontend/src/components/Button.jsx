export default function button({ padding, rounded, ButtonName }) {
  return (
    <button className={`${padding} bg-orange-500 rounded-[${rounded}] text-white
                       font-bold hover:bg-orange-800
                       tracking-[2px]`}> {ButtonName} </button>
  )
}

