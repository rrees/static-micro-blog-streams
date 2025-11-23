
serve:
	npx @11ty/eleventy --serve

deploy:
	rsync --recursive --verbose _site/ pgs.sh:/wiki