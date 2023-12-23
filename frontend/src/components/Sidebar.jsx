// eslint-disable-next-line react/prop-types
export default function Sidebar({imgAdd, txt, c}) {
  return (
    <div className="w-[30vw] absolute left-0 h-screen bg-orange-500">
      <img src={imgAdd} alt={txt} className={c} />
    </div>
  )
}

