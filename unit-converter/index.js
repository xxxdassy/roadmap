const lengthV = document.getElementById("length");
const weight = document.getElementById("weight");
const temperature = document.getElementById("temperature");

const lengthOptions = ["millimeter", "centimeter", "meter", "kilometer", "inch", "foot", "yard", "mile"];
const weightOptions = ["milligram", "gram", "kilogram", "ounce", "pound"];
const temperatureOptions = ["Celsius", "Fahrenheit", "Kelvin"];

let currentOption = ''

function setCurrentOption(options, setColor = "length") {
  options.map(option => {
    document.getElementById("convertFrom").insertAdjacentHTML('beforeend', `<option value=${option}>`);
    document.getElementById("convertTo").insertAdjacentHTML('beforeend', `<option value=${option}>`);
  })

  switch (setColor) {
    case 'length':
      lengthV.classList.add("select"); break;
    case 'weight':
      weight.classList.add("select"); break;
    case 'temperature':
      temperature.classList.add("select"); break;
  }

  currentOption = setColor;
}

function clearOption(setColor) {
  const convertFromOptions = document.querySelectorAll("#convertFrom option");
  const convertToOptions = document.querySelectorAll("#convertTo option");

  convertFromOptions.forEach(option => option.remove());
  convertToOptions.forEach(option => option.remove());

  switch (setColor) {
    case 'length':
      lengthV.classList.remove("select"); break;
    case 'weight':
      weight.classList.remove("select"); break;
    case 'temperature':
      temperature.classList.remove("select"); break;
  }
}

lengthV.addEventListener('click', () => {
  clearOption(currentOption);
  setCurrentOption(lengthOptions, "length");
});

weight.addEventListener('click', () => {
  clearOption(currentOption);
  setCurrentOption(weightOptions, "weight");
});

temperature.addEventListener('click', () => {
  clearOption(currentOption);
  setCurrentOption(temperatureOptions, "temperature");
});

setCurrentOption(lengthOptions);

const unitToConvert = document.getElementById("unitToConvert");
const convertFrom = document.getElementById("finaleConvertFrom");
const convertTo = document.getElementById("finaleConvertTo");
const convertButton = document.getElementById("convert");

function showResult(unit, typeConvertFrom, typeConvertTo, result) {
  const div = document.querySelector(".ConvertSection");
  div.innerHTML = `
    <p>Result of your calculation</p>
    <h1>${unit} ${typeConvertFrom} = ${result}${typeConvertTo}</h1>
    <button id="reset">Reset</button>
  `

  const resetButton = document.getElementById("reset")
  resetButton.addEventListener("click", () => {
    reset();
    lengthV.style.pointerEvents = "auto";
    weight.style.pointerEvents = "auto";
    temperature.style.pointerEvents = "auto";
  })
}

function reset() {
  window.location.reload();
}

function convert(unitValue, convertFromValue, convertToValue) {
  const conversionFactors = {
    millimeter: 1000,
    centimeter: 100,
    meter: 1,
    kilometer: 0.001,
    inch: 39.3701,
    foot: 3.28084,
    yard: 1.09361,
    mile: 0.000621371,
    milligram: 1000,
    gram: 1,
    kilogram: 1000,
    ounce: 28.3495,
    pound: 453.592
  };

  if (!isNaN(Number(unitValue))) {
    const result = (unitValue / conversionFactors[convertFromValue]) * conversionFactors[convertToValue];
    showResult(unitValue, convertFromValue, convertToValue, result)
  } else {
    alert("This is not a number!")
  }
}

function convertTemperature(unitValue, convertFromValue, convertToValue) {
  const conversionFactors = {
    Celsius: {
      toFahrenheit: (c) => c * (9 / 5) + 32,
      toKelvin: (c) => c + 273.15
    },
    Fahrenheit: {
      toCelsius: (f) => (f - 32) * (5 / 9),
      toKelvin: (f) => (f - 32) * (5 / 9) + 273.15
    },
    Kelvin: {
      toCelsius: (k) => k - 273.15,
      toFahrenheit: (k) => (k - 273.15) * (9 / 5) + 32
    }
  };

  if (!isNaN(Number(unitValue))) {
    if (convertFromValue === "Celsius") {
      if (convertToValue === "Fahrenheit") {
        showResult(unitValue, convertFromValue, convertToValue, conversionFactors.Celsius.toFahrenheit(unitValue));
      } else if (convertToValue === "Kelvin") {
        showResult(unitValue, convertFromValue, convertToValue, conversionFactors.Celsius.toKelvin(unitValue));
      }
    } else if (convertFromValue === "Fahrenheit") {
      if (convertToValue === "Celsius") {
        showResult(unitValue, convertFromValue, convertToValue, conversionFactors.Fahrenheit.toCelsius(unitValue));
      } else if (convertToValue === "Kelvin") {
        showResult(unitValue, convertFromValue, convertToValue, conversionFactors.Fahrenheit.toCelsius(unitValue));
      }
    } else if (convertFromValue === "Kelvin") {
      if (convertToValue === "Celsius") {
        showResult(unitValue, convertFromValue, convertToValue, conversionFactors.Fahrenheit.toCelsius(unitValue));
      } else if (convertToValue === "Fahrenheit") {
        showResult(unitValue, convertFromValue, convertToValue, conversionFactors.Fahrenheit.toCelsius(unitValue));
      }
    }
  } else {
    alert("This is not a number!")
  }
}


convertButton.addEventListener("click", () => {
  if (convertTo.value === convertFrom.value) alert("Different units are needed.");

  if (unitToConvert.value && (convertFrom.value && convertTo.value)) {
    switch (currentOption) {
      case 'length':
        convert(unitToConvert.value, convertFrom.value, convertTo.value); break;
      case 'weight':
        convert(unitToConvert.value, convertFrom.value, convertTo.value); break;
      case 'temperature':
        convertTemperature(unitToConvert.value, convertFrom.value, convertTo.value); break;
    }
  } else alert("Attention: Please fill in all the required fields before proceeding.");

  lengthV.style.pointerEvents = "none";
  weight.style.pointerEvents = "none";
  temperature.style.pointerEvents = "none";
})
