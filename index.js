var figures = document.getElementById('figures');
var form = document.querySelector('form');
var total = 0;

function setChoosen(e)  {
    figures.querySelectorAll('div').forEach((ch) => ch.classList.remove('choosen'));
    e.target.classList.add('choosen')
}

/**
 * @param {HTMLElement} figure
 * @param {0 | 1 | 2} colorIndex
 */
function setFigureVariables(figure, colorIndex) {
    figure.style.setProperty("--x", Math.random() * 100 + '%');
    figure.style.setProperty("--y", Math.random() * 100 + '%');
    figure.style.setProperty("--s", 30 + Math.floor(Math.random() * 200) + 'px');

    var z = Math.floor(Math.random() * 4);
    figure.style.setProperty("--z", z);
    figure.style.opacity = 1 - z / 8;
}

/** @param {HTMLElement} figure */
function setFigureListeners(figure) {
    figure.addEventListener('click', setChoosen);
    figure.addEventListener('dblclick', () => {
        figure.removeEventListener('click', setChoosen);
        figure.remove();
    }, { once: true })
}

function createFigure(type) {
    var figure = document.createElement('div');
    var figureTypeColor;
    switch (type) {
        case "circle":
            figureTypeColor = 0;
            break;
        case "triangle":
            figureTypeColor = 1;
            break;
        default:
            figureTypeColor = 2;
    }
    figure.classList.add(type);
    setFigureListeners(figure);
    setFigureVariables(figure, figureTypeColor);

    figures.appendChild(figure);
}

form.addEventListener('submit', (e) => {
    var figureNumber = parseInt(e.target[0].value);
    if(isNaN(figureNumber)) {
        e.target[0].value = "";
        alert("input number");
        return;
    }
    if(figureNumber < 0) {
        alert("Сколько еще раз?");
        e.target[0].value = "";
        return;
    }
    total += figureNumber;
    if (total > 2000) {
        alert("Совсем не любишь свой комп?)");
        e.target[0].value = "";
        return;
    }

    for (var i = 0; i < figureNumber; i++) {
        createFigure(e.submitter.name);
    }

    e.preventDefault();
});