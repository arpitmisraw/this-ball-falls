var canvas = document.querySelector("canvas");
var score = document.querySelector("#score");
var max = document.querySelector("#max_score");
var track = document.querySelector("#track");
var radii = [25, 30, 35, 40, 45];
var count = 4;
var countDown = 10;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var touch = 1;
var flag = -1;
var g = 9.8, e = 0.7, dt = 0.23, x_inp, y_inp;
var sc = 0;
var maxScore = 0;
c.translate(0, canvas.height);
c.scale(-1, 1); 
c.rotate(-Math.PI);
var ball = 
{
    x : canvas.width / 2,
    y : canvas.height / 2,
    u : 0,
    ux : 0,
    uy : 0,
    vx : 0,
    vy : 0,
    theta : 0,
    color : 'snow',
    radius : radii[count],
    draw : function()
            {
                c.beginPath();
                c.rect(00, 00, canvas.width, canvas.height);
                c.fillStyle = "#75DDDD";
                c.fill();

                c.beginPath();
                c.arc(this.x, this.y , this.radius, 0, Math.PI* 2);
                c.closePath();
                c.fillStyle = this.color;
                c.fill();
                c.fillStyle = '#004346';
                c.fillRect(0, 0, 100, canvas.height);
                c.fillRect(0, 0, canvas.width, 100);
                c.fillRect(canvas.width - 100, 0, 100, canvas.height);
                c.fillRect(0, canvas.height - 100, canvas.width, 100);
                c.stroke();
            },


    game : function()
            {
                clear();
                this.draw();
                if(flag === -1)
                {
                    g = 9.8;
                    dt = 0.22;
                }
                if(flag === 1)
                {
                    g = -9.8;
                    dt = 0.16;
                }
                if(touch % 11 == 0)
                {
                    touch = 1;
                    countDown = 11 - touch;
                    track.innerText = countDown;
                    flag = -flag;
                    this.vy = 0;
                }
                this.vy -= g*dt;
                this.y += this.vy * dt;
                this.x += this.vx * dt;
                // Bottom restriction
                if (this.y - this.radius < 100) 
                {
                    this.y = this.radius + 100;
                    this.vy *= -e;
                    if(flag == -1)
                    {
                        if(sc > maxScore)
                        {    
                            maxScore = sc;
                            max.innerText = "Max Score : " + maxScore;
                        }
                        sc = 0;
                        score.innerHTML = "Score : " + sc;
                        touch = 1;
                        countDown = 11 - touch;
                        track.innerText = countDown;
                    }
                    if(flag == 1)
                    {
                        sc += 5;
                        score.innerHTML = "Score : " + sc;
                    }
                }
                // Top restriction
                if (this.y + this.radius > canvas.height - 100) 
                {
                    this.y = canvas.height - 100 - this.radius;
                    this.vy *= -e;
                    // Bonus points for top hit
                    if(flag == -1)
                    {
                        sc += 5;
                        score.innerHTML = "Score : " + sc;
                    }
                    if(flag == 1)
                    {
                        if(sc > maxScore)
                        {    
                            maxScore = sc;
                            max.innerText = "Max Score : " + maxScore;
                        }
                        sc = 0;
                        score.innerHTML = "Score : " + sc;
                        touch = 1;
                        countDown = 11 - touch;
                        track.innerText = countDown;
                    }
                }
                // Right restriction
                if(this.x + this.radius > canvas.width - 100)
                {
                    this.x = canvas.width - 100 - this.radius;
                    this.vx *= -e;
                }
                // Left restriction
                if(this.x - this.radius <= 100)
                {
                    this.x = 100 + this.radius;
                    this.vx *= -e;
                }
            },
    
    changeDirection : function()
            {
                if(Math.sqrt(((this.x - x_inp) * (this.x - x_inp)) + ((this.y - y_inp) * (this.y - y_inp))) < this.radius + 50 )
                {
                    if(this.vx * (this.x - x_inp) > 0)
                    {
                        sc += 1;
                        score.innerText = "Score : " + sc;
                        this.vx += (this.x - x_inp)/2;
                        ball.radius = radii[count];
                        count--;
                        if(count === -1)
                            count = 4;
                    }
                    else
                    {
                        sc += 1;
                        score.innerText = "Score : " + sc;
                        this.vx = (this.x - x_inp)/2;
                        ball.radius = radii[count];
                        count--;
                        if(count === -1)
                            count = 4;
                    }
                    touch++;
                    countDown = 11 - touch;
                    track.innerText = countDown;
                    if(flag == -1)
                        this.vy = 50;
                    if(flag == 1)
                        this.vy = -50;
                }
                x_inp = 0;
                y_inp = 0;
            }
            
}


canvas.addEventListener("click", function()
{
    x_inp = event.pageX - canvas.offsetLeft;
    y_inp = canvas.height - event.pageY - 12;
    console.log(x_inp, y_inp);
}
);

function clear()
{
    c.fillStyle = 'white';
    c.fillRect(0, 2, canvas.width, canvas.height);
}

function animate()
{
    ball.game();
    ball.changeDirection();
    requestAnimationFrame(animate);
}

animate();
