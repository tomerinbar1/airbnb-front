import { useState } from "react"

export const CarouselItemLabels = ({ page, width }) => {
  const[isActive, setIsActive] = useState(false)


  function helloFromLabel(name) {
    console.log('hello from ' + name)
  }

  return (
    <div className="carousel-item" style={{ width: width }}>
      {page.map((icon, index) => {
        return (
          <span onClick={() => helloFromLabel(icon.name)} key={index} className="category-carousel-item">
            <img className="category-icon" 
              style={{ width: '25px', height: '25px' }}
              src={require(`../assets/img/categories/${icon.url}.png`)}
              alt={icon.url}
            />
            <p className='category-name'>{icon.name}</p>
          </span>
        )
      })}

    </div>







    // <div className="carousel-item" style={{ width: width }}>
    //   <img
    //     style={{ width: '25px', height: '25px' }}
    //     src={require(`../assets/img/categories/${categoryUrl}.png`)}
    //     alt={categoryUrl}
    //   />
    // </div>
  )
}


