let direction = 'ArrowDown';
    let left = 0;
    let up = 0;
    let begin,state=0,score=0;

    let points = document.createElement('h1')
    document.body.append(points)

    let head = document.querySelector('#head');
    let area = document.querySelector('#playArea')
        
    document.body.addEventListener('keyup',(e)=>{
        arr = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']
        obj = {'ArrowUp':'ArrowDown','ArrowLeft':'ArrowRight','ArrowRight':'ArrowLeft','ArrowDown':'ArrowUp'}

        let gameOver = ()=>{
            clearInterval(begin);
            state = 0
            left = 0
            up = 0
            area.innerText="GAME OVER"
                
        }

        let move = (a,b)=>{
            let prev_left = head.style.left
            let prev_top = head.style.top
            head.style.left = `${b}px`;
            head.style.top = `${a}px`;
            let snake = [...document.getElementsByClassName('body')]
            for (i=snake.length-1;i>0;i--){
                snake[i].style.left = snake[i-1].style.left
                snake[i].style.top = snake[i-1].style.top
            }
            snake[0].style.left = prev_left
            snake[0].style.top = prev_top
        }

        let grow = ()=>{
            let a = document.createElement('div')
            a.setAttribute('class','body')

            let snake = [...document.getElementsByClassName('body')]
            a.style.left = snake[snake.length - 1].style.left
            a.style.top = snake[snake.length - 1].style.top
            area.appendChild(a)
            }

        let generateFood = ()=>{
            let a = document.createElement('div')
            a.setAttribute('id','food')
            a.style.left = `${(Math.trunc(Math.random()*(10**3))*20)%1000}px`
            a.style.top = `${(Math.trunc(Math.random()*(10**3))*20)%500}px`
            area.appendChild(a);
        }

        let eat = ()=>{
            let food = document.getElementById('food');
            if (food.style.left == head.style.left && food.style.top == head.style.top){
                area.removeChild(food);
                generateFood()
                points.innerText=(`Score: ${++score}`)
                grow()
                return true
            }
            return false
        }

        // Snake not touching its own body and not hitting the walls
        let valid_move = ()=>{

            let snake_body_obj = {
                'ArrowUp':[up-20,left], 
                'ArrowDown':[up+20,left], 
                'ArrowLeft':[up,left-20], 
                'ArrowRight':[up,left+20]
            }

            let snake = [...document.getElementsByClassName('body')]
            snake = snake.map((x)=>{
                            return [x.style.top.split('px'), x.style.left.split('px')]
                        })
    
            return (snake.every((x)=>{
                return Number(x[0][0]) != snake_body_obj[direction][0] || Number(x[1][0]) != snake_body_obj[direction][1]}) 
                && (0<=snake_body_obj[direction][0] && snake_body_obj[direction][0]<=480 && 
                0<=snake_body_obj[direction][1] && 980>=snake_body_obj[direction][1]))
        }

        if (arr.includes(e.key) && obj[direction]!=e.key){
            direction = e.key
        }
            else if (e.key==" "){
                if (state==0){
                    state = 1
                    begin = setInterval(()=>{

                        if (direction=='ArrowUp'){
                            if (valid_move()){
                                up -= 20        
                                move(up,left)
                                eat()
                            }
                            else {gameOver()}      
                        }
                        else if (direction=='ArrowDown'){
                            if (valid_move()){
                                up+=20
                                move(up,left)
                                eat()
                            }
                            else{gameOver()}
                        }
                        else if (direction == 'ArrowLeft'){
                            if (valid_move()){
                                left-=20
                                move(up,left)
                                eat()
                            }
                            else{gameOver()}
                        }
                        else if (direction == 'ArrowRight'){
                            if (valid_move()){
                                left+=20
                                move(up,left)
                                eat()
                            }
                            else{gameOver()}
                        }
                    },150)
                }
                else{
                    state = 0
                    clearInterval(begin)
                }
            }

            else if (e.key=='Enter'){
                if (state==1){
                    gameOver()
                }
                else{
                    area.innerText=''
                }
            }
            
        })

    