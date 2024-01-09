import {
  valueInputs,
  riskAmount,
  profitAmount,
  profitPerc,
  leverage,
  positionSIZE,
  risk_rewardRatio,
} from "./calculator.js";

let lastBalanceAndRisk = JSON.parse(localStorage.getItem('balance-riskPerc')) || {};

const [,, balanceInput, riskPercInput] = [...valueInputs];

if (lastBalanceAndRisk.lastBalance) {
  balanceInput.value = lastBalanceAndRisk.lastBalance;
}
if (lastBalanceAndRisk.lastRiskPerc) {
  riskPercInput.value = lastBalanceAndRisk.lastRiskPerc;
}

[balanceInput, riskPercInput].forEach(input => input.addEventListener('change', () => saveBalnceAndRiskPerc(input)));

function saveBalnceAndRiskPerc(input) {
  if (input.id === 'blnc') {
    lastBalanceAndRisk = {
      ...lastBalanceAndRisk,
      lastBalance: input.value 
    }
  } else {
    lastBalanceAndRisk = {
      ...lastBalanceAndRisk,
      lastRiskPerc: input.value 
    }
  }

  localStorage.setItem('balance-riskPerc', JSON.stringify(lastBalanceAndRisk));
};

export const calculatedPositions = JSON.parse(localStorage.getItem('calculated-positions')) || [];

const afterCalc_btns = document.querySelectorAll('.after-calcBtn');

afterCalc_btns.forEach(btn => btn.addEventListener('click', () => afterCalcActions(btn)));

function afterCalcActions(actionBtn) {
  let btnClass = actionBtn.classList;

  switch (true) {
    case btnClass.contains('delete'):
      deletePositionfromHistory();
      break;

    case btnClass.contains('clear-all'):
      clearAllFields();
      break;

    case btnClass.contains('clear-position'):
      clear();
      break;

    case btnClass.contains('save-position'):
      savePosition(Date.now);
      break;

    default:
      break;
  }
};

function deletePositionfromHistory() {
  
}

function clearAllFields() {
  [...valueInputs].forEach(input => input.value = '');
};

function clear() {
  [...valueInputs].forEach(input => {
    if (input.id !== 'blnc' && input.id !== 'rskPrc') input.value = '';
  })
};

function savePosition(positionID) {
  let [entryPrice, stopLoss, balance, riskPercentage, takeProfit] = [...valueInputs].map(input => input.value);

  const newPosition = {
    positionID,
    entryPrice,
    stopLoss,
    balance,
    riskPercentage,
    takeProfit,
    riskAmount: riskAmount.value,
    profitAmount: profitAmount.value,
    profitPerc: profitPerc.value,
    leverage: leverage.value,
    positionSIZE: positionSIZE.value,
    risk_rewardRatio: risk_rewardRatio.value,
  }

  calculatedPositions.push(newPosition);

  localStorage.setItem('calculated-positions', JSON.stringify(calculatedPositions));
};
