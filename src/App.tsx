import React, { useState, useEffect } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, hamsterCoin, mainCharacter } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Mine from './icons/Mine';
import Friends from './icons/Friends';
import Coins from './icons/Coins';

const App: React.FC = () => {
  const levelNames = [
    "Bronze", 
    "Silver", 
    "Gold",
    "Platinum", 
    "Diamond", 
    "Epic", 
    "Legendary", 
    "Master", 
    "GrandMaster", 
    "Lord"
  ];

  const levelMinPoints = [
    0, 
    5000, 
    25000, 
    100000, 
    1000000, 
    2000000, 
    10000000, 
    50000000, 
    100000000, 
    1000000000
  ];
// Assuming you have a function to get the current level based on coins
function getLevel(coins) {
    if (coins < 100000000) return 1;
    if (coins < 200000000) return 2;
    if (coins < 300000000) return 3;
    // Add more levels as needed
    return 4; // Default level
}

// Function to get the photo URL based on the level
function getPhotoUrl(level) {
    switch(level) {
        case 1: return 'https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=6449538529ffda2f&sxsrf=ADLYWII3NnwkxmF_6TQJ9gyIK19QM6j0OQ:1728136516898&q=image+with+url&udm=2&fbs=AEQNm0AAii1lAhsPaaai4wByEaaipRAHWexzqXOes0FJK1_cCNcUFPPaxlyqBmr552nx3oL5xZP8HIFJxElufwB5WF5UKTDUnRKL_eqG28AF_DoPZeWiucw3EzD_RyRGpUglInO9uy791mshIxDlRBd9mdi-zij_foqgLJcCTUBBXz-QnJ1mn7t2lotifXf61QrfXW-BEh5727s1oq2JuHlPFKMDZqp5BA&sa=X&ved=2ahUKEwi67NmZsveIAxUgyzgGHQ2IIVAQtKgLegQIJBAB';
        case 2: return 'https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=6449538529ffda2f&sxsrf=ADLYWII3NnwkxmF_6TQJ9gyIK19QM6j0OQ:1728136516898&q=image+with+url&udm=2&fbs=AEQNm0AAii1lAhsPaaai4wByEaaipRAHWexzqXOes0FJK1_cCNcUFPPaxlyqBmr552nx3oL5xZP8HIFJxElufwB5WF5UKTDUnRKL_eqG28AF_DoPZeWiucw3EzD_RyRGpUglInO9uy791mshIxDlRBd9mdi-zij_foqgLJcCTUBBXz-QnJ1mn7t2lotifXf61QrfXW-BEh5727s1oq2JuHlPFKMDZqp5BA&sa=X&ved=2ahUKEwi67NmZsveIAxUgyzgGHQ2IIVAQtKgLegQIJBAB';
        case 3: return 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEzNjUuMzMzIiBoZWlnaHQ9IjEzNjUuMzMzIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0Ij48cGF0aCBkPSJNNDcyIDEwNi42Yy0xLjkuMi04IC45LTEzLjUgMS40LTc4LjIgOC4yLTE1NS4yIDQxLjMtMjE4IDkzLjktMTEuNiA5LjYtMzggMzYtNDcuNiA0Ny42LTUyIDYyLjEtODIuNCAxMzEuOC05My42IDIxNC4zLTIuNSAxOC4zLTIuNSA4MC4xIDAgOTguNCAxMS4yIDgyLjUgNDEuNiAxNTIuMiA5My42IDIxNC4zIDkuNiAxMS42IDM2IDM4IDQ3LjYgNDcuNiA2Mi4xIDUyIDEzMS44IDgyLjQgMjE0LjMgOTMuNiAxOC4zIDIuNSA4MC4xIDIuNSA5OC40IDAgODIuNS0xMS4yIDE1Mi4yLTQxLjYgMjE0LjMtOTMuNiAxMS42LTkuNiAzOC0zNiA0Ny42LTQ3LjYgNTItNjIuMSA4Mi40LTEzMS44IDkzLjYtMjE0LjMgMi41LTE4LjMgMi41LTgwLjEgMC05OC40LTExLjItODIuNS00MS42LTE1Mi4yLTkzLjYtMjE0LjMtOS42LTExLjYtMzYtMzgtNDcuNi00Ny42LTYxLjktNTEuOC0xMzIuMy04Mi42LTIxMy43LTkzLjUtOC44LTEuMi0yMS42LTEuNy00NS4zLTEuOS0xOC4xLS4yLTM0LjYtLjEtMzYuNS4xem01IDQzLjJjMCAxMS43LjggMzcuMSAxLjkgNjEuMi42IDExLjggMS4zIDI4LjcgMS42IDM3LjUgMS4xIDMxLjIgNC40IDExMy4xIDQuOSAxMjAuNGwuNSA3LjMtNC41LS41Yy0yLjUtLjItNC44LS44LTUuMi0xLjEtLjMtLjQtMS03LjMtMS40LTE1LjQtMS44LTM1LjYtNy43LTE3My43LTguMy0xOTMuOWwtLjYtMjIuMiAyLjgtLjRjMS41LS4yIDQtLjUgNS42LS42bDIuNy0uMXY3Ljh6bTk1LjctMi40Yy4xLjEuNCAzMC4zLjcgNjcuMS40IDM2LjkuOSA3MCAxLjIgNzMuNi4zIDMuNy4yIDYuOS0uMyA3LjEtLjQuMy0yLjkuMy01LjQgMGwtNC42LS40LS43LTI5LjFjLS40LTE2LjEtLjktMzMuOS0xLjEtMzkuNy0uOC0xNy43LTEuNS03Ny44LS45LTc5LjMuNC0xLjEgMS41LTEuMiA1LjctLjUgMi45LjYgNS4zIDEuMSA1LjQgMS4yem0tMjMxLjMgMzMuNWMuNi45IDUuMyA1NiAxMS4xIDEyOC4xIDEuOSAyNC41IDMuOCA0Ni45IDQuMSA0OS43LjUgNS4xLjQgNS4zLTIuOCA3LjMtMS44IDEuMS0zLjYgMi00IDItLjMgMC0uOS0yLjYtMS4yLTUuOC0xLjQtMTMtNi44LTc1LjgtMTAuNi0xMjEuMi0yLjItMjYuNy00LjItNTAuNi00LjUtNTMuMi0uNS00LjQtLjQtNC44IDIuMi02LjIgMy4yLTEuNyA1LTIgNS43LS43ek02MTYuNyAyMDFjMi44IDEgMy4xIDEuNSAzLjcgNy4yIDEgMTAgLjcgNTcuOC0uNCA1Ny44LTIuOSAwLTguOS0zLjQtOS40LTUuMy0uMy0xLjItLjYtMTUuNC0uNi0zMS41IDAtMzIuNS0uNC0zMC42IDYuNy0yOC4yek00MzIgMjA1LjdjMCAyLjcuNyAxNy42IDEuNSAzMy4zLjggMTUuNyAxLjcgMzUuNiAyLjEgNDQuMi43IDE3LjQuOSAxNi44LTUuOCAxNy4yLTMuMy4xLTMuMy4xLTMuNS00LjktLjItMi44LS43LTExLjUtMS4zLTE5LjUtLjUtOC0xLjctMjUuMy0yLjUtMzguNXMtMS44LTI2LjMtMi4xLTI5LjFjLS42LTUtLjUtNS4yIDIuMi02LjIgMS42LS42IDQuNC0xLjEgNi4yLTEuMSAzLjItLjEgMy4yLS4xIDMuMiA0LjZ6bTI3Ny40IDEzLjdsMy40IDEuNC43IDEzLjRjLjMgNy4zLjUgMjMuMS4zIDM1bC0uMyAyMS44LTQuMi0yLjEtNC4yLTItLjMtMzMuMmMtLjItMTguMy0uMS0zMy44LjEtMzQuNS40LTEuNS40LTEuNSA0LjUuMnptLTE4Mi42IDEzLjFjLjYuNiAyIDQ5LjEgMi4xIDczLjdsLjEgMTQuOC00LjctLjdjLTIuNy0uMy00LjktLjYtNS0uNy0uMy0uMi0zLjMtNzQuMy0zLjMtODEuNXYtNy40bDUuMS42YzIuOS40IDUuNC45IDUuNyAxLjJ6bTIzMC4zIDcuMWMxLjIgMS40IDEuNCAyMy4zIDEuNyAxNDQuMS4zIDEzOC43LjMgMTQyLjMtMS41IDE0Mi4zLTEuMSAwLTIuNi0uNi0zLjUtMS4zLTEuNS0xLjEtMS43LTEzLjItMi4yLTEzMS43LS40LTcxLjgtLjktMTM3LTEuMi0xNDQuOWwtLjYtMTQuNCAyLjkgMi4xYzEuNyAxLjIgMy42IDIuOSA0LjQgMy44em0tODkuNyAyMC41Yy41LjQgMSA2LjEgMS4xIDEyLjYuNSAyMi4xLjYgMTU3LjYuMSAxNTgtLjIuMi0yLS4zLTQtMS4xbC0zLjYtMS41VjI1OGwyLjguNmMxLjUuNCAzLjEgMSAzLjYgMS41em0tMjc2IDUuNmMuMyAyLjcuOCA4LjggMS4xIDEzLjguMyA0LjkgMSAxNi4xIDEuNiAyNC44IDEuMiAxNy42IDEgMTguNy00LjcgMTguNy0zIDAtMy40LS4zLTMuOC0zLjMtMS01LjktNC41LTU1LjEtNC01NS45LjUtLjcgNS43LTIuNSA4LjEtMi43LjYtLjEgMS40IDIgMS43IDQuNnpNMjI2IDI5MS4yYzEuMSAxMC42IDMuMyAzMi44IDQuOSA0OS4zIDEuNyAxNi41IDMuMSAzMC41IDMuMSAzMS4xIDAgMS4yLTcuNyA1LTguNSA0LjItLjUtLjUtMTAuNS04OS0xMC41LTkzIDAtMi40IDcuNy0xMi41IDguNy0xMS40LjMuMiAxLjMgOS4xIDIuMyAxOS44em0zOTIuMSAxMC41bDIuOSAxLjcuMSAyMS42Yy4xIDExLjguMyAyNSAuMyAyOS4zLjIgOS0uOSAxMC41LTYuMyA4LjZsLTMuMS0xLjF2LTguNmMwLTQuOC0uMy0xOC43LS43LTMxbC0uNi0yMi4yaDIuM2MxLjIgMCAzLjUuOCA1LjEgMS43em0tMzQ4LjIgMzguOGMxLjggMTkuMiA0LjcgNTEuNiA2LjYgNzJsMy40IDM3LTMuOSAzLjktMy44IDMuOS0uNy03LjljLS40LTQuNC0yLjQtMjQuOC00LjUtNDUuNC0yLjEtMjAuNi01LjEtNTAuNS02LjYtNjYuNGwtMi44LTI4LjggMy45LTMuNmMzLjUtMy4zIDMuOS0zLjQgNC42LTEuNi40IDEgMi4xIDE3LjYgMy44IDM2Ljl6TTE5NSAzNTIuNmMyLjIgMTkuNyA4IDcyLjEgMTMgMTE2LjQgNSA0NC4zIDkuNyA4NyAxMC42IDk1IC44IDggMi4yIDIwLjEgMyAyNyAxLjQgMTEuNyAxLjQgMTIuNS0uMiAxMy43LTIuNCAxLjgtMy40IDEuNi0zLjQtLjUgMC0uOS0uOS04LjUtMi0xNi43LTEuOC0xMy43LTQuOC0zNi45LTExLjUtODktMS40LTEwLjUtNC4xLTMxLjQtNi00Ni41LTItMTUuMS00LjktMzcuNi02LjUtNTAtMS42LTEyLjQtNC4zLTMzLjYtNi00Ny4zLTEuOC0xMy42LTIuOS0yNS43LTIuNi0yNyAuNy0yLjcgNi42LTEyLjEgNy4yLTExLjUuMi4zIDIuMiAxNi42IDQuNCAzNi40em0tMzAuNiA0My4xYzEuNSAxMiA0LjMgMzMuOSA2LjIgNDguOCAxLjkgMTQuOCA0LjMgMzMuMyA1LjQgNDFsMS45IDE0LTIuMSAxLjhjLTEuMiAxLTIuNCAxLjQtMi44IDEtLjQtLjQtMS4yLTQuNC0xLjgtOC44LS42LTQuNC00LjMtMzAuMS04LjMtNTdsLTcuMS00OSAyLjMtNi44YzEuMi0zLjcgMi41LTYuNyAyLjgtNi43LjQgMCAxLjkgOS44IDMuNSAyMS43em01NDktMTMuMWMxLjQgMS40IDEuNiA3LjYgMS42IDUzLjVWNDg4aC0yLjhjLTYuMSAwLTYgMS41LTYuNC01NS4zbC0uMy01MS43aDMuMmMxLjcgMCAzLjkuNyA0LjcgMS42em0tMjE4LjkgMTcuOWMyMi42IDMuNCA0Mi4zIDkuNyA2MS44IDE5LjcgMTIuNiA2LjUgMTguNiAxMSAzMi42IDI0LjQgMjAuOCAxOS45IDMzLjYgMzcuMyA0NS42IDYxLjlDNjUyIDU0Mi4zIDY1OC44IDU3NCA2NjcuNCA2NTljMy45IDM4LjEgOSAxMDcuMiAxMC4xIDEzNS41LjMgOC4yIDEgMjEuNyAxLjYgMzAgMS4xIDE3LjYgMi40IDE1LjItMTMuMSAyMi43LTIxLjUgMTAuNC00Mi4yIDE3LjYtNjkuNSAyNC4zLTMzLjQgOC4yLTU1IDEwLjgtODggMTAuOWwtMjQgLjEuMi0xMS41YzAtNi4zLjYtMjEgMS4yLTMyLjUgMy01NS43IDIuNC0xMjYtMS41LTE2NS0yLjItMjIuNC02LjUtNDkuNi04LjktNTUuNi0uNS0xLjMgMS44LTIuNCAxMS43LTUuOCAxOC4xLTYuMyAzMy44LTE0LjIgMzYuMi0xOC4xIDQuMy03LjQtMy40LTE4LTEzLjItMTgtMS43IDAtNi44IDEuOC0xMS41IDMuOS0yMi40IDEwLjMtNjcuMyAyMi40LTkzLjIgMjUuMS0xNy45IDEuOS00NS43LjgtNjUtMi43LTEwLjUtMS45LTI5LjMtOS00NS0xNy4xLTE4LjEtOS40LTI5LjItMjEuOS0zMi41LTM2LjctMS44LTgtMS4zLTI0IDEtMzMgMi41LTkuOSA5LjUtMjQuMyAxNS45LTMyLjcgMjguNS0zNy41IDg3LjMtNzAgMTQ3LjYtODEuNCAxOS4yLTMuNiA0Ni40LTQgNjctLjl6bTMwOC41IDMuMWMzLjYgMS41IDQgMS45IDQgNS4zLjIgMjcuMy0uNCA4OS43LS45IDkyLjMtLjEuOS01LjMgMS03LjUuMi0xLjQtLjUtMS42LTUuOS0xLjYtNTAgMC0zMS42LjQtNDkuNCAxLTQ5LjQuNSAwIDIuOC43IDUgMS42em00My43IDU0LjlsMy42IDEuNS0uNyA4Mi44Yy0uOCAxMDUuNS0uOSAxMDguNi00LjcgMTE3LjctNi4yIDE0LjktNS45IDE3LjktNS4zLTQ3LjUuMi0zMi43LjctNjUuOC45LTczLjUuMi03LjcuNC0yOS40LjUtNDguMyAwLTIyLjguMy0zNC4yIDEtMzQuMi42IDAgMi43LjcgNC43IDEuNXptLTYwMS40IDI0LjljLjYgOC4xLjQgOC45LTIuNSAxNS4zbC0zLjIgNi44LTEuMi0xMGMtMS45LTE2LTEuOS0xNi43IDEuOS0xOS4xIDEuNy0xLjIgMy41LTIgMy44LTEuOC4zLjIuOSA0LjIgMS4yIDguOHptLTYxLjggNjAuM2MuOSA4LjIgNy45IDYyLjYgMTEuNSA4OS4zIDUuNCA0MS4zIDUuOCA0Ny4yIDMuNCA0NC43LS4zLS4zLTIuNi0xNC4yLTUtMzAuOS0xNS42LTEwNy44LTE1LjUtMTA3LjEtMTQuMi0xMDcuOSAyLjctMS44IDMuNi0uOCA0LjMgNC44em03MiA0NS44Yy42IDIuNSAzLjUgMjkuNiAzLjUgMzIuOSAwIDIuOC0zLjYgNS40LTUuMiAzLjgtLjUtLjUtMS44LTktMi44LTE4LjgtMS4xLTkuOS0yLjItMjAuMi0yLjUtMjIuOWwtLjYtNSAzLjUgNGMyIDIuMiAzLjggNC45IDQuMSA2em04MC43IDM3LjdjMS4xIDEgMS44IDUgMi43IDE1LjggMS41IDE5LjUgMS43IDE4LTIuNCAxOC00LjIgMC00LjEuMy01LjUtMTcuMy0xLjQtMTcuOS0xLjQtMTcuNyAxLjMtMTcuNyAxLjMgMCAzIC42IDMuOSAxLjJ6bTc5LjIgMS41Yy4yIDEgLjcgNyAxLjEgMTMuMy4zIDYuMyAxLjIgMjAuNSAyIDMxLjUgMi44IDQwLjQgMi45IDQ1LjUgMS4yIDQ1LjUtMS45IDAtMi4xLTEuNS00LjMtMzAtLjgtMTEuOC0yLjMtMzAuNC0zLjMtNDEuMy0uOS0xMC45LTEuNS0yMC0xLjItMjAuMiAxLjEtMS4yIDQtLjMgNC41IDEuMnptLTE4OCAxOS4yYy42LjkgNC40IDMyLjkgOS4xIDc2LjYgMS40IDEzLjIgMi44IDI1LjkgMy4xIDI4LjNsLjUgNC4zLTIuNS0xLjZjLTEuOS0xLjMtMi42LTIuNi0yLjYtNC45IDAtNi4zLTQuMy00Ny44LTcuNi03My4yLTEuOS0xNC40LTMuNC0yNy4xLTMuNC0yOC4zIDAtMi4xIDIuNC0yLjkgMy40LTEuMnptNTc3LjEgNDEuOGwtLjcgNDEuOC0yLjUgMy43Yy01LjcgOC40LTUuNCAxMC01LjEtMzYuOGwuMi00Mi45IDMuNy0zLjhjMi0yIDQtMy43IDQuNC0zLjcuMyAwIC4zIDE4LjggMCA0MS43ek03MTIgNzU2Yy41IDU4LjEuNCA2Mi42LTEuMiA2NC40LTEgMS4xLTEuOSAxLjgtMi4yIDEuNS0uNy0uOC0xLjctMTI3LjUtLjktMTI4LjIuNC0uNCAxLjQtLjYgMi4zLS41IDEuMy4zIDEuNiA3LjQgMiA2Mi44em0tMzI2LjYtMzkuOGMuNyA2LjIgMy4yIDM1LjkgNC4yIDQ5LjkuNiA5LjQuNiA5LjctMS42IDEwLjQtMS4yLjQtMi42LjMtMy0uMi0uNy0uNy0yLjktMjIuOS01LjYtNTcuMWwtLjctOC4yaDMuMWMyLjkgMCAzLjEuMiAzLjYgNS4yem0tNzguNiAzNWMuNy43IDEuMiAzLjIgMS4yIDUuNyAwIDIuNiAxLjIgMTYuMSAyLjUgMzAuMSAzLjggMzguMyA0LjEgNDMuNSAyLjQgNDIuNS0yLjYtMS41LTQuOS0zLjgtNC40LTQuNC4yLS40LS4yLTUuNC0xLTExLjEtLjctNS44LTEuNi0xNS4yLTItMjEtLjQtNS44LTEuMy0xNi40LTIuMS0yMy41LTEuOS0xNy41LTEuOC0xOS41LjQtMTkuNSAxIDAgMi4zLjUgMyAxLjJ6bTQ3LjMgNjcuM2MuMyAyLjIuOSAxMC40IDEuMyAxOC4yLjcgMTUgLjQgMTYuMS0zLjcgMTMtMS4yLS45LTItNC43LTMuMi0xNi4xLTIuMS0yMC42LTIuMi0xOS44IDEuNy0xOS40IDIuOS4zIDMuMy43IDMuOSA0LjN6Ii8+PHBhdGggZD0iTTMxOC40IDQ0OC40QzMwOCA0NTIuOSAzMDcuMiA0NjcgMzE3IDQ3MmM3LjEgMy42IDE0LjMgMS45IDE4LTQuMyA3LTExLjQtNC40LTI0LjYtMTYuNi0xOS4zek0zODYuMiA0NThjLTkuNiA1LjktOS42IDIwLjEgMCAyNiA5LjUgNS43IDIxLjgtMS44IDIxLjgtMTMuMiAwLTExLTEyLjYtMTguNC0yMS44LTEyLjh6Ii8+PC9zdmc+Cg==';
        // Add more cases as needed
        default: return 'url_to_default_photo';
    }
}

// Function to update the photo based on the current coins
function updatePhoto(coins) {
    const level = getLevel(coins);
    const photoUrl = getPhotoUrl(level);
    document.getElementById('player-photo').src = photoUrl;
}

// Example usage
const coins = 15; // This would be dynamically set based on your game logic
updatePhoto(coins);

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 50000;
  const profitPerHour = 10000000;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length]);

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints(prevPoints => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
              <Hamster size={24} className="text-[#d4d4d4]" />
            </div>
            <div>
              <p className="text-sm">PiKaChu (CEO)</p>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm">{levelNames[levelIndex]}</p>
                  <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                  <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <Settings className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-flative">
                <div className="dot"></div>
                <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily cipher</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyCipherTimeLeft}</p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily combo</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyComboTimeLeft}</p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2">
                <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
                <p className="text-4xl text-white">{points.toLocaleString()}</p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div
                className="w-80 h-80 p-4 rounded-full circle-outer"
                onClick={handleCardClick}
              >
                <div className="w-full h-full rounded-full circle-inner">
                  <img src={mainCharacter} alt="Main Character" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fixed div */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
        <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
          <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Exchange</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <Mine className="w-8 h-8 mx-auto" />
          <p className="mt-1">Mine</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <Friends className="w-8 h-8 mx-auto" />
          <p className="mt-1">Friends</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <Coins className="w-8 h-8 mx-auto" />
          <p className="mt-1">Earn</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Airdrop</p>
        </div>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </div>
  );
};

export default App;
