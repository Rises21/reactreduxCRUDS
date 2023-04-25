
import React, { useEffect, useState } from 'react';
 import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import './index.scss';
import { addLaptop, fetchLaptop } from '../../app/features/reduxSlice';


const Tambah = () => {

  const [value,setValue] = useState({
            name: '',
            price: 0,
            stock: 0,
            status: false
  })
  const dispatch = useDispatch();

  const [statusAdd, setStatusAdd] = useState(false);
  const [chekbox, setChekbox] = useState(false);
  const onSubmit = async (e)  => {
      e.preventDefault();
      setStatusAdd(true, [statusAdd])
            //console.log(value,"inivalue react <<<<<<");
           const ad = await dispatch(addLaptop(value));
        if (ad) {
          dispatch(fetchLaptop());
        }
    }

  
  useEffect((addedLaptop) => {
    if (addedLaptop) {
      setValue({
            name: '',
            price: 0,
            stock: 0,
            status: false,
            image: {}
      })
    }
},[]);

  return (
    <div className="main">
      { statusAdd ? <span style={{backgroundColor: 'green',color: 'white',padding: '15px',width: '100vh'}}>Laptop Add Successfully.</span> : null}
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={onSubmit} >
          <Input onChange={e => setValue({...value, name: e.target.value})} value={value.name} name="name" type="text" placeholder="Nama Produk..." label="Nama"/>
          <Input onChange={e => setValue({...value, price: Number(e.target.value)})} value={Number(value.price)} name="price" type="number" placeholder="Harga Produk..." label="Harga"/>
          <Input onChange={e => setValue({...value, stock: Number(e.target.value)})} value={Number(value.stock)} name="Stock" type="number" placeholder="Stock Produk..." label="Stock"/>
          {chekbox ? 
                <Input name="status" type="checkbox" label="Active" checked onChange={e => setChekbox(e.target.checked)} /> 
                : <Input name="status" type="checkbox" label="Not Active" onChange={e => setChekbox(e.target.checked)} />}
          <Input name="image" type="file" label="Upload Device Image :" accept="image/png, image/jpeg" onChange={e => setValue({...value, image: e.target.files[0]})} /> 
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;