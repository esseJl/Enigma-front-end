FROM nginx:stable

COPY dist/enigma-front-end/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

