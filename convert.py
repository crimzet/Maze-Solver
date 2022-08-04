from PIL import Image
from numpy import asarray
import sys

def convert(url, width, height=None):
    if height == None:
        height = width

    img = Image.open(url)
    arr = asarray(img)
    arr = arr.tolist()
    res = []

    for i in range(0, len(arr), int(len(arr) / int(height))):
        res.append([])
        for j in range(0, len(arr[i]), int(len(arr[i]) / int(width))):
            if arr[i][j][:3] == [0, 0, 0]:
                res[len(res) - 1].append("#")
            if arr[i][j][:3] == [255, 255, 255]:
                res[len(res) - 1].append(" ")
            if arr[i][j][:3] == [255, 0, 0]:
                res[len(res) - 1].append("F")
            if arr[i][j][:3] == [0, 255, 0]:
                res[len(res) - 1].append("S")
    return res

if __name__ == "__main__":
    if sys.argv[1] == "-h":
        print("Usage:")
        print("py convert.py [image file] [width] [height]")
        print("-Image file: a .png image of the maze to be converted into an array.")
        print("-width, height: width and height (in cells) of the maze.")
    else:
        if len(sys.argv) == 4:
            array = convert(sys.argv[1], sys.argv[2], sys.argv[3])
        if len(sys.argv) == 3:
            array = convert(sys.argv[1], sys.argv[2])
        print(len(array))
        print(len(array[0]))
        
        with open("storage.js", 'w') as f:

            f.write('let maze = [ ' + ', '.join(str(x) for x in array) + '];\n')
        f.close()

        print("Done.")
