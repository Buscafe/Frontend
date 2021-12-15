export function Logo({ haveLink, width, height, fundo, cruz, link, id, className }){
    return (
        <>
            { haveLink ? (
                <a href={link} className="col-2 col-sm-6 col-md-5 col-lg-5 col-xl-3">
                    <svg svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 611 800">
                        <path id="Forma_1" data-name="Forma 1"  fill={fundo} fillRule="evenodd" d="M306,797s32.045,0.713,48-32c21.443-31.227,224.005-317.7,243-378,11.665-55.063,14.241-89.733,14-108S570.167,11.8,312,1C287.98-.046,29.52,10.75,0,289c0.372,18.663-6.032,85.431,66,196,72.032,105.849,184.468,270.013,190,278S277.681,797,306,797Z"/>
                        <path id="Forma_2_copiar_2" data-name="Forma 2 copiar 2" fill={cruz} fillRule="evenodd" d="M348,775V317H528s8.767-1.786,9-10,0-47,0-47-0.437-8.805-12-9-177,0-177,0V112s0.747-11.7-9-12-66,0-66,0-7.053.5-8,9c0.021,8.5,0,142,0,142H87s-9.193.976-10,9c-0.226,8.024,0,48,0,48s0.236,8.641,12,9,176,0,176,0V775s9.457,23.173,40,23S348,775,348,775Z"/>
                    </svg>
                </a>
            ) : (
                <div className="col" id={id}>
                    <svg svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 611 800">
                        <path id="Forma_1" data-name="Forma 1"  fill={fundo} fillRule="evenodd" d="M306,797s32.045,0.713,48-32c21.443-31.227,224.005-317.7,243-378,11.665-55.063,14.241-89.733,14-108S570.167,11.8,312,1C287.98-.046,29.52,10.75,0,289c0.372,18.663-6.032,85.431,66,196,72.032,105.849,184.468,270.013,190,278S277.681,797,306,797Z"/>
                        <path id="Forma_2_copiar_2" data-name="Forma 2 copiar 2" fill={cruz} fillRule="evenodd" d="M348,775V317H528s8.767-1.786,9-10,0-47,0-47-0.437-8.805-12-9-177,0-177,0V112s0.747-11.7-9-12-66,0-66,0-7.053.5-8,9c0.021,8.5,0,142,0,142H87s-9.193.976-10,9c-0.226,8.024,0,48,0,48s0.236,8.641,12,9,176,0,176,0V775s9.457,23.173,40,23S348,775,348,775Z"/>
                    </svg>
                </div>
            )}
        </>
    );
}