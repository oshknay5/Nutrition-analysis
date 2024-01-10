function Nutrition({ label, quantity, unit }){

    return(
        <div className="block-nutrition">
            <p className="item-nutrition">{label} - {quantity.toFixed(2)} {unit}</p>
        </div>

    );
}
export default Nutrition;