var depth = 1.5,
    timer,
    canvas,
    context,
    freq = 0.1,
    time = 0,
    center = {
        x: 0,
        y: 0
    },
    circles = [];

function init()
{
    canvas = document.getElementById("animTest");
    context = canvas.getContext("2d");
    timer = setInterval(draw, freq);
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
    circles = [
    {
        radius: 22,
        pos: {
            x: -101,
            y: -100,
            z: 1
        },
        drawOrder: 3,
        colorName: 'dark',
        colorHex: '#555555'
    },
    {
        radius: 19,
        pos: {
            x: -70,
            y: -65,
            z: 1
        },
        drawOrder: 2,
        colorName: 'dark',
        colorHex: '#555555'
    },
    {
        radius: 17,
        pos: {
            x: -51,
            y: -32,
            z: 1
        },
        drawOrder: 1,
        colorName: 'dark',
        colorHex: '#555555'
    },
    {
        radius: 22,
        pos: {
            x: - 6,
            y: 0,
            z: -1
        },
        drawOrder: -1,
        colorName: 'grey',
        colorHex: '#999999'
    },
    {
        radius: 19,
        pos: {
            x: 7,
            y: -40,
            z: -1
        },
        drawOrder: -2,
        colorName: 'grey',
        colorHex: '#999999'
    },
    {
        radius: 14,
        pos: {
            x: 30,
            y: -70,
            z: -1
        },
        drawOrder: -3,
        colorName: 'grey',
        colorHex: '#999999'
    },
    {
        radius: 22,
        pos: {
            x: -45,
            y: 92,
            z: 1
        },
        drawOrder: 3,
        colorName: 'light',
        colorHex: '#dddddd'
    },
    {
        radius: 19,
        pos: {
            x: -45,
            y: 49,
            z: 1
        },
        drawOrder: 2,
        colorName: 'light',
        colorHex: '#dddddd'
    },
    {
        radius: 17,
        pos: {
            x: - 45,
            y: 7,
            z: 1
        },
        drawOrder: 1,
        colorName: 'light',
        colorHex: '#dddddd'
    }
    ];
}


function draw(isLoading)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    var i = 0;
    // Calculate the circles' draw order
    for (i; i < circles.length; i++)
    {
        circles[i].drawOrder = (circles[i].pos.z * depth) * Math.sin(time / (2 * Math.PI));
    }
    i = 0;

    // Sort the circles on drawOrder.
    for (i; i < circles.length-1; i++) {
        if (circles[i].drawOrder < circles[i + 1].drawOrder) {
            var tmp = circles[i];
            circles[i] = circles[i + 1];
            circles[i + 1] = tmp;
            i = -1;
        }
    }
    i = 0;

    // Render all circles
    for (i; i < circles.length; i++)
    {
        context.beginPath();
        //context.arc(circles[i].pos.x, circles[i].pos.y, circles[i].radius, 0, 2 * Math.PI, false);
        context.arc((circles[i].pos.x * Math.cos(time / (2 * Math.PI))+center.x), circles[i].pos.y + center.y, circles[i].radius - (circles[i].drawOrder * depth), 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = circles[i].colorHex;
        context.fill();
    }
    if (isLoading)
    {
        context.fillText("Loading", center.x, 0.8 * canvas.height);
    }
    time += freq;
}

function stop()
{
    clearTimeout(timer);
    context.clearRect(0, 0, canvas.width, canvas.height);
}