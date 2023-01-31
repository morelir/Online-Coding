const templeteData = {
  "if-else": {
    title:'if...else',
    defaultCode: 
`const hour = 14;
if (hour < 18) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}`,
    solution: 
`const hour = 50;
if (hour < 18) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}`,
  },

  "for":{
    title:'for',
    defaultCode: 
`let str = '';
for (let i = 0; i < 9; i++) {
  str = str + i;
}`,
    solution: 
`let str = '';
for (let i = 0; i < 15; i++) {
  str = str + i;
}`,
  },
  "function":{
    title:'function',
    defaultCode: 
`function calcRectArea(width, height) {
  return width * height;
}

console.log(calcRectArea(5, 6));`,
    solution: 
`function calcRectArea(width, height) {
  return width * height;
}

console.log(calcRectArea(10, 7));`,
  },
  "async":{
    title:'async',
    defaultCode: 
`function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Expected output: "resolved"
}

asyncCall();
`,
    solution: 
`function resolveAfter5Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 5000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter5Seconds();
  console.log(result);
  // Expected output: "resolved"
}

asyncCall();
`,
  }
};
exports.templeteBlocks = templeteData;
