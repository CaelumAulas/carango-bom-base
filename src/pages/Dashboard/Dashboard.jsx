import React, {useState, useEffect} from 'react';
import VehicleService from '../../services/VehicleService';
import Grid from '@material-ui/core/Grid';
import './Dashboard.css'

export function sumVehiclesPrice(vehicles){
  return vehicles.reduce((total,item)=>total+item.price,0.0)
}



export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => fetchVehicles(), []);

  function fetchVehicles() {
    VehicleService.getAll().then((data)=>setVehicles(data.content))
  }

  function mapVehiclesInBrands(vehicles){
    let brands = []
    for(let vehicle of vehicles){
      let indexBrand = brands.findIndex((b)=>b.name === vehicle.marca.nome)
      if (indexBrand>=0){
        brands[indexBrand].vehicles.push(vehicle)
      } else {  
        const nameVehicle = vehicle.marca.nome
        brands.push({name:nameVehicle, vehicles:[vehicle]})
      }
    }
    return brands
  }
  var formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  

  return(
    <Grid container spacing={3}>
    {mapVehiclesInBrands(vehicles).map((brand)=>
    <Grid item xs={4} key={brand.name}>
    <article className="dashboard-item">
      <h3> {brand.name}</h3>
      <span>{brand.vehicles.length} veículos</span><br/>
      <span>{formatter.format(sumVehiclesPrice(brand.vehicles))}</span>
    </article>
    </Grid>
    )}
    </Grid>
  )
  
}
