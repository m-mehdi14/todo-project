#! /usr/bin/env node
 import inquirer from "inquirer";
 import chalk from "chalk";
 import chalkanimation  from "chalk-animation";
 import figlet from "figlet";
 import gradient from "gradient-string";

const sleep = ()=>{
    return new Promise((resolve) => {
        setTimeout(resolve,2000);
    })
}
 async function wellcome() {
    console.log('');
    figlet('  todo list  ',(err,data)=>{
        console.log(gradient.fruit(data));
    });
    await sleep();
 }
 await wellcome();

let todolist :string[] = []

async function Todos() {
    const answer:{option:string} = await inquirer.prompt([
        {
            type:"list",
            name:"option",
            message:"What do you want to do ?",
            choices: ["Add list","Display-List","Remove list","exit"]
        }
    ]);
    if(answer.option === "Add list"){
        const item:{userinput :string} = await inquirer.prompt([
            {
                type:"input",
                name:"userinput",
                message:"Enter your todo list :"
            }
        ])
        todolist.push(item.userinput);
    }
    else if(answer.option === "Display-List"){
        if(todolist.length == 0){
            console.log(chalk.redBright("Your List is Empty!"));
            
        }
        console.log("Your Todo List : ");
        
        todolist.forEach(todo => {
            console.log(todo);
            
        });
    }
    else if(answer.option === "Remove list"){
        if(todolist.length == 0){
            console.log(chalk.redBright("Your List is Empty !"));
            
        }
         
        const removeitem:{remove:string} = await inquirer.prompt([
            {
               type:"input",
               name: "remove",
               message: "Which item do you want to remove ?", 
            }
        ])
        let index = todolist.indexOf(removeitem.remove);
        console.log(index);
        if(index !== -1){
            todolist.splice(index,1);
        }
    }
}

async function startagain() {
    do {
        await Todos();
          var again:{restart:string} = await inquirer.prompt([
        {
            type:"input",
            name:"restart",
            message:"Do you want to continue ? press y or n ",
        }
    ])
    } while (again.restart == "y" || again.restart == "Y" || again.restart == "YES" || again.restart == "yes");
  
}
await startagain();

