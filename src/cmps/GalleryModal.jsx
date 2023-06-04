export const GalleryModal = ({ imgUrls }) => {

  return (
    <div className="gallery-modal show">
      <div className="gallery-modal-imgs">
        {imgUrls.map((imgUrl, idx) => {
          return <img key={idx} src={imgUrl} alt="" />
        })}
      </div>
    </div>
  )
}
