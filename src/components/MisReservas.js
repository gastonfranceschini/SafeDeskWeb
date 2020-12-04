import React from 'react';
import Container from "@material-ui/core/Container"
import Header from "../shared/Header"
import Sidebar from "./Sidebar"
import { FixedSizeList as List } from 'react-window';

const MisReservas = (prop) => {

  const Row = ({ index, style }) => (
    <div style={style}>Row {index}</div>
  );
   
  const Example = () => (
    <List
      height={200}
      itemCount={50}
      itemSize={35}
      width={450}
    >
      {Row}
    </List>
  );

    return (  
    
      <div>
        <Header/>
        <Sidebar/>
        <div>
          <Container maxWidth="sm">
            <h1 className='ExpertaText'>Mis Reservas</h1>
            <p>Reservas Proximas</p>
            <Example/>
            <p>Reservas Historicas</p>
            <Example/>
          </Container>
        </div>
      </div>
    )
}

export default MisReservas;