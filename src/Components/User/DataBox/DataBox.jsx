export function DataBox({ title, id, label, data }){
    let infos = [];
    for(let i = 0; i < data.length; i++){
        infos.push(
            <>
                <h4>{label[i]}</h4>
                <div>{data[i]}</div>
            </>
        );
    }
    
    return(
        <div className='profile-box' id={id}>
            <h2>{title}</h2>

            {infos}
        </div>
    );
}