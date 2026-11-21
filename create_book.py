#!/usr/bin/env python3

import sys
from datetime import date
from pathlib import Path


book_index_template = """---
layout: post.njk
title: {book_name}
date: {date_iso}
---

# {book_name}
"""

book_data_template = """export default function () {{
	return {{
		tags: ['{tag_name}'],
		parentPage: {{
			name: 'Books',
			path: 'books/index.njk',
		}}
	}}
}}
"""


def create_book(book_name: str):
	normalized_book_name = book_name.strip()
	slug = normalized_book_name.lower().replace(" ", "-")
	tag_name = "".join(word.capitalize() for word in normalized_book_name.split()) + "Book"
	date_iso = date.today().isoformat()

	book_dir = Path("src/books") / slug
	book_dir.mkdir(parents=True, exist_ok=True)

	index_page_path = book_dir / "index.md"
	if not index_page_path.exists():
		index_page_path.write_text(
			book_index_template.format(book_name=normalized_book_name, date_iso=date_iso)
		)

	data_file_path = book_dir / f"{slug}.11tydata.js"
	if not data_file_path.exists():
		data_file_path.write_text(book_data_template.format(tag_name=tag_name))


if __name__ == "__main__":
	if len(sys.argv) != 2:
		print("Usage: python create_book.py <book_name>")
		sys.exit(1)

	create_book(sys.argv[1])
