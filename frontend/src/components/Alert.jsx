export default function Alert({ description, show }) {
  return (
    <div 
        className="px-10 mt-5 text-center" 
        style={{ display: show ? "block" : "none" }}
    >
        <p className="text-red-600 font-bold">{description}</p>
    </div>
  )
}