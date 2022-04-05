export function DataBox({ title, id, label, data }){
    let infos = [];
    for(let i = 0; i < data.length; i++){
        infos.push(
            <>
                <h4>{label[i]}</h4>
                <input 
                    value='a' 
                    type='text'
                />
            </>
        );
    }
    
    async function handleUpdate(e){
        e.preventDefault();

        console.log(data)
    }

    return (
        <div className='profile-box' id={id}>
            <div>
                <h2>{title}</h2>
                <button type="submit" onClick={handleUpdate}>Alterar</button>
            </div>
            

            {infos}
        </div>
    )
}