from PIL import Image

def process_image(file_path):
    # 打开图片
    with Image.open(file_path) as img:
        # 将图片转换为RGBA模式（包含透明通道）
        img = img.convert("RGBA")
        
        # 加载图片数据
        data = img.getdata()
        
        # 新的图片数据
        new_data = []
        for item in data:
            # 检查透明度通道（A通道）
            if item[3] != 0:  # 不透明
                # 设置新的RGB值，保持原透明度
                new_data.append((75, 92, 196, item[3]))
            else:  # 保持原样
                new_data.append(item)
        
        # 更新图片数据
        img.putdata(new_data)
        
        # 保存图片
        img.save("modified_icon.png")

# 调用函数，假设图片路径是当前文件夹下的'icon.png'
process_image("icon.png")