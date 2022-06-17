import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

export function ProgressiveImg ({ src, alt, loadingWidth, loadingHeight, color='#F3B72B'}){
    const [isLoading, setIsLoading] = useState(true);
    const [typeSvg, seTypeSvg] = useState(false);

    const styles = {
        border: `2px solid ${color}`, 
   };

    useEffect(() => {
        if(!src){
            seTypeSvg(true);
            return;
        }

        const img = new Image();
        img.src = src;
        img.onload = () => {
            setIsLoading(false);
        };
    }, [src]);

    if(typeSvg){
        return (
            <svg viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26.5" cy="26.5" r="26.5" fill="var(--admin-color)"/>
                <path d="M11.5625 42.0807C16.4754 29.307 33.8344 27.6694 40.7125 42.0807" stroke="#F3F3F3" stroke-width="3"/>
                <circle cx="26.3016" cy="19.7708" r="7.67079" stroke="#F3F3F3" stroke-width="3"/>
            </svg>
        )
    }

    return isLoading ?(
        <Skeleton variant="circular" animation="wave" width={loadingWidth} height={loadingHeight}/>
    ) : (
        <img
          src={src}
          alt={alt}
          id='profileImage'
          style={styles}
        />      
    );
}