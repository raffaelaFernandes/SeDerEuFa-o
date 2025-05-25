const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descriptionTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button")


const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]
const notes = JSON.parse(localStorage.getItem("notes") || "[]")
let isUpdate = false, updateId

addBox.addEventListener("click", () => {
    titleTag.focus()
    popupBox.classList.add("show")
})

closeIcon.addEventListener("click", () => {
    isUpdate = false
    titleTag.value = ""
    descriptionTag.value = ""
    addBtn.innerText = "adicionar nota"
    popupTitle.innerText = "Adicionar nova nota"
    popupBox.classList.remove("show")
})
function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, anotacoes) => {
        let liTag = ` <li class="note">
                    <div class="detalhes">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="bottom-container">
                        <span>${note.date}</span>
                        <div class="config">
                            <i onclick="showMenu(this)" class="ph ph-dots-three"></i>
                            <ul class="tres">
                                <li onclick="updateNote(${anotacoes}, '${note.title}', '${note.description}')"><i class="ph ph-pencil-simple"></i>Editar</li>
                                <li onclick="deleteNote(${anotacoes})"><i class="ph ph-trash"></i>Deletar</li>
                            </ul>
                        </div>
                    </div>
                </li>
        `
        addBox.insertAdjacentHTML("afterend", liTag)
    })
}
showNotes()

function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show")

        }
    })
}

function updateNote(noteId, title, desc) {
    isUpdate = true
    updateId = noteId
    addBox.click();
    titleTag.value = title
    descriptionTag.value = desc
    addBtn.innerText = "Atualizar nota"
    popupTitle.innerText = "Atualizar a nota"
}

function deleteNote(noteId) {
    let confirmDelete = confirm("Você quer mesmo deletar essa nota?")
    if (!confirmDelete) return
    notes.splice(noteId, 1)
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes()
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let notatit = titleTag.value, notadesc = descriptionTag.value

    if (notatit || notadesc) {
        let dateObj = new Date(),
            mes = meses[dateObj.getMonth()],
            dia = dateObj.getDate(),
            ano = dateObj.getFullYear()

        let notainf = {
            title: notatit, description: notadesc,
            date: `${mes} ${dia}, ${ano}`
        }
        if (!isUpdate) {
            notes.push(notainf)

        }
        else {
            notes[updateId] = notainf
        }
        localStorage.setItem("notes", JSON.stringify(notes))
        closeIcon.click()
        showNotes()

    }
})