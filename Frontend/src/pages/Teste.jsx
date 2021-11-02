import axios from 'axios';
import { useEffect, useState } from 'react';

export function Teste(){
    useEffect(() => {
        axios.get('http://localhost/Buscafe/Backend/usuario/consultar')
        .then(function(response){
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])
    return(
        <div>
            
        </div>
    );
}