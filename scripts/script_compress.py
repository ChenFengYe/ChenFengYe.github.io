import os
from PIL import Image
# from moviepy.editor import VideoFileClip
import subprocess

def compress_images(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            filepath = os.path.join(directory, filename)
            picture = Image.open(filepath)
            picture.save(filepath, "JPEG", optimize=True, quality=85)
            print(f"Compressed: {filepath}")

def compress_videos(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".mp4") or filename.endswith(".avi"):
            filepath = os.path.join(directory, filename)
            rs_filepath = os.path.join(directory, "rs_"+filename)
            subprocess.run([r"C:\Users\admin\Desktop\MeshXL\ffmpeg.exe", "-i", filepath, "-vcodec", "libx264", "-crf", "32", rs_filepath])
            print(f"Compressed: {filepath}")
            os.remove(filepath)  # 删除原始文件
            os.rename(rs_filepath, filepath)  # 将新的压缩文件重命名为原始文件的名字

def compress_files(directory):
    for foldername, subfolders, filenames in os.walk(directory):
        for subfolder in subfolders:
            # compress_images(os.path.join(foldername, subfolder))
            compress_videos(os.path.join(foldername, subfolder))
# compress_files(r"D:\OneDrive\1_资料\1 个人文件\16 个人网站\webpage\assets\media\albums")
# compress_files(r"D:\OneDrive\1_资料\1 个人文件\16 个人网站\webpage\content\publication\MeshXL")
compress_videos(r"C:\Users\admin\Desktop\MeshXL")
