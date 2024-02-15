const docString = 'bicda ajks ajdasla adaslasf';
function characterFrequency(docString) {
  const characterFrequencies = {};
  for (let i of docString) {
    if (characterFrequencies[i]) {
      characterFrequencies[i] += 1;
    } else {
      characterFrequencies[i] = 1;
    }
  }
  return characterFrequencies;
}
console.log(characterFrequency(docString));
const docArray = docString.split('');
// console.log(docArray);
const characterReducefrequency = docArray.reduce((acc, value) => {
  console.log(acc);
  if (acc[value]) {
    return (acc[value] += 1);
  } else {
    return (acc[value] = 1);
  }
}, {});
console.log(characterReducefrequency);
