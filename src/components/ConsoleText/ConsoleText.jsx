import React, { useState, useEffect } from 'react';
import './ConsoleText.css';

const ConsoleText = ({ words, colors }) => {
    useEffect(() => {
        if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = document.getElementById('console');
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.getElementById('text')
        target.setAttribute('style', 'color:' + colors[0])
        const intervalId1 = setInterval(function () {
            if (letterCount === 0 && waiting === false) {
                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount)
                setTimeout(function () {
                    var usedColor = colors.shift();
                    colors.push(usedColor);
                    var usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    target.setAttribute('style', 'color:' + colors[0])
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (letterCount === words[0].length + 1 && waiting === false) {
                waiting = true;
                setTimeout(function () {
                    x = -1;
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (waiting === false) {
                target.innerHTML = words[0].substring(0, letterCount)
                letterCount += x;
            }
        }, 120)
        const intervalId2 = setInterval(function () {
            if (visible === true) {
                con.className = 'console-underscore hidden'
                visible = false;
            } else {
                con.className = 'console-underscore'
                visible = true;
            }
        }, 400)
        return () => {
            clearInterval(intervalId1);
            clearInterval(intervalId2);
        };
    }, [words, colors]);

    return (
        <div className="console-container">
            <span id="text"></span>
            <div className="console-underscore hidden" id="console">&#95;</div>
        </div>
    );
};
export default ConsoleText;