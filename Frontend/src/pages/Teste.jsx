import axios from 'axios';

export function Teste(){    
    const baseURL = 'http://localhost/Buscafe/Backend/'

    async function handlePostUser(){
        try {
            const response = await axios.post(`${baseURL}usuario/inserir`, {
                usuario:"teste2",
                senha:"teste123",
                nome:"teste post",
                tipo_usuario: "Administrador",
                usu_sistema: "admin"
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleGetUser(){
        try {
            const response = await axios.get(`${baseURL}usuario/consultar`, {
                data: {
                    usuario     : "igor",
                    nome        : "Luis Fernando",
                    tipo_usuario: "ADMINISTRADOR"
                }
            })

            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <button onClick={handlePostUser}>POST</button>
            <button onClick={handleGetUser}>GET</button>
        </div>
    );
}