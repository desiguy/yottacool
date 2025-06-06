function getFormValues() {
  const numSets = parseInt(document.getElementById('numSets').value);
  const numPerSet = parseInt(document.getElementById('numPerSet').value);
  const minRange = parseInt(document.getElementById('minRange').value);
  const maxRange = parseInt(document.getElementById('maxRange').value);
  const uniqueNumbers = document.getElementById('uniqueNumbers').checked;
  const sortNumbers = document.getElementById('sortNumbers').checked;

  return {
    numSets,
    numPerSet,
    minRange,
    maxRange,
    uniqueNumbers,
    sortNumbers,
  };
}

function generateRandomNumbers(settings) {
  const allSets = [];
  const { numSets, numPerSet, minRange, maxRange, uniqueNumbers, sortNumbers } = settings;

  if (maxRange < minRange) {
    alert("Error: Max range cannot be less than Min range.");
    return [];
  }
  if (numPerSet < 0) {
    alert("Error: Numbers per set cannot be negative.");
    return [];
  }
   if (numSets < 0) {
    alert("Error: Number of sets cannot be negative.");
    return [];
  }

  for (let i = 0; i < numSets; i++) {
    const currentSet = new Set(); // Use Set for unique numbers by default
    const currentArray = []; // To store numbers if not unique or for sorting
    const availableNumbers = maxRange - minRange + 1;

    if (uniqueNumbers && numPerSet > availableNumbers) {
      alert(`Warning: Cannot generate ${numPerSet} unique numbers from the range ${minRange}-${maxRange}. Generating ${availableNumbers} unique numbers instead for set ${i + 1}.`);
      // Adjust numPerSet for this specific set if unique is required and not possible
      // This is a simplistic adjustment; a more robust solution might be needed.
      let tempNumPerSet = availableNumbers;
       while (currentSet.size < tempNumPerSet) {
        const randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        currentSet.add(randomNumber);
      }
      currentSet.forEach(num => currentArray.push(num));


    } else if (uniqueNumbers) {
      while (currentSet.size < numPerSet) {
        const randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        currentSet.add(randomNumber);
      }
      currentSet.forEach(num => currentArray.push(num));
    } else {
      for (let j = 0; j < numPerSet; j++) {
        const randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        currentArray.push(randomNumber);
      }
    }

    if (sortNumbers) {
      currentArray.sort((a, b) => a - b);
    }
    allSets.push(currentArray);
  }
  return allSets;
}

function displayResults(sets) {
  const resultsArea = document.getElementById('resultsArea');
  resultsArea.innerHTML = ''; // Clear previous results

  if (!sets || sets.length === 0) {
    // Optionally display a message if no sets were generated (e.g., due to an error handled in generateRandomNumbers)
    // resultsArea.textContent = "No numbers generated.";
    return;
  }

  sets.forEach((set, index) => {
    const setElement = document.createElement('div');
    setElement.classList.add('result-set'); // Add a class for potential styling
    const heading = document.createElement('h3');
    heading.textContent = `Set ${index + 1}:`;
    setElement.appendChild(heading);

    const numbersParagraph = document.createElement('p');
    numbersParagraph.textContent = set.join(', ');
    setElement.appendChild(numbersParagraph);

    resultsArea.appendChild(setElement);
  });
}

document.getElementById('generateButton').addEventListener('click', () => {
  const settings = getFormValues();
  // Basic validation before calling generateRandomNumbers
  if (settings.maxRange < settings.minRange) {
    // This specific check is also inside generateRandomNumbers, but early exit can be good.
    // alert("Max range cannot be less than Min range. Please correct the values.");
    // displayResults([]); // Clear results area
    // return;
    // generateRandomNumbers will also alert this.
  }
  if (settings.numPerSet < 0) {
    // alert("Number of items per set must be non-negative.");
    // displayResults([]);
    // return;
    // generateRandomNumbers will also alert this.
  }
   if (settings.numSets < 0) {
    // alert("Number of sets must be non-negative.");
    // displayResults([]);
    // return;
    // generateRandomNumbers will also alert this.
  }


  const generatedSets = generateRandomNumbers(settings);
  displayResults(generatedSets);
});
