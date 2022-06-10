import { useState, useEffect } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { useChurches } from "../../../hooks/useChurches";

import { Button } from 'semantic-ui-react'

import PersonImage from '../../../Assets/images/PersonImage.svg'
import { ChurchesStyles } from "./style"
import { Alert, Skeleton, Stack} from "@mui/material";

export function Churches({ marginLeft }){
    const { getAllChurches, joinChurch, churchesMap, relations } = useChurches();
    const { user } = useAuth(); 
    const [isLoading, setIsLoading]   = useState(false);
    const [search, setSearch] = useState('')

    useEffect(async () => {
        await getAllChurches(user.id_user, user.religiao);
    }, [])

    

    const lowerSearch = search.toLowerCase()
    const allChurchSearch = churchesMap ? churchesMap.filter((data)=> (data.corpName).toLowerCase().includes(lowerSearch)) : churchesMap
  
    return (
        <ChurchesStyles marginLeft={marginLeft}>
            <div className="churches-container">
                <div className="churches-box">
                    <h1>IGREJAS</h1>
                    <span className="churches-total">{churchesMap ? churchesMap.length : 0}</span>

                    <div className="search">
                        <input
                            type="search" 
                            name="search"
                            placeholder="Encontre uma Igreja" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {allChurchSearch.code ===1 ? (
                        Alert(allChurchSearch.msg)
                    ) :(
                        <div className="all-churches">
                            <div className="itens">
                                {console.log(allChurchSearch)}
                                {allChurchSearch.map(church => {
                                    return (
                                        <div className="item">
                                            <div className="inner-item">
                                                <span className="imagem-wrapper">
                                                    <img src={PersonImage} alt="Imagem de Perfil"/>
                                                </span>
                                                <span className="address">
                                                    {church.localization.cidade} / {church.localization.estado}
                                                </span>
                                                <span className="name">
                                                <a href={"/User/Igrejas/"+church.id_corp}>{church.corpName}</a> 
                                                </span>
                                            </div>
                                            <div className="follow">
                                                <Button 
                                                    type="submit" id="affiliate" 
                                                    href={"/User/Igrejas/"+church.id_corp}
                                                    className={isLoading && 'loading'}
                                                >
                                                    Ver detalhes
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ChurchesStyles>
    )
}