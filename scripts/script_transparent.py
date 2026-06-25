from PIL import Image

def make_white_transparent(img_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")

    datas = img.getdata()

    new_data = []
    for item in datas:
        # change all white (also shades of whites)
        # pixels to transparent
        if item[0] > 150 and item[1] > 150 and item[2] > 150:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(img_path, "PNG")

# 使用函数
make_white_transparent(r'D:\OneDrive\1_资料\1 个人文件\16 个人网站\webpage\assets\media\icons\brands\tencent.png')