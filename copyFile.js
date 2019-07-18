const fs = require("fs")
const path = require("path")
const chalk = require('chalk')

let fullcalendar = new Promise((resolve, reject)=>{
        fs.copyFile(path.resolve(__dirname, './package_cover/fullcalendar/_dist/fullcalendar.js'), path.resolve(__dirname, './node_modules/fullcalendar/dist/fullcalendar.js'), (err) => {
            if (err) reject(err);
            console.log(chalk.blue('fullcalendar.js文件已复制至node_modules'));
            resolve()
        });
    })

let iviewArea = new Promise((resolve, reject)=>{
        fs.copyFile('./package_cover/iview-area/_dist/iview-area.js', './node_modules/iview-area/dist/iview-area.js', (err) => {
            if (err) reject(err);
            console.log(chalk.blue('iview-area.js文件已复制至node_modules'));
            resolve()
        });
    })

let vueFullCalendar = new Promise((resolve, reject)=>{
        fs.copyFile('./package_cover/vue-full-calendar/components/FullCalendar.vue', './node_modules/vue-full-calendar/components/FullCalendar.vue', (err) => {
            if (err) reject(err);
            console.log(chalk.blue('FullCalendar.vue文件已复制至node_modules'));
            resolve()
        });
    })

//  删除不必要的文件
let moment = new Promise((resolve, reject)=>{
    let momentPath = './node_modules/moment/locale'
    const files = fs.readdirSync(momentPath)
    files.forEach(function(file, index){
        let curPath = momentPath + '/' + file;
        if(file != 'zh-cn.js'){
            fs.unlinkSync(curPath, function(err){
                if(err){
                    throw err;
                }
            })
        }
    })
    console.log(chalk.blue('moment/locale 无用文件已删除！'))
    resolve()
})

Promise.all([fullcalendar, iviewArea, vueFullCalendar, moment]).then(()=>{
    console.log(chalk.green("文件已经覆盖成功，接下来请执行相关构建命令！"))
}).catch((err)=>{
    console.log(chalk.red(err))
    console.log(chalk.red("拷贝失败！请重试或者手动拷贝！详情参见package_cover文件夹！"))
})

// fs.readFile('./package_cover/vue-full-calendar/components/FullCalendar.vue', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });