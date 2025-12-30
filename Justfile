
serve:
	npx @11ty/eleventy --serve --port=8701

deploy:
	rsync --recursive --verbose _site/ pgs.sh:/wiki