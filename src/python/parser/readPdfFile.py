from PIL import Image
import pytesseract
from pdf2image import convert_from_path
import os
  
def readPdfFile(filePath):  
    pages = convert_from_path(filePath, 500)
    image_counter = 1
    #Part #1 : Converting PDF to images
    for page in pages:
        filename = "page_"+str(image_counter)+".jpg"
        page.save(filename, 'JPEG')
        image_counter = image_counter + 1
        
    #Part #2 - Recognizing text from the images using OCR
    filelimit = image_counter-1 # Variable to get count of total number of pages
  
    for i in range(1, filelimit + 1):
        filename = "page_"+str(i)+".jpg"
        text = str(((pytesseract.image_to_string(Image.open(filename)))))
        text = text.replace('-\n', '')    

    #Part 3 - Remove those temp files
    image_counter = 1
    for page in pages:
        filename = "page_"+str(image_counter)+".jpg"
        os.remove(filename)
        image_counter = image_counter + 1
    return text