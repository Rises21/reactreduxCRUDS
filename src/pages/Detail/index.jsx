import { Link } from "react-router-dom";
import './index.scss';
import { useLocation } from "react-router-dom";

const Detail = ({laptops}) => {
    const location = useLocation();
    const imageStyle = {
      maxWidth: '150px',
    }

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        
          {laptops.map((laptop, i) => {
              let priceInRP = [];
              for (const key in laptop) {
                if(key === 'price'){

                  let price = ''; 
                    price += laptop[key];
                  
                  for(let j = 0; j < price.length; j++) {
                    if (price.length === 8 || price.length === 5) {
                        if(j === 2 || j === 5 || j === 8){
                        priceInRP += ".";
                      }
                    }
                    if (price.length === 7 || price.length === 4) {
                        if(j === 1 || j === 4 || j === 7){
                        priceInRP += ".";
                      }
                    }
                      priceInRP += price[j];
                  }
                  
                }
              }
            if(location.pathname === `/detail/${laptop._id}`){
            return(
              <tbody key={i}>
                  <tr>
                    <td>ID</td>
                    <td>: {laptop._id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>: {laptop.name}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>: Rp.{priceInRP}</td>
                  </tr>
                  <tr>
                    <td>Stock</td>
                    <td>: {laptop.stock}</td>
                  </tr>
                  {laptop.image_url ?
                      <tr>
                        <td>Image</td>
                        <td style={{display: 'flex', alignItems: 'center', gap: '20px'}}>: <a href={laptop.image_url}> Image URL </a>
                        <img style={imageStyle} alt='gambar laptop' src={laptop.image_url}/>
                        </td>
                      </tr>                  
                   : null }
              </tbody>
            )             
            }

            return null;
          }) }

      </table>
    </div>
  )
}

export default Detail;