class JogoForcaView {
  teclado = document.querySelectorAll(".letras button");
  palavraDica = document.getElementById("palavraDica");
  imagemForca = document.getElementById("imagemForca");
  btnRecomecar = document.getElementById("btnRecomecar");

  palavras = ["MAÇÃ", "LARANJA", "BANANA", "MELANCIA", "UVA",
  "PÊRA", "ABACAXI", "MANGA", "CEREJA", "ABACATE",
  "TANGERINA", "GOIABA", "COCO", "ABACAXI", "LIMÃO",
  "KIWI", "MORANGO", "JACA", "CAJU", "AMORA",
  "PITANGA", "CARAMBOLA", "GRANADILLA", "FIGO", "AMEIXA",
  "CEREJA", "PÊSSEGO", "MARACUJÁ", "FRAMBOESA", "TAMARINDO",
  "NECTARINA", "KUMQUAT", "DAMASCO", "CITRINO", "MACADÂMIA",
  "ABACATE", "AÇAÍ", "JABUTICABA", "CAQUI", "GUAVA",
  "GUARANÁ", "CUPUAÇU", "PEQUI", "MIRTILO", "PINHA",
  "PITAYA", "ROMÃ", "SAPOTI", "UGLI", "YUZU",
  "JAMBO", "LONGAN", "MORUS", "MANDARINA"];

  caracteresPalavraSecreta;
  palavraSecretaSemAcento;
  palavraSecreta;
  palavraArray;
  erros = 0;
  acertos = 0;

  constructor() {
    this.registrarEventos();
    this.inicializarJogo();
  }

  registrarEventos() {
    this.teclado.forEach((botao) => {
      botao.addEventListener("click", (e) => this.letraSelecionada(e));
    });

    this.btnRecomecar.addEventListener('click', () => this.inicializarJogo());
  }

  letraSelecionada(evento) {
    const letraClicada = evento.target.textContent;
    this.verificarLetra(letraClicada, evento);
  }

  verificarLetra(letraClicada, evento) {
    const botaoClicado = evento.target;

    let acertou = false
    for (let i = 0; i < this.palavraSecreta.length; i++) {
        if (this.palavraSecretaSemAcento[i] == letraClicada) {
            this.palavraArray[i] = this.palavraSecreta[i];
            this.acertos++;
            acertou = true;
        }
    };

    if (acertou) {
        botaoClicado.style.backgroundColor = 'green';
    }

    else {
        botaoClicado.style.backgroundColor = 'red';
        this.erros++;
        this.atualizarForca();
    }

    botaoClicado.disabled = true;

    this.VerificarVitoria();
    this.palavraDica.textContent = this.palavraArray.join(' ');
  }

  atualizarForca(){
    if (this.erros == 0) this.imagemForca.setAttribute("src", "images/1.png");
    else if (this.erros == 1) this.imagemForca.setAttribute("src", "images/2.png");
    else if (this.erros == 2) this.imagemForca.setAttribute("src", "images/3.png");
    else if (this.erros == 3) this.imagemForca.setAttribute("src", "images/4.png");
    else if (this.erros == 4) this.imagemForca.setAttribute("src", "images/5.png");
    else if (this.erros == 5) this.imagemForca.setAttribute("src", "images/6.png");
    else if (this.erros == 6) this.imagemForca.setAttribute("src", "images/7.png");
    else if (this.erros == 7) this.imagemForca.setAttribute("src", "images/8.png");
  }

  inicializarJogo() {
    this.reiniciarConfiguracoes();
    this.gerarPalavraAleatoria();
    this.configurarPalavraDica();
    console.log(this.palavraSecreta);
    console.log(this.palavraSecretaSemAcento);
  }

  reiniciarConfiguracoes() {
    this.caracteresPalavraSecreta = "";
    this.palavraSecreta = "";
    this.erros = 0;
    this.acertos = 0;
    this.palavraArray = "";
    this.imagemForca.setAttribute("src", "images/1.png");
    this.btnRecomecar.style.cursor = "not-allowed";
    this.btnRecomecar.disabled = true;
    this.teclado.forEach((botao) => {
      botao.style.backgroundColor = '#ebebeb';
      botao.style.cursor = 'pointer';
      botao.disabled = false;
    });
  }
habilitarRecomecar(){
    this.btnRecomecar.style.cursor = 'pointer';
    this.btnRecomecar.disabled = false;
}
  VerificarVitoria(){
    let venceu;
    if (this.acertos == this.palavraSecreta.length) {
      venceu = true;
      this.desabilitarBotoes(venceu);
        alert('Parabéns! Você acertou a palavra '+this.palavraSecreta+'!');
        this.habilitarRecomecar();
        console.log("Você venceu!");   
    }

    if (this.erros == 7) {
      venceu = false;
      this.desabilitarBotoes(venceu);
      alert(`Que pena! A palavra secreta era ${this.palavraSecreta}!`);
      this.habilitarRecomecar();
      console.log("Você perdeu!");
    }
  }
  gerarPalavraAleatoria() {
    let numeroAletorio = 0;
    numeroAletorio = Math.floor(Math.random() * this.palavras.length);
    this.palavraSecreta = this.palavras[numeroAletorio];
    this.palavraSecretaSemAcento = this.retirarAcentosPalavra();
  }


desabilitarBotoes(venceu){

  if(venceu){
      this.teclado.forEach((botao) => {
    botao.style.backgroundColor = 'green';
  });
  }
  else{
    this.teclado.forEach((botao) => {
      botao.style.backgroundColor = 'red';
    });
  }
  this.teclado.forEach((botao) => {
  botao.disabled = 'true';
  botao.style.cursor = 'not-allowed';
  });
}

  retirarAcentosPalavra() {
    return this.palavraSecreta
      .normalize("NFD")
      .replace(/[\u0300-\u036f]|[\u00c7\u00e7]/g, function (match) {
        if (match === "\u00c7") return "c";
        if (match === "\u00e7") return "c";
        return "";
      });
  }

  configurarPalavraDica() {
    let caracteresDica = '';
    for (let i = 0; i < this.palavraSecretaSemAcento.length; i++)
      caracteresDica += '_';


    this.palavraDica.textContent = caracteresDica.split("").join(" ");
    this.palavraArray = caracteresDica.split('');
  }
}

window.addEventListener("load", () => new JogoForcaView());
