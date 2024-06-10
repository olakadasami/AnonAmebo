console.log('Hello World')
// Get DOM element
let text = document.getElementById('copy').innerHTML
let copyBtn = document.getElementById('copyBtn')

// Copy text function
const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(text)
    console.log('Content copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

copyBtn.addEventListener('click', copyContent)
