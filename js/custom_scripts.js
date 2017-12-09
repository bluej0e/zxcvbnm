  var $win = $(window),
  w = 0,
  h = 0,
  rgb = [],
  getWidth = function() {
    w = $win.width();
    h = $win.height();
  };
  $win.resize(getWidth).mousemove(function(e) {

   rgb = [
   Math.round(e.pageX/w * 255),
   Math.round(e.pageY/h * 255),
   Math.round(((e.pageX + e.pageY) / 2) / ((h+w)/2) / 255)
        // 150`
        ];


        rgb = [
        Math.round(e.pageX/w * 255),
        Math.round(e.pageY/h * 60)+40,
        Math.round((e.pageX + e.pageY) / (h+w) * 10)+ 45
        // 150`
        ];
        $(".downlogo").css('fill','hsl('+rgb[0]+','+rgb[1]+'%, '+rgb[2]+'%)');
        $(".faro").css('fill','hsl('+rgb[0]+','+rgb[1]+'%, '+rgb[2]+'%)');
        // $(".st0").css('fill','rgb('+rgb.join(',')+')');
      }).resize();

      // ————————————————————— Random BAckground Generator ————————————————————— //
    //  $(function() {
    //   var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg6.jpg'];
    //   $('.randbg').css({'background-image': 'url(img/' + images[Math.floor(Math.random() * images.length)] + ')'});
    // });

// ————————————————————— TextScramble ————————————————————— //

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
'SEO',
'SEM',
'MARKETING',
'ANALYTICS',
'GROWTH HACKING',
'DESIGN',
'BRANDING',
'SOCIAL MEDIA',
'DIGITAL MARKETING',
'CONSULTING',
]

const el = document.querySelector('#textscrambler')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()


// ————————————————————— que somos typing ————————————————————— //
