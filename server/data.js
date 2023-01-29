const templeteData = {
  "if-else": {
    defaultCode: 
`const hour = 14;
if (hour < 18) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}`,
    solution: 
`const hour = 14;
if (hour < 18) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}for()`,
  },

  "for":{
    defaultCode: 
`let str = '';
for (let i = 0; i < 9; i++) {
  str = str + i;
}`,
    solution: 
`let str = '';
for (let i = 0; i < 9; i++) {
  str = str + i;
}`,
  },
};
exports.templeteBlocks = templeteData;
