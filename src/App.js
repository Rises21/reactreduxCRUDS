import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';
import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLaptop } from "./app/features/reduxSlice";

const App = () => {
        const laptops = useSelector((state) => { return state.laptopData.data});
       // console.log(laptops," ????");
        const dispatch = useDispatch();
        //const [laptopState, setLaptopState] = useState(laptops);
        useEffect(() => {
            dispatch(fetchLaptop());
            
        }, [dispatch]);



  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact children={() => <Home laptops={laptops} />} />
          <Route path="/detail/:id" children={() => <Detail laptops={laptops} />} />
          <Route path="/edit" children={() => <Edit laptops={laptops} />} />
          <Route path="/tambah" children={() => <Tambah laptops={laptops} />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;