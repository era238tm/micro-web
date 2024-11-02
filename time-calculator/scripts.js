/** @type {HTMLInputElement} */
const initialTime = document.getElementById('initial-time')
/** @type {HTMLInputElement} */
const finalTime = document.getElementById('final-time')
/** @type {HTMLInputElement} */
const findDuration = document.getElementById('find-duration')

/** @type {HTMLOutputElement} */
const output = document.getElementById('output')

/**
 * @param {Date | undefined} date 
 */
function getFormattedDate(date) {
  if (date === undefined) {
    date = new Date()
  }

  return date.toLocaleString('af').split(' ').join('T').substring(0, 16)
}

initialTime.value = finalTime.value = getFormattedDate()

/**
 * @param {Event} ev 
 */
function validateInput(ev) {
  if (!(ev.target instanceof HTMLInputElement &&
      ev.target.nextElementSibling instanceof HTMLDivElement)) {
    return
  }

  if (!ev.target.validity.valid) {
    ev.target.nextElementSibling.innerText = 'Entered value is invalid.'
  }
  else {
    ev.target.nextElementSibling.innerText = ''
  }
}

initialTime.addEventListener('change', validateInput)
finalTime.addEventListener('change', validateInput)

findDuration.addEventListener('click', () => {
  if (!(initialTime.validity.valid && finalTime.validity.valid)) {
    output.nextElementSibling.innerText = 'Entered value is invalid.'
    return
  }

  const initial = new Date(initialTime.value)
  const final = new Date(finalTime.value)

  if (initial > final) {
    output.innerText = 'dd-mm-yyyy --:--'
    output.nextElementSibling.innerText = 'Entered range is invalid.'
    return
  }

  output.nextElementSibling.innerText = ''

  let year = final.getFullYear() - initial.getFullYear()
  let month = final.getMonth() - initial.getMonth()
  let day = final.getDate() - initial.getDate()
  let hour = final.getHours() - initial.getHours()
  let minute = final.getMinutes() - initial.getMinutes()

  if (minute < 0) {
    hour -= 1
    minute += 60
  }

  if (hour < 0) {
    day -= 1
    hour += 24
  }

  if (day < 0) {
    month -= 1
    final.setDate(31)
    day += 31 - final.getDate() || 31
  }

  if (month < 0) {
    year -= 1
    month += 12
  }

  day = String(day).padStart(2, '0')
  month = String(month).padStart(2, '0')
  year = String(year).padStart(4, '0')
  hour = String(hour).padStart(2, '0')
  minute = String(minute).padStart(2, '0')

  output.innerText = `${day}-${month}-${year} ${hour}:${minute}`
})
