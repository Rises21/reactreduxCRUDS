import { useLocation } from "react-router-dom/cjs/react-router-dom";
import Input from "../../components/Input";
import { useState } from "react";
import { fetchLaptop, updateLaptop } from "../../app/features/reduxSlice";
import { useDispatch } from "react-redux";




const Edit = ({laptops}) => {
      const imageStyle = {
      maxWidth: '150px',
    }

  const location = useLocation();
  
  let laptopToEdit = {};  
  laptops.forEach(laptop => {
    if(location.pathname === `/edit/${laptop._id}`){
                  //console.log(laptop,">>>>");
                  laptopToEdit = laptop;
                    return laptop;
               }
  })

     const [value,setValue] = useState({
      ...laptopToEdit
  })

        console.log(value,"<<<<<" , laptopToEdit,">>>>>");

        const dispatch = useDispatch();

        const [statusUpdate, setStatusUpdate] = useState(false);
        const onSubmit = async (e)  => {
            e.preventDefault();
            setStatusUpdate(true, [statusUpdate])
                  //console.log(value,"inivalue update <<<<<<");
                const fet = await dispatch(updateLaptop(value));
                if (fet) {
                  dispatch(fetchLaptop());
                }
          }
  return (
    <div className="main">
    { statusUpdate ? <span style={{backgroundColor: 'green',color: 'white',padding: '15px',width: '100vh'}}>Laptop Update Successfully.</span> : null}
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
              <form onSubmit={onSubmit}>
                <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={value.name} onChange={e => setValue({...value, name: e.target.value})} />
                <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={Number(value.price)} onChange={e => setValue({...value, price: Number(e.target.value)})} />
                <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" value={Number(value.stock)} onChange={e => setValue({...value, stock: Number(e.target.value)})} />
                {value.status ? 
                <Input name="status" type="checkbox" label="Active" checked onChange={e => setValue({...value, status: e.target.checked})} /> 
                : <Input name="status" type="checkbox" label="Not Active" onChange={e => setValue({...value, status: e.target.checked})} />}
                 
                  {value.image_url ?
                        
                        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}><span>Image</span> : <a href={value.image_url}> Image URL </a>
                        
                        <img style={imageStyle} alt='gambar laptop' src={value.image_url}/>
                        </div>   
                   : null }
                 
                <Input name="image" type="file" label="Upload Device Image :" accept="image/png, image/jpeg" onChange={e => setValue({...laptopToEdit, image: e.target.files[0]})} /> 
                <button type="submit" className="btn btn-primary">Simpan</button>
              </form>
      </div>
    </div>
   )
  
}
export default Edit;