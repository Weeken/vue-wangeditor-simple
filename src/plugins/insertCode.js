export const insertCode = {
  methods: {
    initInsertCode () {
      let insertCodeBtn = this.createBtn('<i title="插入带类名的代码块" class="w-icon-file-class-code"></i>')
      this.toolbar.appendChild(insertCodeBtn)
      insertCodeBtn.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()
        let pannel = document.querySelector(`#${this.id}_codePannel`)
        if (!pannel) {
          this.createPannel()
        } else {
          pannel.style.display = 'block'
        }
        this.bindEvents()
      }, false)
    },
    bindEvents () {
      let pannel = document.querySelector(`#${this.id}_codePannel`)
      let close = document.querySelector(`#${this.id}_closePannel`)
      let input = document.querySelector(`#${this.id}_pannelInput`)
      let textarea = document.querySelector(`#${this.id}_pannelTextarea`)
      let submit = document.querySelector(`#${this.id}_pannelSubmit`)
      close.addEventListener('click', e => {
        e.stopPropagation()
        pannel.style.display = 'none'
        input.value = ''
        textarea.value = ''
      }, false)
      submit.addEventListener('click', e => {
        e.stopPropagation()
        if (input.value && textarea.value) {
          this.insertCode(input.value, textarea.value)
          pannel.style.display = 'none'
          input.value = ''
          textarea.value = ''
        } else {
          pannel.style.display = 'none'
          input.value = ''
          textarea.value = ''
        }
      }, false)
    },
    createPannel () {
      let pannel = document.createElement('div')
      let close = document.createElement('i')
      let h2 = document.createElement('h2')
      let input = document.createElement('input')
      let textarea = document.createElement('textarea')
      let submit = document.createElement('button')
      pannel.id = this.id + '_codePannel'
      close.id = this.id + '_closePannel'
      input.id = this.id + '_pannelInput'
      input.className = 'pannelInput'
      textarea.id = this.id + '_pannelTextarea'
      textarea.className = 'pannelTextarea'
      input.setAttribute('placeholder', 'className')
      textarea.setAttribute('placeholder', 'code')
      submit.id = this.id + '_pannelSubmit'
      submit.className = 'pannelSubmit'
      submit.innerText = '插入'
      h2.innerText = '插入带类名的代码：'
      close.className = 'w-e-icon-close w-e-panel-close closePannel'
      pannel.appendChild(close)
      pannel.appendChild(h2)
      pannel.appendChild(input)
      pannel.appendChild(textarea)
      pannel.appendChild(submit)
      pannel.className = 'code_pannel'
      this.container.appendChild(pannel)
      pannel.style.display = 'block'
    },
    replaceHtmlSymbol(html) {
      if (html == null) {
        return ''
      }
      return html.replace(/</gm, '&lt;').replace(/>/gm, '&gt;').replace(/"/gm, '&quot;')
    },
    insertCode (className, code) {
      this.editor.cmd.do('insertHTML', `<pre class="${className}"><code class="${className}">${this.replaceHtmlSymbol(code)}</code></pre><p><br></p>`)
    }
  }
}
