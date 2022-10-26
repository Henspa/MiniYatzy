import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Col, Grid, Row } from "react-native-easy-grid";
import styles from '../style/style';
//import { useFonts } from 'expo-font';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const MAX_SPOT = 6;
const BONUS_POINTS_LIMIT = 63

export default function Gameboard() {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [selectedDices, setSelectedDices] =
        useState(new Array(NBR_OF_DICES).fill(false));
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0)); 
    const [selectedDicePoints, setSelectedDicePoints] = 
        useState(new Array(6).fill(false));
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(6).fill(0));    

    /* const [loaded] = useFonts({
        'DancingScript' : require('../assets/fonts/DancingScript-VariableFont_wght.ttf') 
    });
    if (!loaded) {
        return null;
    }  */


    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
            <MaterialCommunityIcons
                name={board[i]}
                key={"row" + i}
                size={50}
                color={getDiceColor(i)}>
            </MaterialCommunityIcons>
            </Pressable>
        );
    }

    const row2 = [];
    for (let s = 1; s <= MAX_SPOT; s++) {
        row2.push( 
            <Pressable               
              key={"row2" + s}                   
              onPress={() => selectDicePoint(s)}> 
              
            <MaterialCommunityIcons
                name={'numeric-' + s + '-circle'}
                key={"row2" + s}
                size={50} 
                color={getDicePointColor(s)} > 
            </MaterialCommunityIcons>
            </Pressable> 
        );         
    }  
    
    const row3 = [];
    for (let spot = 0; spot < MAX_SPOT; spot++)
        row3.push(
            <Col key={"row3" + spot} >
                <Text
                style={styles.row}
                key={"row3" + spot} >{getDP(spot)}
                </Text>
            </Col>    
        ); 
    

    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [nbrOfThrowsLeft])


    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "#73CED6";
        }
        else {
            return selectedDices[i] ? "black" : "#ba89eb";
        }
    }

    function getDicePointColor(s) {
        if (board.every((val, s, arr) => val === arr[0])) {
            return "#73CED6";
        }
        else {
            return selectedDicePoints[s] ? "black" : "#ba89eb";
        }    
    } 

    function calculatePointsTotal() {
        let totalSum = 0;
        for (let s = 0; s < dicePointsTotal.length; s++) {
            totalSum += dicePointsTotal[s];
        }
        return totalSum;
    }

    function getDP(s) {
        return dicePointsTotal[s]
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
         /* if (selectedDices[i] === true ) {
            const sum = selectedDices[i].reduce((total, x) => total + (x == true), 0);
            let count = 0;
            for (let i = 0; i < selectedDices; ++i) {
                if (selectedDices[i] == true)
                count++;
            } 
            return sum; 
        } */
    }

    function selectDicePoint(s) {
        if (nbrOfThrowsLeft === 0) {
            let points = [...selectedDicePoints];
            points[s] = selectedDicePoints[s] ? false : true;
            setSelectedDicePoints(points);
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            setStatus('Throw dices');
            
            if (!points[s]) {
                points[s] = true;
                //let pointsTotal = [...dicePointsTotal]; 
            
                let nbrOfDices = 0;
                //let nbrOfDices = diceSpots.reduce((total, x) => (x === (s + 1) ? total + 1 : total), 0);
                for (let spot = 0; spot < diceSpots.length; spot++) {
                    if (diceSpots[spot] === s) {
                        nbrOfDices++;
                    }
                }
                pointsTotal[s] = nbrOfDices * (s + 1) ;
                setDicePointsTotal(pointsTotal);
            }
            /* else {
                setStatus('You already selected points for' + (s +1)); 
                return pointsTotal[s]; 
                
            }
            //pt.fill(false);
            setSelectedDices(s);
            setSelectedDicePoints(points);  */
        }
        
    }

    function checkWinner() {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft >= 0) {
            setStatus('All same dices, select your points.');
            //setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (board.every((val, s, arr) => val > arr[true]) && nbrOfThrowsLeft === 0) {
            setStatus('Game over.');
            setSelectedDicePoints(new Array(6).fill(false));
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        
    }

    function throwDices() {
        let ds = [...diceSpots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                ds[i] = randomNumber;
            }
            
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1); 
        setDiceSpots(ds);
        setStatus('Select and throw dices again');
        
    
    }

    return(
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>THROWS LEFT: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
             onPress={() => throwDices()}>
                <Text style={styles.buttonText}>Throw dices</Text>
            </Pressable>
            <Text style={styles.gameinfo}>TOTAL: {calculatePointsTotal()}</Text>
            <Text style={styles.text}>You are {(BONUS_POINTS_LIMIT - calculatePointsTotal())} points away from bonus. </Text>
            <View style={styles.row}><Grid>{row3}</Grid></View>
            <View style={styles.flex}><Grid>{row2}</Grid></View>
        </View>

    )
}