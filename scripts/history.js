import { calculatedPositions } from "./saveToLS.js";

document.getElementById('history').addEventListener('click', openCalcHistory);

function openCalcHistory() {
  const historyContainer = document.createElement('div');
  historyContainer.id = 'history-container';
  
  const calcContainer = document.getElementById('calc');
  calcContainer.appendChild(historyContainer);

  const positionsHistory = calculatedPositions.map((position, i) => `<object class='history-item'>
    ${i+1}.-
    <data>Min Leverage: ${position.leverage}</data>
    <data>Position SIZE: ${position.positionSIZE}</data>
    <data>Entry Price: ${position.entryPrice}</data>
    <data>Stop Loss: ${position.stopLoss}</data>
    <data>Take Profit: ${position.takeProfit}</data>
    <div>
      <button id="delete-one">Delete</button>
      <button id="load-position">Load</button>
    </div>
  </object>`).join('')
  || '<p>There are no positions saved</p>';

  historyContainer.innerHTML = `<div class="close-clearHistory_cont">
    <button id="clear-history">Clear History</button>
    <span id="close-history">X</span>
  </div>
  ${positionsHistory}`;

  document.getElementById('close-history').addEventListener('click', function() {
    closeHistory(calcContainer, historyContainer, this)
  })
};

function closeHistory(calcContainer, historyContainer, closeBtn) {
  calcContainer.removeChild(historyContainer);
  closeBtn.removeEventListener('click', closeHistory);
};