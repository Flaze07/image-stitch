const fileInput = document.getElementsByTagName("input")[0]
const uploadImageDiv = document.getElementsByClassName("uploaded-image")[0]
const uploadedImage = []

fileInput.addEventListener("change", () => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
        const newImage = document.createElement("img")
        newImage.src = fileReader.result

        uploadedImage.push(newImage)

        const newDiv = document.createElement("div")
        newDiv.appendChild(newImage)
        uploadImageDiv.appendChild(newDiv)
    }

    fileReader.readAsDataURL(fileInput.files[0])

    fileInput.value = ''
})

const stitchImgBtn = document.getElementsByTagName("button")[0]

stitchImgBtn.addEventListener("click", () => {
    const canvas = document.getElementsByTagName("canvas")[0]

    const ctx = canvas.getContext("2d")
    let maxWidth = 0

    let y = 0
    for(let image of uploadedImage) {
        if(image.width > maxWidth) {
            maxWidth = image.width
        }
        // ctx.drawImage(image, 0, y)

        y += image.height
    }

    canvas.width = maxWidth
    canvas.height = y

    y = 0
    for(let image of uploadedImage) {
        ctx.drawImage(image, 0, y)

        y += image.height
    }
})