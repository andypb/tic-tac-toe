export default function Square({value = '', onClick = f => f}) {

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}
