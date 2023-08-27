import {useEffect, useState} from 'react';

export const palochkiQuantity = 20

const initialPalochki = Array(palochkiQuantity).fill(null)

const getRandomNumber = (max = 10) => Math.floor(Math.random() * max) + 1;

const indexFromEvent = (e) => parseInt(e.target.getAttribute('data-index'), 10)

export const usePalochki = () => {
    const [palochki, setPalochki] = useState(initialPalochki);
    const [activePalochki, addActivePalochka] = useState([]);
    const [isUserMove, setUserMove] = useState(true);
    const [isPCmoveComplete, setPCmoveComplete] = useState(false);

    const toggleActive = (e) => {
        const index = indexFromEvent(e)
        addActivePalochka(prevState => prevState.includes(index) ? prevState.filter((value) => value !== index) : [...prevState, index].slice(-3));
    };

    const makeMove = () => {
        setPalochki((prevState) => prevState.filter((_, i) => !activePalochki.includes(i)))
        addActivePalochka([])
        if (isPCmoveComplete) {
            setPCmoveComplete(false)
        }
        if (palochki.length) {
            setUserMove(!isUserMove)
        }
    };

    const restartGame = () => {
        setPalochki(initialPalochki)
        setUserMove(true)
        setPCmoveComplete(false)
        addActivePalochka([])
    }

    const repeatMoveWithInterval = (count) => {
        if (count <= 0) {
            return setPCmoveComplete(true)
        }
        addActivePalochka((prev) => [...prev, getRandomNumber(palochki.length)]);

        setTimeout(() => {
            repeatMoveWithInterval(count - 1)
        }, 800);
    }

    useEffect(() => {
        if (!isUserMove) {
            if (palochki.length > 3) {
                return repeatMoveWithInterval(getRandomNumber(3));
            }
            addActivePalochka(palochki.length === 3 ? [0, 1] : [0]);
            setTimeout(() => {
                setPCmoveComplete(true)
            }, 800);
        }
    }, [isUserMove])

    useEffect(() => {
        if (isPCmoveComplete) {
            makeMove()
        }
    }, [isPCmoveComplete])

    return {palochki, isUserMove, toggleActive, activePalochki, makeMove, restartGame}
}
