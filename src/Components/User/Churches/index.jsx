import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { Button } from 'semantic-ui-react'
import { ProgressiveImg } from '../../ProgressiveImg/index.jsx'

import { useAuth } from "../../../hooks/useAuth";
import { useChurches } from "../../../hooks/useChurches";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import PersonImage from '../../../Assets/images/PersonImage.svg'
import { ChurchesStyles } from "./style"

export function Churches({ marginLeft }){
    const { getAllChurches, churchesMap } = useChurches();
    const { user } = useAuth(); 
    const [isLoading, setIsLoading]   = useState(false);
    const [search, setSearch] = useState('')
    const history = useHistory();


    useEffect(async () => {
        await getAllChurches(user.id_user, user.religiao);
    }, [])

    const lowerSearch = search.toLowerCase()
    const allChurchSearch = churchesMap ? churchesMap.filter((data)=> (data.corpName).toLowerCase().includes(lowerSearch)) : churchesMap
  
    function handleChurch(church){
        history.push({
            pathname: `/User/Igrejas/${church.corpName}`,
            state: { church }
        });
    }
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
                    {allChurchSearch.code === 1 ? (
                        Alert(allChurchSearch.msg)
                    ) :(
                        <div className="all-churches">
                            <div className="itens">
                                {allChurchSearch.map(church => {
                                    return (
                                        <div className="item">
                                            <div className="inner-item">
                                                <span className="imagem-wrapper">
                                                    <ProgressiveImg
                                                        src={church.image_url ? church.image_url : PersonImage}
                                                        alt="Imagem de Perfil"
                                                        loadingWidth={60}
                                                        loadingHeight={60}
                                                        color={church.color}
                                                    />
                                                </span>
                                                <span className="address">
                                                    {church.localization.cidade} / {church.localization.estado}
                                                </span>
                                                <span className="name">
                                                    {church.corpName}
                                                </span>
                                            </div>
                                            <div className="follow">
                                                <Button 
                                                    type="submit" id="affiliate" 
                                                    onClick={() => handleChurch(church)}
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