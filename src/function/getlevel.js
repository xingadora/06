import { probability } from "./randomnumbergen.js";

let list = [];

function getLevel() {

    function checkTrue() {
        let rand = Math.random()
        let prob = (1.75 * Math.pow(rand, 3)) - (3.5 * Math.pow(rand, 2)) + (2.2 * Math.pow(rand, 1.4)) - (2.7 * Math.pow(rand, 1.2)) + (1.75 * rand) + 0.5;

        if (probability(prob)) {
            list.push(Math.floor(rand * 100) + 1);
            return true;
        } else {
            return false;
        }
    }
    
    while (true) {
        if (checkTrue()) {
            break;
        }
    }
    
}


let i = 0;
while (i < 10000) {
    getLevel();
    i++;
}


function compareNumbers(a, b) {
    return a - b;
}


let list2 = [];

list.forEach(element => {
    if (element <= 10) {
        list2.push(10);
    } else if (element <= 20) {
        list2.push(20);
    } else if (element <= 30) {
        list2.push(30);
    } else if (element <= 40) {
        list2.push(40);
    } else if (element <= 50) {
        list2.push(50);
    } else if (element <= 60) {
        list2.push(60);
    } else if (element <= 70) {
        list2.push(70);
    } else if (element <= 80) {
        list2.push(80);
    } else if (element <= 90) {
        list2.push(90);
    } else if (element <= 100) {
        list2.push(100);
    }
});


let ll = list2.sort(compareNumbers)

ll.forEach(element => {
    console.log(element);
});