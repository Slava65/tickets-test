import preloaderImg from "../../assets/preloader.png"
export default function Preloader() {
  return (
    <div className="preloader">
        <img className="preloader__picture" src={preloaderImg}></img>;
    </div>
  )
}
