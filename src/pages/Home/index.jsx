import { Link } from 'react-router-dom';
import './index.scss';
 import { useDispatch } from 'react-redux';
import { deleteLaptop, fetchLaptop, findLaptop } from '../../app/features/reduxSlice';
import { useEffect, useState } from 'react';





const Home = ({laptops}) => {

  const dispatch = useDispatch();
  
 const [deletedInfo, setDeletedInfo] = useState(false);
            const handleDelete = async (id) => {
            //console.log(id, "belum terdelete");

            if (id) {
            const del = await dispatch(deleteLaptop(id))
              setDeletedInfo(true, [deletedInfo])
              //console.log(id, "sudah terdelete !!!");
              if (del) {
                dispatch(fetchLaptop());
              }
            }
            
          }


          const [searchInput, setSearchInput] = useState("");

      const handleSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
      }


  useEffect(() => {
            if (searchInput.length > 0 ) {
          //console.log(searchInput.length,"<<search>>>>");
          dispatch(findLaptop(searchInput));
        } else if (searchInput.length === 0){
          dispatch(fetchLaptop());
        }
      
  },[dispatch, searchInput])

  return(
    <div className="main">
      
      <Link to="/tambah" className="btn btn-primary">Tamah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={handleSearch}/>
      </div>
      
      {deletedInfo? <div><br /><br /><span style={{backgroundColor: 'red',color: 'white',padding: '15px',width: '100vh'}}>Laptop Delete Successfully.</span></div> : null}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {
          laptops.map((laptop, i) => {
            ++i;
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
                    if (price.length === 6 || price.length === 3) {
                        if( j === 3 || j === 6){
                        priceInRP += ".";
                      }
                    }
                      priceInRP += price[j];
                  }
                  
                }
              }
            
            return(
              <tr className='laptopName' key={i}>
                <td>{i}</td>
                <td >{laptop.name}</td>
                <td className="text-right">RP.{priceInRP}</td>
                <td className="text-center">
                  <Link to={`/detail/${laptop._id}`} className="btn btn-sm btn-info">Detail</Link>
                  <Link to={`/edit/${laptop._id}`} className="btn btn-sm btn-warning">Edit</Link>
                  <Link to="#" className="btn btn-sm btn-danger" 
                   onClick={() => handleDelete(laptop._id)} >Delete</Link>
                </td>
              </tr>);
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default Home;