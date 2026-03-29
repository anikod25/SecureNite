const genBtn = document.getElementById("generateBtn")
const copyBtn = document.getElementById("copyBtn")

genBtn.addEventListener("click", function () {
  let pass = document.getElementById("password").value
  let site = document.getElementById("siteName").value
  let out = document.getElementById("output")

  if (!pass || !site) {
    out.textContent = "Fill both fields first"
    return
  }

  let result = maskPassword(pass, site)
  out.textContent = result
})

copyBtn.addEventListener("click", function () {
  let text = document.getElementById("output").textContent

  if (!text || text === "Fill both fields first") {
    return
  }

  navigator.clipboard.writeText(text)

  copyBtn.textContent = "Copied!"

  setTimeout(() => {
    copyBtn.textContent = "Copy"
  }, 2000)
})

document.getElementById("toggleBtn").addEventListener("click", function() {
  let input = document.getElementById("password")
  let icon = document.getElementById("eyeIcon")
  if (input.type === "password") {
    input.type = "text"
    icon.src = "icons/eye-closed.png"
  } else {
    input.type = "password"
    icon.src = "icons/eye-open.png"
  }
})