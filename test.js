let Table=require('cli-table2')
let text2png = require('text2png');
var table = new Table({
    head: ['Rel', 'Change', 'By', 'When']
 , style: {
     head: []    //disable colors in header cells
   , border: []  //disable colors for the border
 }
 //, colWidths: [6, 21, 25, 17]  //set the widths of each column (optional)
});

table.push(
   ['v0.1', 'Testing something cool', 'rauchg@gmail.com', '7 minutes ago']
 , ['v0.1', 'Testing something cool', 'rauchg@gmail.com', '8 minutes ago']
);
let txt=table.toString()
for( let i=0;i<txt.length;i++)
    console.log(txt[i] ===' ');
txt.replace('\t','')
console.log(txt);
let image=text2png(txt, {
    //font: '80px Futura',
    textColor: 'teal',
    bgColor: 'linen',
    //lineSpacing: 10,
    //padding: 20,
    output: 'buffer'
});
require('fs').writeFileSync('./test.png',image);
console.log(table.toString())