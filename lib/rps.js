const score = [0,0]

let choose = ''

let enemyChoose = ''

const getResult = (choose, enemyChoose) => {
    if ((choose === 'rock' && enemyChoose === 'scissors') ||
        (choose === 'paper' && enemyChoose === 'rock') ||
        (choose === 'scissors' && enemyChoose === 'paper')) {
        return [1, 0, 'Вы победили!']
    }
    if ((choose === 'scissors' && enemyChoose === 'rock') ||
        (choose === 'rock' && enemyChoose === 'paper') ||
        (choose === 'paper' && enemyChoose === 'scissors')) {
        return [0, 1, 'Вы проиграли.']
    }
    return [0,0,'Ничья!']
}

const getRandomSign = () => {
    const signs = ['rock', 'paper', 'scissors']
    const index = Math.floor(Math.random() * signs.length)
    return signs[index]
}



const newGame = () => {
    enemyChoose=''
    choose=''
    // imagesContainer.removeChild(enemyImage)
    enemyImage = null
    // userImage.classList.remove('active')
    // showText('Ваш ход.')
}

// showText('Ваш ход.')

// images.forEach((image) => {
//     image.onclick = () => {
//         if (choose !== '') {
//             return
//         }
//         userImage = image
//         enemyChoose = getRandomSign()
//         const foundImage = document.querySelector(`.images img[data-sign="${enemyChoose}"]`)
//         enemyImage = foundImage.cloneNode()
//         imagesContainer.appendChild(enemyImage)
//         setTimeout(() => {
//             enemyImage.classList.add('enemy-active')
//         }, 10)
//         choose = image.getAttribute('data-sign')
//         image.classList.add('active')
//         setTimeout(()=>{

//             const [points, enemyPoints, info] = getResult(choose, enemyChoose)
//             showText(info)
//             score[0]+=points
//             score[1]+=enemyPoints
//             showScore(score)
//             showReload()
//         },1200)
//     }
// })
module.exports={
    getRandomSign,
    getResult,
}