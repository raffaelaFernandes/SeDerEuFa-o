document.addEventListener('DOMContentLoaded', function () {
    const mesAno = document.getElementById('month-year')
    const diasContainer = document.getElementById('dias')
    const prevButton = document.getElementById('prev')
    const nextButton = document.getElementById('next')

    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    let currentDate = new Date();
    let hoje = new Date();

    function renderCalendario(date) {
        const ano = date.getFullYear();
        const mes = date.getMonth();
        const primeiroDia = new Date(ano, mes, 1).getDay();
        const ultimoDia = new Date(ano, mes + 1, 0).getDate();

        mesAno.textContent = `${meses[mes]} ${ano}`

        diasContainer.innerHTML = "";

        const prevMesUltimoDia = new Date(ano, mes, 0).getDate()

        for (let i = primeiroDia; i > 0; i--) {
            const diaDiv = document.createElement('div')
            diaDiv.textContent = prevMesUltimoDia - i + 1
            diaDiv.classList.add('fade')
            diasContainer.appendChild(diaDiv)
        }

        for (let i = 1; i <= ultimoDia; i++) {
            const diaDiv = document.createElement('div')
            diaDiv.textContent = i
            if (i === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
                diaDiv.classList.add('today')

            }
            diasContainer.appendChild(diaDiv)
        }


        const novoMesComeco = 7 - new Date(ano, mes + 1, 0).getDay() - 1;
        for (let i = 1; i <= novoMesComeco; i++) {
            const diaDiv = document.createElement('div')
            diaDiv.textContent = i
            diaDiv.classList.add('fade')
            diasContainer.appendChild(diaDiv)
        }
    }

    prevButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1)
        renderCalendario(currentDate)
    })

    nextButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1)
        renderCalendario(currentDate)
    })

    renderCalendario(currentDate);
})