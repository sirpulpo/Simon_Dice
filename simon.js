const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_LVL = 15

class Juego {
    constructor() {
        this.start = this.start.bind(this)
        this.start()
        this.generarSecuencia()
        setTimeout(this.siguienteLevel, 800)

    }

    start() {
        console.log('start');
        this.siguienteLevel = this.siguienteLevel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        console.log('generar secuencia');
        this.secuencia = new Array(ULTIMO_LVL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteLevel() {
        console.log('------------------------' + ' nivel ' + this.nivel + ' ------------------------');
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClic()

    }

    transformarNumero(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColor(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumero(this.secuencia[i])
            setTimeout(() => {
                this.iluminarColor(color)
                console.log('iluminar ' + color);
            }, 900 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')

        setTimeout(() => this.apagarColor(color), 300)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClic() {

        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        console.log('add events');
    }

    eliminarEventosClic() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        console.log('remove events');
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColor(nombreColor)
        console.log('subnivel ' + this.subnivel);
        console.log('seleccion ' + nombreColor);
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel ++
            if (this.subnivel === this.nivel) {
                this.nivel ++
                this.eliminarEventosClic()
                if (this.nivel === ULTIMO_LVL) {
                    this.ganaste()
                } else {
                    // en los setTimeout se llama a la función pero no se invoca, ie m no le pongas los parentecis nunca aqui
                    setTimeout(this.siguienteLevel, 1100)
                    console.log('next');
                }
            }
        } else {
            this.perdiste()
            console.log('perdiste');
        }
    }

    ganaste() {
        setTimeout(() => {
            swal('Simón dice:', 'Ganaste!!!', 'success', { button: false})
                .then(this.start)
        }, 800)

    }

    perdiste() {
        setTimeout(() => {swal('Simón dice:', 'Perdiste.', 'error', { button: false})
            .then(() => {
                this. eliminarEventosClic()
                this.start()
            })}, 800)

    }
}

function empezarJuego() {
    // alert('Ya comienza...')
    // var juego = new Juego();
    window.juego = new Juego();
}
