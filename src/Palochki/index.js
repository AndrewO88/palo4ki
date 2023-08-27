import './palochki.css';
import {palochkiQuantity, usePalochki} from "./usePalochki";

const Palochki = () => {
    const {palochki, isUserMove, toggleActive, activePalochki, makeMove, restartGame} = usePalochki()

    return (
        <div className="content" style={{pointerEvents: !!palochki.length && !isUserMove && "none"}}>
            <div className="title">Палочки
                <div className="aurora">
                    <div className="aurora__item"/>
                    <div className="aurora__item"/>
                    <div className="aurora__item"/>
                    <div className="aurora__item"/>
                </div>


                {!!palochki.length && <div className="palochki">
                    {palochki.map((_, i) => <div
                        key={i}
                        data-index={i}
                        onClick={toggleActive}
                        className={`palochka ${activePalochki.includes(i) ? isUserMove ? 'userActive' : 'pcActive' : ''}`}
                    />)}
                </div>}

            </div>

            {palochki.length === palochkiQuantity && !activePalochki.length &&
                <p className="subtitle">тягай толи одну толи две толи три..там дальше уже комп будет тягать.. кто
                    последний тягает то проиграл..</p>}


            {!!activePalochki.length && isUserMove && <button onClick={makeMove}>сделать ход</button>}


            {!palochki.length && <>
                <p className="subtitle">{!isUserMove ? 'ты' : 'комп'} проиграл..</p>
                <button onClick={restartGame}>некст ван</button>
            </>}
        </div>
    );
}

export default Palochki;