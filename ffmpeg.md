ffmpeg -i "ANIMAÇÃO ARTE 02.mp4" -vcodec libwebp -filter:v fps=fps=20 -lossless 0 -compression_level 6 -q:v 75 -loop 0 -preset picture -an -vsync 0 output.webp
