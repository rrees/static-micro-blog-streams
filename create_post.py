import sys

from datetime import date
from pathlib import Path
from string import Template

post_page_template = """---
layout: post.njk
title: {post_title}

date: {post_date}
---

# {post_title}
"""

data_file_template = Template(
    """export default function () {
	return {
		tags: ['$tag_name']
	}
}
"""
)


def create_post(post_path: str, post_title: str):

    post_file_path = Path(post_path)

    iso_today = date.today().isoformat()

    if not post_file_path.exists():
        post_file_path.write_text(
            post_page_template.format(post_title=post_title, post_date=iso_today)
        )


if __name__ == "__main__":
    if len(sys.argv) != 1 + 2:
        print("Usage: <post path> <post title>")
        sys.exit(1)

    create_post(sys.argv[1], sys.argv[2])
