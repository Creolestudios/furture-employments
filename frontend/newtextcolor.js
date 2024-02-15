const newText1 =
  'Learning JavaScript is necessary these days in the development field. Anyhow you have to use JavaScript on the front end. So it is better to learn NodeJS rather than learn other backend technologies like PHP, JAVA, Ruby, etc. NodeJS is the hottest technology across the world, especially in Silicon Valley. It is the perfect skill to open up amazing career opportunities for any software developer.';
const newText2 = 'Learning JavaScript is necessary';
const newText = ' So it is better to learn NodeJS';
const vowels = ['a', 'e', 'i', 'o', 'u'];

const findVowel = (newText) => {
  const vowelList = [];
  const countVowel = {};
  const consonantList = [];
  for (let i of newText) {
    if (vowels.includes(i)) {
      if (!countVowel[i]) {
        countVowel[i] = 1;
      } else {
        countVowel[i] += 1;
      }
      vowelList.push(i);
    } else if (i !== ' ') {
      consonantList.push(i);
    }
  }
  return {
    countVowel,
    vowelList,
    length: vowelList.length,
    newtextlength: newText.length,
    consonantList,
  };
};
const findCountOfVowel = newText;
console.log(findVowel(newText));
